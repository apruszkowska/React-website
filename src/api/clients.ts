import * as yup from "yup";
const phoneRegExp = /^\+?\d{2} ?\d{3} ?\d{3} ?\d{3}$/;
const postalCodeRegExp = /^[0-9]{2}-[0-9]{3}/;

export const clientSchema = yup.object({
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

export type Client = yup.InferType<typeof clientSchema>;
export type ClientWithId = Client & { id: number };

export const getAllClients = async () => {
  const response = await fetch(`http://localhost:3000/clients`);
  if (!response.ok) {
    return [] as ClientWithId[];
  }
  const data = await response.json();
  return data as ClientWithId[];
};

export const getClientByPhoneNumber = async (phoneNum: string) => {
  const params = new URLSearchParams({ phoneNumber: phoneNum });
  const response = await fetch(`http://localhost:3000/clients?` + params);
  if (!response.ok) {
    return {} as ClientWithId;
  }
  const data = await response.json();
  return data as ClientWithId;
};

export const getClientById = async (id: string) => {
  const response = await fetch(`http://localhost:3000/clients/${id}`);
  if (!response.ok) {
    return {} as ClientWithId;
  }
  const data = await response.json();
  return data as ClientWithId;
};

export const updateClientById = async (
  updateClientData: Client,
  id: string
) => {
  const response = await fetch(`http://localhost:3000/clients/${id}`, {
    method: "PUT",
    headers: { "Content-type": "application/json;charset=UTF-8" },
    body: JSON.stringify(updateClientData),
  });
  const data = await response.json();
  return data;
};

export const deleteClientById = async (id: number) => {
  const response = await fetch(`http://localhost:3000/clients/${id}`, {
    method: "DELETE",
    body: JSON.stringify({ data: id }),
  });
  const data = await response.json();
  return data;
};

export const addClient = async (newClient: Client) => {
  const response = await fetch(`http://localhost:3000/clients`, {
    method: "POST",
    headers: { "Content-type": "application/json;charset=UTF-8" },
    body: JSON.stringify(newClient),
  });
  if (!response.ok) {
    return {};
  }
  const data = await response.json();
  return data as Client;
};

// npx json-server --watch db.json
