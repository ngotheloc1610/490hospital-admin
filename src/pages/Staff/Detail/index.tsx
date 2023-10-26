import { memo } from "react";

import { MenuDataStaff } from "../../../constants";
import MenuHeader from "../../../components/common/MenuHeader";

const DetailStaff = () => {
  return <MenuHeader menuData={MenuDataStaff} />;
};

export default memo(DetailStaff);
