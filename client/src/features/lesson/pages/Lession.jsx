import { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { toast } from "react-toastify";
import SidebarLesson from "../components/LessionSibar";

import LessionForm from "../components/LessionForm";
import useSibarLession from "../hooks/useSibarLession";
import useDeleteLessionbyid from "../hooks/useDeletelession";
import useUpdatelession from "../hooks/useUpdatelession";
// import { useRef } from "react";
// import useSaveProcess from "../../process/hooks/useSaveProcess";

const Lession = () => {
  const role = localStorage.getItem("role");

  const { id } = useParams();

  const { loading, error, title, setTitle } = useSibarLession(id);

  const { errorlession, loadinglession, Delete } = useDeleteLessionbyid();
  const {
    loading: loadingupdate,
    error: errorupdate,
    update,
  } = useUpdatelession();
  const navigate = useNavigate();
  const [currentLesson, setCurrentLesson] = useState(null);

  // const { SaveUpdate, exits } = useSaveProcess();
  // const videoRef = useRef(null);
  // const intervalRef = useRef(null);

  // console.log("currentLesson", currentLesson);
  // console.log(id);
  // const handduration = () => {
  //   if (videoRef.current) {
  //     const duration = videoRef.current.duration;
  //     console.log("Video duration:", duration, "seconds");
  //   }
  // };

  // const handlePlay = () => {
  //   if (!videoRef.current) return;
  //   if (intervalRef.current) return;
  //   console.log("Video is playing");
  //   intervalRef.current = setInterval(() => {
  //     SaveUpdate({
  //       lastPosition: videoRef.current.currentTime,
  //       lessonId: currentLesson._id,
  //       courseId: currentLesson.courseId,
  //     });
  //     console.log("đang lưu", videoRef.current.currentTime);
  //   }, 5000);
  // };
  // const handlePause = () => {
  //   if (!videoRef.current) return;
  //   console.log("Video is paused");
  //   SaveUpdate({
  //     lastPosition: videoRef.current.currentTime,
  //     lessionId: currentLesson._id,
  //     courseId: currentLesson.courseId,
  //   });
  //   clearInterval(intervalRef.current);
  //   intervalRef.current = null;
  // };

  const handUpdate = async (data) => {
    try {
      const result = await update(data);
      if (result) {
        toast.success(data.message || "update succsefully!");
        navigate(-1);
      }
    } catch (error) {
      console.log(error);
    }
  };

  const handDelete = async (id) => {
    try {
      await Delete(id);
      if (currentLesson._id === id) {
        setTitle((preve) =>
          preve.filter((titlesibar) => titlesibar._id !== id),
        );
        setCurrentLesson(null);
      }
      toast.success("Xóa bài học thành công");
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="flex h-screen w-full overflow-hidden">
      <aside className="w-[320px] shrink-0 overflow-hidden">
        <SidebarLesson
          loading={loading}
          error={error}
          title={title}
          currentLesson={currentLesson}
          setCurrentLesson={setCurrentLesson}
          id={id}
          role={role}
        />
      </aside>
      <main>
        {" "}
        <LessionForm
          // videoRef={videoRef}
          currentLesson={currentLesson}
          handDelete={handDelete}
          errorlession={errorlession}
          loadinglession={loadinglession}
          loadingupdate={loadingupdate}
          errorupdate={errorupdate}
          handUpdate={handUpdate}
          role={role}
          // handduration={handduration}
          // onplay={handlePlay}
          // onpause={handlePause}
          // handcurentime={handcurentime}
        />
      </main>
    </div>
  );
};

export default Lession;
