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
import React, { useCallback, useContext, useEffect, useState, useRef } from 'react'
import InfiniteScroll from 'react-infinite-scroll-component'

let firstRender1 = true;
let firstRender2 = true;

export default function AllProductsPage(props) {
  const [products, setProducts] = useState(props.products)
  const [moreLoading, setMoreLoading] = useState(false)
  const [newLoading, setNewLoading] = useState(false)
  const [error, setError] = useState(null)
  const [hasMore, setHasMore] = useState(true)
  const [pageIndex, setPageIndex] = useState(props.pageIndex)
  const [pageSize, setPageSize] = useState(props.pageSize)
  const [total, setTotal] = useState(props.total)

  const observer = useRef();
  const lastElementRef = useCallback(node => {
    if (moreLoading) return;
    if (observer.current) observer.current.disconnect();
    observer.current = new IntersectionObserver(entries => {
      if (entries[0].isIntersecting && !isLastPage(total, pageSize, pageIndex)) {

        loadMore();
      }
    }
    );
    if (node) observer.current.observe(node);
  }, [moreLoading, hasMore]);


  const { buildQueryString, filters } = useContext(ProductFiltersContext)
  const isLastPage = useCallback((totalCount, pageSize, pageIndex) => {
    const totalPageCount = Math.floor(totalCount / pageSize) + 1;

    return pageIndex == totalPageCount;
  }, [ ]);



  useEffect(() => {
    if (firstRender2) {
      firstRender2 = false;
      return;
    }

    async function handleFilterChange() {
      setNewLoading(true)
      try {
        const queryString = buildQueryString()
        const res = await axios.get(`http://localhost:5059/api/product?PageIndex=1&PageSize=${pageSize}${"&" + queryString}`)
        const { products, pageSize: newPageSize, total, pageIndex: newPageIndex } = res.data.data
        setProducts([...products])
        setPageIndex(1)
        //setPageSize(pageSize)
        setTotal(total)
        if (isLastPage(total, newPageSize, newPageIndex)) {
          setHasMore(false)
        }
      } catch (err) {
        setError(err.message)
        console.error(err)
      }
      setNewLoading(false)
    }
    handleFilterChange()
  }, [filters])//bunu nasıl halledicem bu arada


  async function loadMore() {
    setMoreLoading(true);
    try {
      const queryString = buildQueryString();
      const res = await axios.get(`http://localhost:5059/api/product?PageIndex=${pageIndex + 1}&PageSize=${pageSize}${"&" + queryString}`);
      const { products: newProducts, total } = res.data.data;
      console.log("res", res.data.data)
      setProducts((prevProducts) => [...prevProducts, ...newProducts]);
      setTotal(total);
      if (isLastPage(total, pageSize, pageIndex)) {
        setHasMore(false);
      }
      setPageIndex((prevPageNumber) => prevPageNumber + 1);
    } catch (err) {
      setError(err.message);
      console.error(err)
    }
    setMoreLoading(false);
  }

  return (

    <div className='flex justify-center items-start mt-4 gap-3'>

      <aside className='w-1/4 sticky top-4'>
        <ProductFilter />
      </aside>
      <main className='w-3/4' id='products-container'>

        {newLoading && <ProductsSkeleton />}
        {!newLoading && products &&
          products.length > 0 && <main className="grid grid-cols-3 gap-4">
            {
              products.map((product, index) => {
                if (products.length === index + 1) {
                  return <SingleProductCard key={product.productID} product={product} ref={lastElementRef} />
                }
                else {
                  return <SingleProductCard key={product.productID} product={product} />
                }
              })}

            {moreLoading && <LoadingSpinner />}
          </main>}

        {products?.length === 0 && !newLoading && <div className='column-center mt-12'>
          <ShoppersSvg w={"500"} h={"500"} />
          <h1 className='text-2xl text-gray-700'>No products found</h1>
        </div>
        }

      </main>
    </div>


  )
}

export async function getStaticPaths() {
  return {
    paths: [
      { params: { category: "man" } },
      { params: { category: "woman" } },
      { params: { category: "kids" } },
      { params: { category: "accessories" } },
    ],
    fallback: false
  };
}

export async function getStaticProps(context) {
  try {
    const { params } = context;
    const { category } = params;
    console
    const response = await axios.get(`http://localhost:5059/api/product?PageIndex=1&PageSize=4&Category=${category}`)
    const products = response.data.data.products;
    const pageIndex = response.data.data.pageIndex;
    const pageSize = response.data.data.pageSize;
    const total = response.data.data.total;


    return {
      props: {
        products, pageIndex, pageSize, total
      },
      //revalidate: 1 * 60 * 60  // In seconds this is 1 hour
    }
  }
  catch (err) {
    console.log("error")
    console.log(err)//HATALARIMI NASIL LOGLARIM
    return {
      notFound: true
    }
  }
}






