import React from 'react'
import { Icon, Pagination } from 'semantic-ui-react'

const CustomPagination = ({ activePage, totalPages, handlePageChange }) => {

    const defaultCount = Math.ceil(totalPages / 10)

  return (
        <Pagination
            onPageChange={(e, data) => {
                console.log(data);
                handlePageChange(data.activePage)
            }}
            activePage={activePage}
            // defaultActivePage={1}
            ellipsisItem={{ content: <Icon name='ellipsis horizontal' />, icon: true }}
            firstItem={{ content: <Icon name='angle double left' />, icon: true }}
            lastItem={{ content: <Icon name='angle double right' />, icon: true }}
            prevItem={{ content: <Icon name='angle left' />, icon: true }}
            nextItem={{ content: <Icon name='angle right' />, icon: true }}
            totalPages={defaultCount}
        />
  )
}

export default CustomPagination