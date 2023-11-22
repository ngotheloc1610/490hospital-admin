import { Form, Formik } from "formik";
import * as Yup from "yup";
import Layout from "../../components/Layout";

const validationSchema = Yup.object().shape({
   
  });
  
  const defaultValue = {
   
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
            <div className="container">
             
            </div>
          </Form>
        </>
      )}
    </Formik>
    </Layout>
  );
};

export default Setting
