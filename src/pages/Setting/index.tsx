import Layout from "../../components/Layout";
import { useState } from "react";
import { ICON_TRASH } from "../../assets";
import { defineConfigPost } from "../../Common/utils";
import axios from "axios";
import { API_ALERT_BLOOD_GLUCOSE, API_ALERT_BLOOD_PRESSURE, API_ALERT_BMI, API_ALERT_HEART_RATE, API_ALERT_TEMPERATURE } from "../../constants/api.constant";
import { ALERT_STATUS, RULE_BLOOD_GLUCOSE, RULE_BLOOD_PRESSURE, RULE_BMI, RULE_HEART_RATE, RULE_TEMPERATURE } from "../../constants";
import { success } from "../../Common/notify";
import { ALERT_BLOOD_GLUCOSE, ALERT_BLOOD_PRESSURE, ALERT_BMI, ALERT_HEART_RATE, ALERT_TEMPERATURE } from "../../constants/general.constant";

const Setting = () => {

  const url_api = process.env.REACT_APP_API_URL;

  let alertBloodPressure;
  if (localStorage.getItem(ALERT_BLOOD_PRESSURE)) {
    alertBloodPressure = JSON.parse(localStorage.getItem(ALERT_BLOOD_PRESSURE) || "")
  }
  let alertBloodGlucose;
  if (localStorage.getItem(ALERT_BLOOD_GLUCOSE)) {
    alertBloodGlucose = JSON.parse(localStorage.getItem(ALERT_BLOOD_GLUCOSE) || "")
  }
  let alertHeartRate;
  if (localStorage.getItem(ALERT_HEART_RATE)) {
    alertHeartRate = JSON.parse(localStorage.getItem(ALERT_HEART_RATE) || "")
  }
  let alertBMI;
  if (localStorage.getItem(ALERT_BMI)) {
    alertBMI = JSON.parse(localStorage.getItem(ALERT_BMI) || "")
  }
  let alertTemperature;
  if (localStorage.getItem(ALERT_TEMPERATURE)) {
    alertTemperature = JSON.parse(localStorage.getItem(ALERT_TEMPERATURE) || "")
  }

  const [listBloodPressure, setListBloodPressure] = useState<any>(alertBloodPressure ? alertBloodPressure : [{
    alertName: "",
    alertSeverity: "",
    rule: [
      {
        ruleName: "",
        threshold: "",
      }
    ]
  }])
  const [listBloodGlucose, setListBloodGlucose] = useState<any>(alertBloodGlucose ? alertBloodGlucose : [{
    alertName: "",
    alertSeverity: "",
    rule: [
      {
        ruleName: "",
        threshold: "",
      }
    ]
  }])
  const [listHeartRate, setListHeartRate] = useState<any>(alertHeartRate ? alertHeartRate : [{
    alertName: "",
    alertSeverity: "",
    rule: [
      {
        ruleName: "",
        threshold: "",
      }
    ]
  }])
  const [listTemperature, setListTemperature] = useState<any>(alertBMI ? alertBMI : [{
    alertName: "",
    alertSeverity: "",
    rule: [
      {
        ruleName: "",
        threshold: "",
      }
    ]
  }])
  const [listBMI, setListBMI] = useState<any>(alertTemperature ? alertTemperature : [{
    alertName: "",
    alertSeverity: "",
    rule: [
      {
        ruleName: "",
        threshold: "",
      }
    ]
  }])

  const createAlertBloodPressure = (bloodItem: any) => {
    const url = `${url_api}${API_ALERT_BLOOD_PRESSURE}`;

    let ruleList: any = [];
    bloodItem.rule.forEach((itemRule: any) => {
      const ruleName = itemRule.ruleName
      const type = ruleName.split(' ')[0];
      const rule = ruleName.split(type + " ")[1];
      ruleList.push({
        type: type,
        rule: rule,
        threshold: !isNaN(itemRule.threshold) ? parseFloat(itemRule.threshold) : 0.0
      })
    })

    const params = {
      category: "Blood Pressure",
      alertName: bloodItem.alertName,
      severity: bloodItem.alertSeverity,
      ruleList: ruleList
    };

    axios
      .post(url, params, defineConfigPost())
      .then((resp: any) => {
        if (resp) {
          localStorage.setItem(ALERT_BLOOD_PRESSURE, JSON.stringify(listBloodPressure))
          success("Alert Blood Pressure successfully!")
        }
      })
      .catch((err: any) => {
        console.log("error create alert blood pressure", err);
      });
  }
  const createAlertBloodGlucose = (bloodItem: any) => {
    const url = `${url_api}${API_ALERT_BLOOD_GLUCOSE}`;

    let ruleList: any = [];
    bloodItem.rule.forEach((itemRule: any) => {
      ruleList.push({
        type: "Blood Glucose",
        rule: itemRule.ruleName,
        threshold: !isNaN(itemRule.threshold) ? parseFloat(itemRule.threshold) : 0.0
      })
    })

    const params = {
      category: "Blood Glucose",
      alertName: bloodItem.alertName,
      severity: bloodItem.alertSeverity,
      ruleList: ruleList
    };

    axios
      .post(url, params, defineConfigPost())
      .then((resp: any) => {
        if (resp) {
          localStorage.setItem(ALERT_BLOOD_GLUCOSE, JSON.stringify(listBloodGlucose))
          success("Alert Blood Glucose successfully!")
        }
      })
      .catch((err: any) => {
        console.log("error create alert blood glucose", err);
      });
  }
  const createAlertHeartRate = (bloodItem: any) => {
    const url = `${url_api}${API_ALERT_HEART_RATE}`;

    let ruleList: any = [];
    bloodItem.rule.forEach((itemRule: any) => {
      ruleList.push({
        type: "Heart Rate",
        rule: itemRule.ruleName,
        threshold: !isNaN(itemRule.threshold) ? parseFloat(itemRule.threshold) : 0.0
      })
    })

    const params = {
      category: "Heart Rate",
      alertName: bloodItem.alertName,
      severity: bloodItem.alertSeverity,
      ruleList: ruleList
    };

    axios
      .post(url, params, defineConfigPost())
      .then((resp: any) => {
        if (resp) {
          localStorage.setItem(ALERT_HEART_RATE, JSON.stringify(listHeartRate))
          success("Alert Heart Rate successfully!")
        }
      })
      .catch((err: any) => {
        console.log("error create alert heart rate", err);
      });
  }
  const createAlertBMI = (bloodItem: any) => {
    const url = `${url_api}${API_ALERT_BMI}`;

    let ruleList: any = [];
    bloodItem.rule.forEach((itemRule: any) => {
      ruleList.push({
        type: "BMI",
        rule: itemRule.ruleName,
        threshold: !isNaN(itemRule.threshold) ? parseFloat(itemRule.threshold) : 0.0
      })
    })

    const params = {
      category: "BMI",
      alertName: bloodItem.alertName,
      severity: bloodItem.alertSeverity,
      ruleList: ruleList
    };

    axios
      .post(url, params, defineConfigPost())
      .then((resp: any) => {
        if (resp) {
          localStorage.setItem(ALERT_BMI, JSON.stringify(listBMI))
          success("Alert BMI successfully!")

        }
      })
      .catch((err: any) => {
        console.log("error create alert bmi", err);
      });
  }
  const createAlertTemperature = (bloodItem: any) => {
    const url = `${url_api}${API_ALERT_TEMPERATURE}`;

    let ruleList: any = [];
    bloodItem.rule.forEach((itemRule: any) => {
      ruleList.push({
        type: "Temperature",
        rule: itemRule.ruleName,
        threshold: !isNaN(itemRule.threshold) ? parseFloat(itemRule.threshold) : 0.0
      })
    })

    const params = {
      category: "Temperature",
      alertName: bloodItem.alertName,
      severity: bloodItem.alertSeverity,
      ruleList: ruleList
    };

    axios
      .post(url, params, defineConfigPost())
      .then((resp: any) => {
        if (resp) {
          localStorage.setItem(ALERT_TEMPERATURE, JSON.stringify(listTemperature))
          success("Alert Temperature successfully!")

        }
      })
      .catch((err: any) => {
        console.log("error create alert temperature", err);
      });
  }

  const applyBloodPressure = (item: any) => {
    createAlertBloodPressure(item);
  }
  const applyBloodGlucose = (item: any) => {
    createAlertBloodGlucose(item);
  }
  const applyHeartRate = (item: any) => {
    createAlertHeartRate(item);
  }
  const applyBMI = (item: any) => {
    createAlertBMI(item);
  }
  const applyTemperature = (item: any) => {
    createAlertTemperature(item);
  }

  const _renderListSeverity = () => {
    return (
      <>
        <option hidden>Select a severity</option>
        {ALERT_STATUS.map((item: any) => (
          <option value={item.value} key={item.value}>
            {item.title}
          </option>
        ))
        }
      </>
    );
  };

  const _renderListRuleBloodPressure = () => {
    return (
      <>
        <option hidden>Select a rule</option>
        {RULE_BLOOD_PRESSURE.map((item: any) => (
          <option value={item.value} key={item.value}>
            {item.title}
          </option>
        ))}
      </>
    );
  };
  const _renderListRuleTemperature = () => {
    return (
      <>
        <option hidden>Select a rule</option>
        {RULE_TEMPERATURE.map((item: any) => (
          <option value={item.value} key={item.value}>
            {item.title}
          </option>
        ))}
      </>
    );
  };
  const _renderListRuleBloodGlucose = () => {
    return (
      <>
        <option hidden>Select a rule</option>
        {RULE_BLOOD_GLUCOSE.map((item: any) => (
          <option value={item.value} key={item.value}>
            {item.title}
          </option>
        ))}
      </>
    );
  };
  const _renderListRuleHeartRate = () => {
    return (
      <>
        <option hidden>Select a rule</option>
        {RULE_HEART_RATE.map((item: any) => (
          <option value={item.value} key={item.value}>
            {item.title}
          </option>
        ))}
      </>
    );
  };
  const _renderListRuleBMI = () => {
    return (
      <>
        <option hidden>Select a rule</option>
        {RULE_BMI.map((item: any) => (
          <option value={item.value} key={item.value}>
            {item.title}
          </option>
        ))}
      </>
    );
  };

  return (
    <Layout>
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
                      <th>Threshold</th>
                      <th></th>
                    </tr>
                  </thead>
                  <tbody>
                    {listBloodPressure.map((item: any, idx: number) => (
                      <>
                        {item.rule && item.rule.length > 0 ? <>
                          {item.rule.map((itemRule: any, idxRule: number) => {
                            return (
                              <tr>
                                {idxRule <= 0 && (
                                  <>
                                    <td rowSpan={item.rule ? item.rule.length : 1}>{idx + 1}</td>
                                    <td rowSpan={item.rule ? item.rule.length : 1}>
                                      <input
                                        type="text"
                                        className={`form-control`}
                                        value={item.alertName}
                                        onChange={(e: any) => {
                                          const updatedList = [...listBloodPressure];
                                          updatedList[idx].alertName = e.target.value;
                                          setListBloodPressure(updatedList);
                                        }}
                                      />
                                    </td>
                                    <td rowSpan={item.rule ? item.rule.length : 1}>
                                      <select
                                        className="form-select"
                                        onChange={(e: any) => {
                                          const updatedList = [...listBloodPressure];
                                          updatedList[idx].alertSeverity = e.target.value;
                                          setListBloodPressure(updatedList);
                                        }}
                                        value={item.alertSeverity}
                                      >
                                        {_renderListSeverity()}
                                      </select>
                                    </td>
                                  </>
                                )}

                                <td> <select
                                  className="form-select"
                                  onChange={(e: any) => {
                                    const updatedList = [...listBloodPressure];
                                    updatedList[idx].rule[idxRule].ruleName = e.target.value;
                                    setListBloodPressure(updatedList);
                                  }}
                                  value={itemRule.ruleName}
                                >
                                  {_renderListRuleBloodPressure()}
                                </select></td>
                                <td>
                                  <div className="d-flex">
                                    <input
                                      type="text"
                                      className={`form-control`}
                                      value={itemRule.threshold}
                                      onChange={(e: any) => {
                                        const updatedList = [...listBloodPressure];
                                        updatedList[idx].rule[idxRule].threshold = e.target.value;
                                        setListBloodPressure(updatedList);
                                      }}
                                    />
                                    <span className="my-auto">mmHg</span>
                                  </div>
                                </td>
                                <td>
                                  <span onClick={() => {
                                    const updatedList = [...listBloodPressure];
                                    updatedList[idx].rule.splice(idxRule, 1);
                                    setListBloodPressure(updatedList);
                                  }}><ICON_TRASH /></span>
                                </td>
                              </tr>
                            )
                          })}
                          <tr>
                            <td></td>
                            <td></td>
                            <td>
                              <button type="button" className="button button--primary button--smaller" onClick={() => {
                                const updatedList = [...listBloodPressure];
                                updatedList[idx].rule.push({
                                  ruleName: "",
                                  threshold: "",
                                });
                                setListBloodPressure(updatedList);
                              }}>
                                <i className="bi bi-plus-circle me-2"></i>
                                Add new rule
                              </button>
                            </td>
                            <td></td>
                            <td className="d-flex">
                              <button type="button" className="button button--primary button--smaller me-1" onClick={() => applyBloodPressure(item)}>
                                Apply for all patient
                              </button>
                              <button type="button" className="button button--deny button--smaller" onClick={() => {
                                const updatedList = [...listBloodPressure];
                                updatedList.splice(idx, 1);
                                setListBloodPressure(updatedList);
                              }}>
                                Delete Alert
                              </button>
                            </td>
                          </tr>
                        </> : <tr>
                          <td>{idx + 1}</td>
                          <td> <input
                            type="text"
                            className={`form-control`}
                            value={item.alertName}
                            onChange={(e: any) => {
                              const updatedList = [...listBloodPressure];
                              updatedList[idx].alertName = e.target.value;
                              setListBloodPressure(updatedList);
                            }}
                          /></td>
                          <td> <select
                            className="form-select"
                            onChange={(e: any) => {
                              const updatedList = [...listBloodPressure];
                              updatedList[idx].alertSeverity = e.target.value;
                              setListBloodPressure(updatedList);
                            }}
                            value={item.alertSeverity}
                          >
                            {_renderListSeverity()}
                          </select></td>
                          <td></td>
                          <td></td>
                        </tr>}
                      </>
                    ))}
                    <button type="button" className="button button--primary button--small" onClick={() => {
                      setListBloodPressure([...listBloodPressure, {
                        alertName: "",
                        alertSeverity: "",
                        rule: [
                          {
                            ruleName: "",
                            threshold: "",
                          }
                        ]
                      }])
                    }}>
                      <i className="bi bi-plus-circle text-white me-2" style={{ background: "transparent" }}></i>
                      <span className="text-white" style={{ background: "transparent" }}>Add new alert</span>
                    </button>
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
                      <th>Threshold</th>
                    </tr>
                  </thead>
                  <tbody>
                    {listBloodGlucose.map((item: any, idx: number) => (
                      <>
                        {item.rule && item.rule.length > 0 ? <>
                          {item.rule.map((itemRule: any, idxRule: number) => {
                            return (
                              <tr>
                                {idxRule <= 0 && (
                                  <>
                                    <td rowSpan={item.rule ? item.rule.length : 1}>{idx + 1}</td>
                                    <td rowSpan={item.rule ? item.rule.length : 1}>
                                      <input
                                        type="text"
                                        className={`form-control`}
                                        value={item.alertName}
                                        onChange={(e: any) => {
                                          const updatedList = [...listBloodGlucose];
                                          updatedList[idx].alertName = e.target.value;
                                          setListBloodGlucose(updatedList);
                                        }}
                                      />
                                    </td>
                                    <td rowSpan={item.rule ? item.rule.length : 1}>
                                      <select
                                        className="form-select"
                                        onChange={(e: any) => {
                                          const updatedList = [...listBloodGlucose];
                                          updatedList[idx].alertSeverity = e.target.value;
                                          setListBloodGlucose(updatedList);
                                        }}
                                        value={item.alertSeverity}
                                      >
                                        {_renderListSeverity()}
                                      </select>
                                    </td>
                                  </>
                                )}

                                <td> <select
                                  className="form-select"
                                  onChange={(e: any) => {
                                    const updatedList = [...listBloodGlucose];
                                    updatedList[idx].rule[idxRule].ruleName = e.target.value;
                                    setListBloodGlucose(updatedList);
                                  }}
                                  value={itemRule.ruleName}
                                >
                                  {_renderListRuleBloodGlucose()}
                                </select></td>
                                <td>
                                  <div className="d-flex">
                                    <input
                                      type="text"
                                      className={`form-control`}
                                      value={itemRule.threshold}
                                      onChange={(e: any) => {
                                        const updatedList = [...listBloodGlucose];
                                        updatedList[idx].rule[idxRule].threshold = e.target.value;
                                        setListBloodGlucose(updatedList);
                                      }}
                                    />
                                    <span className="my-auto">mmol/L</span>
                                  </div>
                                </td>
                                <td>
                                  <span onClick={() => {
                                    const updatedList = [...listBloodGlucose];
                                    updatedList[idx].rule.splice(idxRule, 1);
                                    setListBloodGlucose(updatedList);
                                  }}><ICON_TRASH /></span>
                                </td>
                              </tr>
                            )
                          })}
                          <tr>
                            <td></td>
                            <td></td>
                            <td>
                              <button type="button" className="button button--primary button--smaller" onClick={() => {
                                const updatedList = [...listBloodGlucose];
                                updatedList[idx].rule.push({
                                  ruleName: "",
                                  threshold: "",
                                });
                                setListBloodGlucose(updatedList);
                              }}>
                                <i className="bi bi-plus-circle me-2"></i>
                                Add new rule
                              </button>
                            </td>
                            <td></td>
                            <td className="d-flex">
                              <button type="button" className="button button--primary button--smaller me-1" onClick={() => applyBloodGlucose(item)}>
                                Apply for all patient
                              </button>
                              <button type="button" className="button button--deny button--smaller" onClick={() => {
                                const updatedList = [...listBloodGlucose];
                                updatedList.splice(idx, 1);
                                setListBloodGlucose(updatedList);
                              }}>
                                Delete Alert
                              </button>
                            </td>
                          </tr>
                        </> : <tr>
                          <td>{idx + 1}</td>
                          <td> <input
                            type="text"
                            className={`form-control`}
                            value={item.alertName}
                            onChange={(e: any) => {
                              const updatedList = [...listBloodGlucose];
                              updatedList[idx].alertName = e.target.value;
                              setListBloodGlucose(updatedList);
                            }}
                          /></td>
                          <td> <select
                            className="form-select"
                            onChange={(e: any) => {
                              const updatedList = [...listBloodGlucose];
                              updatedList[idx].alertSeverity = e.target.value;
                              setListBloodGlucose(updatedList);
                            }}
                            value={item.alertSeverity}
                          >
                            {_renderListSeverity()}
                          </select></td>
                          <td></td>
                          <td></td>
                        </tr>}
                      </>
                    ))}
                    <button type="button" className="button button--primary button--small" onClick={() => {
                      setListBloodGlucose([...listBloodGlucose, {
                        alertName: "",
                        alertSeverity: "",
                        rule: [
                          {
                            ruleName: "",
                            threshold: "",
                          }
                        ]
                      }])
                    }}>
                      <i className="bi bi-plus-circle text-white me-2" style={{ background: "transparent" }}></i>
                      <span className="text-white" style={{ background: "transparent" }}>Add new alert</span>
                    </button>
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
                      <th>Threshold</th>
                    </tr>
                  </thead>
                  <tbody>
                    {listHeartRate.map((item: any, idx: number) => (
                      <>
                        {item.rule && item.rule.length > 0 ? <>
                          {item.rule.map((itemRule: any, idxRule: number) => {
                            return (
                              <tr>
                                {idxRule <= 0 && (
                                  <>
                                    <td rowSpan={item.rule ? item.rule.length : 1}>{idx + 1}</td>
                                    <td rowSpan={item.rule ? item.rule.length : 1}>
                                      <input
                                        type="text"
                                        className={`form-control`}
                                        value={item.alertName}
                                        onChange={(e: any) => {
                                          const updatedList = [...listHeartRate];
                                          updatedList[idx].alertName = e.target.value;
                                          setListHeartRate(updatedList);
                                        }}
                                      />
                                    </td>
                                    <td rowSpan={item.rule ? item.rule.length : 1}>
                                      <select
                                        className="form-select"
                                        onChange={(e: any) => {
                                          const updatedList = [...listHeartRate];
                                          updatedList[idx].alertSeverity = e.target.value;
                                          setListHeartRate(updatedList);
                                        }}
                                        value={item.alertSeverity}
                                      >
                                        {_renderListSeverity()}
                                      </select>
                                    </td>
                                  </>
                                )}

                                <td> <select
                                  className="form-select"
                                  onChange={(e: any) => {
                                    const updatedList = [...listHeartRate];
                                    updatedList[idx].rule[idxRule].ruleName = e.target.value;
                                    setListHeartRate(updatedList);
                                  }}
                                  value={itemRule.ruleName}
                                >
                                  {_renderListRuleHeartRate()}
                                </select></td>
                                <td>
                                  <div className="d-flex">
                                    <input
                                      type="text"
                                      className={`form-control`}
                                      value={itemRule.threshold}
                                      onChange={(e: any) => {
                                        const updatedList = [...listHeartRate];
                                        updatedList[idx].rule[idxRule].threshold = e.target.value;
                                        setListHeartRate(updatedList);
                                      }}
                                    />
                                    <span className="my-auto">bpm</span>
                                  </div>
                                </td>
                                <td>
                                  <span onClick={() => {
                                    const updatedList = [...listHeartRate];
                                    updatedList[idx].rule.splice(idxRule, 1);
                                    setListHeartRate(updatedList);
                                  }}><ICON_TRASH /></span>
                                </td>
                              </tr>
                            )
                          })}
                          <tr>
                            <td></td>
                            <td></td>
                            <td>
                              <button type="button" className="button button--primary button--smaller" onClick={() => {
                                const updatedList = [...listHeartRate];
                                updatedList[idx].rule.push({
                                  ruleName: "",
                                  threshold: "",
                                });
                                setListHeartRate(updatedList);
                              }}>
                                <i className="bi bi-plus-circle me-2"></i>
                                Add new rule
                              </button>
                            </td>
                            <td></td>
                            <td className="d-flex">
                              <button type="button" className="button button--primary button--smaller me-1" onClick={() => applyHeartRate(item)}>
                                Apply for all patient
                              </button>
                              <button type="button" className="button button--deny button--smaller" onClick={() => {
                                const updatedList = [...listHeartRate];
                                updatedList.splice(idx, 1);
                                setListHeartRate(updatedList);
                              }}>
                                Delete Alert
                              </button>
                            </td>
                          </tr>
                        </> : <tr>
                          <td>{idx + 1}</td>
                          <td> <input
                            type="text"
                            className={`form-control`}
                            value={item.alertName}
                            onChange={(e: any) => {
                              const updatedList = [...listHeartRate];
                              updatedList[idx].alertName = e.target.value;
                              setListHeartRate(updatedList);
                            }}
                          /></td>
                          <td> <select
                            className="form-select"
                            onChange={(e: any) => {
                              const updatedList = [...listHeartRate];
                              updatedList[idx].alertSeverity = e.target.value;
                              setListHeartRate(updatedList);
                            }}
                            value={item.alertSeverity}
                          >
                            {_renderListSeverity()}
                          </select></td>
                          <td></td>
                          <td></td>
                        </tr>}
                      </>
                    ))}
                    <button type="button" className="button button--primary button--small" onClick={() => {
                      setListHeartRate([...listHeartRate, {
                        alertName: "",
                        alertSeverity: "",
                        rule: [
                          {
                            ruleName: "",
                            threshold: "",
                          }
                        ]
                      }])
                    }}>
                      <i className="bi bi-plus-circle text-white me-2" style={{ background: "transparent" }}></i>
                      <span className="text-white" style={{ background: "transparent" }}>Add new alert</span>
                    </button>
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
                      <th>Threshold</th>
                    </tr>
                  </thead>
                  <tbody>
                    {listBMI.map((item: any, idx: number) => (
                      <>
                        {item.rule && item.rule.length > 0 ? <>
                          {item.rule.map((itemRule: any, idxRule: number) => {
                            return (
                              <tr>
                                {idxRule <= 0 && (
                                  <>
                                    <td rowSpan={item.rule ? item.rule.length : 1}>{idx + 1}</td>
                                    <td rowSpan={item.rule ? item.rule.length : 1}>
                                      <input
                                        type="text"
                                        className={`form-control`}
                                        value={item.alertName}
                                        onChange={(e: any) => {
                                          const updatedList = [...listBMI];
                                          updatedList[idx].alertName = e.target.value;
                                          setListBMI(updatedList);
                                        }}
                                      />
                                    </td>
                                    <td rowSpan={item.rule ? item.rule.length : 1}>
                                      <select
                                        className="form-select"
                                        onChange={(e: any) => {
                                          const updatedList = [...listBMI];
                                          updatedList[idx].alertSeverity = e.target.value;
                                          setListBMI(updatedList);
                                        }}
                                        value={item.alertSeverity}
                                      >
                                        {_renderListSeverity()}
                                      </select>
                                    </td>
                                  </>
                                )}

                                <td> <select
                                  className="form-select"
                                  onChange={(e: any) => {
                                    const updatedList = [...listBMI];
                                    updatedList[idx].rule[idxRule].ruleName = e.target.value;
                                    setListBMI(updatedList);
                                  }}
                                  value={itemRule.ruleName}
                                >
                                  {_renderListRuleBMI()}
                                </select></td>
                                <td><input
                                  type="text"
                                  className={`form-control`}
                                  value={itemRule.threshold}
                                  onChange={(e: any) => {
                                    const updatedList = [...listBMI];
                                    updatedList[idx].rule[idxRule].threshold = e.target.value;
                                    setListBMI(updatedList);
                                  }}
                                /></td>
                                <td>
                                  <span onClick={() => {
                                    const updatedList = [...listBMI];
                                    updatedList[idx].rule.splice(idxRule, 1);
                                    setListBMI(updatedList);
                                  }}><ICON_TRASH /></span>
                                </td>
                              </tr>
                            )
                          })}
                          <tr>
                            <td></td>
                            <td></td>
                            <td>
                              <button type="button" className="button button--primary button--smaller" onClick={() => {
                                const updatedList = [...listBMI];
                                updatedList[idx].rule.push({
                                  ruleName: "",
                                  threshold: "",
                                });
                                setListBMI(updatedList);
                              }}>
                                <i className="bi bi-plus-circle me-2"></i>
                                Add new rule
                              </button>
                            </td>
                            <td></td>
                            <td className="d-flex">
                              <button type="button" className="button button--primary button--smaller me-1" onClick={() => applyBMI(item)}>
                                Apply for all patient
                              </button>
                              <button type="button" className="button button--deny button--smaller" onClick={() => {
                                const updatedList = [...listBMI];
                                updatedList.splice(idx, 1);
                                setListBMI(updatedList);
                              }}>
                                Delete Alert
                              </button>
                            </td>
                          </tr>
                        </> : <tr>
                          <td>{idx + 1}</td>
                          <td> <input
                            type="text"
                            className={`form-control`}
                            value={item.alertName}
                            onChange={(e: any) => {
                              const updatedList = [...listBMI];
                              updatedList[idx].alertName = e.target.value;
                              setListBMI(updatedList);
                            }}
                          /></td>
                          <td> <select
                            className="form-select"
                            onChange={(e: any) => {
                              const updatedList = [...listBMI];
                              updatedList[idx].alertSeverity = e.target.value;
                              setListBMI(updatedList);
                            }}
                            value={item.alertSeverity}
                          >
                            {_renderListSeverity()}
                          </select></td>
                          <td></td>
                          <td></td>
                        </tr>}
                      </>
                    ))}
                    <button type="button" className="button button--primary button--small" onClick={() => {
                      setListBMI([...listBMI, {
                        alertName: "",
                        alertSeverity: "",
                        rule: [
                          {
                            ruleName: "",
                            threshold: "",
                          }
                        ]
                      }])
                    }}>
                      <i className="bi bi-plus-circle text-white me-2" style={{ background: "transparent" }}></i>
                      <span className="text-white" style={{ background: "transparent" }}>Add new alert</span>
                    </button>
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
                      <th>Threshold</th>
                    </tr>
                  </thead>
                  <tbody>
                    {listTemperature.map((item: any, idx: number) => (
                      <>
                        {item.rule && item.rule.length > 0 ? <>
                          {item.rule.map((itemRule: any, idxRule: number) => {
                            return (
                              <tr>
                                {idxRule <= 0 && (
                                  <>
                                    <td rowSpan={item.rule ? item.rule.length : 1}>{idx + 1}</td>
                                    <td rowSpan={item.rule ? item.rule.length : 1}>
                                      <input
                                        type="text"
                                        className={`form-control`}
                                        value={item.alertName}
                                        onChange={(e: any) => {
                                          const updatedList = [...listTemperature];
                                          updatedList[idx].alertName = e.target.value;
                                          setListTemperature(updatedList);
                                        }}
                                      />
                                    </td>
                                    <td rowSpan={item.rule ? item.rule.length : 1}>
                                      <select
                                        className="form-select"
                                        onChange={(e: any) => {
                                          const updatedList = [...listTemperature];
                                          updatedList[idx].alertSeverity = e.target.value;
                                          setListTemperature(updatedList);
                                        }}
                                        value={item.alertSeverity}
                                      >
                                        {_renderListSeverity()}
                                      </select>
                                    </td>
                                  </>
                                )}

                                <td> <select
                                  className="form-select"
                                  onChange={(e: any) => {
                                    const updatedList = [...listTemperature];
                                    updatedList[idx].rule[idxRule].ruleName = e.target.value;
                                    setListTemperature(updatedList);
                                  }}
                                  value={itemRule.ruleName}
                                >
                                  {_renderListRuleTemperature()}
                                </select></td>
                                <td>
                                  <div className="d-flex">
                                    <input
                                      type="text"
                                      className={`form-control`}
                                      value={itemRule.threshold}
                                      onChange={(e: any) => {
                                        const updatedList = [...listTemperature];
                                        updatedList[idx].rule[idxRule].threshold = e.target.value;
                                        setListTemperature(updatedList);
                                      }}
                                    />
                                    <span className="my-auto">&deg;C</span>
                                  </div>
                                </td>
                                <td>
                                  <span onClick={() => {
                                    const updatedList = [...listTemperature];
                                    updatedList[idx].rule.splice(idxRule, 1);
                                    setListTemperature(updatedList);
                                  }}><ICON_TRASH /></span>
                                </td>
                              </tr>
                            )
                          })}
                          <tr>
                            <td></td>
                            <td></td>
                            <td>
                              <button type="button" className="button button--primary button--smaller" onClick={() => {
                                const updatedList = [...listTemperature];
                                updatedList[idx].rule.push({
                                  ruleName: "",
                                  threshold: "",
                                });
                                setListTemperature(updatedList);
                              }}>
                                <i className="bi bi-plus-circle me-2"></i>
                                Add new rule
                              </button>
                            </td>
                            <td></td>
                            <td className="d-flex">
                              <button type="button" className="button button--primary button--smaller me-1" onClick={() => applyTemperature(item)}>
                                Apply for all patient
                              </button>
                              <button type="button" className="button button--deny button--smaller" onClick={() => {
                                const updatedList = [...listTemperature];
                                updatedList.splice(idx, 1);
                                setListTemperature(updatedList);
                              }}>
                                Delete Alert
                              </button>
                            </td>
                          </tr>
                        </> : <tr>
                          <td>{idx + 1}</td>
                          <td> <input
                            type="text"
                            className={`form-control`}
                            value={item.alertName}
                            onChange={(e: any) => {
                              const updatedList = [...listTemperature];
                              updatedList[idx].alertName = e.target.value;
                              setListTemperature(updatedList);
                            }}
                          /></td>
                          <td> <select
                            className="form-select"
                            onChange={(e: any) => {
                              const updatedList = [...listTemperature];
                              updatedList[idx].alertSeverity = e.target.value;
                              setListTemperature(updatedList);
                            }}
                            value={item.alertSeverity}
                          >
                            {_renderListSeverity()}
                          </select></td>
                          <td></td>
                          <td></td>
                        </tr>}
                      </>
                    ))}
                    <button type="button" className="button button--primary button--small" onClick={() => {
                      setListTemperature([...listTemperature, {
                        alertName: "",
                        alertSeverity: "",
                        rule: [
                          {
                            ruleName: "",
                            threshold: "",
                          }
                        ]
                      }])
                    }}>
                      <i className="bi bi-plus-circle text-white me-2" style={{ background: "transparent" }}></i>
                      <span className="text-white" style={{ background: "transparent" }}>Add new alert</span>
                    </button>
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default Setting
