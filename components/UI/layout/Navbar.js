import { mycn } from "@/utils/mycn";
import Link from "next/link";
import { useRouter } from "next/router";
import React from "react";
import { IoCartOutline } from "react-icons/io5";
import { IoPersonOutline } from "react-icons/io5";


export default function Navbar() {
  return (
    <header className="py-2 shadow w-full center ">
      <nav className="w-4/5">
        {/* İLK SATIR */}
        <nav className="flex-between w-full mb-3">
          <Link href="/">
            <h1 className="text-sky-700 text-4xl">FLICO</h1>
          </Link>
          {/* İKONLAR */}
          <div className="flex-between gap-4">

            <Link href={"/cart"}>
              <button className="column-center">
                <IoCartOutline className="text-3xl text-primary" />
                <p className="text-primary text-xs" >Cart</p>
              </button>
            </Link>

            <Link href={"/profile"}>
              <button className="column-center">
                <IoPersonOutline className="text-3xl text-primary" />
                <p className="text-primary text-xs" >Profile</p>
              </button>
            </Link>

          </div>
        </nav>
        {/* İKİNCİ SATIR */}
        <nav className="flex-between">
          <ul className="flex-between gap-4">
            <li>
              <NavLink to="woman">Woman</NavLink>
            </li>
            <li>
              <NavLink to="man">Man</NavLink>
            </li>
            <li>
              <NavLink to="kids">Kids</NavLink>
            </li>
            <li>
              <NavLink to="accessories">Accessories</NavLink>
            </li>
          </ul>
          {/* <p>bagaj hazırla</p> */}
          <Link href={"/faqs"} className="text-lg">FAQ</Link>
          <Link href={"/contactUs"} className="text-lg ml-2">Contact Us</Link>
        </nav>
      </nav>
    </header>
  );
}

function NavLink({ to, children }) {
  const { query } = useRouter();

  return (
    <Link
      href={`/products/${to}`}
      className={mycn("text-lg", {
        "text-sky-700 underline underline-offset-8": query?.category === to,
      })}
    >
      {children}
    </Link>
  );
}
