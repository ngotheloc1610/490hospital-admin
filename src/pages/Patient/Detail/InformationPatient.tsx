import { useState } from "react";
import { Formik, Form, Field } from "formik";
import * as Yup from "yup";
import moment from 'moment';
import axios from "axios";

import { GENDER } from "../../../constants";
import { defineConfigPost } from "../../../Common/utils";
// import { API_CREATE_PATIENT } from "../../../constants/api.constant";
import { success } from "../../../Common/notify";

interface IPropInformationPatient { }

const SignupSchema = Yup.object().shape({
  // firstName: Yup.string()
  //   .min(2, "Too Short!")
  //   .max(50, "Too Long!")
  //   .required("Required"),
  // lastName: Yup.string()
  //   .min(2, "Too Short!")
  //   .max(50, "Too Long!")
  //   .required("Required"),
  // email: Yup.string().email("Invalid email").required("Required"),
});

const InformationPatient = (props: IPropInformationPatient) => {
  const [birthday, setBirthday] = useState<any>("")

  const convertDateToTimeStamp = (value: string, time: string) => {
    const newDate = `${value} ${time}`
    console.log(Date.parse(newDate));

    return Date.parse(newDate);
  }

  const handleChangeBirthday = (value: any) => {
    setBirthday(convertDateToTimeStamp(value, "00:00:00"))
  }


  const handleCreatePatient = (param: any) => {
    // const params = {
    //   identifier: [],
    //   active: true,
    //   name: [

    //   ],
    //   telecom: [

    //   ]
    // }


    // const url = `${process.env.REACT_APP_API_URL}${API_CREATE_PATIENT}`;

    // axios.post(url, params, defineConfigPost()).then(resp => {
    //   success("Create Successfully");
    // }).catch(err => {
    //   console.log("err:", err)
    // })
  }

  return (
    <section className="info-patient">
      <div className="info-patient-title mb-3">
        <h3>add new</h3>
      </div>

      <div className="info-patient-content">
        <p className="fs-5">Basic information</p>
        <Formik
          initialValues={{
            name: "",
            birthday: "",
            gender: "male",
            phoneNumber: "",
            email: "",
            residence: "",
            city: "",
          }}

          validationSchema={SignupSchema}
          onSubmit={(values: any) => {
            handleCreatePatient(values)
            console.log(values);
          }}
        >
          {({ setFieldValue }) => {
            return <Form>
              <div>
                <div className="row">
                  <div className="col-12 mb-3">
                    <label htmlFor="name">
                      Name <span className="text-danger">*</span>
                    </label>
                    <Field name="name" id="name" className="form-control" />
                  </div>
                  <div className="col-6 mb-3">
                    <label htmlFor="birthday">
                      Date of birth <span className="text-danger">*</span>
                    </label>
                    <input
                      type="date"
                      className="form-control input-select"
                      value={birthday ? moment(birthday).format("YYYY-MM-DD") : ''}
                      max="9999-12-31"
                      onChange={(e: any) => { handleChangeBirthday(e.target.value); setFieldValue("birthday", e.target.value) }}
                    />

                  </div>
                  <div className="col-6 mb-3">
                    <label htmlFor="gender">
                      Gender <span className="text-danger">*</span>
                    </label>
                    <Field
                      as="select"
                      name="gender"
                      id="gender"
                      className="form-select"
                      InputProps={{ onchange }}
                    >
                      {GENDER.map((item: any) => (
                        <option value={item.code} key={item.code}>
                          {item.name}
                        </option>
                      ))}
                    </Field>

                  </div>
                  <div className="col-6 mb-3">
                    <label htmlFor="residence">
                      Current residence <span className="text-danger">*</span>
                    </label>
                    <Field
                      name="residence"
                      type="text"
                      id="residence"
                      className="form-control"
                      InputProps={{ onchange }}
                    />

                  </div>
                  <div className="col-6 mb-3">
                    <label htmlFor="city">
                      Citizen identification{" "}
                      <span className="text-danger">*</span>
                    </label>
                    <Field
                      name="city"
                      type="text"
                      id="city"
                      className="form-control"
                      InputProps={{ onchange }}
                    />

                  </div>
                  <div className="col-6 mb-3">
                    <label htmlFor="phoneNumber">
                      Phone number <span className="text-danger">*</span>
                    </label>
                    <Field
                      name="phoneNumber"
                      type="text"
                      id="phoneNumber"
                      className="form-control"
                      InputProps={{ onchange }}
                    />

                  </div>
                  <div className="col-6 mb-3">
                    <label htmlFor="email">
                      Email address <span className="text-danger">*</span>
                    </label>
                    <Field
                      name="email"
                      type="email"
                      id="email"
                      className="form-control"
                      InputProps={{ onchange }}
                    />

                  </div>
                </div>
              </div>

              <div className="mt-3 d-block ms-auto">
                <button
                  className="button button--small button--danger me-3"
                // style={{ width: "10%" }}
                >
                  Delete
                </button>

                <button
                  className="button button--small button--primary"
                // style={{ width: "10%" }}
                >
                  Save
                </button>
              </div>
            </Form>

          }}
        </Formik>
      </div>
    </section>
  );
};

export default InformationPatient;
