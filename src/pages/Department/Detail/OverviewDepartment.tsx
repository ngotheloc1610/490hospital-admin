import { Outlet } from "react-router-dom";

const OverviewDepartment = () => {
  return (
    <section className="overview">
      <Outlet />
    </section>
  );
};

export default OverviewDepartment;
