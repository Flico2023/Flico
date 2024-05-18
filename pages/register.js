import Button from '@/components/UI/elements/Button';
import Input from '@/components/UI/elements/Input';
import { registerDefault, registerSchema } from '@/data/auth/registerSchemas';
import { yupResolver } from '@hookform/resolvers/yup';
import Link from 'next/link';
import { useRouter } from 'next/router';
import React, { useState } from 'react';
import { useForm } from 'react-hook-form';


function RegisterForm() {
    const [errorMessage, setErrorMessage] = useState("");
    const router = useRouter();


    const { register, handleSubmit, formState: { errors }, setValue } = useForm({
        defaultValues: registerDefault,
        resolver: yupResolver(registerSchema)
    });

    const registerHandler = (tokenStr) => {
        const token = tokenStr;
        setToken(token);
        localStorage.setItem("jwtToken", token);
        const decodedPayload = jwtDecode(token);


        const expireTime = new Date(
            decodedPayload.exp * 1000
        );
        setExpireTime(expireTime);
        console.log("expire time in register" + expireTime);
        localStorage.setItem("expireTime", expireTime.toISOString());

        const decodeUserId =
            decodedPayload[
            "http://schemas.xmlsoap.org/ws/2005/05/identity/claims/nameidentifier"
            ];
        setUserId(decodeUserId);
        localStorage.setItem("userId", decodeUserId);


    };

    const onSubmit = async (data) => {
        try {
            setErrorMessage("");
            const response = await axios.post(
                "http://localhost:5059/api/user/SignUp",
                data
            );

            registerHandler(response.data.token);

            router.push("/products/woman");

        } catch (error) {
            setErrorMessage("An error occurred while registering.");
        }
    };



    return (
        <div className='w-full mx-auto lg:w-1/2 pt-8'>

            <div className='center gap-8'>
                <Link href="register"><span className='text-2xl text-primary'>Register</span></Link>
                <span className='text-2xl text-gray-600'>|</span>
                <Link href="login"><span className='text-2xl text-gray-600'>Login</span></Link>
            </div>

            <form onSubmit={handleSubmit(onSubmit)} className='mt-8'>
                <div className='flex flex-col gap-4'>

                    <div class="md:flex md:gap-4">
                        <div class="md:w-1/2 mb-4 md:mb-0">
                            <Input
                                name="name"
                                label="Name"
                                register={register}
                                errors={errors}
                            />
                        </div>
                        <div class="md:w-1/2">
                            <Input
                                name="surname"
                                label="Surname"
                                register={register}
                                errors={errors}
                            />
                        </div>

                    </div>


                    <div>
                        <Input
                            name="email"
                            label="Email"
                            type="email"
                            register={register}
                            errors={errors}
                        />
                    </div>
                    <div>
                        <Input
                            name="phone"
                            label="Phone"
                            register={register}
                            errors={errors}
                        />
                    </div>

                    <div>
                        <Input
                            name="password"
                            label="Password"
                            register={register}
                            errors={errors}
                        />
                    </div>
                </div>

                <Button styles="w-full mt-4">Register</Button>
            </form>
        </div>
    );
}

export default RegisterForm;

