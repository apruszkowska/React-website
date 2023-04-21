import React from "react";
import { useParams, Link } from "react-router-dom";
import { cards } from "../constants";
import { useEffect, useState } from "react";
import {
  Client as ClientType,
  deleteClientById,
  getAllClients,
} from "../api/clients";
import { useQuery } from "@tanstack/react-query";
import { getClientById } from "../api/clients";

export const OneId = () => {
  const { id } = useParams();
  // const [users, setUsers] = useState<ClientType[]>([]);

  // useEffect(() => {
  //   getAllClients().then((data) => {
  //     setUsers(data);
  //   });
  // }, []);
  // console.log(users);
  // const user = users.find((el) => el.id === Number(id));

  const {
    data: user,
    isLoading,
    error,
  } = useQuery(
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

  if (!user) {
    return <p>Brak usera</p>;
  }
  return (
    <div className="users">
      <div className="users_list">
        <div className="users_card" key={user.id}>
          <img src={user.photoLink} alt="" width="200" height="200" />
          <p>{user.name}</p>
          <p>{user.surname}</p>
          <p>{user.street}</p>
          <p>{user.postalCode}</p>
          <p>{user.city}</p>
          <p>{user.region}</p>
          <p>{user.phone}</p>
        </div>
        <div>
          <button>
            <Link to={`/clients/${user.id}/edit`}>Edit</Link>
          </button>

          <button onClick={() => deleteClientById(user.id)}>Usuń</button>
        </div>
      </div>
    </div>
  );
};
