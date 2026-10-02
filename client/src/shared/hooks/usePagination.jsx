import { useState, useMemo, useEffect } from "react";

const usePagination = (arrItems = [], itemsPerPage) => {
  const [currentPage, setCurrentPage] = useState(1);

  const safeItems = Array.isArray(arrItems) ? arrItems : [];

  const totalPages = Math.ceil(safeItems.length / itemsPerPage) || 1;


  useEffect(() => {
    if (currentPage > totalPages) {
      setCurrentPage(totalPages);
    }
  }, [safeItems.length, totalPages, currentPage]);

  const currentData = useMemo(() => {
    const startPage = (currentPage - 1) * itemsPerPage;
    const endPage = startPage + itemsPerPage;
    return safeItems.slice(startPage, endPage);
  }, [safeItems, currentPage, itemsPerPage]);

  const goToPage = (pageNumber) => {
    const page = Math.max(1, Math.min(pageNumber, totalPages));
    setCurrentPage(page);
  };

  const nextPage = () => goToPage(currentPage + 1);
  const prevPage = () => goToPage(currentPage - 1);

  return {
    currentData,
    currentPage,
    totalPages,
    totalItems: safeItems.length,
    itemsPerPage,
    goToPage,
    nextPage,
    prevPage,
    canNext: currentPage < totalPages,
    canPrev: currentPage > 1,
  };
};

export default usePagination;
