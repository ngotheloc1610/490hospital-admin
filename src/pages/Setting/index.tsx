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
      rule: [
        {
          ruleName: "",
          threshold: "",
        }
      ]
    }
  ],
  // bloodGlucose: [{
  //   alertName: "",
  //   alertSeverity: "",
  //   rule: [
  //     {
  //       ruleName: "",
  //       threshold: "",
  //     }
  //   ]
  // }],
  // heartRate: [{
  //   alertName: "",
  //   alertSeverity: "",
  //   rule: [
  //     {
  //       ruleName: "",
  //       threshold: "",
  //     }
  //   ]
  // }],
  // BMI: [
  //   {
  //     alertName: "",
  //     alertSeverity: "",
  //     rule: [
  //       {
  //         ruleName: "",
  //         threshold: "",
  //       }
  //     ]
  //   }
  // ],
  // temperature: [{
  //   alertName: "",
  //   alertSeverity: "",
  //   rule: [
  //     {
  //       ruleName: "",
  //       threshold: "",
  //     }
  //   ]
  // }]
};

const Setting = () => {
  const [listSeverity, setListSeverity] = useState<any>([]);
  const [listRule, setListRule] = useState<any>([]);

  const [setting, setSetting] = useState<any>(defaultValue)

  return (
    <Layout>
      <Formik
        initialValues={setting}
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
                              <th>Rules</th>

                            </tr>
                          </thead>
                          <tbody>
                            <FieldArray name="bloodPressure">
                              {({ push, remove }) => (
                                <>
                                  {values.bloodPressure.map((bp: any, index: number) => (
                                    <tr key={index}>
                                      <td>{++index}</td>
                                      <td>
                                        <Field
                                          type="text"
                                          name={`bloodPressure.${index}.alertName`}
                                          value={bp.alertName}
                                        // onChange={handleChange}
                                        />
                                      </td>
                                      <td>
                                        <Field
                                          type="text"
                                          name={`bloodPressure.${index}.alertSeverity`}
                                          value={bp.alertSeverity}
                                        // onChange={handleChange}
                                        />
                                      </td>
                                      <td>
                                        <FieldArray name={`bloodPressure.${index}.rule`}>
                                          {({ push: pushRule, remove: removeRule }) => (
                                            <>
                                              {bp.rule.map((rule: any, ruleIndex: number) => (
                                                <tr key={ruleIndex}>
                                                  <td>
                                                    <Field
                                                      type="text"
                                                      name={`bloodPressure.${index}.rule.${ruleIndex}.ruleName`}
                                                      value={rule.ruleName}
                                                    // onChange={handleChange}
                                                    />
                                                  </td>
                                                  <td>
                                                    <Field
                                                      type="text"
                                                      name={`bloodPressure.${index}.rule.${ruleIndex}.threshold`}
                                                      value={rule.threshold}
                                                    // onChange={handleChange}
                                                    />
                                                  </td>
                                                  <td>
                                                    <button type="button" onClick={() => removeRule(ruleIndex)}>
                                                      Remove Rule
                                                    </button>
                                                  </td>
                                                </tr>
                                              ))}
                                              <button type="button" onClick={() => pushRule({ ruleName: '', threshold: '' })}>
                                                Add Rule
                                              </button>
                                            </>
                                          )}
                                        </FieldArray>
                                      </td>
                                      <td>
                                        <button type="button" onClick={() => remove(index)}>
                                          Remove Alert
                                        </button>
                                      </td>
                                    </tr>
                                  ))}
                                  <button type="button" onClick={() => push({ alertName: '', alertSeverity: '', rule: [{ ruleName: '', threshold: '' }] })}>
                                    Add Alert
                                  </button>
                                </>
                              )}
                            </FieldArray>
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
