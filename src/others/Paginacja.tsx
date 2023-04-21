import React from "react";
import { useEffect, useState } from "react";
import PaginacjaStyles from "./Paginacja.module.css";

interface Pages {
  postsPerPage: number;
  totalPosts: number;
  paginate: any;
  currentPage: any;
}

export const Paginacja = ({
  postsPerPage,
  totalPosts,
  paginate,
  currentPage,
}: Pages) => {
  const pageNumbers = [];
  const [showPrev, setPrev] = useState(false);
  const [showNext, setNext] = useState(false);

  for (let i = 1; i <= Math.ceil(totalPosts / postsPerPage); i++) {
    pageNumbers.push(i);
  }

  const prev = () => (
    <a onClick={() => paginate(currentPage - 1)} href="!#">
      Prev
    </a>
  );

  const next = () => (
    <a onClick={() => paginate(currentPage + 1)} href="!#">
      Next
    </a>
  );

  useEffect(() => {
    if (currentPage - 1 > 0) {
      setPrev(true);
    } else {
      setPrev(false);
    }

    if (currentPage !== pageNumbers.length) {
      setNext(true);
    } else {
      setNext(false);
    }
  }, [currentPage, pageNumbers.length]);

  const liRender = (number: number) => (
    <li key={number} className="page-item">
      <a
        onClick={() => paginate(number)}
        href="!#"
        className={PaginacjaStyles.pageLink}
      >
        {number}
      </a>
    </li>
  );

  return (
    <nav>
      {showPrev && prev()}
      <ul className="pagination">
        {pageNumbers.map((number) => {
          if (currentPage === number) {
            return (
              <li key={number} className="page-item">
                <a
                  onClick={() => paginate(number)}
                  href="!#"
                  className="page-link  page-item-active"
                >
                  {number}
                </a>
              </li>
            );
          }

          return liRender(number);
        })}
      </ul>
      {showNext && next()}
    </nav>
  );
};
