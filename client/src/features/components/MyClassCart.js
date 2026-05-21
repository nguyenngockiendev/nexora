import {
  CButton,
  CCard,
  CCardBody,
  CCol,
  CForm,
  CFormInput,
  CFormSelect,
  CInputGroup,
  CInputGroupText,
  CRow,
} from "@coreui/react";
import CIcon from "@coreui/icons-react";
import { cilLockLocked, cilUser } from "@coreui/icons";

import "react-toastify/dist/ReactToastify.css";
import { Link } from "react-router-dom";

const MyClassCart = ({
  classs,
  loading,
  error,
  handchangesStatus,
  notification,
  setSearch,
  setFiler,
  setFilterday
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
      <CRow>
        {classs?.map((item) => (
          <CCol md={6} lg={4} className="mb-4" key={item._id}>
            <CCard
              className="h-100 border-0"
              style={{
                borderRadius: "18px",
                boxShadow: "0 4px 16px rgba(0,0,0,0.08)",
              }}
            >
              <CCardBody className="d-flex flex-column">
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
                  <Link to={`/live/class/${item._id}/item`}>
                    {" "}
                    <CButton size="sm" color="primary">
                      Detail
                    </CButton>
                  </Link>

                  <Link
                    to={`/update-class/${item?._id}`}
                    state={{ data: item }}
                  >
                    {" "}
                    <CButton size="sm" color="light">
                      Edit
                    </CButton>{" "}
                  </Link>

                  <CButton size="sm" color="info">
                    Students
                  </CButton>

                  <CButton
                    size="sm"
                    color="warning"
                    onClick={(e) =>
                      handchangesStatus(
                        item._id,
                        item.status === "closed" ? "open" : "closed",
                      )
                    }
                  >
                    {item.status === "closed" ? "open" : "closed"}
                  </CButton>

                  <CButton size="sm" color="danger">
                    Delete
                  </CButton>
                  <Link to={item?.meetingLink}>
                    {" "}
                    <CButton size="sm" color="success">
                      Metting Link
                    </CButton>
                  </Link>
                </div>
              </CCardBody>
            </CCard>
          </CCol>
        ))}
      </CRow>

      {/* Empty State */}
      <div className="text-center py-5">
        <h4 className="fw-bold">No Classes Yet</h4>

        <p className="text-medium-emphasis">
          Start creating your first live class
        </p>

        <CButton color="success">Create New Class</CButton>
      </div>
    </>
  );
};
export default MyClassCart;
