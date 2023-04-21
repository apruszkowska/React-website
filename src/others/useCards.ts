import { useState } from "react";
import { cards } from "../constants";

export const useCards = () => {
  const [currentCards, setCurrentCards] = useState(cards);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const searchPhrase = e.target.value;
    if (searchPhrase === "") {
      setCurrentCards(cards);
    } else {
      const finded = currentCards.filter((card) => {
        return card.name.toLowerCase().includes(searchPhrase.toLowerCase());
      });
      setCurrentCards(finded);
    }
  };

  return { handleChange, currentCards };
};
