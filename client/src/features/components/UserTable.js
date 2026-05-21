import {
  CBadge,
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
  CTable,
  CTableBody,
  CTableDataCell,
  CTableHead,
  CTableHeaderCell,
  CTableRow,
} from "@coreui/react";
import CIcon from "@coreui/icons-react";
import { cilLockLocked, cilUser } from "@coreui/icons";

import "react-toastify/dist/ReactToastify.css";
import { Link } from "react-router-dom";

const UserTable = ({ user, error, loading }) => {
  return (
    <div className="p-4" style={{ background: "#f8f9fa", minHeight: "100vh" }}>
      {/* HEADER */}
      <div className="d-flex justify-content-between align-items-center mb-4 flex-wrap gap-3">
        <div>
          <h3 className="fw-bold mb-1">User Management</h3>
          <div className="text-medium-emphasis">
            Manage all students and instructors
          </div>
        </div>

        {/* SEARCH */}
      </div>

      <div className="d-flex justify-content-between align-items-center mb-4 flex-wrap gap-3">
        {/* LEFT */}
        <div className="d-flex gap-2 flex-wrap">
          <CButton color="dark">All Users</CButton>

          {/* ROLE TOGGLE */}
          <CButton color="primary">Student</CButton>

          {/* STATUS */}
          <CFormSelect style={{ width: "170px" }}>
            <option value="">All Status</option>
            <option value="active">Active</option>
            <option value="inactive">Banned</option>
          </CFormSelect>
        </div>

        {/* RIGHT SEARCH */}
        <CInputGroup style={{ width: "320px" }}>
          <CFormInput placeholder="Search name or email..." />
          <CButton color="primary">Search</CButton>
        </CInputGroup>
      </div>

      {/* TABLE */}
      <CCard className="border-0 shadow-sm" style={{ borderRadius: "16px" }}>
        <CCardBody>
          <CTable hover responsive align="middle">
            <CTableHead>
              <CTableRow>
                <CTableHeaderCell>User</CTableHeaderCell>
                <CTableHeaderCell>Email</CTableHeaderCell>
                <CTableHeaderCell>Role</CTableHeaderCell>
                <CTableHeaderCell>Status</CTableHeaderCell>
                <CTableHeaderCell>Created</CTableHeaderCell>
                <CTableHeaderCell className="text-center">
                  Actions
                </CTableHeaderCell>
              </CTableRow>
            </CTableHead>

            <CTableBody>
              {user.map((item) => (
                <CTableRow key={item._id}>
                  {/* USER */}
                  <CTableDataCell>
                    <div className="d-flex align-items-center gap-3">
                      <img
                        src={item?.avatar}
                        alt="avatar"
                        style={{
                          width: 45,
                          height: 45,
                          borderRadius: "50%",
                          objectFit: "cover",
                        }}
                      />

                      <div>
                        <div className="fw-bold">User {item?.name}</div>
                        <div className="text-medium-emphasis small">ID:</div>
                      </div>
                    </div>
                  </CTableDataCell>

                  {/* EMAIL */}
                  <CTableDataCell>{item?.email}</CTableDataCell>

                  {/* ROLE */}
                  <CTableDataCell>
                    {item.role === "admin" ? (
                      <CBadge color="danger">admin</CBadge>
                    ) : item.role === "student" ? (
                      <CBadge color="secondary">Student</CBadge>
                    ) : (
                      <CBadge color="info">intructor</CBadge>
                    )}
                  </CTableDataCell>
 
                  {/* STATUS */}
                  <CTableDataCell>
                    {item.status === "active" ? (
                      <CBadge color="success">Active</CBadge>
                    ) : (
                      <CBadge color="danger">Banned</CBadge>
                    )}
                  </CTableDataCell>

                  {/* DATE */}
                  <CTableDataCell>{item?.createdAt}</CTableDataCell>

                  {/* ACTIONS */}
                  <CTableDataCell className="text-center">
                    <div className="d-flex gap-2 justify-content-center flex-wrap">
                      <CButton size="sm" color="primary">
                        View
                      </CButton>

                      <CButton size="sm" color="warning">
                        Edit
                      </CButton>

                      <CButton size="sm" color="danger">
                        Ban
                      </CButton>
                    </div>
                  </CTableDataCell>
                </CTableRow>
              ))}
            </CTableBody>
          </CTable>
        </CCardBody>
      </CCard>
    </div>
  );
};
export default UserTable;
