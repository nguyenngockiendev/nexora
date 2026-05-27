import { Button } from "react-bootstrap";
import { Link } from "react-router-dom";

const LessionForm = ({
  currentLesson,
  handDelete,
  errorlession,
  loadinglession,
  role,
}) => {
  if (!currentLesson) {
    return <div>Vui lòng chọn bài học</div>;
  }

  // const conten = currentLesson?.resources;

  return (
    <div
      style={{
        flex: 1,
        padding: "24px",
        background: "#f8f9fa",
        minHeight: "100vh",
      }}
    >
      {!currentLesson ? (
        <div
          className="d-flex justify-content-center align-items-center"
          style={{
            height: "70vh",
          }}
        >
          <div className="text-center">
            <h4 className="fw-bold mb-2 " style={{ color: "rebeccapurple" }}>
              No Lesson Selected
            </h4>

            <p
              className="text-medium-emphasis"
              style={{ color: "rebeccapurple" }}
            >
              Please select a lesson from sidebar
            </p>
          </div>
        </div>
      ) : (
        <>
          {/* Header */}
          <div
            className="bg-white p-4 mb-4"
            style={{
              borderRadius: "18px",
              boxShadow: "0 2px 10px rgba(0,0,0,0.05)",
            }}
          >
            <div className="d-flex justify-content-between align-items-start flex-wrap gap-3">
              <div>
                <h2 className="fw-bold mb-2" style={{color: "rebeccapurple" }}>{currentLesson?.content}</h2>

                {currentLesson?.isPreview && (
                  <span
                    className="badge bg-success"
                    style={{
                      padding: "8px 12px",
                      borderRadius: "10px",
                    }}
                  >
                    Preview Lesson
                  </span>
                )}
              </div>

              {/* Actions */}
              {role !== "student" && (
                <div className="d-flex gap-2">
                  <Link to={`/update_lession/${currentLesson._id}`}>
                    <Button color="primary" style={{color:"rebeccapurple"}}>Update Lesson</Button>
                  </Link>

                  <Button
                    color="danger"
                    onClick={() => handDelete(currentLesson._id)}
                    disabled={loadinglession}
                  >
                    {loadinglession ? "Deleting..." : "Delete Lesson"}
                  </Button>
                </div>
              )}
            </div>
          </div>

          {/* Video Section */}
          <div
            className="bg-white p-4 mb-4"
            style={{
              borderRadius: "18px",
              boxShadow: "0 2px 10px rgba(0,0,0,0.05)",
            }}
          >
            <h5 className="fw-bold mb-3">Lesson Video</h5>

            <div
              style={{
                overflow: "hidden",
                borderRadius: "14px",
              }}
            >
              <iframe
                width="100%"
                height="500"
                src={currentLesson?.videoUrl}
                title="Video"
                allowFullScreen
                style={{
                  border: "none",
                }}
              />
            </div>
          </div>

          {/* Resources */}
          <div
            className="bg-white p-4"
            style={{
              borderRadius: "18px",
              boxShadow: "0 2px 10px rgba(0,0,0,0.05)",
            }}
          >
            <div className="d-flex justify-content-between align-items-center mb-4">
              <h5 className="fw-bold mb-0" style={{color:"rebeccapurple"}}>Lesson Resources</h5>

              <span className="badge bg-light text-dark">
                {currentLesson?.resources?.length || 0} Files
              </span>
            </div>

            {currentLesson?.resources?.length > 0 ? (
              currentLesson?.resources?.map((src) => {
                return (
                  <div
                    key={src.id}
                    className="d-flex justify-content-between align-items-center p-3 mb-3"
                    style={{
                      border: "1px solid #e9ecef",
                      borderRadius: "14px",
                      background: "#fafafa",
                    }}
                  >
                    {/* Left */}
                    <div className="d-flex align-items-center gap-3">
                      <div
                        style={{
                          width: "48px",
                          height: "48px",
                          borderRadius: "12px",
                          background: "#f4f3ff",
                          display: "flex",
                          justifyContent: "center",
                          alignItems: "center",
                          fontSize: "1.3rem",
                          color:"rebeccapurple"
                        }}
                      >
                        📄
                      </div>

                      <div>
                        <div className="fw-semibold" style={{color:"rebeccapurple"}}>{src?.title}</div>

                        <div
                          className="text-medium-emphasis"
                          style={{
                            fontSize: "0.85rem",
                            color:"rebeccapurple"
                          }}
                        >
                          PDF Resource
                        </div>
                      </div>
                    </div>

                    {/* Right */}
                    <a
                      href={src?.url}
                      download
                      style={{
                        textDecoration: "none",
                      }}
                    >
                      <Button size="sm" color="light">
                        Download
                      </Button>
                    </a>
                  </div>
                );
              })
            ) : (
              <div className="text-center py-4">
                <p className="text-medium-emphasis mb-0">
                  No resources available
                </p>
              </div>
            )}
          </div>

          {/* Error */}
          {errorlession && (
            <div className="alert alert-danger mt-4">{errorlession}</div>
          )}
        </>
      )}
    </div>
  );
};

export default LessionForm;
