import api from "../../../shared/api/axiosClient";

const GetInstructorBusinessDashboard = async () => {
  const res = await api.get("/instructor/dashboard/business");
  return res;
};

export { GetInstructorBusinessDashboard };
