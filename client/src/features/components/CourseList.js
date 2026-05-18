import {
  CButton,
  CCard,
  CCardBody,
  CCardImage,
  CCardText,
  CCardTitle,
  CCol,
  CRow,
} from "@coreui/react";

import { Link } from "react-router-dom";

const CourseList = ({ courses, error, loading, setFilter, setSearch }) => {
  return (
    <>
      {/* Header */}
      <div className="d-flex justify-content-between align-items-center mb-4 flex-wrap gap-3">
        <div>
          <h3 className="fw-bold mb-1">My Courses</h3>
          <p className="text-medium-emphasis mb-0">
            Continue your learning journey
          </p>
        </div>
        {loading && (
          <div className="text-center py-4">
            <p className="text-medium-emphasis">Loading lessons...</p>
          </div>
        )}
        {error && <div className="alert alert-danger mt-3">{error}</div>}
        {/* Search + Filter */}
        <div className="d-flex gap-2 flex-wrap">
          <input
            type="text"
            placeholder="Search courses..."
            className="form-control"
            style={{
              width: "240px",
              borderRadius: "10px",
            }}
            onChange={(e) => setSearch(e.target.value)}
          />

          <select
            className="form-select"
            style={{
              width: "180px",
              borderRadius: "10px",
            }}
            onChange={(e) => setFilter(e.target.value)}
          >
            <option value="All Courses">All Courses</option>
            <option value="buy">buy</option>
            <option value="paid">paid</option>
          </select>
        </div>
      </div>

      {/* Cards */}
      <CRow>
        {courses?.map((item) => (
          <CCol md={6} lg={4} xl={3} key={item._id} className="mb-4">
            <CCard className="h-100 border-0 shadow-sm overflow-hidden">
              {/* Thumbnail */}
              <div style={{ position: "relative" }}>
                <CCardImage
                  orientation="top"
                  src={item?.courseId?.thumbnail}
                  style={{
                    height: "180px",
                    objectFit: "cover",
                  }}
                />

                {/* Type Badge */}
                <span
                  className="badge bg-primary"
                  style={{
                    position: "absolute",
                    top: "10px",
                    right: "10px",
                  }}
                >
                  {item?.type === "live" ? "Live" : "recorded"}
                </span>
              </div>

              <CCardBody className="d-flex flex-column">
                {/* Title */}
                <CCardTitle
                  className="fw-semibold"
                  style={{
                    fontSize: "1rem",
                    minHeight: "48px",
                  }}
                >
                  {item?.courseId?.title}
                </CCardTitle>

                {/* Instructor */}
                <p className="text-medium-emphasis small mb-2">
                  {item?.instructor?.name}
                </p>

                {/* Progress */}
                <div className="mb-3">
                  <div className="d-flex justify-content-between small mb-1">
                    <span>Progress</span>
                    <span>45%</span>
                  </div>

                  <div className="progress" style={{ height: "8px" }}>
                    <div
                      className="progress-bar"
                      style={{ width: "45%" }}
                    ></div>
                  </div>
                </div>

                {/* Lesson Info */}
                <div className="small text-medium-emphasis mb-3">
                  <div>Lessons: 12 / 30 completed</div>

                  <div>Next: React Hooks</div>

                  <div>Last accessed: 2 days ago</div>
                </div>

                {/* Status */}
                <div className="mb-3">
                  <span className="badge bg-success">{item?.status}</span>
                </div>

                {/* Actions */}
                <div className="mt-auto d-flex justify-content-between align-items-center">
                  {item?.type === "recorded" && (
                    <Link to={`/courses/${item?.courseId?._id}/item`}>
                      <CButton size="sm" color="light">
                        Details
                      </CButton>
                    </Link>
                  )}
                   {item?.type === "live" && (
                    <Link to={`/live/class/${item?.classId}/item`}>
                      <CButton size="sm" color="light">
                        Join in Class
                      </CButton>
                    </Link>
                  )}

                  <CButton size="sm" color="primary">
                    Continue
                  </CButton>
                </div>
              </CCardBody>
            </CCard>
          </CCol>
        ))}
      </CRow>
    </>
  );
};
export default CourseList;
