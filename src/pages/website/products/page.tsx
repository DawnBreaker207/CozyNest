/* eslint-disable @typescript-eslint/no-explicit-any */
import { useProductQuery } from '@/hooks/useProductQuery'
import { ChangeEvent, useEffect, useState } from 'react'
import { useSearchParams } from 'react-router-dom'
import ProductList from './_components/ProductList'
import { Skeleton } from 'antd'
import { parseInt } from 'lodash'

const ShopPage = () => {
  const [params] = useSearchParams()
  const page = parseInt(params.get('page') as string)

  const [limit, setLimit] = useState(10)
  const [currentPage, setCurrentPage] = useState(page || 1)

  const { data, isLoading, refetch } = useProductQuery({ _page: page, _limit: limit })

  useEffect(() => {
    if (page && +page !== currentPage) {
      setCurrentPage(+page)
    }
  }, [page, currentPage])

  const handleLimitChange = (event: ChangeEvent<any>) => {
    setLimit(event.target.value)
    refetch() // Gọi lại API với limit mới và trang đầu tiên
  }

  const { res: products = [], pagination } = data || { res: [], pagination: {} } // Lấy sản phẩm từ `res`

  if (isLoading)
    return (
      <div>
        <Skeleton active paragraph={{ rows: 10 }} />
      </div>
    )

  return (
    <div className='container'>
      <hr />
      {isLoading ? (
        <p>Loading...</p>
      ) : (
        <>
          <div className='limit-dropdown'>
            <label htmlFor='limit'>Show:</label>
            <select id='limit' onChange={handleLimitChange} defaultValue={limit}>
              <option value='2'>2</option>
              <option value='4'>4</option>
              <option value='6'>6</option>
              <option value='10'>10</option>
            </select>
          </div>
          <ProductList products={products} pagination={pagination} />
        </>
      )}
    </div>
  )
}

export default ShopPage
