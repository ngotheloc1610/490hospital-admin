import { Outlet } from "react-router-dom";

const InformationPatient = () => {
  return (
    <section className="overview">
      <Outlet />
    </section>
  );
};

export default InformationPatient;
