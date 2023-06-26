import PageBtn, { PageButton } from './PageNumberBtn';

type PageBtnPropT = {
  currentpage: number;
  LastPage: number;
  handleCurrentPage: (page: number) => void;
};

function PageBtnDiv({ currentpage, LastPage, handleCurrentPage }: PageBtnPropT) {
  const handleMoveToNextPage = () => {
    if (currentpage === LastPage) return;
    handleCurrentPage(currentpage + 1);
  };
  const handleMoveToPrevPage = () => {
    if (currentpage === 1) return;
    handleCurrentPage(currentpage - 1);
  };
  const handleMoveToPage = (pageNumber: number) => {
    handleCurrentPage(pageNumber);
  };

  const pageBtn = () => {
    const centerBtn = currentpage;
    const lastPage = LastPage ?? 1;
    const btn = [];
    if (currentpage < 5) {
      const last = lastPage < 5 ? lastPage : 5;
      for (let index = 1; index <= last; index += 1) {
        btn.push(
          <PageBtn
            key={index}
            currentpage={currentpage}
            index={index}
            callback={handleMoveToPage}
          />
        );
      }
    } else if (currentpage > lastPage - 4) {
      for (let index = lastPage - 4; index <= lastPage; index += 1) {
        btn.push(
          <PageBtn
            key={index}
            currentpage={currentpage}
            index={index}
            callback={handleMoveToPage}
          />
        );
      }
    } else {
      btn.push(
        <PageBtn
          key={centerBtn}
          currentpage={currentpage}
          index={centerBtn}
          callback={handleMoveToPage}
        />
      );
      for (let index = 1; index < 3; index += 1) {
        if (centerBtn + index <= lastPage) {
          btn.push(
            <PageBtn
              key={centerBtn + index}
              currentpage={currentpage}
              index={centerBtn + index}
              callback={handleMoveToPage}
            />
          );
        }
        if (centerBtn - index > 0) {
          btn.unshift(
            <PageBtn
              key={centerBtn - index}
              currentpage={currentpage}
              index={centerBtn - index}
              callback={handleMoveToPage}
            />
          );
        }
      }
    }

    if (centerBtn - 2 > 1 && centerBtn > 4) {
      btn.unshift(
        <div className="flex" key={1}>
          <PageBtn key={1} currentpage={currentpage} index={1} callback={handleMoveToPage} />
          <p className="mx-2"> ... </p>
        </div>
      );
    }

    if (centerBtn + 2 < lastPage && centerBtn < lastPage - 2) {
      btn.push(
        <div className="flex" key={lastPage}>
          <p className="mx-2"> ... </p>
          <PageBtn
            key={lastPage}
            currentpage={currentpage}
            index={lastPage}
            callback={handleMoveToPage}
          />
        </div>
      );
    }
    return btn;
  };
  return (
    <div className="flex gap-1 my-5">
      {currentpage > 1 && (
        <PageButton type="button" onClick={handleMoveToPrevPage}>
          Prev
        </PageButton>
      )}
      {pageBtn()}
      {LastPage > 1 && currentpage !== LastPage && (
        <PageButton type="button" onClick={handleMoveToNextPage}>
          Next
        </PageButton>
      )}
    </div>
  );
}

export default PageBtnDiv;
