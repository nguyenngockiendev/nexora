const mongoose = require("mongoose");
const Courses = require("../model/Courses");
const Class = require("../model/Class");
const Enrollment = require("../model/Enrollments");
const Order = require("../model/Orders");
const User = require("../model/Users");
const ProcessLession = require("../model/ProcessLessons");

const getInstructorBusinessDashboard = async (data) => {
  try {
    if (data?.role !== "instructor") {
      throw {
        status: 403,
        message: "Chỉ giảng viên mới có quyền xem bảng điều khiển này!",
      };
    }

    const instructorId = new mongoose.Types.ObjectId(data.instructorId);

    const courses = await Courses.find({ instructor: instructorId })
      .select("title type price thumbnail level")
      .lean();

    const courseIds = courses.map((course) => course._id);

    if (courseIds.length === 0) {
      return {
        overview: {
          totalCourses: 0,
          totalClasses: 0,
          totalEnrollments: 0,
          totalStudents: 0,
          activeEnrollments: 0,
          completedEnrollments: 0,
          totalOrders: 0,
          completedOrders: 0,
          pendingOrders: 0,
          failedOrders: 0,
          totalRevenue: 0,
        },
        coursePerformance: [],
        recentOrders: [],
      };
    }
    const [
      totalClasses,
      uniqueStudentIds,
      enrollmentStats,
      orderStats,
      coursePerformance,
      recentOrders,
    ] = await Promise.all([
      Class.countDocuments({ instructorId }),
      Enrollment.distinct("userId", { courseId: { $in: courseIds } }),
      Enrollment.aggregate([
        { $match: { courseId: { $in: courseIds } } },
        {
          $group: {
            _id: "$status",
            count: { $sum: 1 },
          },
        },
      ]),
      Order.aggregate([
        { $match: { courseId: { $in: courseIds } } },
        {
          $group: {
            _id: "$status",
            count: { $sum: 1 },
            revenue: {
              $sum: {
                $cond: [{ $eq: ["$status", "completed"] }, "$price", 0],
              },
            },
          },
        },
      ]),
      Courses.aggregate([
        { $match: { instructor: instructorId } },
        {
          $lookup: {
            from: "enrollments",
            localField: "_id",
            foreignField: "courseId",
            as: "enrollments",
          },
        },
        {
          $lookup: {
            from: "orders",
            localField: "_id",
            foreignField: "courseId",
            as: "orders",
          },
        },
        {
          $lookup: {
            from: "classes",
            localField: "_id",
            foreignField: "courseId",
            as: "classes",
          },
        },
        {
          $project: {
            title: 1,
            type: 1,
            price: 1,
            thumbnail: 1,
            level: 1,
            totalEnrollments: { $size: "$enrollments" },
            activeEnrollments: {
              $size: {
                $filter: {
                  input: "$enrollments",
                  as: "enrollment",
                  cond: { $eq: ["$$enrollment.status", "active"] },
                },
              },
            },
            completedEnrollments: {
              $size: {
                $filter: {
                  input: "$enrollments",
                  as: "enrollment",
                  cond: { $eq: ["$$enrollment.status", "completed"] },
                },
              },
            },
            totalClasses: { $size: "$classes" },
            totalOrders: { $size: "$orders" },
            completedOrders: {
              $size: {
                $filter: {
                  input: "$orders",
                  as: "order",
                  cond: { $eq: ["$$order.status", "completed"] },
                },
              },
            },
            revenue: {
              $sum: {
                $map: {
                  input: {
                    $filter: {
                      input: "$orders",
                      as: "order",
                      cond: { $eq: ["$$order.status", "completed"] },
                    },
                  },
                  as: "completedOrder",
                  in: "$$completedOrder.price",
                },
              },
            },
          },
        },
        { $sort: { revenue: -1, totalEnrollments: -1 } },
      ]),
      Order.find({ courseId: { $in: courseIds } })
        .sort({ createdAt: -1 })
        .limit(5)
        .populate("userId", "name email avatar")
        .populate("courseId", "title type")
        .populate("classId", "className")
        .lean(),
    ]);

    const enrollmentSummary = enrollmentStats.reduce(
      (summary, item) => {
        summary.totalEnrollments += item.count;
        if (item._id === "active") summary.activeEnrollments = item.count;
        if (item._id === "completed") summary.completedEnrollments = item.count;
        return summary;
      },
      {
        totalEnrollments: 0,
        activeEnrollments: 0,
        completedEnrollments: 0,
      },
    );

    const orderSummary = orderStats.reduce(
      (summary, item) => {
        summary.totalOrders += item.count;
        summary.totalRevenue += item.revenue;
        if (item._id === "completed") summary.completedOrders = item.count;
        if (item._id === "pending") summary.pendingOrders = item.count;
        if (item._id === "failed") summary.failedOrders = item.count;
        return summary;
      },
      {
        totalOrders: 0,
        completedOrders: 0,
        pendingOrders: 0,
        failedOrders: 0,
        totalRevenue: 0,
      },
    );

    return {
      overview: {
        totalCourses: courses.length,
        totalClasses,
        totalStudents: uniqueStudentIds.length,
        ...enrollmentSummary,
        ...orderSummary,
      },
      coursePerformance,
      recentOrders,
    };
  } catch (error) {
    console.log(error);
    throw error;
  }
};

const DashboartAdmin = async (data) => {
  try {
    const now = new Date();
    let filterDate = new Date(0);
    if (data.day === "week") {
      filterDate = new Date(now.setDate(now.getDate() - 7));
    } else if (data.day === "month") {
      filterDate = new Date(now.setMonth(now.getMonth() - 1));
    }

    const totalUsers = await User.find({
      createdAt: { $gte: filterDate },
    }).sort({ createdAt: -1 });

    const recentTransactions = await Order.find({
      createdAt: {
        $gte: filterDate,
      },
    })
      .populate("userId", "name email avatar")
      .sort({ createdAt: -1 })
      .limit(5);

    const totalInstructors = await User.find({
      role: "instructor",
      createdAt: { $gte: filterDate },
    });

    const totalCourses = await Courses.find({
      createdAt: { $gte: filterDate },
    });

    const revenueResult = await Order.find({
      status: "completed",
      createdAt: {
        $gte: filterDate,
      },
    });

    const totalRevenue = revenueResult.reduce((sum, e) => {
      const items = e.items.reduce((sum2, e2) => {
        return sum2 + (e2.price || 0);
      }, 0);
      return sum + items;
    }, 0);
    const dayNames = ["CN", "T2", "T3", "T4", "T5", "T6", "T7"];
    const revenueChart = [];
    const userChart = [];
    const numDays = data.day === "month" ? 30 : 7;

    for (let i = numDays - 1; i >= 0; i--) {
      const d = new Date();
      d.setDate(d.getDate() - i);
      d.setHours(0, 0, 0, 0);

      const nextD = new Date(d);
      nextD.setDate(nextD.getDate() + 1);

      const label =
        data.day === "month"
          ? `${d.getDate()}/${d.getMonth() + 1}`
          : dayNames[d.getDay()];

      const dayOrders = revenueResult.filter(
        (o) => new Date(o.createdAt) >= d && new Date(o.createdAt) < nextD,
      );
      const dayRevenue = dayOrders.reduce((sum, o) => {
        const itemSum = o.items.reduce((s, it) => s + (it.price || 0), 0);
        return sum + itemSum;
      }, 0);

      const dayUsers = totalUsers.filter(
        (u) => new Date(u.createdAt) >= d && new Date(u.createdAt) < nextD,
      );
      const students = dayUsers.filter((u) => u.role === "student").length;
      const instructors = dayUsers.filter(
        (u) => u.role === "instructor",
      ).length;

      revenueChart.push({ name: label, value: dayRevenue });
      userChart.push({ name: label, students, instructors });
    }

    const finalresult = {
      totalUsers: totalUsers,
      newUsers: totalUsers.slice(0, 5),
      totalInstructors: totalInstructors,
      totalCourses: totalCourses,
      totalRevenue: totalRevenue,
      recentTransactions: recentTransactions,
      revenueChart: revenueChart,
      userChart: userChart,
    };
    return finalresult;
  } catch (error) {
    console.log(error);
    throw error;
  }
};

module.exports = {
  getInstructorBusinessDashboard,
  DashboartAdmin,
};
