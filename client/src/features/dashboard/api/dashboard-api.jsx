import api from "../../../shared/api/axiosClient";

const GetInstructorBusinessDashboard = async () => {
  const res = await api.get("/instructor/dashboard/business");
  return res;
};

const GetUserInformation = async () => {
  const res = await api.get("/user/information");
  return res;
};
export { GetInstructorBusinessDashboard, GetUserInformation };
