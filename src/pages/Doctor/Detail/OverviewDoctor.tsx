import { Outlet } from "react-router-dom";

interface IPropOverviewDoctor {}

const OverviewDoctor = (props: IPropOverviewDoctor) => {
  return (
    <section className="overview">
      <Outlet />
    </section>
  );
};

export default OverviewDoctor;
