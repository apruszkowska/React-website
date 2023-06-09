import "./App.css";
import { SingleOrder } from "./orders/SingleOrder";
import {
  BrowserRouter,
  Route,
  Routes,
  Link,
  useParams,
} from "react-router-dom";
// import { AddClients } from "./clientss/AddClients";
// import { AddOrders } from "./orders/AddOrders";
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
import ErrorBoundary from "./ErrorBoundary/ErrorBoundary";
import { lazy, Suspense } from "react";

// lazy loading
const AddClients = lazy(() => import("./clientss/AddClients"));
const AddOrders = lazy(() => import("./orders/AddOrders"));

function App() {
  return (
    <ThemeProvider>
      <UsersProvider>
        <ErrorBoundary>
          <Home />
          <Routes>
            <Route path="/" />
            <Route path="clients">
              <Route index element={<Users />} />
              <Route
                path="add"
                element={
                  <Suspense>
                    <AddClients />
                  </Suspense>
                }
              />
              <Route path=":id">
                <Route index element={<OneId />} />
                <Route path="edit" element={<EditClient />} />
              </Route>
            </Route>

            <Route path="orders">
              <Route index element={<Orders />} />
              <Route
                path="add"
                element={
                  <Suspense>
                    <AddOrders />
                  </Suspense>
                }
              />
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
        </ErrorBoundary>
      </UsersProvider>
    </ThemeProvider>
  );
}

export default App;
