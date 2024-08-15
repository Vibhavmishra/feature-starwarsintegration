// src/components/Pagination.js
import React from 'react';
import ReactPaginate from 'react-paginate';

const Pagination = ({ page, setPage }) => {
  const handlePageClick = (data) => {
    setPage(data.selected + 1);
  };

  return (
    <ReactPaginate
      previousLabel={'previous'}
      nextLabel={'next'}
      breakLabel={'...'}
      breakClassName={'break-me'}
      pageCount={9}
      marginPagesDisplayed={2}
      pageRangeDisplayed={3}
      onPageChange={handlePageClick}
      containerClassName={'pagination'}
      subContainerClassName={'pages pagination'}
      activeClassName={'active'}
    />
  );
};

export default Pagination;
