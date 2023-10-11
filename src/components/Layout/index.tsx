import { memo } from "react";

const Layout = ({ children }: any) => {
  return (
    <div className="mainbody-wrapper">
      <div className="mainbody-container">
        <div className="mainbody">
          <section className="loadcontent">{children}</section>
        </div>
      </div>
    </div>
  );
};
export default memo(Layout);
