import MostBoughtWith from '@/components/productDetails/MostBoughtWith';
import ProductContainer from '@/components/productDetails/ProductContainer'
import axios from 'axios'
import React from 'react'


export default function ProductDetailPage(props) {
  const { product,  resultSizes, mostBoughtWith } = props;
  return (
    <div>
      <ProductContainer product={product} resultSizes={resultSizes} />
      <MostBoughtWith mostBoughtWith={mostBoughtWith} />
      <></>
    </div>
  )
}

export async function getServerSideProps(context) {
  try {
    const { id } = context.query

    const response = await axios.get(`http://localhost:5059/api/product/${id}`);
    const mostBoughtWith = response.data.mostBoughtWith;
    
    const productData = response.data.productWithDetails;
    console.log(productData)
    const {stockDetails, ...product} = productData;

    const allSizes = ["XS", "S", "M", "L", "XL", "XXL", "XXXL"];
    const productSizes = stockDetails.map(stock => stock.size);
    const resultSizes = []

    allSizes.forEach(size => {
      const isFound = productSizes.includes(size);
      if (isFound) {
        resultSizes.push(size)
      }    
    })



    return {
      props: {
        mostBoughtWith,
        product,
        stockDetails,
        resultSizes,

      },
    }
  }
  catch (error) {
    console.log("error")
    console.log(error)//HATALARIMI NASIL LOGLARIM
    return {
      notFound: true
    }
  }

}

