const Ratings = require("../model/Ratings");

const postAndUpateRating = async (data) => {
  try {
    if (data.role !== "student") {
      throw { status: 401, message: "bạn không thể bình luận!" };
    }
    const ExitsRating = await Ratings.findOne({
      userId: data.userId,
      courseId: data.courseId,
    });
    if (!ExitsRating) {
      const result = await Ratings.create({
        userId: data.userId,
        courseId: data.courseId,
        rating: data.rating || 0,
        instructorRating: data.instructorRating || 0,
        comment: data.comment,
      });
      return result;
    }
    const updateFields = {};
    if (data.rating !== undefined) updateFields.rating = data.rating;
    if (data.instructorRating !== undefined)
      updateFields.instructorRating = data.instructorRating;
    if (data.comment !== undefined) updateFields.comment = data.comment;
    const updateRating = await Ratings.findOneAndUpdate(
      {
        _id: ExitsRating._id,
        userId: data.userId,
      },
      {
        $set:  updateFields ,
      },
      {
        new: true,
      },
    );
    return updateRating;
  } catch (error) {
    console.log(error);
    throw error;
  }
};

const getRating = async (data) => {
  try {
    const result = await Ratings.find({
      courseId: data.courseId,
    })
      .populate("userId", "name avatar")
      .lean();

    if (!result || result.length === 0) {
      return { ratings: [], avgRatingcou: 0, avgRatingIns: 0 };
    }

    const totalRating = result.reduce(
      (acc, item) => acc + (item.rating || 0),
      0,
    );
    const avgRatingcou = Number((totalRating / result.length).toFixed(1));

    const totalInsRating = result.reduce(
      (acc, item) => acc + (item.instructorRating || 0),
      0,
    );
    const avgRatingIns = Number((totalInsRating / result.length).toFixed(1));

    return {
      ratings: result,
      avgRatingcou,
      avgRatingIns,
    };
  } catch (error) {
    console.log(error);
    throw error;
  }
};

const deleteRating = async (data) => {
  try {
    if (data.role !== "student") {
      throw { status: 401, message: "bạn không có quyền xóa bình luận này!" };
    }
    const result = await Ratings.findOneAndDelete({
      _id: data.ratingId,
      userId: data.userId,
    });
    return result;
  } catch (error) {
    console.log(error);
    throw error;
  }
};

module.exports = { postAndUpateRating, getRating, deleteRating };
