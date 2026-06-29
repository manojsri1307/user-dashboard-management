function Pagination({
  currentPage,
  setCurrentPage,
  pageSize,
  setPageSize,
  totalUsers,
}) {
  const totalPages = Math.ceil(totalUsers / pageSize);

  return (
    <div
      className="pagination"
    >
      <div>
        <button
          onClick={() => setCurrentPage((prev) => prev - 1)}
          disabled={currentPage === 1}
        >
          Previous
        </button>

        <span style={{ margin: "0 15px" }}>
          {currentPage} / {totalPages}
        </span>

        <button
          onClick={() => setCurrentPage((prev) => prev + 1)}
          disabled={currentPage === totalPages}
        >
          Next
        </button>
      </div>

      <select
        value={pageSize}
        onChange={(e) => {
          setPageSize(Number(e.target.value));
          setCurrentPage(1);
        }}
      >
        <option value={10}>10</option>
        <option value={25}>25</option>
        <option value={50}>50</option>
        <option value={100}>100</option>
      </select>
    </div>
  );
}

export default Pagination;