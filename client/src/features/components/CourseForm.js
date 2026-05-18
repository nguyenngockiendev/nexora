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

const CoursesForm = ({
  courses,
  error,
  loading,
  payment,
  errorPayment,
  paymentloading,
  messagepayment,
  setSearch,
  setFilter,
  role,
  navigate,
}) => {
  return (
    <>
      {/* Header */}
      <div className="d-flex justify-content-between align-items-center flex-wrap gap-3 mb-4">
        <div>
          <h2 className="fw-bold mb-1">Explore Courses</h2>
          <p className="text-medium-emphasis mb-0">
            Discover and purchase your favorite courses
          </p>
        </div>

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
            <option value="beginner">beginner</option>
            <option value="intermediate">intermediate</option>
            <option value="advanced">advanced</option>
          </select>
        </div>
      </div>

      {/* Payment Message */}
      {messagepayment && (
        <div className="alert alert-success">{messagepayment}</div>
      )}

      {errorPayment && <div className="alert alert-danger">{errorPayment}</div>}

      {/* Course Cards */}
      <CRow>
        {courses?.map((cou) => (
          <CCol md={6} lg={4} xl={3} key={cou._id} className="mb-4">
            <CCard
              className="h-100 border-0 overflow-hidden"
              style={{
                borderRadius: "16px",
                boxShadow: "0 4px 16px rgba(0,0,0,0.08)",
                transition: "0.3s",
              }}
            >
              {/* Thumbnail */}
              <div
                style={{
                  overflow: "hidden",
                }}
              >
                <CCardImage
                  orientation="top"
                  src={cou?.thumbnail}
                  style={{
                    height: "200px",
                    objectFit: "cover",
                  }}
                />
                <span
                  className="badge bg-primary"
                  style={{
                    position: "absolute",
                    top: "10px",
                    right: "10px",
                  }}
                >
                  {cou?.type === "live" ? "Live" : "Recorded"}
                </span>
              </div>

              <CCardBody className="d-flex flex-column">
                {/* Title */}
                <CCardTitle
                  className="fw-semibold mb-2"
                  style={{
                    fontSize: "1.05rem",
                    minHeight: "50px",
                  }}
                >
                  {cou?.title}
                </CCardTitle>

                {/* Description */}
                <CCardText
                  className="text-medium-emphasis"
                  style={{
                    fontSize: "0.92rem",
                    minHeight: "70px",
                    overflow: "hidden",
                  }}
                >
                  {cou?.description}
                </CCardText>

                {/* Footer */}
                <div className="mt-auto">
                  <div className="d-flex justify-content-between align-items-center mb-3">
                    {/* Price */}
                    <span
                      className="fw-bold"
                      style={{
                        color: "#321fdb",
                        fontSize: "1.1rem",
                      }}
                    >
                      {Number(cou?.price).toLocaleString("vi-VN")} ₫
                    </span>
                  </div>

                  {/* Buttons */}
                  <div className="d-flex gap-2">
                    {role === "student" && cou?.type !== "live" && (
                      <Link
                        to={`/details_course/${cou._id}`}
                        className="flex-grow-1"
                      >
                        <CButton size="sm" color="light" className="w-100">
                          View
                        </CButton>
                      </Link>
                    )}

                    {role !== "student" && cou.type === "live" && (
                      <CButton
                        size="sm"
                        color="primary"
                        className="flex-grow-1"
                        onClick={() => navigate(`/create-class/${cou._id}`)}
                      >
                        Create Class
                      </CButton>
                    )}
                    {role === "student" && (
                      <CButton
                        size="sm"
                        color="primary"
                        className="flex-grow-1"
                        onClick={() => {
                          if (role === "student") {
                            if (cou?.type === "recorded") {
                              payment(cou?._id, {type: cou?.type});
                            }
                            if (cou?.type === "live") {
                              navigate(`/course-class-details/${cou._id}`);
                            }
                          }
                        }}
                      >
                        {paymentloading
                          ? "Processing..."
                          : cou.type === "live"
                            ? "Class Information"
                            : "Buy now"}
                      </CButton>
                    )}
                  </div>
                </div>
              </CCardBody>
            </CCard>
          </CCol>
        ))}
      </CRow>

      {/* Empty State */}
      {!loading && courses?.length === 0 && (
        <div className="text-center py-5">
          <h4>No courses found</h4>
          <p className="text-medium-emphasis">Try searching another keyword</p>
        </div>
      )}
    </>
  );
};
export default CoursesForm;
