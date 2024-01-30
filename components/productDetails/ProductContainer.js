import { mycn } from '@/utils/mycn';
import React, { useState } from 'react'
import Button from '../UI/elements/Button';
import toast from 'react-hot-toast';
import { useMutation } from '@tanstack/react-query';
import axios from 'axios';

export default function ProductContainer(props) {
    const { product, resultSizes } = props;
    const { productID, productName, imagePath, description, category, subcategory, brand, price, productDetail } = product;

    const [selectedSize, setSelectedSize] = useState(resultSizes.length > 0 ? resultSizes[0] : null)
    const [amount, setAmount] = useState(1)


    const { mutate: addToCart, isLoading, error: submitError } = useMutation({
        mutationFn: async (body) => {
            const url = "http://localhost:5059/api/cart";
            const method = "POST";
            const response = await axios({
                url: url,
                method,
                data: body,
            });
            return response.data;
        },
        onSuccess: () => {
            toast.success("Product added to cart");
            //!queryClient.invalidateQueries({ queryKey: ["cart"] });
            //! burası nolcak bilmem
        },
        onError: (error) => {
            console.log(error);
            toast.error("Product can not added to cart")
        },
    });

    const addCartHandler = () => {
        const body = {
            productID,
            size: selectedSize,
            amount,
            userID: 1
        }

        addToCart(body);
    }


    return (
        <div className='flex justify-center items-start mt-4 gap-3'>
            <div className='w-1/2'>
                {/* <img src={imagePath} alt="image"/> */}
                <img
                    //src={imagePath}
                    src="https://img-lcwaikiki.mncdn.com/mnresize/600/800/mpsellerportal/v1/img_040116995v1_e6873bfe-5194-439b-875a-1296213a7919.jpg"
                    alt="Product Image"
                    loading="lazy"
                    className="object-cover w-full h-full"
                />
            </div>

            <div className='w-1/2'>
                <h1 className='text-2xl font-semibold text-gray-800'>{productName}</h1>
                <h2 className='text-xl text-gray-500 mt-1'>
                    <span className=''> {brand} </span>
                    <span className=''> - </span>
                    <span className=''> {productID}</span>
                </h2>
                <h1 className='text-3xl font-semibold mt-8'>{price} TL</h1>

                <div className='flex items-center justify-start mt-8 gap-1 flex-wrap'>
                    {resultSizes.map((size, index) => {
                        return <button key={index} onClick={() => setSelectedSize(size)}
                            className={mycn("py-1 px-2 rounded ", {
                                'text-gray-500 border border-gray-500 ': selectedSize !== size,
                                'text-white bg-primary': selectedSize === size,
                            })}>{size}</button>
                    })}

                </div>

                <div className='mt-12'>
                    <Button styles="w-full" onClick={addCartHandler}> Add to Cart</Button>
                </div>


                <div className='mt-8'>
                    <p className='text-gray-500 font-medium'>Details</p>
                    <p className='text-gray-800 mt-1'>{productDetail}</p>
                </div>


            </div>

        </div >
    )
}

const mock = {
    product: {
        productID: 20,
        productName: 'Dünyanın en güzel kıyafeti',
        category: 'man',
        subcategory: 'shirt',
        amount: 5,
        brand: 'nike',
        price: 1000,
        productDetail: 'Açıklama açıklama açıklama açıklama açıklama açıklama açıklama açıklama açıklama açıklama açıklama açıklama açıklama açıklama açıklama açıklama açıklama açıklama açıklama ',
        currentPrice: 1000,
        gender: 'man',
        color: 'blue',
        imagePath: 'C:\\Users\\Emre\\Desktop\\FLICO\\FlicoBackend\\ApiConsume\\FlicoProject.WebApi\\wwwroot\\product_images\\3fljpxsz.png',
        image: null
    },
    stockDetail: [
        {
            stockDetailID: 1,
            productID: 20,
            warehouseID: 1,
            size: 'XS',
            variationAmount: 10,
            variationActiveAmount: 5
        },
        {
            stockDetailID: 2,
            productID: 20,
            warehouseID: 0,
            size: 'string',
            variationAmount: 0,
            variationActiveAmount: 0
        }
    ],
    resultSizes: ['XS']
}