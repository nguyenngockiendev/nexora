import { useNavigate, useParams } from "react-router-dom";

import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import useUpdatelession from "../hooks/useUpdatelession";
import UpdateLessonForm from "../components/UpdateLessonForm";
import { toast } from "react-toastify";
import useShareSocket from "../../../shared/hooks/useSocket";

const UpdateLessonPage = () => {
  const { lessionId } = useParams();
  const navigate = useNavigate();
  const { loading, error, update, lession, getLession } = useUpdatelession();
  const [video, Setvideo] = useState(null);
  const { register, handleSubmit, reset, setValue } = useForm();
  const [isuploading, setUploading] = useState(false);
  const [uploadPercent, setUploadPercent] = useState(0);
  const socket = useShareSocket();
  const [resource, setResource] = useState({
    type: "pdf",
    title: "",
    url: "",
  });

  useEffect(() => {
    getLession(lessionId);
  }, [lessionId]);
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
  useEffect(() => {
    if (lession)
      reset({
        title: lession.title,

        isPreview: lession.isPreview,
        status: lession.status,
        videoUrl: lession.videoUrl,
        content: lession.content,
        resources: lession.resources,
      });
  }, [lession]);

  const handleupdate = async (data) => {
    try {
      setUploading(true);
      setUploadPercent(0);
      const formData = new FormData();

      formData.append("resourcestype", resource.type);
      formData.append("resourcestitle", resource.title);
      formData.append("resourcesurl", resource.url);
      formData.append("title", data.title);

      formData.append("content", data.content);
      formData.append("video", video);
      formData.append("isPreview", data.isPreview);
      const statusVal =
        data.status === true ||
        data.status === "PROCESSING" ||
        data.status === "true"
          ? "PROCESSING"
          : "";
      formData.append("status", statusVal);
      const result = await update(lessionId, formData);

      if (result) {
        toast.success("update lesson successfully");
        navigate(-1);
      }
    } catch (error) {
      console.log(error);
    } finally {
      setUploading(false);
    }
  };

  return (
    <div className="w-full min-h-screen py-6 md:py-8">
      <UpdateLessonForm
        isuploading={isuploading}
        uploadPercent={uploadPercent}
        Setvideo={Setvideo}
        loading={loading}
        error={error}
        handleupdate={handleupdate}
        register={register}
        handleSubmit={handleSubmit}
        setResource={setResource}
        navigate={navigate}
        resource={resource}
        setValue={setValue}
        lession={lession}
      />
    </div>
  );
};

export default UpdateLessonPage;
