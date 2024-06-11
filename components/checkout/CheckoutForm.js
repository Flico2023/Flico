import checkout from '@/pages/checkout'
import React, { useContext } from 'react'
import Input from '../UI/elements/Input'
import { set, useForm } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup'
import * as yup from 'yup';
import Button from '../UI/elements/Button'
import axios from 'axios'
import { useMutation, useQuery } from '@tanstack/react-query'
import { useLogin } from '@/context/LoginContext'
import toast from 'react-hot-toast'
import { useRouter } from 'next/router';
import { UserContext } from '@/context/UserContext'
import { useModal } from '@/context/ModalContext'

const checkoutDefaultSchema = yup.object().shape({
  airportID: yup.number()
    .nullable()
    .transform((value, originalValue) => originalValue === "" ? null : value)
    .required("Airport selection required"),

  startDate: yup.date()
    .nullable()
    .transform((value, originalValue) => originalValue === "" ? null : value)
    .required("Start date is required")
    .test("is-before-endDate", "Start date must be before end date", function (value) {
      const { endDate } = this.parent;
      return !endDate || value <= endDate;
    }),

  endDate: yup.date()
    .nullable()
    .transform((value, originalValue) => originalValue === "" ? null : value)
    .required("End date is required")
    .min(yup.ref('startDate'), "End date must be later than start date"),

  nameOnCart: yup.string().required("Name on card is required"),
  cardNumber: yup.string()
    .required("Card number is required")
    .matches(/^[0-9]{16}$/, "Card number must be exactly 16 digits"),
  expiryDate: yup.string()
    .required("Expiry date is required")
    .matches(/^(0[1-9]|1[0-2])\/?([0-9]{4}|[0-9]{2})$/, "Expiry date must be in MM/YY or MM/YYYY format"),
  cvv: yup.string()
    .required("CVV is required")
    .matches(/^[0-9]{3,4}$/, "CVV must be 3 or 4 digits")
});

const checkoutDefault = {
  "airportID": "-1",
  "startDate": "",
  "endDate": "",
  "nameOnCart": "memre",
  "cardNumber": "4444444444444444",
  "expiryDate": "02/2028",
  "cvv": "426"
}


//userId, order status eklenicek

//input props const { name, label, type = "text", helpertext, register, errors, ...rest } = props;

export default function CheckoutForm({ carts }) {

  const { userId } = useLogin();

  const router = useRouter();

  const {setModalContent, openModal} = useModal();

  const { register, handleSubmit, formState: { errors } } = useForm({
    defaultValues: checkoutDefault,
    resolver: yupResolver(checkoutDefaultSchema),
  });

  const { mutate: submitOrder, isLoading, isError, data, error } = useMutation({
    mutationFn: async (orderData) => {
      const response = await axios.post(`http://localhost:5059/api/order`, orderData);
      return response.data;
    },
    onSuccess: (data) => {
      toast.success("Order completed successfully");
      router.push('/profile?category=orders');


    },
    onError: (error) => {
      console.log(error)
      //const errorMessage = error.response?.data?.message || "Something Went Wrong";

     // throw new Error(errorMessage);
      console.log("on error çalıştı")
      setModalContent(error.response.data);
      openModal();
    }
  });

  const { data: airports } = useQuery({
    queryKey: ['airports'],
    queryFn: async () => {

      try {
        const response = await axios.get(`http://localhost:5059/api/airport`);
        console.log(response.data.data)
        return response.data.data;
      } catch (error) {
        const errorMessage = error.response?.data?.message || "Something Went Wrong";
        throw new Error(errorMessage); // Hatayı burada fırlat
      }
    }
  });

  const onSubmitHandler = (data) => {


    const order = {
      ...data,
      userId: userId,
      orderStatus: "Progress",
      totalPrice: carts?.reduce((acc, cart) => {
        return acc + cart.product.price * cart.amount;
      }, 0)
    }

    const orderProducts = carts?.map(cart => {
      return {
        productId: cart.product.productID,
        amount: cart.amount,
        size: cart.size
      }
    }
    )

    const orderData = {
      order: order,
      orderProducts: orderProducts
    }

    submitOrder(orderData);
  }

  return (
    <form className='p-4 border border-gray-300' onSubmit={handleSubmit(onSubmitHandler)}
      noValidate>
      <div className='flex flex-col  gap-6'>
        <Input
          label="Select Airport"
          name="airportID"
          type="select"
          register={register}
          errors={errors}
        >

          <option value="">Select an airport</option>
          <option value={-1}>test</option>
          {airports?.map(airport => (
            <option key={airport.airportID} value={airport.airportID}>{airport.airportName}</option>
          ))}

        </Input>

        <Input
          label="Start Date"
          name="startDate"
          type="date"
          register={register}
          errors={errors}
        />
        <Input
          label="End Date"
          name="endDate"
          type="date"
          register={register}
          errors={errors}
        />
        <Input
          label="Name on Card"
          name="nameOnCart"
          type="text"
          register={register}
          errors={errors}
        />
        <Input
          label="Card Number"
          name="cardNumber"
          type="number"
          register={register}
          errors={errors}
        />
        <Input
          label="Expiry Date"
          name="expiryDate"
          type="text"
          register={register}
          errors={errors}
        />
        <Input
          label="CVV"
          name="cvv"
          type="number"
          register={register}
          errors={errors}
        />

        <Button styles="text-2xl p-2 font-normal w-full" >Complete Shopping</Button>
      </div>
    </form>
  )
}
