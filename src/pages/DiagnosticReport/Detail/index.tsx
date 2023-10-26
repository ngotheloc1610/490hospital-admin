import { memo } from "react";

import { MenuDataDiagnostic } from "../../../constants";
import MenuHeader from "../../../components/common/MenuHeader";

const DetailDiagnostic = () => {
  return (
    <MenuHeader menuData={MenuDataDiagnostic} />
  );
};

export default memo(DetailDiagnostic);
