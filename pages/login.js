
import Button from '@/components/UI/elements/Button';
import Input from '@/components/UI/elements/Input';
import { useLogin } from '@/context/LoginContext';
import { loginDefault, loginSchema } from '@/data/auth/loginSchemas';
import { yupResolver } from '@hookform/resolvers/yup';
import axios from 'axios';
import { jwtDecode } from 'jwt-decode';
import Link from 'next/link';
import { useRouter } from 'next/router';
import React, { useState } from 'react';
import { useForm } from 'react-hook-form';


function LoginForm() {
    const [errorMessage, setErrorMessage] = useState("");
    const { register, handleSubmit, formState: { errors }, setValue } = useForm({
        defaultValues: loginDefault,
        resolver: yupResolver(loginSchema)
    });

    const router = useRouter();

    const { setToken, setUserId, setExpireTime } = useLogin();

    const loginHandler = (tokenStr) => {
        const token = tokenStr;
        const decodedPayload = jwtDecode(token);

        const role =
            decodedPayload[
            "http://schemas.microsoft.com/ws/2008/06/identity/claims/role"
            ];
        if (role !== "Admin") {
            setErrorMessage("You are not admin");
            return;
        }

        localStorage.setItem("jwtToken", token);

        const expireTime = new Date(
            decodedPayload.exp * 1000
        );
        setExpireTime(expireTime);
        console.log("expire time in login" + expireTime);
        localStorage.setItem("expireTime", expireTime.toISOString());

        const decodeUserId =
            decodedPayload[
            "http://schemas.xmlsoap.org/ws/2005/05/identity/claims/nameidentifier"
            ];
        setUserId(decodeUserId);
        localStorage.setItem("userId", decodeUserId);

        setToken(token);
    };

    const onSubmit = async (data) => {
        try {
          setErrorMessage("");
          const response = await axios.post(
            "http://localhost:5059/api/user/SignIn",
            data
          );
          console.log(response);
    
          const token = response.data.token;
          loginHandler(token);
    
          router.push("/products/woman");
        } catch (error) {
          console.log(error);
          setErrorMessage("An error occurred while registering.");
        }
      };

    return (
        <div className='w-full mx-auto lg:w-1/2 pt-8'>

            <div className='center gap-8'>
                <Link href="register"><span className='text-2xl text-gray-600'>Register</span></Link>
                <span className='text-2xl text-gray-600'>|</span>
                <Link href="login"><span className='text-2xl text-primary'>Login</span></Link>
            </div>

            <form onSubmit={handleSubmit(onSubmit)} className='mt-8'>
                <div className='flex flex-col gap-4'>

                    <div>
                        <Input
                            name="mail"
                            label="Email"
                            type="email"
                            register={register}
                            errors={errors}
                        />
                    </div>
                    <div>
                        <Input
                            name="password"
                            label="Password"
                            type="password"
                            register={register}
                            errors={errors}
                        />
                    </div>
                </div>

                <Button styles="w-full mt-4" type="submit">Register</Button>
            </form>
        </div>
    );
}

export default LoginForm;

