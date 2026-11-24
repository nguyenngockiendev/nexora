import { useOutletContext, useParams } from "react-router-dom";
import { useState, useRef, useEffect } from "react";
import { useCourseEnrollments } from "../hooks/useCourseEnrollments";
import SidebarLesson from "../../lesson/components/LessionSibar";
import LessionForm from "../../lesson/components/LessionForm";
import useSaveProcess from "../../process/hooks/useSaveProcess";

const CourseEnrollments = () => {
  const { courseId, classId } = useParams();
  return <LessonPlayer key={classId || courseId} courseId={courseId} classId={classId} />;
};

const LessonPlayer = ({ courseId, classId }) => {
  const role = localStorage.getItem("role");
  const { assistantContextRef } = useOutletContext();
  const { enrollment, error, loading } = useCourseEnrollments(courseId, classId);
  const [currentLesson, setCurrentLesson] = useState(null);

  const { SaveUpdate, exits, GetProcess, FetchAllProcess, allProcess } =
    useSaveProcess();
  const videoRef = useRef(null);
  const intervalRef = useRef(null);

  useEffect(() => {
    const getContext = () => {
      const video = videoRef.current;
      if (!currentLesson?._id || !video || video.readyState < 1) return null;
      if (String(currentLesson.courseId || courseId) !== String(courseId)) return null;
      return {
        lessonId: currentLesson._id,
        lessonTitle: currentLesson.title,
        courseId,
        time: video.currentTime,
      };
    };
    assistantContextRef.current = getContext;
    return () => {
      if (assistantContextRef.current === getContext) assistantContextRef.current = null;
    };
  }, [currentLesson, courseId, assistantContextRef]);

  // Fetch all processes for the course on mount
  useEffect(() => {
    if (courseId) {
      FetchAllProcess(courseId, classId);
    }
  }, [courseId, classId]);

  const [resume, setResume] = useState(null);
  useEffect(() => {
    let active = true;
    if (currentLesson) GetProcess(currentLesson._id).then((progress) => {
      if (active) setResume({ lessonId: currentLesson._id, lastPosition: progress?.lastPosition || 0 });
    });
    return () => { active = false; };
  }, [currentLesson]);

  const handduration = () => {
    if (videoRef.current) {
      const duration = videoRef.current.duration;
      console.log("Video duration:", duration, "seconds");
    }
  };

  useEffect(() => () => {
    clearInterval(intervalRef.current);
    intervalRef.current = null;
  }, [currentLesson]);

  const handlePlay = () => {
    if (!videoRef.current || !currentLesson) return;
    if (intervalRef.current) return;
    console.log("Video is playing");
    intervalRef.current = setInterval(() => {
      if (!videoRef.current) return;
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

  // Auto-select first lesson when enrollment loads if not already selected
  useEffect(() => {
    if (enrollment && enrollment.length > 0 && !currentLesson) {
      setCurrentLesson(enrollment[0]);
    }
  }, [enrollment, currentLesson]);

  const lessonList = enrollment || [];
  const currentIndex = lessonList.findIndex(
    (l) => (l._id || l.id) === (currentLesson?._id || currentLesson?.id),
  );
  const hasPrev = currentIndex > 0;
  const hasNext = currentIndex >= 0 && currentIndex < lessonList.length - 1;

  const handleNextLesson = () => {
    if (hasNext) {
      setCurrentLesson(lessonList[currentIndex + 1]);
    }
  };

  const handlePrevLesson = () => {
    if (hasPrev) {
      setCurrentLesson(lessonList[currentIndex - 1]);
    }
  };

  if (error) return <p role="alert">{error}</p>;
  if (classId && !enrollment.length) return <p>{loading ? "Đang tải bài học…" : "Lớp chưa có bài học để xem."}</p>;

  return (
    /* ── Cinema 2-Column Layout (Video 70% Left, Syllabus 30% Right) ── */
    <div className="flex flex-col lg:flex-row h-auto lg:h-[88vh] w-full bg-transparent rounded-[2rem] overflow-hidden gap-6">
      {/* ── Left Content (70%): Video + Navigation Action Bar + Tabs ── */}
      <div className="flex-1 h-full overflow-y-auto custom-scrollbar z-10 relative bg-white/70 backdrop-blur-3xl border border-white/90 rounded-[2rem] p-5 lg:p-7 shadow-sm">
        <LessionForm
          videoRef={videoRef}
          currentLesson={resume?.lessonId === currentLesson?._id ? currentLesson : null}
          role={role}
          handduration={handduration}
          onplay={handlePlay}
          onpause={handlePause}
          process={resume}
          onNextLesson={handleNextLesson}
          onPrevLesson={handlePrevLesson}
          hasNext={hasNext}
          hasPrev={hasPrev}
          totalLessons={lessonList.length}
          currentIndex={currentIndex}
        />
      </div>

      {/* ── Right Sidebar (30%): Syllabus Playlist ── */}
      <div className="w-full lg:w-[360px] xl:w-[390px] flex-shrink-0 h-[560px] lg:h-full bg-white/70 backdrop-blur-3xl border border-white/90 rounded-[2rem] shadow-sm z-20 overflow-hidden flex flex-col">
        <SidebarLesson
          loading={loading}
          error={error}
          title={enrollment}
          currentLesson={currentLesson}
          setCurrentLesson={setCurrentLesson}
          id={courseId}
          classId={classId}
          role={role}
          exits={exits}
          allProcess={allProcess}
        />
      </div>
    </div>
  );
};

export default CourseEnrollments;
