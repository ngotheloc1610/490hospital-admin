import { Outlet } from "react-router-dom";

interface IPropOverviewDepartment {}

const OverviewDepartment = (props: IPropOverviewDepartment) => {
  return (
    <section className="overview">
      <Outlet />
    </section>
  );
};

export default OverviewDepartment;
