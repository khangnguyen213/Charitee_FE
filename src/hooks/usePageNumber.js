import { useState } from "react";

const usePageNumber = () => {
  const [pageNumber, setPageNumber] = useState(1);
  const [totalPage, setTotalPage] = useState(1);
  const prevPageHandler = () => {
    if (pageNumber > 1) {
      setPageNumber((prevState) => --prevState);
    }
  };
  const nextPageHandler = () => {
    if (pageNumber < totalPage) {
      setPageNumber((prevState) => ++prevState);
    }
  };
  const customPageHandler = (page) => {
    setPageNumber(page);
  };
  return {
    totalPage,
    setTotalPage,
    pageNumber,
    setPageNumber,
    prevPageHandler,
    nextPageHandler,
    customPageHandler,
  };
};

export { usePageNumber };
