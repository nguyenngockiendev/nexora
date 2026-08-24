const Courses = require("../model/Courses");
const Lessons = require("../model/Lessons");
const classs = require("../model/Class");
const Rating = require("../model/Ratings");

const GetAllCourses = async (data) => {
  try {
    let course = [];
    if (data?.role === "admin") {
      course = await Courses.find({ instructor: data?.userId })
        .populate("instructor", "name type")
        .lean();
    }
    if (data?.role === "instructor") {
      course = await Courses.find({ instructor: data?.userId })
        .populate("instructor", "name type")
        .lean();
    }

    const resultFinal = await Promise.all(
      course?.map(async (co) => {
        const numbserclass = await classs.find({ courseId: co?._id });
        const rattingforcoure = await Rating.find({ courseId: co?._id });
        const avgRting = rattingforcoure.reduce((sum, number) => {
          const toatal = Math.round((sum += Number(number.rating)));
          return toatal;
        }, 0);
        const avg = avgRting / rattingforcoure.length;
        return {
          ...co,
          instructor: co?.instructor?.name,
          numberClass: numbserclass.length,
          Rattingleng: rattingforcoure.length,
          rattingforcoure: avg,
        };
      }),
    );

    return resultFinal;
  } catch (error) {
    console.log(error);
    throw error;
  }
};

const GetCourses = async (data) => {
  try {
    let course = [];
    if (data?.role === "admin") {
      course = await Courses.find().populate("instructor", "name type").lean();
    }
    if (data?.role === "instructor") {
      course = await Courses.find().populate("instructor", "name type").lean();
    }
    if (data?.role === "student") {
      course = await Courses.find().populate("instructor", "name type").lean();
    }
    const resultFinal = await Promise.all(
      course?.map(async (co) => {
        const numbserclass = await classs.find({ courseId: co?._id });
        const rattingforcoure = await Rating.find({ courseId: co?._id });
        const avgRting = rattingforcoure.reduce((sum, number) => {
          const toatal = Math.round((sum += Number(number.rating)));
          return toatal;
        }, 0);
        const avg = avgRting / rattingforcoure.length;
        return {
          ...co,
          instructor: co?.instructor?.name,
          numberClass: numbserclass.length,
          Rattingleng: rattingforcoure.length,
          rattingforcoure: avg,
        };
      }),
    );

    return resultFinal;
  } catch (error) {
    console.log(error);
    throw error;
  }
};

const CreatenewCourses = async (data) => {
  try {
    if (data?.role !== "student") {
      throw { message: "you can not create courses!" };
    }

    const newCourses = new Courses(data);

    await newCourses.save();
    return { message: " Create Courses successfully!", result: newCourses };
  } catch (error) {
    console.log(error);
    throw error;
  }
};
const EditCourse = async (data) => {
  try {
    const updatecourse = {
      title: data.title,
      description: data.description,
      price: data.price || 0,
      level: data.level,
    };
    if (data.thumbnail != null && data.thumbnail != "") {
      updatecourse.thumbnail = data.thumbnail;
    }
    const update = await Courses.findOneAndUpdate(
      {
        _id: data.courseId,
        instructor: data.userId,
      },
      {
        $set: updatecourse,
      },
      { new: true },
    );

    return update;
  } catch (error) {
    console.log(error);
    throw error;
  }
};

const GetLessonById = async (data) => {
  try {
    let result = [];
    if (data?.role == "instructor") {
      result = await Lessons.find({ courseId: data.id });
    }

    return result;
  } catch (error) {
    console.log(error);
    throw error;
  }
};
const GetDetailsCourse = async (data) => {
  try {
    const list = await Courses.findById(data.courseId)
      .populate("instructor")
      .lean();
    if (!list) {
      throw { status: 404, message: "Course không tồn tại!" };
    }
    const lessionbycou = await Lessons.find({ courseId: list._id }).lean();
    const result = {
      ...list,
      lessons: lessionbycou,
    };
    return result;
  } catch (error) {
    console.log(error);
    throw error;
  }
};

const GetCourseForAdmin = async (data) => {
  try {
    if (data.role !== "admin") {
      throw { message: "Bạn không có quyền này!" };
    }

    const result = await Courses.aggregate([
      {
        $lookup: {
          from: "users",
          localField: "instructor",
          foreignField: "_id",
          as: "user",
        },
      },

      {
        $lookup: {
          from: "ratings",
          localField: "_id",
          foreignField: "courseId",
          as: "ratting",
        },
      },

      {
        $lookup: {
          from: "enrollments",
          localField: "_id",
          foreignField: "courseId",
          as: "enrollment",
        },
      },

      {
        $addFields: {
          avgRatting: {
            $cond: {
              if: { $gt: [{ $size: { $ifNull: ["$ratting", []] } }, 0] },
              then: { $avg: "$ratting.rating" },
              else: 0,
            },
          },

          toatalcomment: {
            $size: { $ifNull: ["$ratting", []] },
          },

          studentsCount: {
            $size: { $ifNull: ["$enrollment", []] },
          },

          lowRatingAlert: {
            $and: [
              { $gt: [{ $size: { $ifNull: ["$ratting", []] } }, 0] },
              {
                $lt: [
                  {
                    $cond: {
                      if: {
                        $gt: [{ $size: { $ifNull: ["$ratting", []] } }, 0],
                      },
                      then: { $avg: "$ratting.rating" },
                      else: 0,
                    },
                  },
                  3.0,
                ],
              },
            ],
          },
        },
      },
      {
        $project: {
          title: 1,
          type: 1,
          status: 1,
          thumbnail: 1,
          price: 1,
          createdAt: 1,
          avgRatting: 1,
          toatalcomment: 1,
          studentsCount: 1,
          lowRatingAlert: 1,

          instructorName: { $arrayElemAt: ["$user.name", 0] },
          instructorAvatar: { $arrayElemAt: ["$user.avatar", 0] },
        },
      },
      {
        $sort: {
          lowRatingAlert: -1,
          createdAt: -1,
        },
      },
    ]);
    const review = await Promise.all(
      result.map(async (e) => {
        const coment = await Rating.find({
          courseId: e._id,
        }).populate("userId", "name avatar");

        return { ...e, reviews: coment };
      }),
    );
    return review;
  } catch (error) {
    console.log(error);
    throw error;
  }
};

const UpdateisLookedCourse = async (data) => {
  try {
    if (data.role !== "admin") {
      throw { message: "Bạn không có quyền này!" };
    }
    const isLooked = await Courses.findByIdAndUpdate(
      data.courseId,
      {
        status: data.status,
      },
      { new: true },
    );
    if (!isLooked) {
      throw { message: "khóa học không tồn tại!" };
    }
    const isLookedLession = await Lessons.updateMany(
      { courseId: isLooked._id },
      {
        $set: {
          isLocked: data.status === "active" ? false : true,
        },
      },
    );
    await classs.updateMany(
      { courseId: isLooked._id },
      {
        $set: {
          isLocked: data.status === "active" ? false : true,
        },
      },
    );
    return {
      isLooked: isLooked,
      isLookedLession: isLookedLession,
    };
  } catch (error) {
    console.log(error);
    throw error;
  }
};
module.exports = {
  GetAllCourses,
  CreatenewCourses,
  GetLessonById,
  GetDetailsCourse,
  GetCourseForAdmin,
  UpdateisLookedCourse,
  GetCourses,
  EditCourse
};
