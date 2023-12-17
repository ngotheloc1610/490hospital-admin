import Layout from "../../components/Layout";
import { useEffect, useState } from "react";
import { ICON_TRASH } from "../../assets";
import { defineConfigPost } from "../../Common/utils";
import axios from "axios";
import { API_ALERT_ALL, API_ALERT_BLOOD_GLUCOSE, API_ALERT_BLOOD_PRESSURE, API_ALERT_BMI, API_ALERT_HEART_RATE, API_ALERT_TEMPERATURE } from "../../constants/api.constant";
import { ALERT_STATUS, RULE_BLOOD_GLUCOSE, RULE_BLOOD_PRESSURE, RULE_BMI, RULE_HEART_RATE, RULE_TEMPERATURE } from "../../constants";
import { success } from "../../Common/notify";
import PopUpAlert from "../../components/common/PopUpAlert";
import { useAppSelector } from "../../redux/hooks";


const Setting = () => {

  const url_api = process.env.REACT_APP_API_URL;

  const [listBloodPressure, setListBloodPressure] = useState<any>([{
    alertName: "",
    alertSeverity: "",
    rule: [
      {
        ruleName: "",
        threshold: "",
      }
    ]
  }])
  const [listBloodGlucose, setListBloodGlucose] = useState<any>([{
    alertName: "",
    alertSeverity: "",
    rule: [
      {
        ruleName: "",
        threshold: "",
      }
    ]
  }])
  const [listHeartRate, setListHeartRate] = useState<any>([{
    alertName: "",
    alertSeverity: "",
    rule: [
      {
        ruleName: "",
        threshold: "",
      }
    ]
  }])
  const [listTemperature, setListTemperature] = useState<any>([{
    alertName: "",
    alertSeverity: "",
    rule: [
      {
        ruleName: "",
        threshold: "",
      }
    ]
  }])
  const [listBMI, setListBMI] = useState<any>([{
    alertName: "",
    alertSeverity: "",
    rule: [
      {
        ruleName: "",
        threshold: "",
      }
    ]
  }])

  const [isShowPopUpAlert, setIsShowPopUpAlert] = useState<boolean>(false);
  const [idAlert, setIdAlert] = useState("");

  const { isDelete } = useAppSelector(state => state.alertSlice)

  useEffect(() => {
    getAllAlertSetting()
  }, [isDelete])

  const getAllAlertSetting = () => {
    const url = `${url_api}${API_ALERT_ALL}`;

    axios
      .get(url, defineConfigPost())
      .then((resp: any) => {
        if (resp) {
          const data = resp.data;

          let bloodPressure: any = [];
          let bloodGlucose: any = [];
          let heartRate: any = [];
          let temperature: any = [];
          let bmi: any = [];

          data.forEach((item: any) => {
            let rulePressure: any = []
            let ruleGlucose: any = []
            let ruleHeart: any = []
            let ruleTemperature: any = []
            let ruleBMI: any = []

            if (item.category === "Blood Pressure") {

              item.ruleList.forEach((rule: any) => {
                rulePressure.push({
                  ruleName: `${rule.type} ${rule.rule}`,
                  threshold: rule.threshold,
                })
              })

              bloodPressure.push({
                id: item?.id,
                alertName: item.alertName,
                alertSeverity: item.severity,
                rule: rulePressure
              })
            }

            if (item.category === "Blood Glucose") {

              item.ruleList.forEach((rule: any) => {
                ruleGlucose.push({
                  ruleName: `${rule.type} ${rule.rule}`,
                  threshold: rule.threshold,
                })
              })

              bloodGlucose.push({
                id: item?.id,
                alertName: item.alertName,
                alertSeverity: item.severity,
                rule: ruleGlucose
              })
            }

            if (item.category === "Heart Rate") {

              item.ruleList.forEach((rule: any) => {
                ruleHeart.push({
                  ruleName: `${rule.type} ${rule.rule}`,
                  threshold: rule.threshold,
                })
              })

              heartRate.push({
                id: item?.id,
                alertName: item.alertName,
                alertSeverity: item.severity,
                rule: ruleHeart
              })
            }

            if (item.category === "Temperature") {

              item.ruleList.forEach((rule: any) => {
                ruleTemperature.push({
                  ruleName: `${rule.type} ${rule.rule}`,
                  threshold: rule.threshold,
                })
              })

              temperature.push({
                id: item?.id,
                alertName: item.alertName,
                alertSeverity: item.severity,
                rule: ruleTemperature
              })
            }

            if (item.category === "BMI") {
              item.ruleList.forEach((rule: any) => {
                ruleBMI.push({
                  ruleName: `${rule.type} ${rule.rule}`,
                  threshold: rule.threshold,
                })
              })

              bmi.push({
                id: item?.id,
                alertName: item.alertName,
                alertSeverity: item.severity,
                rule: ruleBMI
              })
            }
          })
          setListBloodPressure(bloodPressure)
          setListBloodGlucose(bloodGlucose)
          setListHeartRate(heartRate)
          setListBMI(bmi)
          setListTemperature(temperature)
        }
      })
      .catch((err: any) => {
        console.log("error create alert blood pressure", err);
      });
  }

  const createAlertBloodPressure = (bloodItem: any, id: string) => {
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
      id: id ? id : null,
      category: "Blood Pressure",
      alertName: bloodItem.alertName,
      severity: bloodItem.alertSeverity,
      ruleList: ruleList
    };

    axios
      .post(url, params, defineConfigPost())
      .then((resp: any) => {
        if (resp) {
          success("Alert Blood Pressure successfully!")
        }
      })
      .catch((err: any) => {
        console.log("error create alert blood pressure", err);
      });
  }
  const createAlertBloodGlucose = (bloodItem: any, id: string) => {
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
      id: id ? id : null,
      category: "Blood Glucose",
      alertName: bloodItem.alertName,
      severity: bloodItem.alertSeverity,
      ruleList: ruleList
    };

    axios
      .post(url, params, defineConfigPost())
      .then((resp: any) => {
        if (resp) {
          success("Alert Blood Glucose successfully!")
        }
      })
      .catch((err: any) => {
        console.log("error create alert blood glucose", err);
      });
  }
  const createAlertHeartRate = (bloodItem: any, id: string) => {
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
      id: id ? id : null,
      category: "Heart Rate",
      alertName: bloodItem.alertName,
      severity: bloodItem.alertSeverity,
      ruleList: ruleList
    };

    axios
      .post(url, params, defineConfigPost())
      .then((resp: any) => {
        if (resp) {
          success("Alert Heart Rate successfully!")
        }
      })
      .catch((err: any) => {
        console.log("error create alert heart rate", err);
      });
  }
  const createAlertBMI = (bloodItem: any, id: string) => {
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
      id: id ? id : null,
      category: "BMI",
      alertName: bloodItem.alertName,
      severity: bloodItem.alertSeverity,
      ruleList: ruleList
    };

    axios
      .post(url, params, defineConfigPost())
      .then((resp: any) => {
        if (resp) {
          success("Alert BMI successfully!")
        }
      })
      .catch((err: any) => {
        console.log("error create alert bmi", err);
      });
  }
  const createAlertTemperature = (bloodItem: any, id: string) => {
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
      id: id ? id : null,
      category: "Temperature",
      alertName: bloodItem.alertName,
      severity: bloodItem.alertSeverity,
      ruleList: ruleList
    };

    axios
      .post(url, params, defineConfigPost())
      .then((resp: any) => {
        if (resp) {
          success("Alert Temperature successfully!")
        }
      })
      .catch((err: any) => {
        console.log("error create alert temperature", err);
      });
  }

  const applyBloodPressure = (item: any, id: string) => {
    createAlertBloodPressure(item, id);
  }
  const applyBloodGlucose = (item: any, id: string) => {
    createAlertBloodGlucose(item, id);
  }
  const applyHeartRate = (item: any, id: string) => {
    createAlertHeartRate(item, id);
  }
  const applyBMI = (item: any, id: string) => {
    createAlertBMI(item, id);
  }
  const applyTemperature = (item: any, id: string) => {
    createAlertTemperature(item, id);
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
                              <button type="button" className="button button--primary button--smaller me-1" onClick={() => {
                                applyBloodPressure(item, listBloodPressure[idx]?.id)
                              }}>
                                Apply for all patient
                              </button>
                              <button type="button" className="button button--deny button--smaller" onClick={() => {
                                setIsShowPopUpAlert(true);
                                setIdAlert(listBloodPressure[idx]?.id)
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
                              <button type="button" className="button button--primary button--smaller me-1" onClick={() => applyBloodGlucose(item, listBloodGlucose[idx]?.id)}>
                                Apply for all patient
                              </button>
                              <button type="button" className="button button--deny button--smaller" onClick={() => {
                                setIsShowPopUpAlert(true);
                                setIdAlert(listBloodGlucose[idx]?.id)
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
                              <button type="button" className="button button--primary button--smaller me-1" onClick={() => applyHeartRate(item, listHeartRate[idx]?.id)}>
                                Apply for all patient
                              </button>
                              <button type="button" className="button button--deny button--smaller" onClick={() => {
                                setIsShowPopUpAlert(true);
                                setIdAlert(listHeartRate[idx]?.id)
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
                              <button type="button" className="button button--primary button--smaller me-1" onClick={() => applyBMI(item, listBMI[idx]?.id)}>
                                Apply for all patient
                              </button>
                              <button type="button" className="button button--deny button--smaller" onClick={() => {
                                setIsShowPopUpAlert(true);
                                setIdAlert(listBMI[idx]?.id)
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
                              <button type="button" className="button button--primary button--smaller me-1" onClick={() => applyTemperature(item, listTemperature[idx]?.id)}>
                                Apply for all patient
                              </button>
                              <button type="button" className="button button--deny button--smaller" onClick={() => {
                                setIsShowPopUpAlert(true);
                                setIdAlert(listTemperature[idx]?.id)
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

      {isShowPopUpAlert && <PopUpAlert handleShowPopUp={setIsShowPopUpAlert} idAlertSetting={idAlert} />}
    </Layout>
  );
};

export default Setting
