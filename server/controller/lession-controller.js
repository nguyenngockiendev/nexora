const {
  GetLession,
  CreateLession,
  DeleteLessionByid,
  UpdateLessionByid,
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
      url: resourceUrl,
    };
    const data = {
      ...req.body,
      courseId: req.body.courseId,
      videoUrl: videoUrl,
      role: req.user.role,
      quiz: JSON.parse(req.body.quiz),
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
    const data = {
      ...req.body,
      role: req.user.role,
      _id: req.params.id,
    };
    const result = await UpdateLessionByid(data);
    res.status(200).json(result);
  } catch (error) {
    res.status(error.status || 500).json({ message: error.message });
  }
};


module.exports = { GetLessons, CreateLessons, DeleteLession,UpdateLession };
