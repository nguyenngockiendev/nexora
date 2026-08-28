const Lessons = require("../model/Lessons");
const Courses = require("../model/Courses");

const quizz = require("../model/Quizz");

const { default: mongoose } = require("mongoose");
const { Worker2 } = require("./Worker/worker.service");
const LessonTranscripts = require("../model/LessonTranscripts");

const GetLession = async (data) => {
  try {
    let result = [];
    if (data?.role === "instructor") {
      result = await Lessons.find({ courseId: data.id }).lean();
    } else if (data?.role === "student") {
      result = await Lessons.find({
        courseId: data.id,
        isPreview: true,
      }).lean();
    } else if (data?.role === "admin") {
      result = await Lessons.find({ courseId: data.id }).lean();
    }

    if (!result || result.length === 0) {
      throw { status: 404, message: "not lession" };
    }

    const Quizzexist = Promise.all(
      result.map(async (item) => {
        const quizzExits = await quizz.findOne({ lessonId: item._id });

        return { ...item, QuizExits: quizzExits };
      }),
    );
    return Quizzexist;
  } catch (error) {
    console.log(error);
    throw error;
  }
};
const CreateLession = async (data) => {
  try {
    const numberOrder = await Lessons.findOne().sort({ order: -1 });
    let order = numberOrder?.order || 0;
    if (data?.role !== "instructor") {
      throw { status: 403, message: "forbidden" };
    }
    order++;
    const newlession = await Lessons.create({ ...data, order: order });
    if (data.status === "PROCESSING") {
      if (Worker2) {
        Worker2({ _id: newlession._id.toString() }, data.io);
      }
    }
    return { message: "create successfully", newlession: newlession };
  } catch (error) {
    console.log(error);
    throw error;
  }
};
const DeleteLessionByid = async (data) => {
  try {
    if (data?.role !== "instructor") {
      throw { status: 403, message: "Bạn không có quyền giảng viên!" };
    }
    const lession = await Lessons.findById(data._id);
    if (!lession) {
      throw { status: 404, message: "Bài học không tồn tại!" };
    }
    const isOwner = await Courses.findOne({
      _id: lession.courseId,
      instructor: data.userId,
    });
    if (!isOwner) {
      throw {
        status: 403,
        message: "Bạn không có quyền xóa bài học của giảng viên khác!",
      };
    }
    const deletelession = await Lessons.findByIdAndDelete(data._id);
    await LessonTranscripts.deleteMany({ lessonId: deletelession._id });
    return { message: "Xóa bài học thành công!" };
  } catch (error) {
    console.log(error);
    throw error;
  }
};
const UpdateLessionByid = async (data) => {
  try {
    if (data?.role !== "instructor") {
      throw { status: 403, message: "Bạn không có quyền giảng viên!" };
    }
    const lession = await Lessons.findById(data.lessionId);
    if (!lession) {
      throw { status: 404, message: "Bài học không tồn tại!" };
    }
    const isOwner = await Courses.findOne({
      _id: lession.courseId,
      instructor: data.userId,
    });
    if (!isOwner) {
      throw {
        status: 403,
        message: "Bạn không có quyền thay đổi bài học của giảng viên khác!",
      };
    }

    const updateData = {};

    for (let item in data) {
      if (data[item] !== undefined && item !== "lessionId" && item !== "io") {
        updateData[item] = data[item];
      }
    }
    if (data.videoUrl) {
      updateData.videoUrl = data.videoUrl;
      await LessonTranscripts.deleteMany({ lessonId: data.lessionId });
    }

    const updatelession = await Lessons.findByIdAndUpdate(
      data.lessionId,

      {
        $set: updateData,
      },
      {
        new: true,
      },
    );
    if (data.status === "PROCESSING") {
      await LessonTranscripts.deleteMany({ lessonId: data.lessionId });
      if (Worker2) {
        Worker2({ _id: updatelession._id.toString() }, data.io);
      }
    }
    if (!updatelession) {
      throw { status: 404, message: "Lesson not found" };
    }
    if (updatelession) {
      return { message: " Update Lession Succesfully!", data: updatelession };
    }
  } catch (error) {
    console.log(error);
    throw error;
  }
};

const GetLessionByid = async (data) => {
  try {
    if (data?.role !== "instructor") {
      throw { status: 403, message: "forbidden" };
    }
    const getlession = await Lessons.findById({ _id: data?.lessionId }).lean();
    if (!getlession) {
      throw { status: 404, message: "Lesson not found" };
    }

    return getlession;
  } catch (error) {
    console.log(error);
    throw error;
  }
};
const GetCoursewithLessionById = async (data) => {
  try {
    if (data?.role !== "instructor") {
      throw { status: 403, message: "forbidden" };
    }
    const result = await Courses.aggregate([
      {
        $match: {
          instructor: new mongoose.Types.ObjectId(data.userId),
          type: "recorded",
        },
      },
      {
        $lookup: {
          from: "lessons",
          localField: "_id",
          foreignField: "courseId",
          as: "lessionlist",
        },
      },

      {
        $lookup: {
          from: "users",
          localField: "instructor",
          foreignField: "_id",
          as: "IntructorName",
        },
      },
      {
        $unwind: "$IntructorName",
      },
      {
        $project: {
          _id: 1,
          title: 1,
          type: 1,
          instructor: "$IntructorName.name",
          lessonCount: { $size: "$lessionlist" },
        },
      },
    ]);
    return result;
  } catch (error) {
    console.log(error);
    throw error;
  }
};
const getLessionDetails = async (data) => {
  try {
    if (data.role == "student") {
      throw { status: 404, message: "không có quyền!" };
    }
    const listlession = await Lessons.find({
      courseId: data.courseId,
    }).populate("courseId", "type");
    if (listlession.length === 0) {
      throw { status: 404, message: "bạn không có bài học nào!" };
    }
    const result = listlession.map((e) => {
      return {
        _id: e._id,
        title: e.title,
        type: e.courseId.type,
        status: e.status,
        videoUrl: e.videoUrl,
        content: e.content,
        resources: e.resources,
      };
    });
    return result;
  } catch (error) {
    console.log(error);
    throw error;
  }
};
module.exports = {
  GetLession,
  CreateLession,
  DeleteLessionByid,
  UpdateLessionByid,
  GetLessionByid,
  GetCoursewithLessionById,
  getLessionDetails,
};
