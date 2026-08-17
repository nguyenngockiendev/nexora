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

  const { SaveUpdate, exits, GetProcess, process, FetchAllProcess, allProcess } =
    useSaveProcess();
  const videoRef = useRef(null);
  const intervalRef = useRef(null);

  // Fetch all processes for the course on mount
  useEffect(() => {
    if (courseId) {
      FetchAllProcess(courseId);
    }
  }, [courseId]);

  useEffect(() => {
    if (currentLesson) {
      GetProcess(currentLesson._id);
    }
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
    /* ── Compact 2-Card Layout (Vừa Vặn, Nhẹ Nhàng & Không Bị Phồng To) ── */
    <div className="flex flex-col lg:flex-row h-auto lg:h-[88vh] w-full bg-transparent rounded-[2rem] overflow-hidden gap-6">
      {/* ── Left Sidebar Glass Card (Ultra-Compact Sizing) ── */}
      <div className="w-full lg:w-[310px] xl:w-[340px] flex-shrink-0 h-[560px] lg:h-full bg-white/60 backdrop-blur-3xl border border-white/90 rounded-[2rem] shadow-sm z-20 overflow-hidden flex flex-col">
        <SidebarLesson
          loading={loading}
          error={error}
          title={enrollment}
          currentLesson={currentLesson}
          setCurrentLesson={setCurrentLesson}
          id={courseId}
          role={role}
          exits={exits}
          allProcess={allProcess}
        />
      </div>

      {/* ── Right Content Glass Card (Compact Sizing) ── */}
      <div className="flex-1 h-full overflow-y-auto custom-scrollbar z-10 relative bg-white/60 backdrop-blur-3xl border border-white/90 rounded-[2rem] p-6 lg:p-8 shadow-sm">
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
