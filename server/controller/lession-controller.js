const {
  GetLession,
  CreateLession,
  DeleteLessionByid,
  UpdateLessionByid,
  GetLessionByid,
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
      videoUrl = await uploadFile(req.files.videoUrl[0].path);
    }
    if (req.files?.resourcesurl) {
      resourceUrl = await uploadFile(req.files.resourcesurl[0].path);
    }

    src = {
      type: req.body.resourcestype,
      title: req.body.resourcestitle,
      url: resourceUrl.secure_url,
    };
    const data = {
      ...req.body,
      duration: videoUrl.duration,
      courseId: req.body.courseId,
      videoUrl: videoUrl.secure_url,
      role: req.user.role,

      resources: src,
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
    let videoUrl = "";
    let resourceUrl = "";
    if (req.files?.video) {
      videoUrl = await uploadFile(req.files.video[0].path);
    }
    if (req.files?.resourcesurl) {
      resourceUrl = await uploadFile(req.files.resourcesurl[0].path);
    }
    const data = {
      ...req.body,
      duration: videoUrl.duration,
      videoUrl: videoUrl.secure_url,
      role: req.user.role,
      lessionId: req.params.lessionId,
      resources: {
        type: req.body.resourcestype,
        title: req.body.resourcestitle,
        url: resourceUrl.secure_url,
      },
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
module.exports = {
  GetLessons,
  CreateLessons,
  DeleteLession,
  UpdateLession,
  getLessionbyIntructor,
};
