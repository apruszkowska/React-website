import React from "react";
import { useFormik, FormikProps } from "formik";
import TextField from "@mui/material/TextField";
import * as yup from "yup";
import { addClient, getClientById, updateClientById } from "../api/clients";
import { useParams } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import { Client, clientSchema } from "../api/clients";
import { useQueryClient } from "@tanstack/react-query";
import { useMutation } from "@tanstack/react-query";

const FormInput = ({
  formik,
  accessor,
}: {
  formik: FormikProps<Client>;
  accessor: keyof Client;
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

export const EditClient = () => {
  const { id } = useParams();
  const { data, isLoading, error } = useQuery(
    ["clients", id],
    async () => {
      if (id) {
        const repsonse = await getClientById(id);
        return repsonse;
      }
    },
    {
      enabled: !!id,
    }
  );

  const queryClient = useQueryClient();

  const mutation = useMutation(
    async ({ values, id }: { values: Client; id: string }) => {
      return await updateClientById(values, id);
    },
    {
      onSuccess: () => {
        // rewalidacja i pobranie ponownie zapytania pod kluczem orders
        queryClient.invalidateQueries(["clients"]);
      },
      onError: () => {
        console.log("Cos poszlo nie tak");
      },
    }
  );
  const formik = useFormik<Client>({
    initialValues: data || {
      name: "",
      surname: "",
      street: "",
      postalCode: "",
      city: "",
      region: "",
      photoLink: "",
      phone: "",
    },
    enableReinitialize: true,
    onSubmit: (values: Client) => {
      if (id) {
        updateClientById(values, id).then((data) => {
          console.log("success", data);
        });
      }
      // alert(JSON.stringify(values, null, 8));
    },
    validationSchema: clientSchema,
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
      <button type="submit">Save</button>
    </form>
  );
};
