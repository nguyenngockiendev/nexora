const { postAndUpateRating, getRating, deleteRating } = require("../service/rating-service");

const CreateAndUpdateRating = async (req, res) => {
  try {
    const data = {
      ...req.body,
      courseId: req.params.courseId,
      userId: req.user.userId,
      role: req.user.role,
    };
    const result = await postAndUpateRating(data);
    res.status(200).json(result);
  } catch (error) {
    console.log(error);
    res.status(error.status || 500).json({ message: error.message });
  }
};

const GetRating = async (req, res) => {
  try {
    const data = { courseId: req.params.courseId };
    const result = await getRating(data);
    res.status(200).json(result);
  } catch (error) {
    console.log(error);
    res.status(error.status || 500).json({ message: error.message });
  }
};

const DeleteRatingByuser = async (req, res) => {
  try {
    const data = {
      ratingId: req.params.ratingId,
      userId: req.user.userId,
      role: req.user.role,
    };

    const result = await deleteRating(data);
    res.status(200).json(result);
  } catch (error) {
    console.log(error);
    res.status(error.status || 500).json({ message: error.message });
  }
};

module.exports = {
  CreateAndUpdateRating,
  GetRating,
  DeleteRatingByuser,
};
