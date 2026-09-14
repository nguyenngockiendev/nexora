import { useState, useRef, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { toast } from "react-toastify";
import SidebarLesson from "../components/LessionSibar";

import LessionForm from "../components/LessionForm";
import useSibarLession from "../hooks/useSibarLession";
import useDeleteLessionbyid from "../hooks/useDeletelession";
import useUpdatelession from "../hooks/useUpdatelession";
import useSaveProcess from "../../process/hooks/useSaveProcess";

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

  const { SaveUpdate, GetProcess, process, FetchAllProcess, allProcess } =
    useSaveProcess();
  const videoRef = useRef(null);
  const intervalRef = useRef(null);

  useEffect(() => {
    if (id) {
      FetchAllProcess(id);
    }
  }, [id]);

  useEffect(() => {
    if (currentLesson?._id) {
      GetProcess(currentLesson._id);
    }
  }, [currentLesson]);

  const handlePlay = () => {
    if (!videoRef.current || !currentLesson) return;
    if (intervalRef.current) return;
    intervalRef.current = setInterval(() => {
      SaveUpdate({
        lastPosition: videoRef.current.currentTime,
        lessonId: currentLesson._id,
        courseId: currentLesson.courseId || id,
      });
    }, 5000);
  };

  const handlePause = () => {
    if (!videoRef.current || !currentLesson) return;
    SaveUpdate({
      lastPosition: videoRef.current.currentTime,
      lessonId: currentLesson._id,
      courseId: currentLesson.courseId || id,
    });
    if (intervalRef.current) {
      clearInterval(intervalRef.current);
      intervalRef.current = null;
    }
  };

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

  // Auto-select first lesson when title loads if not already selected
  useEffect(() => {
    if (title && title.length > 0 && !currentLesson) {
      setCurrentLesson(title[0]);
    }
  }, [title, currentLesson]);

  const lessonList = title || [];
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

  return (
    <div className="flex flex-col lg:flex-row h-auto lg:h-[88vh] w-full bg-transparent rounded-[2rem] overflow-hidden gap-6 p-2">
      {/* ── Left Content (70%): Video + Actions + Tabs ── */}
      <main className="flex-1 h-full overflow-y-auto custom-scrollbar z-10 relative bg-white/70 backdrop-blur-3xl border border-white/90 rounded-[2rem] p-5 lg:p-7 shadow-sm">
        <LessionForm
          videoRef={videoRef}
          currentLesson={currentLesson}
          handDelete={handDelete}
          errorlession={errorlession}
          loadinglession={loadinglession}
          loadingupdate={loadingupdate}
          errorupdate={errorupdate}
          handUpdate={handUpdate}
          role={role}
          onplay={handlePlay}
          onpause={handlePause}
          process={process}
          onNextLesson={handleNextLesson}
          onPrevLesson={handlePrevLesson}
          hasNext={hasNext}
          hasPrev={hasPrev}
          totalLessons={lessonList.length}
          currentIndex={currentIndex}
        />
      </main>

      {/* ── Right Sidebar (30%): Syllabus Playlist ── */}
      <aside className="w-full lg:w-[360px] xl:w-[390px] flex-shrink-0 h-[560px] lg:h-full bg-white/70 backdrop-blur-3xl border border-white/90 rounded-[2rem] shadow-sm z-20 overflow-hidden flex flex-col">
        <SidebarLesson
          loading={loading}
          error={error}
          title={title}
          currentLesson={currentLesson}
          setCurrentLesson={setCurrentLesson}
          id={id}
          role={role}
          allProcess={allProcess}
        />
      </aside>
    </div>
  );
};

export default Lession;
