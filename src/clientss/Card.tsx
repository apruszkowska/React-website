import React from "react";
import personImage from "./assets/pobrane.png";
import { cards } from "../constants";
import { useParams } from "react-router-dom";

type Person = {
  imgSrc: string;
  name: string;
  surname: string;
  street: string;
  postCode: string;
  town: string;
  subRegion: string;
  phoneNumber: string;
  id?: any;
  key?: any;
};
export const Card = (props: Person) => {
  return (
    <section>
      <div>
        <img src={props.imgSrc} alt="" width="200" height="200" />
      </div>
      <div>
        <p>{props.name}</p>
        <p>{props.surname}</p>
        <p>{props.street}</p>
        <p>{props.postCode}</p>
        <p>{props.town}</p>
        <p>{props.subRegion}</p>
        <p>{props.phoneNumber}</p>
      </div>
    </section>
  );
};
