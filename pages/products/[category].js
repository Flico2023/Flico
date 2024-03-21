import Button from '@/components/UI/elements/Button'
import Skeleton from '@/components/UI/elements/Skeleton'
import AllProducts from '@/components/allProducts/AllProducts'
import LoadingSpinner from '@/components/allProducts/LoadingSpinner'
import ProductFilter from '@/components/allProducts/ProductFilter'
import ProductsSkeleton from '@/components/allProducts/ProductsSkeleton'
import SingleProductCard from '@/components/allProducts/SingleProductCard'
import ShoppersSvg from '@/components/other/ShoppersSvg'
import { ProductFiltersContext } from '@/context/ProductsFilterProvider'
import { mycn } from '@/utils/mycn'
import axios from 'axios'
import { useRouter } from 'next/router'
import React, { useCallback, useContext, useEffect, useState, useRef } from 'react'

let firstRender = true;
let firstRender2 = true;


export default function AllProductsPage(props) {
  //IS LAST PAGE EKLENECEK
  const [products, setProducts] = useState(props.products)
  const [moreLoading, setMoreLoading] = useState(false)
  const [newLoading, setNewLoading] = useState(false)
  const [error, setError] = useState()
  const [isLastPage, setIsLastPage] = useState(props.isLastPage)
  const [pageConfig, setPageConfig] = useState({
    pageSize: props.pageSize,
    pageIndex: props.pageIndex,
  })



  const [totalCount, setTotalCount] = useState(props.totalCount)

  const { queryString, resetFilters } = useContext(ProductFiltersContext)

  //console.log("PROPS PRODUCTS", props.products)
  //console.log("STATE PRODUCTS", products)


  const router = useRouter();
  const { category } = router.query;

  useEffect(() => {

    setProducts([...props.products]);
    resetFilters()
  }, [props]);


  useEffect(() => {
    if (firstRender) {
      firstRender = false;
      return;
    }

    async function handleFilterChange() {
      setNewLoading(true)
      try {

        const res = await axios.get(`http://localhost:5059/api/product?category=${category}${queryString}&pageIndex=1&pageSize=5`)
        console.log("RESPONSE", res.data.data)
        const { products, pageSize: newPageSize,  pageIndex: newPageIndex, isLastPage } = res.data.data

        console.log("filterchange query",`category=${category}${queryString}&pageIndex=1&pageSize=5`)
        setProducts([...products])
        setIsLastPage(isLastPage)
        setPageConfig({ pageSize: 5, pageIndex: 1 })


      } catch (err) {
        console.error(err.message)
        setError(err.message)

      }
      setNewLoading(false)
    }
    handleFilterChange()
  }, [queryString, category])//bunu nasıl halledicem bu arada

  function loadMore() {
    setPageConfig(prev => ({...prev ,pageIndex: prev.pageIndex + 1 }))
  }

 /* useEffect(() => {
    if (firstRender2) {
      firstRender2 = false;
      return;
    }

    async function handleLoadMore() {
      setMoreLoading(true)
      try {
        const res = await axios.get(`http://localhost:5059/api/product?category=${category}${queryString}&pageIndex=${pageConfig.pageIndex}&pageSize=${pageConfig.pageSize}`)
        const { products: newProducts, totalCount, isLastPage } = res.data.data

        console.log("loadmore query", `category=${category}${queryString}&pageIndex=${pageConfig.pageIndex}&pageSize=${pageConfig.pageSize}`)

        console.log("loadmore products", newProducts)
        setProducts((prevProducts) => [...prevProducts, ...newProducts])
        setTotalCount(totalCount)
        setIsLastPage(isLastPage)
      } catch (err) {
        setError(err.message)
      }
      setMoreLoading(false)
    }
    handleLoadMore()
  }, [pageConfig])*/

  async function handleLoadMore() {
    setMoreLoading(true)
    try {
      const res = await axios.get(`http://localhost:5059/api/product?category=${category}${queryString}&pageIndex=${pageConfig.pageIndex + 1}&pageSize=${pageConfig.pageSize}`)
      const { products: newProducts, totalCount, isLastPage } = res.data.data

      console.log("loadmore query", `category=${category}${queryString}&pageIndex=${pageConfig.pageIndex}&pageSize=${pageConfig.pageSize}`)

      console.log("loadmore products", newProducts)
      setProducts((prevProducts) => [...prevProducts, ...newProducts])
      setTotalCount(totalCount)
      setIsLastPage(isLastPage)
      setPageConfig(prev => ({...prev ,pageIndex: prev.pageIndex + 1 }))
    } catch (err) {
      setError(err.message)
    }
    setMoreLoading(false)
  }


  return (
    <div className='flex justify-center items-start mt-4 gap-3'>
      <aside className='w-1/4 sticky top-4'>
        <ProductFilter />
      </aside>
      <main className='w-3/4' id='products-container'>
        {newLoading && <ProductsSkeleton />}
        {!newLoading && products && products.length > 0 && (
          <main className="grid grid-cols-3 gap-4">
            {products.map((product) => (
              <SingleProductCard key={product.productID} product={product} />
            ))}
            {moreLoading && <LoadingSpinner />}
          </main>
        )}
        {products && products.length > 0 && !moreLoading && !isLastPage && (
          <div className='flex justify-center my-4'>
            <Button onClick={handleLoadMore} styles='inline w-1/4'>Load More</Button>
          </div>
        )}
        {products?.length === 0 && (
          <div className='column-center mt-12'>
            <ShoppersSvg w={"500"} h={"500"} />
            <h1 className='text-2xl text-gray-700'>No products found</h1>
          </div>
        )}
      </main>
    </div>
  );
}



export async function getServerSideProps(context) {
  try {
    const { category } = context.query

    const response = await axios.get(`http://localhost:5059/api/product?pageIndex=1&pageSize=5&category=${category}`)
    const { products, pageIndex, pageSize, totalCount, isLastPage } = response.data.data;
    console.log(products)
    return {
      props: {
        products, pageIndex, pageSize, totalCount, isLastPage
      },

    }
  }
  catch (err) {

    console.error(err)//HATALARIMI NASIL LOGLARIM
    return {
      notFound: true
    }
  }
}






