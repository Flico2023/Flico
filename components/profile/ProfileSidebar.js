import { mycn } from '@/utils/mycn';
import Link from 'next/link'
import { useRouter } from 'next/router';
import React from 'react'

export default function ProfileSidebar() {
    return (
        <div>
            <ProfileSidebarItem to="orders" title="Profile" />
            <ProfileSidebarItem to="messages" title="Orders" />
            <ProfileSidebarItem to="xart" title="Wishlist" />
            <ProfileSidebarItem to="zurt" title="Settings" />
        </div>
    )
}

function ProfileSidebarItem({ to, icon, title }) {

    const { query } = useRouter();

    return (
        <Link
            href={`/profile?category=${to}`}
            className='w-full block'
        >
            <div className={mycn("text-lg w-full py-2", {
                "text-sky-700 border-r border-sky-700 ": query?.category === to,
            })}>

                <span className='mr-1'>{icon}</span>
                <span>{title}</span>
            </div>

        </Link>
    )
}

