import React from "react";
import { useFormik, FormikProps } from "formik";
import * as yup from "yup";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import TextField from "@mui/material/TextField";
import { useUsersContext } from "../contexts/UserContext";

const yupSchema = yup.object({
  login: yup.string().required("Login jest wymagane"),
  password: yup.string().min(8).max(32).required("Password jest wymagane"),
});

type FormValues = yup.InferType<typeof yupSchema>;

const FormInput = ({
  formik,
  accessor,
}: {
  formik: FormikProps<FormValues>;
  accessor: keyof FormValues;
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

export const FakeLogin = () => {
  const { logIn } = useUsersContext();

  const formik = useFormik<FormValues>({
    initialValues: {
      login: "",
      password: "",
    },
    validationSchema: yupSchema,
    onSubmit: (values: FormValues) => {
      logIn(values.login, values.password);
    },
  });

  return (
    <form onSubmit={formik.handleSubmit}>
      <label htmlFor="form">Login</label>
      <FormInput formik={formik} accessor="login" />
      <FormInput formik={formik} accessor="password" />
      <button type="submit">Login</button>
    </form>
  );
};
