import "react-toastify/dist/ReactToastify.css";
import { Link } from "react-router-dom";
import { Button, Card, CardBody, Col, Row } from "react-bootstrap";

const MyClassCart = ({
  classs,
  // loading,
  // error,
  handchangesStatus,
  // notification,
  setSearch,
  setFiler,
  setFilterday,
}) => {
  return (
    <>
      {/* Header */}
      <div className="d-flex justify-content-between align-items-center flex-wrap gap-3 mb-4">
        <div>
          <h2 className="fw-bold mb-1">My Live Classes</h2>

          <p className="text-medium-emphasis mb-0">
            Manage your created live classes
          </p>
        </div>

        {/* Search + Filter */}
        <div className="d-flex gap-2 flex-wrap">
          <input
            type="text"
            placeholder="Search class..."
            className="form-control"
            style={{
              width: "220px",
              borderRadius: "10px",
            }}
            onChange={(e) => setSearch(e.target.value)}
          />

          <select
            className="form-select"
            style={{
              width: "160px",
              borderRadius: "10px",
            }}
            onChange={(e) => setFiler(e.target.value)}
          >
            <option value="All Status">All Status</option>
            <option value="open">Open</option>
            <option value="closed">Closed</option>
            <option value="upcoming">Upcoming</option>
          </select>

          <select
            className="form-select"
            style={{
              width: "160px",
              borderRadius: "10px",
            }}
            onChange={(e) => setFilterday(e.target.value)}
          >
            <option value="All Day">All Day</option>
            <option value="Monday">Monday</option>
            <option value="Tuesday">Tuesday</option>
            <option value="Wednesday">Wednesday</option>
            <option value="Thursday">Thursday</option>
            <option value="Friday">Friday</option>
            <option value="Saturday">Saturday</option>
            <option value="Sunday">Sunday</option>
          </select>
        </div>
      </div>

      {/* Class Cards */}
      <Row>
        {classs?.map((item) => (
          <Col md={6} lg={4} className="mb-4" key={item._id}>
            <Card
              className="h-100 border-0"
              style={{
                borderRadius: "18px",
                boxShadow: "0 4px 16px rgba(0,0,0,0.08)",
              }}
            >
              <CardBody className="d-flex flex-column">
                {/* Top */}
                <div className="d-flex justify-content-between align-items-start mb-3">
                  <div>
                    <h5 className="fw-bold mb-1">{item.className}</h5>

                    <p
                      className="text-medium-emphasis mb-0"
                      style={{
                        fontSize: "0.9rem",
                      }}
                    >
                      {item.description}
                    </p>
                  </div>

                  <span className="badge bg-success">{item.status}</span>
                </div>

                {/* Students */}
                <div className="mb-3">
                  <div className="d-flex justify-content-between small mb-1">
                    <span>Students</span>

                    <span>
                      {item.currentStudents}/{item.maxStudents}
                    </span>
                  </div>

                  <div
                    className="progress"
                    style={{
                      height: "8px",
                    }}
                  >
                    <div
                      className="progress-bar"
                      style={{
                        width: "40%",
                      }}
                    ></div>
                  </div>
                </div>

                {/* Info */}
                <div
                  className="small text-medium-emphasis mb-4"
                  style={{
                    lineHeight: "1.8",
                  }}
                >
                  <div>📅 Start: {item.startDate}</div>

                  <div>⏳ Register Deadline: {item.registerDeadline}</div>

                  <div>
                    🗓 Schedule: {item.schedule.day} {item.schedule.startTime} -{" "}
                    {item.schedule.endTime}
                  </div>
                </div>

                {/* Actions */}
                <div className="mt-auto d-flex flex-wrap gap-2">
                  <Link to={`live/class/${item._id}/item`}>
                    {" "}
                    <Button size="sm" color="primary">
                      Detail
                    </Button>
                  </Link>

                  <Link
                    to={`update-class/${item?._id}`}
                    state={{ data: item }}
                  >
                    {" "}
                    <Button size="sm" color="light">
                      Edit
                    </Button>{" "}
                  </Link>

                  <Button size="sm" color="info">
                    Students
                  </Button>

                  <Button
                    size="sm"
                    color="warning"
                    onClick={() =>
                      handchangesStatus(
                        item._id,
                        item.status === "closed" ? "open" : "closed",
                      )
                    }
                  >
                    {item.status === "closed" ? "open" : "closed"}
                  </Button>

                  <Button size="sm" color="danger">
                    Delete
                  </Button>
                  <Link to={item?.meetingLink}>
                    {" "}
                    <Button size="sm" color="success">
                      Metting Link
                    </Button>
                  </Link>
                </div>
              </CardBody>
            </Card>
          </Col>
        ))}
      </Row>

      {/* Empty State */}
      <div className="text-center py-5">
        <h4 className="fw-bold">No Classes Yet</h4>

        <p className="text-medium-emphasis">
          Start creating your first live class
        </p>

        <Button color="success">Create New Class</Button>
      </div>
    </>
  );
};
export default MyClassCart;
