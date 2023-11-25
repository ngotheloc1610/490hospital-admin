import { Field, FieldArray, Form, Formik } from "formik";
import * as Yup from "yup";
import Layout from "../../components/Layout";
import { useState } from "react";

const validationSchema = Yup.object().shape({

});

const defaultValue = {
  bloodPressure: [
    {
      alertName: "",
      alertSeverity: "",
      // rule: [
      //   {
      //     ruleName: "",
      //     threshold: "",
      //     timeRange: "",
      //   }
      // ]
    }
  ],
  bloodGlucose: [{
    alertName: "",
    alertSeverity: "",
    rule: [
      {
        ruleName: "",
        threshold: "",
        timeRange: "",
      }
    ]
  }],
  heartRate: [{
    alertName: "",
    alertSeverity: "",
    rule: [
      {
        ruleName: "",
        threshold: "",
        timeRange: "",
      }
    ]
  }],
  BMI: [
    {
      alertName: "",
      alertSeverity: "",
      rule: [
        {
          ruleName: "",
          threshold: "",
          timeRange: "",
        }
      ]
    }
  ],
  temperature: [{
    alertName: "",
    alertSeverity: "",
    rule: [
      {
        ruleName: "",
        threshold: "",
        timeRange: "",
      }
    ]
  }]
};

const Setting = () => {
  const [listSeverity, setListSeverity] = useState<any>([]);
  const [listRule, setListRule] = useState<any>([])

  return (
    <Layout>
      <Formik
        initialValues={defaultValue}
        enableReinitialize={true}
        validationSchema={validationSchema}
        onSubmit={(values, actions) => {
          console.log("values:", values)
          actions.setSubmitting(false);
          actions.resetForm();
        }}
      >
        {({ values, errors, touched, submitForm }) => (
          <>
            <Form>
              <div className="container mt-3">
                <div className="accordion" id="accordionExample">
                  <div className="accordion-item">
                    <h2 className="accordion-header" id="headingOne">
                      <button className="accordion-button fw-bold" type="button" data-bs-toggle="collapse" data-bs-target="#collapseOne" aria-expanded="true" aria-controls="collapseOne">
                        Blood Pressure
                      </button>
                    </h2>
                    <div id="collapseOne" className="accordion-collapse collapse show" aria-labelledby="headingOne" data-bs-parent="#accordionExample">
                      <div className="accordion-body">
                        <table className="table rounded">
                          <thead>
                            <tr>
                              <th>ID</th>
                              <th>Alert Name</th>
                              <th>Alert Severity</th>
                              <th>Rule</th>
                              <th>Threshold</th>
                              <th>Time range</th>
                            </tr>
                          </thead>
                          <tbody>
                            <FieldArray
                              name="bloodPressure"
                              render={(arrayHelpers) => (
                                <>
                                  {values.bloodPressure.map((blood: any, index: number) => (
                                    <tr key={index}>
                                      <td>
                                        {++index}
                                      </td>
                                      <td>
                                        <Field
                                          name={`bloodPressure[${index}].alertName`}
                                          className="form-control"
                                        />
                                      </td>
                                      <td>
                                        <Field
                                          as="select"
                                          name={`bloodPressure[${index}].alertSeverity`}
                                        >
                                          {listSeverity.length > 0 ? (
                                            listSeverity.map((item: any) => (
                                              <option value={item.id} key={item.id}>
                                                {item.name}
                                              </option>
                                            ))
                                          ) : (
                                            <option disabled>No option</option>
                                          )}
                                        </Field>
                                      </td>
                                      {/* <FieldArray
                                        name={`bloodPressure[${index}].rule`}
                                        render={(arrayHelpersRule) => (
                                          <>
                                            {blood?.rule?.map((item: any, indexRule: number) => (
                                              <>
                                                <>
                                                  <td>
                                                    <Field
                                                      as="select"
                                                      name={`rule[${indexRule}].ruleName`}
                                                    >
                                                      {listRule.length > 0 ? (
                                                        listRule.map((item: any) => (
                                                          <option value={item.id} key={item.id}>
                                                            {item.name}
                                                          </option>
                                                        ))
                                                      ) : (
                                                        <option disabled>No option</option>
                                                      )}
                                                    </Field>

                                                  </td>
                                                  <td>
                                                    <Field
                                                      name={`rule[${indexRule}].threshold`}
                                                      className="form-control"
                                                    />
                                                  </td>
                                                  <td>
                                                    <Field
                                                      name={`rule[${indexRule}].timeRange`}
                                                      className="form-control"
                                                    />

                                                  </td>
                                                  <td> <button
                                                    className="button-add"
                                                  // onClick={() => {
                                                  //   arrayHelpersRule.push({ ruleName: "", threshold: "", timeRange: "" })
                                                  // }
                                                  // }
                                                  >
                                                    <i className="bi bi-plus-circle-fill"></i>
                                                    <span className="ms-1">Add new rule</span>
                                                  </button></td>
                                                </>
                                              </>
                                            ))}
                                          </>
                                        )}
                                      /> */}
                                    </tr>
                                  ))}
                                  <tr>
                                    <td>
                                      <button
                                        className="button-add"
                                      // onClick={() => {
                                      //   arrayHelpers.push({
                                      //     alertName: "", alertSeverity: "", rule: [{
                                      //       ruleName: "",
                                      //       threshold: "",
                                      //       timeRange: "",
                                      //     }]
                                      //   })
                                      // }
                                      // }
                                      >
                                        <i className="bi bi-plus-circle-fill"></i>
                                        <span className="ms-1">Add new alert</span>
                                      </button>
                                    </td>
                                    <td></td>
                                    <td></td>
                                    <td></td>
                                    <td></td>
                                    <td>
                                      <button
                                        className="button button--primary button--small me-1"
                                        onClick={submitForm}
                                      >
                                        Apply for all patient
                                      </button>
                                      <button
                                        className="button button--danger button--small"
                                      >
                                        Delete alert
                                      </button>
                                    </td>
                                  </tr>
                                </>
                              )}
                            />
                          </tbody>
                        </table>
                      </div>
                    </div>
                  </div>
                  <div className="accordion-item">
                    <h2 className="accordion-header" id="headingTwo">
                      <button className="accordion-button collapsed fw-bold" type="button" data-bs-toggle="collapse" data-bs-target="#collapseTwo" aria-expanded="false" aria-controls="collapseTwo">
                        Blood Glucose
                      </button>
                    </h2>
                    <div id="collapseTwo" className="accordion-collapse collapse" aria-labelledby="headingTwo" data-bs-parent="#accordionExample">
                      <div className="accordion-body">

                      </div>
                    </div>
                  </div>
                  <div className="accordion-item">
                    <h2 className="accordion-header" id="headingThree">
                      <button className="accordion-button collapsed fw-bold" type="button" data-bs-toggle="collapse" data-bs-target="#collapseThree" aria-expanded="false" aria-controls="collapseThree">
                        Heart Rate
                      </button>
                    </h2>
                    <div id="collapseThree" className="accordion-collapse collapse" aria-labelledby="headingThree" data-bs-parent="#accordionExample">
                      <div className="accordion-body">

                      </div>
                    </div>
                  </div>
                  <div className="accordion-item">
                    <h2 className="accordion-header" id="headingThree">
                      <button className="accordion-button collapsed fw-bold" type="button" data-bs-toggle="collapse" data-bs-target="#collapseThree" aria-expanded="false" aria-controls="collapseThree">
                        Body Mass Index (BMI)
                      </button>
                    </h2>
                    <div id="collapseThree" className="accordion-collapse collapse" aria-labelledby="headingThree" data-bs-parent="#accordionExample">
                      <div className="accordion-body">

                      </div>
                    </div>
                  </div>
                  <div className="accordion-item">
                    <h2 className="accordion-header" id="headingThree">
                      <button className="accordion-button collapsed fw-bold" type="button" data-bs-toggle="collapse" data-bs-target="#collapseThree" aria-expanded="false" aria-controls="collapseThree">
                        Temperature
                      </button>
                    </h2>
                    <div id="collapseThree" className="accordion-collapse collapse" aria-labelledby="headingThree" data-bs-parent="#accordionExample">
                      <div className="accordion-body">

                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </Form>
          </>
        )}
      </Formik>
    </Layout>
  );
};

export default Setting
