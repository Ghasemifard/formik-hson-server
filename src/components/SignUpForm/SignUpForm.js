import axios from "axios";
import { useEffect, useState } from "react";
import * as yup from "yup";
import Input from "../common/Input";
import { useFormik, FormikProvider } from "formik";
import RadioInput from "../common/RadioInput";
import Select from "../common/SelectInput";
import CheckBox from "../common/checkBoxInput";
import BooleanCheckBox from "../common/BooleanCheckBox";

// const savedData = {
//   name: "Mehdi ghasemifard",
//   email: "ghasemifard_mehdi@yahoo.com",
//   phoneNumber: "09168026155",
//   password: "Mehdi@123",
//   passwordConfirm: "Mehdi@123",
//   gender: "0",
// };
const radioOptions = [
  { label: "Male", value: "0" },
  { label: "Female", value: "1" },
];
const selectOptions = [
  { label: "Select nationality...", value: "" },
  { label: "Iran", value: "IR" },
  { label: "Germany", value: "GER" },
  { label: "USA", value: "US" },
];
const checkBoxOptions = [
  { label: "React.js", value: "React.js" },
  { label: "Veu.js", value: "Veu.js" },
];

// 1. managing state
const initialValues = {
  name: "",
  email: "",
  password: "",
  phoneNumber: "",
  passwordConfirm: "",
  gender: "",
  nationality: "",
  intrests: [],
  terms: false,
};

// 2. handling form submit
const onSubmit = (values) => {
  // console.log(values);
  axios
    .post("http://localhost:3001/users", values)
    .then((res) => console.log(res.data))
    .catch((err) => console.log(err.response.data));
};

// 3. validation
// before yup
// const validate = (values) => {
//   let errors = {};
// if (!values.name) {
//     errors.name="Name Is Required"
// }
// if (!values.email) {
//     errors.email="Email Is Required"
// }
// if (!values.password) {
//     errors.password="Password Is Required"
// }
//   return errors
// };
const validationSchema = yup.object({
  name: yup
    .string()
    .required("Name is required")
    .min(6, "Name length is not valid"),
  email: yup
    .string()
    .required("Email is required")
    .email("Invalid email format"),
  phoneNumber: yup
    .string()
    .required("Phone Number is required")
    .matches(/^[0-9]{11}$/, "Invalid Phone Number"),
  password: yup
    .string()
    .required("Password is required")
    .matches(
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#\$%\^&\*])(?=.{8,})/,
      "Must Contain 8 Characters, One Uppercase, One Lowercase, One Number and One Special Case Character"
    ),
  passwordConfirm: yup
    .string()
    .required("Password is required")
    .oneOf([yup.ref("password"), null], "Passwords must match"),
  gender: yup.string().required("gender is required"),
  nationality: yup.string().required("select nationality !"),
  intrests: yup.array().min(1).required("At least select one experties."),
  terms: yup
    .boolean()
    .required("The terms and conditions must be accepted.")
    .oneOf([true], "The terms and conditions must be accepted."),
});

const SignUpForm = () => {
  const [formValues, setFormVales] = useState(null);
  // before use formik
  //   const [userData, setUserData] = useState({
  //     name: "",
  //     email: "",
  //     password: "",
  //   });
  //   const changeHandler = ({ target }) => {
  //     setUserData({ ...userData, [target.name]: target.value });
  //   };

  // formik
  // 1. managing state
  // 2. handling form submission
  // 3. validation - error message\
  const formik = useFormik({
    initialValues: formValues || initialValues,
    onSubmit,
    validationSchema,
    validateOnMount: true,
    enableReinitialize: true,
  }); // key=value => one of them
  //    console.log(formik.errors);

  //   const submitHandler = (e) => {
  //     e.preventDefault();
  //     console.log("submitted....");
  //   };
  // console.log(formik);

  useEffect(() => {
    axios
      .get("http://localhost:3001/users/1")
      .then((res) => {
        // console.log(res.data);
        setFormVales(res.data);
      })
      .catch((err) => console.log(err));
  }, []);
  return (
    <FormikProvider value={formik}>
      <div>
        <form onSubmit={formik.handleSubmit}>
          {/* <div className="formControl">
          <label>Name</label>
          <input
            type="text"
            name="name"
            // value={formik.values.name}
            // onChange={formik.handleChange}
            // onBlur={formik.handleBlur}
            {...formik.getFieldProps("name")}
          />
          {formik.errors.name && formik.touched.name && (
            <div className="error">{formik.errors.name}</div>
          )}
        </div> */}
          <Input formik={formik} name="name" label="Name" />

          {/* <div className="formControl">
          <label>Email</label>
          <input
            type="text"
            name="email"
            // value={formik.values.email}
            // onChange={formik.handleChange}
            // onBlur={formik.handleBlur}
            {...formik.getFieldProps("email")}
          />
          {formik.errors.email && formik.touched.email && (
            <div className="error">{formik.errors.email}</div>
          )}
        </div> */}
          <Input formik={formik} name="email" label="Email" />

          {/* <div className="formControl">
          <label>Phone Number</label>
          <input
            type="text"
            name="phoneNumber"
            {...formik.getFieldProps("phoneNumber")}
          />
          {formik.errors.phoneNumber && formik.touched.phoneNumber && (
            <div className="error">{formik.errors.phoneNumber}</div>
          )}
        </div> */}
          <Input formik={formik} name="phoneNumber" label="Phone Number" />

          {/* <div className="formControl">
          <label>Password</label>
          <input
            type="text"
            name="password"
            // value={formik.values.password}
            // onChange={formik.handleChange}
            // onBlur={formik.handleBlur}
            {...formik.getFieldProps("password")}
          />
          {formik.errors.password && formik.touched.password && (
            <div className="error">{formik.errors.password}</div>
          )}
        </div> */}
          <Input
            formik={formik}
            name="password"
            label="Password"
            type="password"
          />

          {/* <div className="formControl">
          <label>Password Confirmation</label>
          <input
            type="text"
            name="passwordConfirm"
            {...formik.getFieldProps("passwordConfirm")}
          />
          {formik.errors.passwordConfirm && formik.touched.passwordConfirm && (
            <div className="error">{formik.errors.passwordConfirm}</div>
          )}
        </div> */}
          <Input
            formik={formik}
            name="passwordConfirm"
            label="Password Confirm"
            type="password"
          />

          {/* <div className="formControl">
            <input
              type="radio"
              id="0"
              name="gender"
              value="0"
              onChange={formik.handleChange}
              checked={formik.values.gender === "0"}
            />
            <label htmlFor="0">Male</label>

            <input
              type="radio"
              id="1"
              name="gender"
              value="1"
              checked={formik.values.gender === "1"}
              onChange={formik.handleChange}
            />
            <label htmlFor="1">Female</label>
            {formik.errors.gender && formik.values.passwordConfirm && (
              <div className="error">{formik.errors.gender}</div>
            )}
          </div> */}

          <RadioInput
            formik={formik}
            radioOptions={radioOptions}
            name="gender"
          />

          <Select
            formik={formik}
            selectOptions={selectOptions}
            name="nationality"
          />
          <CheckBox
            formik={formik}
            checkBoxOptions={checkBoxOptions}
            name="intrests"
          />

          {/* <div className="formControl">
            <input
              type="checkbox"
              id="terms"
              name="terms"
              value={true}
              onChange={formik.handleChange}
              checked={formik.values.terms}
            />
            <label htmlFor="terms">Terms and conditions</label>
            {formik.errors.terms && formik.values.terms && (
              <div className="error">{formik.errors.terms}</div>
            )}
          </div> */}
          <BooleanCheckBox formik={formik} name="terms" label="Terms and condition"/>

          {/* <button onClick={() => setFormVales(savedData)}>load data </button> */}
          <button type="submit" disabled={!formik.isValid}>
            submit
          </button>
        </form>
      </div>
    </FormikProvider>
  );
};

export default SignUpForm;
