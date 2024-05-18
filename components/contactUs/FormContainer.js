import React from 'react'
import Input from '../UI/elements/Input';
import * as yup from 'yup';
import { useForm } from 'react-hook-form';
import { yupResolver } from "@hookform/resolvers/yup";
import Button from '../UI/elements/Button';
import SuccessAlert from '../UI/elements/SuccessAlert';
import ErrorAlert from '../UI/elements/ErrorAlert';
import { useMutation } from '@tanstack/react-query';
import axios from 'axios';
import { trimObj } from '@/utils/trimObj';


const contactUsDefaults = {
    name: "",
    email: "",
    subject: "",
    message: "",
};

const contactUsSchema = yup.object().shape({
    name: yup.string().required('Name is required').max(50, 'Name must be no longer than 50 characters'),
    email: yup.string().email('Invalid email format').required('Email is required').max(100, 'Email must be no longer than 100 characters'),
    subject: yup.string().required('Subject is required').max(100, 'Subject must be no longer than 100 characters'),
    message: yup.string().required('Message is required').max(1000, 'Message must be no longer than 1000 characters'),
});


export default function FormContainer() {

    const { mutate: sendContactUsEmail,
        isPending ,
        isError,
        isSuccess,
        data,
        error,
    } = useMutation({
        mutationFn: async (data) => {
            const response = await axios({
                url: 'http://localhost:5059/api/contact_messages',
                method: 'POST',
                data: data
            })

            return response.data;
        },
        /*onSuccess: (data) => {
            //yukardan return edilen data buraya geliyor
        },*/
    });


    const { register, handleSubmit, formState: { errors } } = useForm({
        defaultValues: contactUsDefaults,
        resolver: yupResolver(contactUsSchema),
    });

    const onSubmitHandler = (data) => {
        trimObj(data);
        sendContactUsEmail(data);
    };



    return (
        <div className='w-4/5 m-auto'>
            <h1 className='text-4xl text-center my-8'>Contact Us</h1>
            <form
                onSubmit={handleSubmit(onSubmitHandler)}
                noValidate>
                <div className='grid grid-cols-2 gap-4 w-4/5 m-auto'>
                    <div className='col-span-1'>
                        <Input
                            register={register}
                            name="name"
                            errors={errors}
                        />
                    </div>
                    <div className='col-span-1'>
                        <Input
                            type="email"
                            name="email"
                            register={register}
                            errors={errors}
                        />
                    </div>
                    <div className='col-span-2'>
                        <Input name="subject"
                            register={register}
                            errors={errors}
                        />
                    </div>
                    <div className='col-span-2'>
                        <Input name="message"
                            type="textarea"
                            rows={5}
                            register={register}
                            errors={errors}
                        />
                    </div>

                    {isSuccess && <div className='col-span-2'>
                        <SuccessAlert message={`Ticket ${data.data.id} has been created `} />
                    </div>}

                    {isError && <div className='col-span-2'>
                        <ErrorAlert message={error.response.data.message} />
                    </div>}
                    <div className='center w-1/2'>
                        <Button type="submit" styles="w-full" disabled={isPending }>Submit</Button>
                    </div>



                </div>
            </form>
        </div>
    )
}
