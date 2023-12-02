import { Field, FieldArray, Form, Formik } from "formik";
import * as Yup from "yup";
import Layout from "../../components/Layout";
import { useState } from "react";
import { ICON_TRASH } from "../../assets";
import { defineConfigPost } from "../../Common/utils";
import axios from "axios";
import { API_ALERT_BLOOD_PRESSURE } from "../../constants/api.constant";

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
  bloodGlucose: [{
    alertName: "",
    alertSeverity: "",
    rule: [
      {
        ruleName: "",
        threshold: "",
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
      }
    ]
  }]
};

const Setting = () => {
  const [listSeverity, setListSeverity] = useState<any>([]);
  const [listRule, setListRule] = useState<any>([]);

  const [setting, setSetting] = useState<any>(defaultValue)

  const url_api = process.env.REACT_APP_API_URL;

  const createAlertBloodPressure = () => {
    const url = `${url_api}${API_ALERT_BLOOD_PRESSURE}`;

    axios
      .post(url, defineConfigPost())
      .then((resp: any) => {
        if (resp) {
          setListRule(resp.data);
        }
      })
      .catch((err: any) => {
        console.log("error create alert blood pressure", err);
      });
  }


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
                              {/* <th>Threshold</th> */}

                            </tr>
                          </thead>
                          <tbody>
                            <FieldArray name="bloodPressure">
                              {({ push, remove }) => (
                                <>
                                  {values.bloodPressure.map((bp: any, index: number) => (
                                    <tr key={index}>
                                      <td>{index}</td>
                                      <td>
                                        <Field
                                          type="text"
                                          name={`bloodPressure.${index}.alertName`}
                                          className="form-control"
                                          value={bp.alertName}
                                        // onChange={handleChange}
                                        />
                                      </td>
                                      <td>
                                        <Field
                                          as="select"
                                          name={`bloodPressure.${index}.alertSeverity`}
                                          className={`form-select`}
                                        // onChange={handleChange}
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
                                      <td>
                                        <FieldArray name={`bloodPressure.${index}.rule`}>
                                          {({ push: pushRule, remove: removeRule }) => (
                                            <>
                                              {bp.rule.map((rule: any, ruleIndex: number) => (
                                                <tr key={ruleIndex}>
                                                  <td>
                                                    <Field
                                                      as="select"
                                                      name={`bloodPressure.${index}.rule.${ruleIndex}.ruleName`}
                                                      className={`form-select`}
                                                    // onChange={handleChange}
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
                                                      type="text"
                                                      name={`bloodPressure.${index}.rule.${ruleIndex}.threshold`}
                                                      className="form-control"
                                                      value={rule.threshold}
                                                    // onChange={handleChange}
                                                    />
                                                  </td>
                                                  <td>
                                                    <button type="button" style={{ background: "transparent" }} className="mt-1" onClick={() => removeRule(ruleIndex)}>
                                                      {/* <i className="bi bi-trash3"></i> */}
                                                      <ICON_TRASH />
                                                    </button>
                                                  </td>
                                                </tr>
                                              ))}
                                              <div className="text-end mt-2">
                                                <button type="button" className="button button--primary button--small me-1" onClick={() => pushRule({ ruleName: '', threshold: '' })}>
                                                  <i className="bi bi-plus-circle me-2"></i>
                                                  Add new rule
                                                </button>
                                                <button type="button" className="button button--primary button--small me-1">
                                                  Apply for all patient
                                                </button>
                                                <button type="button" className="button button--deny button--small" onClick={() => remove(index)}>
                                                  Delete Alert
                                                </button>
                                              </div>
                                            </>
                                          )}
                                        </FieldArray>

                                      </td>
                                      <td>

                                      </td>
                                    </tr>
                                  ))}
                                  <button type="button" className="button button--primary button--small" onClick={() => push({ alertName: '', alertSeverity: '', rule: [{ ruleName: '', threshold: '' }] })}>
                                    <i className="bi bi-plus-circle me-2 text-white" style={{ background: "transparent" }}></i>
                                    Add new alert
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
                        <table className="table rounded">
                          <thead>
                            <tr>
                              <th>ID</th>
                              <th>Alert Name</th>
                              <th>Alert Severity</th>
                              <th>Rules</th>
                              {/* <th>Threshold</th> */}

                            </tr>
                          </thead>
                          <tbody>
                            <FieldArray name="bloodGlucose">
                              {({ push, remove }) => (
                                <>
                                  {values.bloodGlucose.map((bg: any, index: number) => (
                                    <tr key={index}>
                                      <td>{index}</td>
                                      <td>
                                        <Field
                                          type="text"
                                          name={`bloodGlucose.${index}.alertName`}
                                          className="form-control"
                                          value={bg.alertName}
                                        // onChange={handleChange}
                                        />
                                      </td>
                                      <td>
                                        <Field
                                          as="select"
                                          name={`bloodGlucose.${index}.alertSeverity`}
                                          className={`form-select`}
                                        // onChange={handleChange}
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
                                      <td>
                                        <FieldArray name={`bloodGlucose.${index}.rule`}>
                                          {({ push: pushRule, remove: removeRule }) => (
                                            <>
                                              {bg.rule.map((rule: any, ruleIndex: number) => (
                                                <tr key={ruleIndex}>
                                                  <td>
                                                    <Field
                                                      as="select"
                                                      name={`bloodGlucose.${index}.rule.${ruleIndex}.ruleName`}
                                                      className={`form-select`}
                                                    // onChange={handleChange}
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
                                                      type="text"
                                                      name={`bloodGlucose.${index}.rule.${ruleIndex}.threshold`}
                                                      className="form-control"
                                                      value={rule.threshold}
                                                    // onChange={handleChange}
                                                    />
                                                  </td>
                                                  <td>
                                                    <button type="button" style={{ background: "transparent" }} className="mt-1" onClick={() => removeRule(ruleIndex)}>
                                                      {/* <i className="bi bi-trash3"></i> */}
                                                      <ICON_TRASH />
                                                    </button>
                                                  </td>
                                                </tr>
                                              ))}
                                              <div className="text-end mt-2">
                                                <button type="button" className="button button--primary button--small me-1" onClick={() => pushRule({ ruleName: '', threshold: '' })}>
                                                  <i className="bi bi-plus-circle me-2"></i>
                                                  Add new rule
                                                </button>
                                                <button type="button" className="button button--primary button--small me-1">
                                                  Apply for all patient
                                                </button>
                                                <button type="button" className="button button--deny button--small" onClick={() => remove(index)}>
                                                  Delete Alert
                                                </button>
                                              </div>
                                            </>
                                          )}
                                        </FieldArray>

                                      </td>
                                      <td>

                                      </td>
                                    </tr>
                                  ))}
                                  <button type="button" className="button button--primary button--small" onClick={() => push({ alertName: '', alertSeverity: '', rule: [{ ruleName: '', threshold: '' }] })}>
                                    <i className="bi bi-plus-circle me-2 text-white" style={{ background: "transparent" }}></i>
                                    Add new alert
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
                    <h2 className="accordion-header" id="headingThree">
                      <button className="accordion-button collapsed fw-bold" type="button" data-bs-toggle="collapse" data-bs-target="#collapseThree" aria-expanded="false" aria-controls="collapseThree">
                        Heart Rate
                      </button>
                    </h2>
                    <div id="collapseThree" className="accordion-collapse collapse" aria-labelledby="headingThree" data-bs-parent="#accordionExample">
                      <div className="accordion-body">
                        <table className="table rounded">
                          <thead>
                            <tr>
                              <th>ID</th>
                              <th>Alert Name</th>
                              <th>Alert Severity</th>
                              <th>Rules</th>
                              {/* <th>Threshold</th> */}

                            </tr>
                          </thead>
                          <tbody>
                            <FieldArray name="heartRate">
                              {({ push, remove }) => (
                                <>
                                  {values.heartRate.map((hr: any, index: number) => (
                                    <tr key={index}>
                                      <td>{index}</td>
                                      <td>
                                        <Field
                                          type="text"
                                          name={`heartRate.${index}.alertName`}
                                          className="form-control"
                                          value={hr.alertName}
                                        // onChange={handleChange}
                                        />
                                      </td>
                                      <td>
                                        <Field
                                          as="select"
                                          name={`heartRate.${index}.alertSeverity`}
                                          className={`form-select`}
                                        // onChange={handleChange}
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
                                      <td>
                                        <FieldArray name={`heartRate.${index}.rule`}>
                                          {({ push: pushRule, remove: removeRule }) => (
                                            <>
                                              {hr.rule.map((rule: any, ruleIndex: number) => (
                                                <tr key={ruleIndex}>
                                                  <td>
                                                    <Field
                                                      as="select"
                                                      name={`heartRate.${index}.rule.${ruleIndex}.ruleName`}
                                                      className={`form-select`}
                                                    // onChange={handleChange}
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
                                                      type="text"
                                                      name={`heartRate.${index}.rule.${ruleIndex}.threshold`}
                                                      className="form-control"
                                                      value={rule.threshold}
                                                    // onChange={handleChange}
                                                    />
                                                  </td>
                                                  <td>
                                                    <button type="button" style={{ background: "transparent" }} className="mt-1" onClick={() => removeRule(ruleIndex)}>
                                                      {/* <i className="bi bi-trash3"></i> */}
                                                      <ICON_TRASH />
                                                    </button>
                                                  </td>
                                                </tr>
                                              ))}
                                              <div className="text-end mt-2">
                                                <button type="button" className="button button--primary button--small me-1" onClick={() => pushRule({ ruleName: '', threshold: '' })}>
                                                  <i className="bi bi-plus-circle me-2"></i>
                                                  Add new rule
                                                </button>
                                                <button type="button" className="button button--primary button--small me-1">
                                                  Apply for all patient
                                                </button>
                                                <button type="button" className="button button--deny button--small" onClick={() => remove(index)}>
                                                  Delete Alert
                                                </button>
                                              </div>
                                            </>
                                          )}
                                        </FieldArray>

                                      </td>
                                      <td>

                                      </td>
                                    </tr>
                                  ))}
                                  <button type="button" className="button button--primary button--small" onClick={() => push({ alertName: '', alertSeverity: '', rule: [{ ruleName: '', threshold: '' }] })}>
                                    <i className="bi bi-plus-circle me-2 text-white" style={{ background: "transparent" }}></i>
                                    Add new alert
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
                    <h2 className="accordion-header" id="headingThree">
                      <button className="accordion-button collapsed fw-bold" type="button" data-bs-toggle="collapse" data-bs-target="#collapseFour" aria-expanded="false" aria-controls="collapseFour">
                        Body Mass Index (BMI)
                      </button>
                    </h2>
                    <div id="collapseFour" className="accordion-collapse collapse" aria-labelledby="headingThree" data-bs-parent="#accordionExample">
                      <div className="accordion-body">
                        <table className="table rounded">
                          <thead>
                            <tr>
                              <th>ID</th>
                              <th>Alert Name</th>
                              <th>Alert Severity</th>
                              <th>Rules</th>
                              {/* <th>Threshold</th> */}

                            </tr>
                          </thead>
                          <tbody>
                            <FieldArray name="BMI">
                              {({ push, remove }) => (
                                <>
                                  {values.BMI.map((item: any, index: number) => (
                                    <tr key={index}>
                                      <td>{index}</td>
                                      <td>
                                        <Field
                                          type="text"
                                          name={`BMI.${index}.alertName`}
                                          className="form-control"
                                          value={item.alertName}
                                        // onChange={handleChange}
                                        />
                                      </td>
                                      <td>
                                        <Field
                                          as="select"
                                          name={`BMI.${index}.alertSeverity`}
                                          className={`form-select`}
                                        // onChange={handleChange}
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
                                      <td>
                                        <FieldArray name={`BMI.${index}.rule`}>
                                          {({ push: pushRule, remove: removeRule }) => (
                                            <>
                                              {item.rule.map((rule: any, ruleIndex: number) => (
                                                <tr key={ruleIndex}>
                                                  <td>
                                                    <Field
                                                      as="select"
                                                      name={`BMI.${index}.rule.${ruleIndex}.ruleName`}
                                                      className={`form-select`}
                                                    // onChange={handleChange}
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
                                                      type="text"
                                                      name={`BMI.${index}.rule.${ruleIndex}.threshold`}
                                                      className="form-control"
                                                      value={rule.threshold}
                                                    // onChange={handleChange}
                                                    />
                                                  </td>
                                                  <td>
                                                    <button type="button" style={{ background: "transparent" }} className="mt-1" onClick={() => removeRule(ruleIndex)}>
                                                      {/* <i className="bi bi-trash3"></i> */}
                                                      <ICON_TRASH />
                                                    </button>
                                                  </td>
                                                </tr>
                                              ))}
                                              <div className="text-end mt-2">
                                                <button type="button" className="button button--primary button--small me-1" onClick={() => pushRule({ ruleName: '', threshold: '' })}>
                                                  <i className="bi bi-plus-circle me-2"></i>
                                                  Add new rule
                                                </button>
                                                <button type="button" className="button button--primary button--small me-1">
                                                  Apply for all patient
                                                </button>
                                                <button type="button" className="button button--deny button--small" onClick={() => remove(index)}>
                                                  Delete Alert
                                                </button>
                                              </div>
                                            </>
                                          )}
                                        </FieldArray>

                                      </td>
                                      <td>

                                      </td>
                                    </tr>
                                  ))}
                                  <button type="button" className="button button--primary button--small" onClick={() => push({ alertName: '', alertSeverity: '', rule: [{ ruleName: '', threshold: '' }] })}>
                                    <i className="bi bi-plus-circle me-2 text-white" style={{ background: "transparent" }}></i>
                                    Add new alert
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
                    <h2 className="accordion-header" id="headingThree">
                      <button className="accordion-button collapsed fw-bold" type="button" data-bs-toggle="collapse" data-bs-target="#collapseFive" aria-expanded="false" aria-controls="collapseFive">
                        Temperature
                      </button>
                    </h2>
                    <div id="collapseFive" className="accordion-collapse collapse" aria-labelledby="headingThree" data-bs-parent="#accordionExample">
                      <div className="accordion-body">
                        <table className="table rounded">
                          <thead>
                            <tr>
                              <th>ID</th>
                              <th>Alert Name</th>
                              <th>Alert Severity</th>
                              <th>Rules</th>
                              {/* <th>Threshold</th> */}

                            </tr>
                          </thead>
                          <tbody>
                            <FieldArray name="temperature">
                              {({ push, remove }) => (
                                <>
                                  {values.temperature.map((tp: any, index: number) => (
                                    <tr key={index}>
                                      <td>{index}</td>
                                      <td>
                                        <Field
                                          type="text"
                                          name={`temperature.${index}.alertName`}
                                          className="form-control"
                                          value={tp.alertName}
                                        // onChange={handleChange}
                                        />
                                      </td>
                                      <td>
                                        <Field
                                          as="select"
                                          name={`temperature.${index}.alertSeverity`}
                                          className={`form-select`}
                                        // onChange={handleChange}
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
                                      <td>
                                        <FieldArray name={`temperature.${index}.rule`}>
                                          {({ push: pushRule, remove: removeRule }) => (
                                            <>
                                              {tp.rule.map((rule: any, ruleIndex: number) => (
                                                <tr key={ruleIndex}>
                                                  <td>
                                                    <Field
                                                      as="select"
                                                      name={`temperature.${index}.rule.${ruleIndex}.ruleName`}
                                                      className={`form-select`}
                                                    // onChange={handleChange}
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
                                                      type="text"
                                                      name={`temperature.${index}.rule.${ruleIndex}.threshold`}
                                                      className="form-control"
                                                      value={rule.threshold}
                                                    // onChange={handleChange}
                                                    />
                                                  </td>
                                                  <td>
                                                    <button type="button" style={{ background: "transparent" }} className="mt-1" onClick={() => removeRule(ruleIndex)}>
                                                      {/* <i className="bi bi-trash3"></i> */}
                                                      <ICON_TRASH />
                                                    </button>
                                                  </td>
                                                </tr>
                                              ))}
                                              <div className="text-end mt-2">
                                                <button type="button" className="button button--primary button--small me-1" onClick={() => pushRule({ ruleName: '', threshold: '' })}>
                                                  <i className="bi bi-plus-circle me-2"></i>
                                                  Add new rule
                                                </button>
                                                <button type="button" className="button button--primary button--small me-1">
                                                  Apply for all patient
                                                </button>
                                                <button type="button" className="button button--deny button--small" onClick={() => remove(index)}>
                                                  Delete Alert
                                                </button>
                                              </div>
                                            </>
                                          )}
                                        </FieldArray>

                                      </td>
                                      <td>

                                      </td>
                                    </tr>
                                  ))}
                                  <button type="button" className="button button--primary button--small" onClick={() => push({ alertName: '', alertSeverity: '', rule: [{ ruleName: '', threshold: '' }] })}>
                                    <i className="bi bi-plus-circle me-2 text-white" style={{ background: "transparent" }}></i>
                                    Add new alert
                                  </button>
                                </>
                              )}
                            </FieldArray>
                          </tbody>
                        </table>
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
