import { Form, Formik } from "formik";
import * as Yup from "yup";
import Layout from "../../components/Layout";

const validationSchema = Yup.object().shape({
    name: Yup.string().min(3).required("Required"),
    dateOfBirth: Yup.string().required("Required"),
    gender: Yup.string().required("Required"),
    address: Yup.string().required("Required"),
    city: Yup.string().required("Required"),
    // phoneNumber: Yup.number()
    //   .positive("A phone number can't start with a minus")
    //   .integer("A phone number can't include a decimal point")
    //   .min(10)
    //   .max(11)
    //   .required("Required"),
    email: Yup.string().email().required("Required"),
  });
  
  const defaultValue = {
    id: "",
    name: "",
    dateOfBirth: "",
    gender: "",
    address: "",
    city: "",
    phoneNumber: "",
    email: "",
    photo: []
  };

const Setting = () => {

  return (
    <Layout>
      <Formik
      initialValues={defaultValue}
      enableReinitialize={true}
      validationSchema={validationSchema}
      onSubmit={(values, actions) => {
       
        actions.setSubmitting(false);
        actions.resetForm();
      }}
    >
      {({ errors, touched, submitForm }) => (
        <>
          <Form>
            <div className="overview-container">
             
            </div>
          </Form>
          <div className="mt-3 d-flex justify-content-end">
            
          </div>
        </>
      )}
    </Formik>
    </Layout>
  );
};

export default Setting
