import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { DisabledByDefault } from "@mui/icons-material";
import { Client as ClientType, getAllClients } from "../api/clients";
import { cards } from "../constants";
import { Link } from "react-router-dom";
import ClientStyles from "./UserId.module.css";
import { useQuery } from "@tanstack/react-query";
import { useThemeContext } from "../contexts/ThemeContext";

// export type Person = {
//   imgSrc: string;
//   name: string;
//   surname: string;
//   street: string;
//   postCode: string;
//   town: string;
//   subRegion: string;
//   phoneNumber: string;
// };

export const Users = () => {
  const { isDarkTheme, setIsDarkTheme } = useThemeContext();
  console.log(isDarkTheme);
  // const [users, setUsers] = useState<ClientType[]>([]);

  // useEffect(() => {
  //   getAllClients().then((data) => {
  //     setUsers(data);
  //   });
  // }, []);
  // console.log(users);

  // return (
  // <div>
  //   <div className={ClientStyles.clients}>
  //     {users &&
  //       users.map((user) => (
  //         <div className={ClientStyles.users_card} key={user.id}>
  //           <Link to={`/clients/${user.id}`}>
  //             <img src={user.photoLink} alt="" width="200" height="200" />
  //           </Link>
  //           <div></div>
  //           <p className={ClientStyles.nameAndSurname}>{user.name}&nbsp;</p>
  //           <p className={ClientStyles.nameAndSurname}> {user.surname}</p>
  //           <p>{user.street}</p>
  //           <p>{user.postalCode}</p>
  //           <p>{user.city}</p>
  //           <p>{user.region}</p>
  //           <p>{user.phone}</p>
  //         </div>
  //       ))}
  //   </div>
  // </div>
  // );

  // cachowanie
  // const clientsQuery = useQuery({
  //   queryKey: ["clients"],
  //   queryFn: getAllClients,
  //   placeholderData: [{ id: 1, title: "Initial Data" }],
  // });

  // if (clientsQuery.status === "loading") return <h1>Loading...</h1>;
  // if (clientsQuery.status === "error") {
  //   return <h1>{JSON.stringify(clientsQuery.error)}</h1>;
  // }

  const { data, isLoading, error } = useQuery(["clients"], getAllClients);
  if (error || !data) {
    return <p>Cannot get orders</p>;
  }
  if (isLoading) {
    return <p>Loading...</p>;
  }

  return (
    <div className={ClientStyles.clients}>
      {data.map((user) => (
        <div className={ClientStyles.users_card} key={user.id}>
          <Link to={`/clients/${user.id}`}>
            <img src={user.photoLink} alt="" width="200" height="200" />
          </Link>
          <div></div>
          <p className={ClientStyles.nameAndSurname}>{user.name}&nbsp;</p>
          <p className={ClientStyles.nameAndSurname}> {user.surname}</p>
          <p>{user.street}</p>
          <p>{user.postalCode}</p>
          <p>{user.city}</p>
          <p>{user.region}</p>
          <p>{user.phone}</p>
        </div>
      ))}
    </div>
  );
};
