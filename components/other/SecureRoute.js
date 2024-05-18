import React, { useEffect } from 'react';
import { useRouter } from 'next/router';
import { useLogin } from '@/context/LoginContext';

const SecureRoute = ({ children }) => {
  const router = useRouter();
  const { token, expireTime } = useLogin();

  useEffect(() => {
    const isExpired = () => {
      if (!token || !expireTime) {
        console.log("token veya expireTime yok");
        return true;
      }

      const now = new Date();
      console.log("now", now);

      const isExpired = new Date() > new Date(expireTime);
      console.log("isExpired", isExpired);

      return isExpired;
    };

    console.log("SECURE ROUTE ÇALIŞTI");

    if (isExpired()) {
      // Kullanıcı yetkilendirilmediyse, giriş sayfasına yönlendir.
      // Yönlendirme sırasında, son ziyaret edilen yerin bilgisi korunuyor.
      router.replace('/login', { state: { from: router.asPath } });
    }
  }, [router, token, expireTime]);  // Dependencies listesine router, token ve expireTime eklenir.

  if (!token || new Date() > new Date(expireTime)) {
    return null; // Client-side check, eğer token yoksa veya süresi geçmişse hiçbir şey render etmez.
  }

  return children;
};

export default SecureRoute;


/*import React from 'react';
import { useRouter } from 'next/router';
import { useLogin } from '@/context/LoginContext';

const SecureRoute = ({ children }) => {
  const router = useRouter();
  const { token, expireTime } = useLogin();

  const isExpired = () => {
    if (!token || !expireTime) {
      console.log("token veya expireTime yok");
      return true;
    }

    const now = new Date();
    console.log("now", now);

    const isExpired = new Date() > new Date(expireTime);
    console.log("isExpired", isExpired);

    return isExpired;
  };

  console.log("SECURE ROUTE ÇALIŞTI");

  if (isExpired()) {
    // Kullanıcı yetkilendirilmediyse, giriş sayfasına yönlendir.
    // Yönlendirme sırasında, son ziyaret edilen yerin bilgisi korunuyor.
    router.replace('/login', { state: { from: router.asPath } });
    return null; // Yönlendirme işlemi başladıktan sonra hiçbir şey render etmemek için.
  }

  return children;
};

export default SecureRoute;*/
