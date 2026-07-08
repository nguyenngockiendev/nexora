


import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import { toast } from "react-toastify";
import CreateCourese from "../components/CreateCoursesForm";
import useCoursesService from "../hooks/useCreateCourses";

const CreateCourses = () => {
  const { register, handleSubmit } = useForm();
  const { error, Create } = useCoursesService();
  const [loading, setLoading] = useState(false);
  const [thumbail, setThumbnail] = useState(null);
  const [notification, setnNotification] = useState("");
  const [exits, setExits] = useState(false);

  const navigate = useNavigate();

  const onSubmit = async (data) => {
    try {
      setLoading(true);
      const formdata = new FormData();
      formdata.append("title", data.title);
      formdata.append("description", data.description);
      formdata.append("price", data.price);
      formdata.append("level", data.level);
      formdata.append("type", data.type);
      formdata.append("thumbnail", thumbail);
      const result = await Create(formdata);
      
      if (!result) {
        toast.error(error || "Failed to create course!");
        return;
      }
      if (data?.type === "live") {
        setExits(true);
        setnNotification({
          onConfirm: () => navigate(`/create-class/${result.result._id}`),
          onCancel: () => navigate("/courses"),
        });
        return;
      }
      toast.success("Create Courses successfully!");
      navigate("/courses");
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
      onSubmit={onSubmit}
      error={error}
      navigate={navigate}
      setThumbnail={setThumbnail}
      loading={loading}
      onConfirm={notification.onConfirm}
      onCancel={notification.onCancel}
      exits={exits}
    />
  );
};

export default CreateCourses;
