import React from "react";
import { BsFillPeopleFill } from "react-icons/bs";
import { BsFillBagCheckFill } from "react-icons/bs";
import { BsFillFileEarmarkRuledFill } from "react-icons/bs";
import { BsFillHddRackFill } from "react-icons/bs";

const menuData = [
  {
    linkName: "Clients",
    link: "/clients",
    icon: <BsFillPeopleFill />,
  },
  {
    linkName: "Orders",
    link: "/orders",
    icon: <BsFillBagCheckFill />,
  },
  {
    linkName: "Facture",
    link: "/invoices",
    icon: <BsFillFileEarmarkRuledFill />,
  },
  {
    linkName: "Posts",
    link: "/posts",
    icon: <BsFillHddRackFill />,
  },
];

export const AsideMenu = () => {
  return (
    <div className="menu" style={{ display: "flex" }}>
      {menuData.map(({ icon, link, linkName }) => {
        return (
          <ul>
            <li>{icon}</li>
            <li>{link}</li>
            <li>{linkName}</li>
          </ul>
        );
      })}
    </div>
  );
};
