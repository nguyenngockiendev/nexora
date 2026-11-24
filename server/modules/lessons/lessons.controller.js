const {
  ReorderClassLessons,
  GetLession,
  CreateLession,
  DeleteLessionByid,
  UpdateLessionByid,
  GetLessionByid,
  GetCoursewithLessionById,
  getLessionDetails,
  RetryLessonNormalization,
} = require("./lessons.service");
const fs = require("node:fs/promises");
const Courses = require("../courses/Courses");
const { requireClassAccess } = require("./class-lesson-access");
const uploadFile = require("../../services/upload.service");

const GetLessons = async (req, res) => {
  try {
    const data = {
      id: req.params.id,
      role: req.user.role,
    };
    const result = await GetLession(data);

    res.status(200).json(result);
  } catch (error) {
    res.status(error.status || 500).json({ message: error.message });
  }
};

const removeTempFiles = async (files) => {
  for (const file of Object.values(files || {}).flat()) {
    await fs.rm(file.path, { force: true }).catch((error) => console.error(error.message));
  }
};

const CreateLessons = async (req, res) => {
  try {
    const body = req.body || {};
    if (body.classId) {
      await requireClassAccess(body.classId, body.courseId, req.user.userId, true);
    } else if (!await Courses.exists({ _id: body.courseId, instructor: req.user.userId, type: { $ne: "live" } })) {
      throw { status: 403, message: "Hãy chọn khóa video của bạn hoặc lớp cần đăng bài." };
    }
    if (!req.files?.videoUrl?.length) throw { status: 400, message: "Hãy chọn video bài học." };
    let videoUrl = "";
    let resourceUrl = "";
    if (req.files?.videoUrl) {
      videoUrl = await uploadFile(
        req.files.videoUrl[0].path,
        true,
        req.app.get("io"),
      );
    }
    if (req.files?.resourcesurl) {
      resourceUrl = await uploadFile(req.files.resourcesurl[0].path, false);
    }

    const src = {
      type: body.resourcestype,
      title: body.resourcestitle,
      url: resourceUrl.secure_url,
    };
    const data = {
      ...body,
      duration: videoUrl.duration,
      courseId: body.courseId,
      videoUrl: videoUrl.secure_url,
      role: req.user.role,

      resources: resourceUrl ? [src] : [],
      status:
        body.status === "" || body.status === "false"
          ? "PENDING"
          : "PROCESSING",
      io: req.app.get("io"),
    };

    const result = await CreateLession(data);
    res.status(200).json(result);
  } catch (error) {
    await removeTempFiles(req.files);
    res.status(error.status || 500).json({ message: error.message });
  }
};

const DeleteLession = async (req, res) => {
  try {
    const data = {
      role: req.user.role,
      userId: req.user.userId,
      _id: req.params.id,
    };
    const result = await DeleteLessionByid(data);
    res.status(200).json(result);
  } catch (error) {
    res.status(error.status || 500).json({ message: error.message });
  }
};

const UpdateLession = async (req, res) => {
  try {
    await GetLessionByid({ lessionId: req.params.lessionId, userId: req.user.userId, role: req.user.role });
    let videoUrl = null;
    let resourceUrl = null;
    if (req.files?.video) {
      videoUrl = await uploadFile(
        req.files.video[0].path,
        true,
        req.app.get("io"),
      );
    }
    if (req.files?.resourcesurl) {
      resourceUrl = await uploadFile(req.files.resourcesurl[0].path, false);
    }
    const body = req.body || {};
    const data = {
      ...body,
      duration: videoUrl?.duration,
      videoUrl: videoUrl?.secure_url,
      role: req.user.role,
      userId: req.user.userId,
      lessionId: req.params.lessionId,

      resourceType: body.resourcestype,
      resourceTitle: body.resourcestitle,
      resourceUrl: resourceUrl?.secure_url,
      status: body.status === "PROCESSING" ? "PROCESSING" : videoUrl ? "PENDING" : undefined,
      io: req.app.get("io"),
    };
    const result = await UpdateLessionByid(data);
    res.status(200).json(result);
  } catch (error) {
    await removeTempFiles(req.files);
    res.status(error.status || 500).json({ message: error.message });
  }
};
const getLessionbyIntructor = async (req, res) => {
  try {
    const data = {
      role: req.user.role,
      userId: req.user.userId,
      lessionId: req.params.lessionId,
    };
    const result = await GetLessionByid(data);
    res.status(200).json(result);
  } catch (error) {
    res.status(error.status || 500).json({ message: error.message });
  }
};
const GetCoursewithLession = async (req, res) => {
  try {
    const data = {
      role: req.user.role,
      userId: req.user.userId,
    };
    const result = await GetCoursewithLessionById(data);
    res.status(200).json(result);
  } catch (error) {
    res.status(error.status || 500).json({ message: error.message });
  }
};

const GetLessionDetails = async (req, res) => {
  try {
    const data = {
      role: req.user.role,
      courseId: req.params.courseId,
      classId: req.params.classId,
      userId: req.user.userId,
    };
    const result = await getLessionDetails(data);
    res.status(200).json(result);
  } catch (error) {
    res.status(error.status || 500).json({ message: error.message });
  }
};

const RetryNormalization = async (req, res) => {
  try {
    const result = await RetryLessonNormalization(
      req.params.lessionId,
      req.user.userId,
    );
    res.status(200).json(result);
  } catch (error) {
    res.status(error.status || 500).json({
      message: error.message || "Không thể chuẩn hóa bài học!",
    });
  }
};

const ReorderLessons = async (req, res) => {
  try {
    await ReorderClassLessons({ courseId: req.params.courseId, classId: req.params.classId, userId: req.user.userId, lessonIds: req.body.lessonIds });
    res.json({ message: "Đã lưu thứ tự bài học." });
  } catch (error) {
    res.status(error.status || 500).json({ message: error.message });
  }
};

module.exports = {
  ReorderLessons,
  GetLessons,
  CreateLessons,
  DeleteLession,
  UpdateLession,
  getLessionbyIntructor,
  GetCoursewithLession,
  GetLessionDetails,
  RetryNormalization,
};
