import Link from 'next/link';
import React from 'react'

/**
 example order item

 {
        "order": {
          "id": 5,
          "orderID": "gPwsufL3",
          "airportID": 1,
          "closetID": 1,
          "userID": 1,
          "orderStatus": "Progress",
          "totalPrice": 100,
          "startDate": "2024-06-20T21:00:00",
          "endDate": "2024-06-29T21:00:00",
          "createdAt": "2024-06-03T20:41:12.4065837",
          "closetPassword": 6970,
          "closetNo": 1,
          "nameOnCart": "dssd",
          "cardNumber": "8888888888888888",
          "expiryDate": "01/2024",
          "cvv": "555"
        },
        "closet": {
          "closetID": 1,
          "closetNo": 1,
          "airportID": 1,
          "orderID": "gPwsufL3",
          "password": 6268,
          "status": "in use",
          "airport": null
        },
        "airport": {
          "airportID": 1,
          "airportName": "airport",
          "city": "airport"
        },
        "orderProducts": [
          {
            "product": {
              "productID": 2,
              "productName": "test nike",
              "category": "woman",
              "subcategory": "skirt",
              "brand": "nike",
              "price": 100,
              "productDetail": "nike etek",
              "color": "red",
              "imagePath": "https://img-lcwaikiki.mncdn.com/mnresize/1020/1360/pim/productimages/20241/7119631/v1/l_20241-s4hk48z8-gpu_u.jpg"
            },
            "size": "XL",
            "amount": 1
          }
        ]
      }
    ],
 */

export default function SingleOrderCard({ order }) {
    const [seeItems, setSeeItems] = React.useState(false);
    const toggleItems = () => setSeeItems(x => !x);
    console.log(order);
    return (
        <div className="bg-white shadow-lg rounded-lg overflow-hidden border border-gray-200 mb-8">
            <div className="p-6 grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="mb-2">
                    <span className="font-semibold text-gray-700">Order Id: </span>
                    <span className="text-gray-600">{order.order.orderID}</span>
                </div>
                <div className="mb-2">
                    <span className="font-semibold text-gray-700">Status: </span>
                    <span className="text-gray-600">{order.order.orderStatus}</span>
                </div>
                <div className="mb-2">
                    <span className="font-semibold text-gray-700">Total Price: </span>
                    <span className="text-gray-600">{order.order.totalPrice}</span>
                </div>
                <div className="mb-2">
                    <span className="font-semibold text-gray-700">Start Date: </span>
                    <span className="text-gray-600">{new Date(order.order.startDate).toLocaleDateString()}</span>
                </div>
                <div className="mb-2">
                    <span className="font-semibold text-gray-700">End Date: </span>
                    <span className="text-gray-600">{new Date(order.order.endDate).toLocaleDateString()}</span>
                </div>
                <div className="mb-2">
                    <span className="font-semibold text-gray-700">Order Date: </span>
                    <span className="text-gray-600">{new Date(order.order.createdAt).toLocaleDateString()}</span>
                </div>
                <div className="mb-2">
                    <span className="font-semibold text-gray-700">Name on Cart: </span>
                    <span className="text-gray-600">{order.order.nameOnCart}</span>
                </div>
                <div className="mb-2">
                    <span className="font-semibold text-gray-700">Airport: </span>
                    <span className="text-gray-600">{order.airport.airportName}</span>
                </div>
                <div className="mb-2">
                    <span className="font-semibold text-gray-700">Closet No: </span>
                    <span className="text-gray-600">{order.order.closetNo}</span>
                </div>
                <div className="mb-2">
                    <span className="font-semibold text-gray-700">Closet Password: </span>
                    <span className="text-gray-600">{order.order.closetPassword}</span>
                </div>
            </div>
            {/* render order Products */}
            {seeItems && <div className="p-6 grid grid-cols-1 md:grid-cols-2 gap-4">
                {order.orderProducts.map((orderProduct, index) => (
                    <div key={index} className="bg-gray-100 p-4 rounded-lg">
                    <Link href={`products/details/${orderProduct.product.productID}`}>
                        <div className="flex items-center justify-between">
                            <div className="flex items-center">
                                <img src={orderProduct.product.imagePath} alt={orderProduct.product.productName} className="w-16 h-16 object-cover rounded-lg" />
                                <div className="ml-4">
                                    <h2 className="text-lg font-semibold text-gray-700">{orderProduct.product.productName}</h2>
                                    <span className="text-sm font-semibold text-gray-600">Size: {orderProduct.size}</span>
                                </div>
                            </div>
                            <span className="text-lg font-semibold text-gray-700">${orderProduct.product.price}</span>
                        </div>
                        <div className="flex items-center justify-between mt-4">
                            <span className="text-sm font-semibold text-gray-600">Amount: {orderProduct.amount}</span>
                            <span className="text-sm font-semibold text-gray-600">Total: ${orderProduct.amount * orderProduct.product.price}</span>
                        </div>
                    </Link></div>
                    
                ))} 
            </div>}
            <p className='bg-gray-100 text-center text-gray-700 block p-2 hover:cursor-pointer' onClick={toggleItems}>
                {seeItems ? 'Hide Order Products' : 'See Order Products'}

            </p>
        </div>
    );
}


