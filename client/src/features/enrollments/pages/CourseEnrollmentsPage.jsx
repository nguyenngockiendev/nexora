import { useParams } from "react-router-dom";
import { useState, useRef, useEffect } from "react";
import { useCourseEnrollments } from "../hooks/useCourseEnrollments";
import SidebarLesson from "../../lesson/components/LessionSibar";
import LessionForm from "../../lesson/components/LessionForm";
import useSaveProcess from "../../process/hooks/useSaveProcess";

const CourseEnrollments = () => {
  const role = localStorage.getItem("role");
  const { courseId } = useParams();
  const { enrollment, error, loading } = useCourseEnrollments(courseId);
  const [currentLesson, setCurrentLesson] = useState(null);

  const { SaveUpdate, exits, GetProcess, process } = useSaveProcess();
  const videoRef = useRef(null);
  const intervalRef = useRef(null);

  useEffect(() => {
    if (currentLesson) {
      GetProcess(currentLesson._id);
    }
    console.log("process", process);
  }, [currentLesson]);

  const handduration = () => {
    if (videoRef.current) {
      const duration = videoRef.current.duration;
      console.log("Video duration:", duration, "seconds");
    }
  };

  const handlePlay = () => {
    if (!videoRef.current) return;
    if (intervalRef.current) return;
    console.log("Video is playing");
    intervalRef.current = setInterval(() => {
      SaveUpdate({
        lastPosition: videoRef.current.currentTime,
        lessonId: currentLesson._id,
        courseId: currentLesson.courseId,
      });
      console.log("đang lưu", videoRef.current.currentTime);
    }, 5000);
  };

  const handlePause = () => {
    if (!videoRef.current) return;
    console.log("Video is paused");
    SaveUpdate({
      lastPosition: videoRef.current.currentTime,
      lessonId: currentLesson._id,
      courseId: currentLesson.courseId,
    });
    clearInterval(intervalRef.current);
    intervalRef.current = null;
  };

  return (
    <div className="flex flex-col lg:flex-row min-h-[85vh] w-full bg-transparent rounded-[2rem] overflow-hidden">
      
      {/* Sidebar Area */}
      <div className="w-full lg:w-[380px] xl:w-[420px] flex-shrink-0 bg-white/40 backdrop-blur-3xl border-r border-white/50 shadow-[10px_0_30px_rgba(0,0,0,0.02)] z-20 overflow-hidden">
        <SidebarLesson
          loading={loading}
          error={error}
          title={enrollment}
          currentLesson={currentLesson}
          setCurrentLesson={setCurrentLesson}
          id={courseId}
          role={role}
          exits={exits}
          process={process}
        />
      </div>

      {/* Main Content Area */}
      <div className="flex-1 h-full overflow-y-auto custom-scrollbar z-10 relative">
        <LessionForm
          videoRef={videoRef}
          currentLesson={currentLesson}
          role={role}
          handduration={handduration}
          onplay={handlePlay}
          onpause={handlePause}
          process={process}
        />
      </div>

    </div>
  );
};

export default CourseEnrollments;
