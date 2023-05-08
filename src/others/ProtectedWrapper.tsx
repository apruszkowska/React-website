import React, { useEffect } from "react";
import { useUsersContext } from "../contexts/UserContext";
import { useNavigate } from "react-router-dom";

export const ProtectedWrapper = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const { isLoggedIn } = useUsersContext();

  const navigate = useNavigate();

  useEffect(() => {
    if (!isLoggedIn) {
      navigate("/");
    }
  }, [isLoggedIn]);
  return <>{children}</>;
};
