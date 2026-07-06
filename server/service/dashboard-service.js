const mongoose = require("mongoose");
const Courses = require("../model/Courses");
const Class = require("../model/Class");
const Enrollment = require("../model/Enrollments");
const Order = require("../model/Orders");

const getInstructorBusinessDashboard = async (data) => {
  try {
    if (data?.role !== "instructor") {
      throw { status: 403, message: "Only instructors can view this dashboard" };
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

module.exports = {
  getInstructorBusinessDashboard,
};
