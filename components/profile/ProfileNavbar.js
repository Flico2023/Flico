import { mycn } from '@/utils/mycn';
import Link from 'next/link';
import { useRouter } from 'next/router';
import React from 'react'

export default function ProfileNavbar() {
    return (
        <div className="flex overflow-x-auto pb-4">
            <ProfileNavbarItem to="orders" title="Orders" />
            <ProfileNavbarItem to="abc" title="Messages" />
            <ProfileNavbarItem to="ijkl" title="Cart" />
            <ProfileNavbarItem to="mnop" title="User Info" />


        </div>
    );
}

function ProfileNavbarItem({ to, title }) {
    const { query } = useRouter();

    return (
        <Link
            href={`/profile?category=${to}`}
        >
            <div className={mycn("text-lg w-full py-2 px-2", {
                "text-sky-700 border-b border-sky-700 ": query?.category === to,
            })}>
                <p>{title}</p>
            </div>

        </Link>
    )
}
