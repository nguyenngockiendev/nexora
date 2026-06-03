import "react-toastify/dist/ReactToastify.css";

import { Button, Card, Col, Form, Row } from "react-bootstrap";

const ManageClass = ({ listCourseLive, error, loading,navigate}) => {
    console.log("course", listCourseLive)
  return (
    <div
      style={{
        background: "#f7f8fc",
        minHeight: "100vh",
        padding: "30px",
      }}
    >
      {/* HEADER */}
      <div className="d-flex justify-content-between align-items-center flex-wrap gap-3 mb-4">
        {error && (
          <div className="alert alert-danger">{error}</div>
        )}
        {loading && (
          <div>{loading}</div>
        )}
        <div>
          
          <h2 className="fw-bold mb-1">Manage Live Classes</h2>
          <p className="text-muted mb-0">
            Create and manage live class sessions from your courses
          </p>
        </div>

        {/* SEARCH */}
        <div style={{ width: "320px" }}>
          <Form.Control placeholder="Search live courses..." />
        </div>
      </div>

      {/* COURSE LIST */}
      <div className="d-flex flex-column gap-4">
        {listCourseLive?.map((item) => (
          <Card
            key={item._id}
            className="border-0 shadow-sm overflow-hidden"
            style={{
              borderRadius: "18px",
            }}
          >
            <Row className="g-0">
              {/* THUMBNAIL */}
              <Col md={3}>
                <img
                  src={item?.thumbnail}
                  alt="course"
                  style={{
                    width: "100%",
                    height: "100%",
                    minHeight: "220px",
                    objectFit: "cover",
                  }}
                />
              </Col>

              {/* CONTENT */}
              <Col md={9}>
                <Card.Body className="h-100 d-flex flex-column p-4">
                  {/* TOP */}
                  <div className="d-flex justify-content-between align-items-start flex-wrap gap-3">
                    <div>
                      <span
                        className="badge mb-3"
                        style={{
                          background: "#e8fff3",
                          color: "#198754",
                          fontWeight: 500,
                          padding: "8px 12px",
                          borderRadius: "10px",
                        }}
                      >
                        ● {item?.type}
                      </span>

                      <h4 className="fw-bold mb-2">{item?.title}</h4>

                      <p
                        className="text-muted mb-3"
                        style={{
                          maxWidth: "700px",
                        }}
                      >
                        {item?.description}
                      </p>
                    </div>

                    {/* CLASS COUNT */}
                    <div
                      style={{
                        background: "#f8f9fa",
                        padding: "14px 18px",
                        borderRadius: "14px",
                        minWidth: "120px",
                        textAlign: "center",
                      }}
                    >
                      <div
                        className="fw-bold"
                        style={{
                          fontSize: "22px",
                        }}
                      >
                        {item?.numberClass}
                      </div>

                      <small className="text-muted">Classes Created</small>
                    </div>
                  </div>

                  {/* INFO */}
                  <div className="d-flex gap-4 flex-wrap mt-2 mb-4">
                    <div>
                      <small className="text-muted d-block">Created Date</small>
                      <span className="fw-medium">12 May 2026</span>
                    </div>

                    <div>
                      <small className="text-muted d-block">Course Type</small>
                      <span className="fw-medium text-success">{item.type}</span>
                    </div>
                  </div>

                  {/* ACTIONS */}
                  <div className="mt-auto d-flex gap-2 flex-wrap">
                    <Button
                      variant="success"
                      style={{
                        borderRadius: "10px",
                        padding: "10px 16px",
                      }}
                      onClick={()=> navigate(`/courses/create/class/${item._id}`)}
                    >
                      Create Class
                    </Button>

                    <Button
                      variant="outline-primary"
                      style={{
                        borderRadius: "10px",
                        padding: "10px 16px",
                      }}
                      onClick={()=> navigate(`details/class/${item._id}`)}
                    >
                      Details Class
                    </Button>

                    <Button
                      variant="outline-dark"
                      style={{
                        borderRadius: "10px",
                        padding: "10px 16px",
                      }}
                    >
                      Edit Course
                    </Button>
                  </div>
                </Card.Body>
              </Col>
            </Row>
          </Card>
        ))}
      </div>
    </div>
  );
};
export default ManageClass;
