import ProductContainer from '@/components/productDetails/ProductContainer'
import axios from 'axios'
import React from 'react'


export default function ProductDetailPage(props) {
  const { product, stockDetail, resultSizes } = props;
  return (
    <div>
      <ProductContainer product={product} resultSizes={resultSizes} />
    </div>
  )
}

export async function getServerSideProps(context) {
  try {
    const { id } = context.query

    const response = await axios.get(`http://localhost:5059/api/product/${id}`)
    const productData = response.data.data;
    const {stockDetail, ...product} = productData;

    const allSizes = ["XS", "S", "M", "L", "XL", "XXL", "XXXL"];
    const productSizes = stockDetail.map(stock => stock.size);
    const resultSizes = []

    allSizes.forEach(size => {
      const isFound = productSizes.includes(size);
      if (isFound) {
        resultSizes.push(size)
      }    
    })

    console.log( {
      product,
      stockDetail,
      resultSizes
    })

    return {
      props: {
        product,
        stockDetail,
        resultSizes
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




/**
 * {
  "success": true,
  "message": "the request was completed successfully",
  "data": {
    "productID": 20,
    "productName": "Dünyanın en güzel kıyafeti",
    "category": "man",
    "subcategory": "shirt",
    "amount": 5,
    "brand": "nike",
    "price": 1000,
    "productDetail": "Açıklama açıklama açıklama açıklama açıklama açıklama açıklama açıklama açıklama açıklama açıklama açıklama açıklama açıklama açıklama açıklama açıklama açıklama açıklama ",
    "currentPrice": 1000,
    "gender": "man",
    "color": "blue",
    "imagePath": "C:\\Users\\Emre\\Desktop\\FLICO\\FlicoBackend\\ApiConsume\\FlicoProject.WebApi\\wwwroot\\product_images\\3fljpxsz.png",
    "image": null,
    "stockDetail": [
      {
        "stockDetailID": 1,
        "productID": 20,
        "warehouseID": 1,
        "size": "XS",
        "variationAmount": 10,
        "variationActiveAmount": 5
      },
      {
        "stockDetailID": 2,
        "productID": 20,
        "warehouseID": 0,
        "size": "string",
        "variationAmount": 0,
        "variationActiveAmount": 0
      }
    ]
  }
}
 */