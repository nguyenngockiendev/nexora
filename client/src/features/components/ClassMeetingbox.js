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


const ClassRoom = ({classs,error,loading}) => {
  return (
  <div
    className="p-4"
    style={{
      background: "#f8f9fa",
      minHeight: "100vh",
    }}
  >
    {/* HEADER */}
    <div className="d-flex justify-content-between align-items-start flex-wrap gap-3 mb-4">
      
      <div>
        <h2 className="fw-bold mb-1">
          React Bootcamp - Live Class
        </h2>

        <p className="text-medium-emphasis mb-0">
          You are currently enrolled in this class
        </p>
      </div>

      {/* JOIN BUTTON */}
      <CButton
        color="success"
        size="lg"
        style={{
          borderRadius: "12px",
          padding: "10px 18px",
        }}
        onClick={() =>
          window.open(classs?.meetingLink, "_blank")
        }
      >
        🎥 Join Google Meet
      </CButton>
    </div>

    <CRow>
      
      {/* LEFT SIDE */}
      <CCol md={8}>
        
        {/* TEACHER CARD */}
        <CCard className="mb-4 border-0 shadow-sm">
          <CCardBody>
            <div className="d-flex align-items-center gap-3">
              
              <img
                src={classs?.instructorId?.avatar}
                alt="teacher"
                style={{
                  width: 70,
                  height: 70,
                  borderRadius: "50%",
                  objectFit: "cover",
                }}
              />

              <div>
                <h5 className="mb-1 fw-bold">
                  {classs?.instructorId?.name}
                </h5>

                <p className="mb-0 text-medium-emphasis">
                  Senior React Developer • 8 years experience
                </p>
              </div>
            </div>
          </CCardBody>
        </CCard>

        {/* CLASS INFO */}
        <CCard className="mb-4 border-0 shadow-sm">
          <CCardBody>
            <h5 className="fw-bold mb-3">
              {classs?.className}
            </h5>

            <div className="row">
              
              <div className="col-md-6 mb-3">
                <div className="text-medium-emphasis">
                  Status
                </div>

                <span className="badge bg-success">
                  {classs?.status}
                </span>
              </div>

              <div className="col-md-6 mb-3">
                <div className="text-medium-emphasis">
                  Students
                </div>

                <div className="fw-semibold">
                 {classs?.currentStudents} / {classs?.maxStudents}
                </div>
              </div>

              <div className="col-md-6 mb-3">
                <div className="text-medium-emphasis">
                  Start Date
                </div>

                <div className="fw-semibold">
                 {classs?.startDate}
                </div>
              </div>

              <div className="col-md-6 mb-3">
                <div className="text-medium-emphasis">
                  End Date
                </div>

                <div className="fw-semibold">
                  {classs?.endDate}
                </div>
              </div>
            </div>
          </CCardBody>
        </CCard>

        {/* MATERIALS (PLACEHOLDER) */}
        <CCard className="border-0 shadow-sm">
          <CCardBody>
            <h5 className="fw-bold mb-3">
              Class Materials
            </h5>

            <div className="d-flex flex-column gap-2">
              <div className="p-3 border rounded">
                📄 React Basics Notes.pdf
              </div>

              <div className="p-3 border rounded">
                📄 Homework Assignment #1
              </div>

              <div className="p-3 border rounded">
                🎥 Recording Session 1 (coming soon)
              </div>
            </div>
          </CCardBody>
        </CCard>
      </CCol>

      {/* RIGHT SIDE */}
      <CCol md={4}>
        
        {/* SCHEDULE */}
        <CCard className="mb-4 border-0 shadow-sm">
          <CCardBody>
            <h5 className="fw-bold mb-3">
              Weekly Schedule
            </h5>

            <div className="d-flex flex-column gap-3">
              
              <div className="p-3 border rounded">
                <div className="fw-semibold">
                 {classs?.schedule?.day}
                </div>

                <div className="text-medium-emphasis">
                {classs?.schedule?.startTime}-{classs?.schedule?.endTime}
                </div>
              </div>

            </div>
          </CCardBody>
        </CCard>

        {/* NEXT SESSION */}
        <CCard className="mb-4 border-0 shadow-sm">
          <CCardBody>
            <h5 className="fw-bold mb-3">
              Next Session
            </h5>

            <div className="p-3 bg-light rounded">
              <div className="fw-semibold">
                Monday Session
              </div>

              <div className="text-medium-emphasis">
                19:00 Today
              </div>

              <CButton
                color="primary"
                size="sm"
                className="mt-2"
                onClick={() =>
                  window.open("https://meet.google.com/fake-link", "_blank")
                }
              >
                Join Now
              </CButton>
            </div>
          </CCardBody>
        </CCard>

        {/* QUICK INFO */}
        <CCard className="border-0 shadow-sm">
          <CCardBody>
            <h5 className="fw-bold mb-3">
              Quick Info
            </h5>

            <div className="small text-medium-emphasis">
              • Live interactive class  
              <br />
              • Real-time Q&A  
              <br />
              • Recording available after session  
              <br />
              • Certificate on completion  
            </div>
          </CCardBody>
        </CCard>
      </CCol>
    </CRow>
  </div>
);
};
export default ClassRoom;
