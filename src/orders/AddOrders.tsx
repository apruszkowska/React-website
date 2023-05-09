import React, { useEffect, useState, useRef } from "react";
import { useFormik, FormikProps } from "formik";
import TextField from "@mui/material/TextField";
import FormControl from "@mui/material/FormControl";
import InputLabel from "@mui/material/InputLabel";
import Select from "@mui/material/Select";
import MenuItem from "@mui/material/MenuItem";
import * as yup from "yup";
import "yup-phone";
// import { AddClients } from "./AddClients";
import { cards } from "../constants";
import { addOrder } from "../api/orders";
import { Client, getAllClients } from "../api/clients";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useNavigate } from "react-router-dom";

// const yupSchema = yup.object({
//   phone: yup.string().required("Please supply your phone to order"),
//   amount: yup.number().min(1).required("Please supply your amount of order"),
//   title: yup.string().required("Please supply your title of order"),
//   description: yup.string().required("Please supply your description"),
// });

// type FormValues = yup.InferType<typeof yupSchema>;

// function FormInput({
//   formik,
//   accessor,
// }: {
//   formik: FormikProps<FormValues>;
//   accessor: keyof FormValues;
// }) {
//   return (
//     <div>
//       <TextField
//         error={Boolean(formik.touched[accessor] && formik.errors[accessor])}
//         helperText={
//           formik.touched[accessor] && formik.errors[accessor]
//             ? formik.errors[accessor]
//             : null
//         }
//         id={accessor}
//         label={accessor}
//         name={accessor}
//         onChange={formik.handleChange}
//         onBlur={formik.handleBlur}
//         value={formik.values[accessor]}
//       />
//     </div>
//   );
// }

// export const AddOrders = () => {
//   const formik = useFormik<FormValues>({
//     initialValues: {
//       amount: 0,
//       title: "",
//       description: "",
//       phone: "",
//     },
//     onSubmit: (values: FormValues) => {
//       addOrder(values).then((data) => {
//         console.log("success", data);
//       });
//       //alert(JSON.stringify(values, null, 3));
//     },
//     validationSchema: yupSchema,
//   });

//   const [clients, setClients] = useState<Client[]>([]);

//   useEffect(() => {
//     getAllClients().then((data) => {
//       setClients(data);
//     });
//   }, []);

//   return (
//     <form onSubmit={formik.handleSubmit}>
//       <FormControl fullWidth>
//         <InputLabel id="phone">Name and Surname</InputLabel>
//         <Select
//           labelId="phone"
//           id="phone"
//           name="phone"
//           value={formik.values.phone}
//           label="phone"
//           onChange={formik.handleChange}
//         >
//           <MenuItem key={""} value={""}>
//             No Selected
//           </MenuItem>
//           {clients.map((client) => {
//             return (
//               <MenuItem
//                 key={client.id}
//                 value={client.phone}
//               >{`${client.name} ${client.surname}`}</MenuItem>
//             );
//           })}
//         </Select>
//       </FormControl>

//       <FormInput formik={formik} accessor="amount" />
//       <FormInput formik={formik} accessor="title" />
//       <FormInput formik={formik} accessor="description" />
//       <button type="submit">Send</button>
//     </form>
//   );
// };

const yupSchema = yup.object({
  phone: yup.string().required("Please supply your phone to order"),
  amount: yup.number().min(1).required("Please supply your amount of order"),
  title: yup.string().required("Please supply your title of order"),
  description: yup.string().required("Please supply your description"),
});

type FormValues = yup.InferType<typeof yupSchema>;

function FormInput({
  formik,
  accessor,
}: {
  formik: FormikProps<FormValues>;
  accessor: keyof FormValues;
}) {
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
}

export const AddOrders = () => {
  const formik = useFormik<FormValues>({
    initialValues: {
      amount: 0,
      title: "",
      description: "",
      phone: "",
    },
    onSubmit: (values: FormValues) => {
      addOrder(values).then((data) => {
        console.log("success", data);
      });
      //alert(JSON.stringify(values, null, 3));
    },
    validationSchema: yupSchema,
  });

  const [clients, setClients] = useState<Client[]>([]);

  useEffect(() => {
    getAllClients().then((data) => {
      setClients(data);
    });
  }, []);

  const queryClient = useQueryClient();

  const mutation = useMutation(
    async (values) => {
      return await addOrder(values);
    },
    {
      onSuccess: () => {
        // rewalidacja i pobranie ponownie zapytania pod kluczem orders
        queryClient.invalidateQueries(["orders"]);
      },
      onError: () => {
        console.log("Cos poszlo nie tak");
      },
    }
  );

  return (
    <form onSubmit={formik.handleSubmit}>
      <FormControl fullWidth>
        <InputLabel id="phone">Name and Surname</InputLabel>
        <Select
          labelId="phone"
          id="phone"
          name="phone"
          value={formik.values.phone}
          label="phone"
          onChange={formik.handleChange}
        >
          <MenuItem key={""} value={""}>
            No Selected
          </MenuItem>
          {clients.map((client) => {
            return (
              <MenuItem
                key={client.id}
                value={client.phone}
              >{`${client.name} ${client.surname}`}</MenuItem>
            );
          })}
        </Select>
      </FormControl>

      <FormInput formik={formik} accessor="amount" />
      <FormInput formik={formik} accessor="title" />
      <FormInput formik={formik} accessor="description" />
      <button type="submit">Send</button>
    </form>
  );
};
export default AddOrders;
