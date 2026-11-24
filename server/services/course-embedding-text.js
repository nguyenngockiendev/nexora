const buildCourseText = (course, lessons) => {
  const levels = {
    beginner: "Cơ bản",
    intermediate: "Trung cấp",
    advanced: "Nâng cao",
  };
  const types = {
    recorded: "Video tự học",
    live: "Lớp trực tuyến",
    free: "Miễn phí",
  };
  const lines = [
    `Tên khóa học: ${course.title.trim()}`,
    course.description?.trim() && `Mô tả: ${course.description.trim()}`,
    course.level && `Trình độ: ${levels[course.level] || course.level}`,
    course.type && `Hình thức: ${types[course.type] || course.type}`,
  ].filter(Boolean);
  const sorted = [...lessons].sort(
    (a, b) => a.order - b.order || String(a._id).localeCompare(String(b._id)),
  );
  if (sorted.length) {
    lines.push("Các bài học:");
    sorted.forEach((lesson, index) => {
      if (lesson.title?.trim())
        lines.push(`${index + 1}. ${lesson.title.trim()}`);
      if (lesson.content?.trim())
        lines.push(`Mô tả bài: ${lesson.content.trim()}`);
    });
  }
  return lines.join("\n");
};

module.exports = { buildCourseText };
