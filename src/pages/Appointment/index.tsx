import Layout from "../../components/Layout";
import MenuHeader from "../../components/common/MenuHeader";
import { MenuDataAppointment } from "../../constants";

const Appointment = () => {
    return (
        <Layout>
            <MenuHeader menuData={MenuDataAppointment} />
        </Layout>
    );
};

export default Appointment;
