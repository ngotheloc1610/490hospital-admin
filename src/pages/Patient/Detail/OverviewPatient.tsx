import { Outlet } from "react-router-dom";


const OverviewPatient = () => {
  return (
    <section className="overview">
      <Outlet />
    </section>
  );
};

export default OverviewPatient;
