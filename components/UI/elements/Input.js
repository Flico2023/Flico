import { mycn } from '@/utils/mycn';
import React from 'react';



const camelToFlat = (str) => (
    (str = str.replace(/[A-Z]/g, " $&")), str[0].toUpperCase() + str.slice(1)
);




export default function Input(props) {

    const [focused, setFocused] = React.useState(false);



    const { name, label, type = "text", helpertext, register, errors, ...rest } = props;

    return (
        <div className="">
            {/* <div className={`bg-gray-100 p-2 border-b-2 ${focusedStyle}`}> */}
            <div className={mycn({
                "bg-gray-100 p-1 border-b border-b-2": true,
                " border-sky-500": focused,
                "border-black": !focused,
                "border-red-600": errors[name] ? true : false,
            })}>
            <label htmlFor={name} className="text-left">
                {label ?? camelToFlat(name)}
            </label>

            {(type !== "textarea" ) && <input
                className="w-full mt-1 bg-gray-100 border-transparent
                focus:outline-none focus:ring-0"
                {...register(name)}
                id={name}
                name={name}
                type={type || "text"} 
                onFocus={() => setFocused(true)}
                onBlur={() => setFocused(false)}
                {...rest}
                />}
            {type == "textarea" &&<textarea
                className="w-full mt-1 bg-gray-100 border-transparent
                focus:outline-none focus:ring-0"
                {...register(name)}
                id={name}
                name={name}
                type={type || "text"} 
                onFocus={() => setFocused(true)}
                onBlur={() => setFocused(false)}
                {...rest}
                />}
                {type == "select" && <select
                className="w-full mt-1 bg-gray-100 border-transparent
                focus:outline-none focus:ring-0"
                {...register(name)}
                id={name}
                name={name}
                type={"select"}
                onFocus={() => setFocused(true)}
                onBlur={() => setFocused(false)}
                {...rest}
                >
                    {props.children}
                </select>}
                
</div>

           {!errors[name] ? (
                <p className="text-left mt-1">
                    {helpertext ?? ""}
                </p>
            ) : (
                <p className="text-left mt-1 text-red-600">
                    {errors[name]?.message ?? ""}
                </p>
            )} 
        </div>
    )
}
