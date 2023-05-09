import React, { HTMLInputTypeAttribute } from "react";
import * as yup from "yup";
import { useForm } from "react-hook-form";
import { useFormik, FormikProps } from "formik";
import { yupResolver } from "@hookform/resolvers/yup";
import TextField from "@mui/material/TextField";
import { useUsersContext } from "../contexts/UserContext";
import { useNavigate } from "react-router-dom";
import Alert from "@mui/joy/Alert";

const yupSchema = yup.object({
  name: yup.string().required("Name jest wymagane"),
  surname: yup.string().required("Surname jest wymagane"),
  email: yup.string().email().required("Email jest wymagane"),
  login: yup.string().required("Login jest wymagane"),
  password: yup.string().min(8).max(32).required("Password jest wymagane"),
  retypePassword: yup
    .string()
    .required("Please retype your password.")
    .oneOf([yup.ref("password")], "Your passwords do not match."),
});

type FormValues = yup.InferType<typeof yupSchema>;

const FormInput = ({
  formik,
  accessor,
  type = "text",
}: {
  formik: FormikProps<FormValues>;
  accessor: keyof FormValues;
  type?: HTMLInputTypeAttribute;
}) => {
  return (
    <div>
      <TextField
        error={Boolean(formik.touched[accessor] && formik.errors[accessor])}
        helperText={
          formik.touched[accessor] && formik.errors[accessor]
            ? formik.errors[accessor]
            : null
        }
        id={accessor}
        type={accessor}
        label={accessor}
        name={accessor}
        onChange={formik.handleChange}
        onBlur={formik.handleBlur}
        value={formik.values[accessor]}
      />
    </div>
  );
};

export const FakeRegister = () => {
  const { addUser } = useUsersContext();
  const navigate = useNavigate();

  const formik = useFormik<FormValues>({
    initialValues: {
      name: "",
      surname: "",
      email: "",
      login: "",
      password: "",
      retypePassword: "",
    },
    validationSchema: yupSchema,
    onSubmit: (values: FormValues) => {
      addUser({ login: values.login, password: values.password });
      alert(
        "dziękuję za rejestrację zaraz zostaniesz przeniesiony na stronę z logowaniem"
      );
      navigate("/login");
    },
  });
  return (
    <form onSubmit={formik.handleSubmit}>
      <label htmlFor="form">Register</label>
      <FormInput formik={formik} accessor="name" />
      <FormInput formik={formik} accessor="surname" />
      <FormInput formik={formik} accessor="email" />
      <FormInput formik={formik} accessor="login" />
      <FormInput formik={formik} accessor="password" type="password" />
      <FormInput formik={formik} accessor="retypePassword" type="password" />
      <button type="submit">Register</button>
    </form>
  );
};
