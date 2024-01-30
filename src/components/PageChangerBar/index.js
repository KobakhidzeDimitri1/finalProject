import "./pageChangerBar.css";

const PageChangerBar = ({ queryParams, setQueryParams, lastPage }) => {
  const isPositive = queryParams.page > 0;
  const moreThanLimit = queryParams.page > lastPage;
  const firstPage = queryParams.page === 1;
  const moreThan3page = queryParams.page > 3;
  const isLastPage = queryParams.page === lastPage;

  const changePage = (e) => {
    setQueryParams((prev) => ({ ...prev, page: +e.target.dataset.page }));
  };

  return (
    <div className="page-changer">
      <span
        className="changer-number"
        onClick={changePage}
        data-page="1"
        style={
          queryParams.page === 1
            ? {
                fontWeight: "bold",
              }
            : {}
        }
      >
        1
      </span>
      {isPositive && !moreThanLimit && queryParams.page - 1 > 1 && (
        <>
          {moreThan3page && <span>...</span>}
          <span
            className="changer-number"
            onClick={changePage}
            data-page={queryParams.page - 1}
          >
            {queryParams.page - 1}
          </span>
        </>
      )}
      {isPositive && !moreThanLimit && !firstPage && (
        <span
          className="changer-number"
          onClick={changePage}
          data-page={queryParams.page}
          style={{ fontWeight: "bold" }}
        >
          {queryParams.page}
        </span>
      )}
      {!isLastPage && isPositive && !moreThanLimit && (
        <span
          className="changer-number"
          onClick={changePage}
          data-page={queryParams.page + 1}
        >
          {queryParams.page + 1}
        </span>
      )}
      {((lastPage > 2 && lastPage - 1 > queryParams.page) || moreThanLimit) && (
        <span
          className="changer-number"
          data-page={lastPage}
          onClick={changePage}
        >
          ...{lastPage}
        </span>
      )}
    </div>
  );
};

export default PageChangerBar;
