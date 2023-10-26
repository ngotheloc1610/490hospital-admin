import { Outlet } from "react-router-dom";

const OverviewStaff = () => {
  return (
    <section className="overview">
      <Outlet />
    </section>
  );
};

export default OverviewStaff;
