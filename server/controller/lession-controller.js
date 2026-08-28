const {
  GetLession,
  CreateLession,
  DeleteLessionByid,
  UpdateLessionByid,
  GetLessionByid,
  GetCoursewithLessionById,
  getLessionDetails,
} = require("../service/lession");
const uploadFile = require("../service/uploadfile-service");

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

const CreateLessons = async (req, res) => {
  try {
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

    const body = req.body || {};
    src = {
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

      resources: src,
      status:
        body.status === "" || body.status === "false"
          ? "PENDING"
          : body.status || "PROCESSING",
      io: req.app.get("io"),
    };

    const result = await CreateLession(data);
    res.status(200).json(result);
  } catch (error) {
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
      status:
        body.status === "" || body.status === "false"
          ? "PENDING"
          : body.status || "PROCESSING",
      io: req.app.get("io"),
    };
    const result = await UpdateLessionByid(data);
    res.status(200).json(result);
  } catch (error) {
    res.status(error.status || 500).json({ message: error.message });
  }
};
const getLessionbyIntructor = async (req, res) => {
  try {
    const data = {
      role: req.user.role,
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
    };
    const result = await getLessionDetails(data);
    res.status(200).json(result);
  } catch (error) {
    res.status(error.status || 500).json({ message: error.message });
  }
};

module.exports = {
  GetLessons,
  CreateLessons,
  DeleteLession,
  UpdateLession,
  getLessionbyIntructor,
  GetCoursewithLession,
  GetLessionDetails,
};
