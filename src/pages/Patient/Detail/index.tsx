import { memo } from "react";
import { MenuDataPatient } from "../../../constants";
import MenuHeader from "../../../components/common/MenuHeader";

const DetailPatient = () => {

  return <MenuHeader menuData={MenuDataPatient} />;
};

export default memo(DetailPatient);
