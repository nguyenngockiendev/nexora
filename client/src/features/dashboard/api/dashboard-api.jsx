import api from "../../../shared/api/axiosClient";

const GetInstructorBusinessDashboard = async () => {
  const res = await api.get("/instructor/dashboard/business");
  return res;
};

const GetUserInformation = async () => {
  const res = await api.get("/user/information");
  return res;
};
const Getrecentlesson = async () => {
  const res = await api.get("/user_recentlesson");
  return res;
};
const DashboartforStudent = async () => {
  const res = await api.get("/Student_Dashboart");
  return res;
};
export {
  GetInstructorBusinessDashboard,
  GetUserInformation,
  Getrecentlesson,
  DashboartforStudent,
};
