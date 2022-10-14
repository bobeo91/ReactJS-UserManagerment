import React from 'react';
import './Pagination.css'
const Pagination = (props) => {
    const { pagination, onPageChange } = props
    const { pageNumber, pageSize, totalPage } = pagination

    const handlePageChange = (newPage) => {
        if (onPageChange) {
            onPageChange(newPage)
        }
    }
console.log('total page receive from listGroup',totalPage);
    return (
        <div className='page-button'>
            <button
                disabled={pageNumber === 1}
                onClick={() => handlePageChange(pageNumber - 1)}
            >
                Previous
            </button>

            <button
                disabled={pageNumber >= totalPage}
                onClick={() => handlePageChange(pageNumber + 1)}
            >
                Next
            </button>
        </div>
    );
};

export default Pagination;  