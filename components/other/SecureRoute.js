import React, { useEffect } from 'react';
import { useRouter } from 'next/router';
import { useLogin } from '@/context/LoginContext';

const SecureRoute = ({ children }) => {
  const router = useRouter();
  const { token } = useLogin();

  useEffect(() => {
    const isExpired = () => {


      return !localStorage.getItem("jwtToken") ;
    };

    console.log("SECURE ROUTE ÇALIŞTI");

    if (isExpired()) {

      router.replace('/login', { state: { from: router.asPath } });
    }
  }, [router, token]);  // Dependencies listesine router, token ve expireTime eklenir.

  if (!token) {
    return null; 
  }

  return children;
};

export default SecureRoute;

