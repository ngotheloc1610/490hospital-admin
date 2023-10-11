import { memo } from "react";

import { MenuDataDoctor } from "../../../constants";
import MenuHeader from "../../../components/common/MenuHeader";

const DetailDoctor = () => {
  return (
    <MenuHeader menuData={MenuDataDoctor} />
  );
};

export default memo(DetailDoctor);
