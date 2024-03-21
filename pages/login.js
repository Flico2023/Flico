import Button from '@/components/UI/elements/Button';
import Input from '@/components/UI/elements/Input';
import { loginDefault, loginSchema } from '@/data/auth/loginSchemas';
import { yupResolver } from '@hookform/resolvers/yup';
import Link from 'next/link';
import React from 'react';
import { useForm } from 'react-hook-form';


function LoginForm() {
  const { register, handleSubmit, formState: { errors }, setValue } = useForm({
    defaultValues: loginDefault,
    resolver: yupResolver(loginSchema)
});

    const onSubmit = (data) => {
        console.log(data); // Form gönderildiğinde verileri konsola yazdırın
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
                            name="email"
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

