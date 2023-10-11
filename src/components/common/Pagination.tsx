import Pagination from "react-js-pagination";
interface IPropsPagination {
    totalItem: number;
    itemPerPage: number;
    currentPage: number;
    getItemPerPage?: (item: number) => void;
    getCurrentPage?: (item: number) => void;
    isShowAllRecord?: boolean;
}

function PaginationComponent(props: IPropsPagination) {
    const { totalItem, itemPerPage, currentPage, getCurrentPage } = props;

    const handleChangePage = (pageNumber: number) => {
        // avoid set page when current page dont change value
        if (pageNumber === currentPage) return;
        getCurrentPage && getCurrentPage(pageNumber);
    }


    return (
        <div className="border-top pt-3 d-flex justify-content-center align-items-center mb-3">
            <div className="dataTables_paginate paging_simple_numbers" id="table_paginate">
                <Pagination
                    activePage={currentPage}
                    totalItemsCount={totalItem}
                    itemsCountPerPage={itemPerPage}
                    pageRangeDisplayed={5}
                    hideFirstLastPages
                    onChange={handleChangePage}
                    innerClass={'pagination pagination-sm'}
                    itemClass={'paginate_button page-item'}
                    linkClass={'page-link'}
                />
            </div>
        </div>
    )
}
export default PaginationComponent