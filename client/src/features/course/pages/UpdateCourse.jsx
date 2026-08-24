import { useParams, useNavigate } from "react-router-dom";
import { useDetails } from "../hooks/useDetailsCourse";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { toast } from "react-toastify";
import CreateCourese from "../components/CreateCoursesForm";
import useCoursesService from "../hooks/useCreateCourses";

const UpdateCourse = () => {
  const { courseId } = useParams();
  const [thumbail, setThumbnail] = useState(null);
  const [thumbnailPreview, setThumbnailPreview] = useState(null);
  const { detalscourse } = useDetails(courseId);
  const { register, handleSubmit, reset, watch, setValue } = useForm();
  const { error, updateCourse, loading } = useCoursesService();
  const navigate = useNavigate();

  useEffect(() => {
    if (detalscourse && detalscourse._id) {
      reset({
        title: detalscourse.title,
        description: detalscourse.description,
        price: detalscourse.price,
        level: detalscourse.level,
        type: detalscourse.type,
      });
      setThumbnailPreview(detalscourse.thumbnail);
    }
  }, [detalscourse, reset]);

  const handleThumbnailChange = (file) => {
    if (file) {
      setThumbnail(file);
      setThumbnailPreview(URL.createObjectURL(file));
    } else {
      setThumbnail(null);
      setThumbnailPreview(detalscourse?.thumbnail || null);
    }
  };

  const onSubmit = async (data) => {
    try {
      const formdata = new FormData();
      formdata.append("title", data.title);
      formdata.append("description", data.description);
      formdata.append("price", data.price !== undefined ? data.price : 0);
      formdata.append("level", data.level);
      formdata.append("type", data.type || detalscourse?.type || "recorded");
      if (thumbail) {
        formdata.append("thumbnail", thumbail);
      }
      const res = await updateCourse(courseId, formdata);
      if (res) {
        toast.success("Cập nhật khóa học thành công!");
        navigate("/courses");
      }
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <CreateCourese
      register={register}
      handleSubmit={handleSubmit}
      watch={watch}
      setValue={setValue}
      onSubmit={onSubmit}
      error={error}
      navigate={navigate}
      setThumbnail={handleThumbnailChange}
      thumbnailPreview={thumbnailPreview}
      loading={loading}
      isEdit={true}
    />
  );
};

export default UpdateCourse;
