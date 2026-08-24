import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import CreateCourese from "../components/CreateCoursesForm";
import useCoursesService from "../hooks/useCreateCourses";

const CreateCourses = () => {
  const { register, handleSubmit, watch, setValue } = useForm({
    defaultValues: {
      type: "recorded",
      level: "beginner",
      title: "",
      description: "",
      price: "",
    },
  });
  const type = watch("type");
  const isLive = type === "live";
  useEffect(() => {
    if (isLive) {
      setValue("price", 0);
    }
  }, [isLive, setValue]);

  const { error, Create } = useCoursesService();
  const [loading, setLoading] = useState(false);
  const [thumbail, setThumbnail] = useState(null);
  const [thumbnailPreview, setThumbnailPreview] = useState(null);
  const [notification, setnNotification] = useState("");
  const [exits, setExits] = useState(false);

  const navigate = useNavigate();

  const handleThumbnailChange = (file) => {
    if (file) {
      setThumbnail(file);
      setThumbnailPreview(URL.createObjectURL(file));
    } else {
      setThumbnail(null);
      setThumbnailPreview(null);
    }
  };

  const onSubmit = async (data) => {
    try {
      setLoading(true);

      const formdata = new FormData();
      formdata.append("title", data.title);
      formdata.append("description", data.description);
      formdata.append("price", data.price);
      formdata.append("level", data.level);
      formdata.append("type", data.type);
      if (thumbail) {
        formdata.append("thumbnail", thumbail);
      }
      const result = await Create(formdata);

      if (!result) {
        toast.error(error || "Tạo khóa học thất bại!");
        return;
      }
      if (data?.type === "live") {
        setExits(true);
        setnNotification({
          onConfirm: () => navigate(`/create-class/${result.result._id}`),
          onCancel: () => navigate("/courses-all"),
        });
        return;
      }
      toast.success("Tạo khóa học mới thành công!");
      navigate("/courses-all");
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
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
      onConfirm={notification.onConfirm}
      onCancel={notification.onCancel}
      exits={exits}
    />
  );
};

export default CreateCourses;
