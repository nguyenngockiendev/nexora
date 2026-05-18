import { CButton, CListGroup, CListGroupItem } from "@coreui/react";
import useSibarLession from "../hooks/useSibarLession";
import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";

const SidebarLesson = ({
  loading,
  error,
  title,
  currentLesson,
  setCurrentLesson,
  id,
  role,
}) => {
  const navigate = useNavigate();

  return (
    <div
      className="d-flex flex-column p-3"
      style={{
        height: "100vh",
        background: "#fff",
        borderRight: "1px solid #e9ecef",
        overflowY: "auto",
      }}
    >
      {/* Header */}
      <div className="mb-4">
        <h4 className="fw-bold mb-1">Course Lessons</h4>

        <p
          className="text-medium-emphasis mb-0"
          style={{ fontSize: "0.92rem" }}
        >
          Manage your lesson content
        </p>
      </div>

      {/* Action Buttons */}
      <div className="d-grid gap-2 mb-4">
        {role !== "student" && (
          <Link to={`/create_lession/${id}`}>
            <CButton
              color="success"
              className="w-100"
              style={{
                borderRadius: "10px",
              }}
            >
              + Create New Lesson
            </CButton>
          </Link>
        )}

        <CButton
          type="button"
          color="light"
          className="w-100"
          style={{
            borderRadius: "10px",
            border: "1px solid #dee2e6",
          }}
          onClick={() => navigate("/courses")}
        >
          ← Back To Courses
        </CButton>
        <Link to={``}>
          <CButton color="primary">Students Manager</CButton>
        </Link>
      </div>

      {/* Loading */}
      {loading && (
        <div className="text-center py-4">
          <p className="text-medium-emphasis">Loading lessons...</p>
        </div>
      )}

      {/* Error */}
      {error && <div className="alert alert-danger">{error}</div>}

      {/* Lesson Count */}
      {!loading && !error && (
        <div className="mb-3">
          <span
            className="badge bg-light text-dark"
            style={{
              border: "1px solid ",
              padding: "8px 12px",
              borderRadius: "8px",
            }}
          >
            {title?.length || 0} Lessons
          </span>
        </div>
      )}

      {/* Lesson List */}
      <div className="d-flex flex-column gap-3">
        {title?.map((titl, index) => {
          const isActive = currentLesson?._id === titl?._id;

          return (
            <div
              key={titl._id}
              onClick={() => setCurrentLesson(titl)}
              style={{
                cursor: "pointer",
                borderRadius: "14px",
                padding: "14px",
                border: isActive ? "2px solid #321fdb" : "1px solid #e9ecef",
                background: isActive ? "#f4f3ff" : "#fff",
                transition: "0.2s",
                boxShadow: isActive
                  ? "0 4px 14px rgba(50,31,219,0.12)"
                  : "0 2px 8px rgba(0,0,0,0.04)",
              }}
            >
              {/* Top */}
              <div className="d-flex justify-content-between align-items-start mb-2">
                <div>
                  <div
                    className="fw-semibold"
                    style={{
                      fontSize: "0.95rem",
                    }}
                  >
                    {index + 1}. {titl?.title}
                  </div>

                  <div
                    className="text-medium-emphasis"
                    style={{
                      fontSize: "0.82rem",
                    }}
                  >
                    {titl?.duration || "10 mins"}
                  </div>
                </div>

                {/* Preview Badge */}
                {titl?.isPreview && (
                  <span
                    className="badge bg-success"
                    style={{
                      borderRadius: "8px",
                      padding: "6px 8px",
                    }}
                  >
                    Preview
                  </span>
                )}
              </div>

              {/* Video */}
              <div
                className="text-medium-emphasis"
                style={{
                  fontSize: "0.8rem",
                  overflow: "hidden",
                  textOverflow: "ellipsis",
                  whiteSpace: "nowrap",
                }}
              >
                🎥 {titl?.video}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default SidebarLesson;
