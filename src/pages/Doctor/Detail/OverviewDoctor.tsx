import { Outlet } from "react-router-dom";

const OverviewDoctor = () => {
  return (
    <section className="overview">
      <Outlet />
    </section>
  );
};

export default OverviewDoctor;
