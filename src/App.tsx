import { useState } from "react";
import "./App.css";
import { AsideMenu } from "./others/AsideMenu";
import { HooksDrugie } from "./others/HooksDrugie";
import { Hooks } from "./others/Hooks";
import { SingleOrder } from "./orders/SingleOrder";
import {
  BrowserRouter,
  Route,
  Routes,
  Link,
  useParams,
} from "react-router-dom";
import { AddClients } from "./clientss/AddClients";
import { AddOrders } from "./orders/AddOrders";
import { Card } from "./clientss/Card";
import { useCards } from "./others/useCards";
import { Home } from "./routingLinks/Home";
import { Orders } from "./orders/Order";
import { Users } from "./clientss/Users";
import { OneId } from "./clientss/OneId";
import { Add } from "@mui/icons-material";
import { FakeRegister } from "./registerForm/FakeRegister";
import { FakeLogin } from "./loginForm/FakeLogin";
import { EditClient } from "./clientss/EditClient";
import { ThemeProvider } from "./contexts/ThemeContext";
import { UsersProvider } from "./contexts/UserContext";
import { ProtectedWrapper } from "./others/ProtectedWrapper";

function App() {
  return (
    <ThemeProvider>
      <UsersProvider>
        <Home />
        <Routes>
          <Route path="/" />
          <Route path="clients">
            <Route index element={<Users />} />
            <Route path="add" element={<AddClients />} />
            <Route path=":id">
              <Route index element={<OneId />} />
              <Route path="edit" element={<EditClient />} />
            </Route>
          </Route>

          <Route path="orders">
            <Route index element={<Orders />} />
            <Route path="add" element={<AddOrders />} />
            <Route path=":id" element={<SingleOrder />} />
          </Route>

          <Route
            path="invoices"
            element={
              <ProtectedWrapper>
                <EditClient />
              </ProtectedWrapper>
            }
          />
          <Route path="login" element={<FakeLogin />} />
          <Route path="register" element={<FakeRegister />} />
        </Routes>
      </UsersProvider>
    </ThemeProvider>
  );
}

export default App;
