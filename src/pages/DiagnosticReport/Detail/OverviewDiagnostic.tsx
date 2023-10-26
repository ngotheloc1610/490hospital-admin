import { Outlet } from "react-router-dom";

const OverviewDiagnostic = () => {
  return (
    <section className="overview">
      <Outlet />
    </section>
  );
};

export default OverviewDiagnostic;
