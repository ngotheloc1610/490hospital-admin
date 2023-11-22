import Layout from "../../../components/Layout";
import MenuHeader from "../../../components/common/MenuHeader";
import { MenuDataAppointment } from "../../../constants";

const AppointmentBooked = () => {
    return (
        <Layout>
            <MenuHeader menuData={MenuDataAppointment} />
        </Layout>
    );
};

export default AppointmentBooked;
