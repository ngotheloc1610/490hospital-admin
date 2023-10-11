import { memo } from "react";

import { MenuDataDepartment } from "../../../constants";
import MenuHeader from "../../../components/common/MenuHeader";

const DetailDepartment = () => {
  return (
    <MenuHeader menuData={MenuDataDepartment} />
  );
};

export default memo(DetailDepartment);
