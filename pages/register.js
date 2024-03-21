import Button from '@/components/UI/elements/Button';
import Input from '@/components/UI/elements/Input';
import { registerDefault, registerSchema } from '@/data/auth/registerSchemas';
import { yupResolver } from '@hookform/resolvers/yup';
import Link from 'next/link';
import React from 'react';
import { useForm } from 'react-hook-form';


function RegisterForm() {
    const { register, handleSubmit, formState: { errors }, setValue } = useForm({
        defaultValues: registerDefault,
        resolver: yupResolver(registerSchema)
    });

    const onSubmit = (data) => {
        console.log(data); // Form gönderildiğinde verileri konsola yazdırın
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
                            name="password"
                            label="Password"
                            type="password"
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

