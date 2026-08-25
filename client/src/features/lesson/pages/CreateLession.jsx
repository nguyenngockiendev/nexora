import { useNavigate, useParams } from "react-router-dom";
import { useForm } from "react-hook-form";
import { useState, useEffect } from "react";
import { toast } from "react-toastify";
import useCreateLession from "../hooks/useCreateLession";
import CreateLession from "../components/CreateLessionForm";
import useShareSocket from "../../../shared/hooks/useSocket";

const Createlession = () => {
  const { id } = useParams();
  const { error, Lession } = useCreateLession();
  const navigate = useNavigate();
  const { register, handleSubmit } = useForm();
  const [videoFile, setVideoFile] = useState(null);
  const [loading, setLoading] = useState(false);
  const [isuploading, setUploading] = useState(false);
  const [uploadPercent, setUploadPercent] = useState(0);
  const socket = useShareSocket();

  const [resource, setResource] = useState({
    type: "pdf",
    title: "",
    url: "",
  });

  useEffect(() => {
    if (!socket) return;
    const handleCloudProgress = (data) => {
      if (data && data.percent !== undefined) {
        setUploading(true);
        setUploadPercent(data.percent);
      }
    };
    socket.on("cloudProgress", handleCloudProgress);
    return () => {
      socket.off("cloudProgress", handleCloudProgress);
    };
  }, [socket]);

  const onSubmit = async (data) => {
    try {
      setLoading(true);
      setUploading(true);
      setUploadPercent(0);
      const formData = new FormData();
      formData.append("title", data.title);
      formData.append("isPreview", data.isPreview);
      formData.append("content", data.content);
      formData.append("videoUrl", videoFile);

      formData.append("status", data.status);
      formData.append("resourcestype", resource.type);
      formData.append("resourcestitle", resource.title);
      formData.append("resourcesurl", resource.url);

      formData.append("courseId", id);

      const result = await Lession(formData);
      if (result) {
        toast.success(error || "Create Lession successfully!");
        navigate(-1);
      }
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
      setUploading(false);
    }
  };

  return (
    <div className="w-full min-h-screen py-6 md:py-10 px-2 sm:px-4">
      <CreateLession
        navigate={navigate}
        register={register}
        handleSubmit={handleSubmit}
        onSubmit={onSubmit}
        resource={resource}
        setResource={setResource}
        setVideoFile={setVideoFile}
        loading={loading}
        isuploading={isuploading}
        uploadPercent={uploadPercent}
      />
    </div>
  );
};

export default Createlession;
