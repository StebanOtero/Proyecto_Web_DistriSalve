import React from "react";

export const Pagination = ({
  productsPerPage,
  totalProducts,
  currentPage,
  setcurrentPage,
}) => {
  const pageNumbers = [];
  //console.log(Math.ceil(totalProducts / productsPerPage));
  for (let i = 1; i <= Math.ceil(totalProducts / productsPerPage); i++) {
    pageNumbers.push(i);
  }
  const onPreviousPage = () => {
    setcurrentPage(currentPage - 1);
  };
  const onNextPage = () => {
    setcurrentPage(currentPage + 1);
  };
  const onSpecificPage = (n) => {
    setcurrentPage(n);
  };
  return (
    <nav
      className="pagination is-centered mb-6"
      role="navigation"
      aria-label="pagination"
    >
      <a
        href="#"
        className={`pagination-previous ${
          currentPage === 1 ? "is-disabled" : ""
        }`}
        onClick={onPreviousPage}
      >
        Anterior
      </a>
      <a
        href="#"
        className={`pagination-next ${
          currentPage >= pageNumbers.length ? "is-disabled" : ""
        }`}
        onClick={onNextPage}
      >
        Siguiente
      </a>
      <ul className="pagination-list">
        {pageNumbers.map((noPage) => (
          <li key={noPage}>
            <a
              href="#"
              className={`pagination-link ${
                noPage === currentPage ? "is-current" : ""
              }`}
              onClick={() => onSpecificPage(noPage)}
            >
              {noPage}
            </a>
          </li>
        ))}
      </ul>
    </nav>
  );
};
