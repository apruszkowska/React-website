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
import ModalMUI from "../others/ModalMUI";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";

export const OneId = () => {
  const { id } = useParams();

  const [open, setOpen] = React.useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };
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

  const deleteAndClose = () => {
    deleteClientById(user.id);
    handleClose();
  };
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
          <div>
            <Button
              variant="contained"
              startIcon={<DeleteIcon />}
              onClick={handleClickOpen}
            >
              Usuń
            </Button>
            <Dialog
              open={open}
              onClose={handleClose}
              aria-labelledby="alert-dialog-title"
              aria-describedby="alert-dialog-description"
            >
              <DialogTitle id="alert-dialog-title">
                {"Usunięcie użytkownika"}
              </DialogTitle>
              <DialogContent>
                <DialogContentText id="alert-dialog-description">
                  Czy na pewno chcesz usunąć danego użytkownika?
                </DialogContentText>
              </DialogContent>
              <DialogActions>
                <Button onClick={deleteAndClose}>Tak, usuń</Button>
                <Button onClick={handleClose} autoFocus>
                  Nie, nie usuwaj
                </Button>
              </DialogActions>
            </Dialog>
          </div>
        </div>
      </div>
    </div>
  );
};
