const Lessons = require("../model/Lessons");

const GetLession = async (data) => {
  try {
    let result = [];
    if (data?.role === "instructor") {
      result = await Lessons.find({ courseId: data.id });
    } else if (data?.role === "student") {
      result = await Lessons.find({ courseId: data.id, isPreview: true });
    } else if (data?.role === "admin") {
      result = await Lessons.find({ courseId: data.id });
    }

    if (!result || result.length === 0) {
      throw { status: 404, message: "not lession" };
    }
    return result;
  } catch (error) {
    console.log(error);
    throw error;
  }
};
const CreateLession = async (data) => {
  try {
    if (data?.role !== "instructor") {
      throw { status: 403, message: "forbidden" };
    }
    const newlession = new Lessons(data);
    await newlession.save();
    return { message: "create successfully" };
  } catch (error) {
    console.log(error);
    throw error;
  }
};
const DeleteLessionByid = async (data) => {
  try {
    if (data?.role !== "instructor") {
      throw { status: 403, message: "forbidden" };
    }
    const deletelession = await Lessons.findByIdAndDelete(data._id);
    if (deletelession) {
      return { message: "Delete Lession Succesfully!" };
    }
  } catch (error) {
    console.log(error);
    throw error;
  }
};
const UpdateLessionByid = async (data) => {
  try {
    if (data?.role !== "instructor") {
      throw { status: 403, message: "forbidden" };
    }
    const updatelession = await Lessons.findByIdAndUpdate(data._id, data, {
      new: true,
    });
     if(!updatelession){
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

module.exports = {
  GetLession,
  CreateLession,
  DeleteLessionByid,
  UpdateLessionByid,
};
