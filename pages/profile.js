import SecureRoute from '@/components/other/SecureRoute';
import ProfileNavbar from '@/components/profile/ProfileNavbar'
import ProfileOrders from '@/components/profile/ProfileOrders';
import ProfileSidebar from '@/components/profile/ProfileSidebar'
import { useRouter } from 'next/router';
import React from 'react'

export default function ProfilePage() {
  const { query } = useRouter();

  return (
    <SecureRoute>
    <div>
      <header>
        <h1 className='text-4xl my-8'>Profile</h1>
      </header>
      <main className='flex '>
        <aside className='w-1/4 lg:w-1/6 lg:block hidden'>
          <ProfileSidebar/>
        </aside>
        <main className='w-full pl-4 h-full'>
          <div className='lg:hidden '>
            <ProfileNavbar></ProfileNavbar>
          </div>
          <div>
            {query.category === 'orders' && <ProfileOrders/>}  
          </div>
        </main>
      </main>
    </div>
    </SecureRoute>
  )
}
