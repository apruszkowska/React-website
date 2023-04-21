import React from "react";
import { useFormik, FormikProps } from "formik";
import TextField from "@mui/material/TextField";
import * as yup from "yup";
import { addClient } from "../api/clients";

const phoneRegExp = /^\+?\d{2} ?\d{3} ?\d{3} ?\d{3}$/;
const postalCodeRegExp = /^[0-9]{2}-[0-9]{3}/;

const yupSchema = yup.object({
  name: yup.string().min(3, "Min 3 litery").required("Please supply your name"),
  surname: yup
    .string()
    .min(3, "Min 3 litery")
    .required("Please supply your surname"),
  street: yup
    .string()
    .min(5, "Min 5 litery")
    .required("Please supply your street"),
  postalCode: yup
    .string()
    .matches(postalCodeRegExp, "To nie kod pocztowy")
    .required("Please supply your postal code"),
  city: yup.string().required("Please supply your city"),
  region: yup.string(),
  photoLink: yup.string(),
  phone: yup.string().matches(phoneRegExp, "Not valid").required(),
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
        label={accessor}
        name={accessor}
        onChange={formik.handleChange}
        onBlur={formik.handleBlur}
        value={formik.values[accessor]}
      />
    </div>
  );
};

export const AddClients = () => {
  const formik = useFormik<FormValues>({
    initialValues: {
      name: "",
      surname: "",
      street: "",
      postalCode: "",
      city: "",
      region: "",
      photoLink: "",
      phone: "",
    },
    onSubmit: (values: FormValues) => {
      addClient(values).then((data) => {
        console.log("success", data);
      });
      // alert(JSON.stringify(values, null, 8));
    },
    validationSchema: yupSchema,
  });

  return (
    <form onSubmit={formik.handleSubmit}>
      <FormInput formik={formik} accessor="name" />
      <FormInput formik={formik} accessor="surname" />
      <FormInput formik={formik} accessor="street" />
      <FormInput formik={formik} accessor="postalCode" />
      <FormInput formik={formik} accessor="city" />
      <FormInput formik={formik} accessor="region" />
      <FormInput formik={formik} accessor="photoLink" />
      <FormInput formik={formik} accessor="phone" />
      <button type="submit">Send</button>
    </form>
  );
};
