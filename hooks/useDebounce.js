import { useState, useEffect } from 'react';

function useDebounce(value, delay) {
    // Debounced değeri saklamak için bir state
    const [debouncedValue, setDebouncedValue] = useState(value);

    useEffect(() => {
        // Belirtilen gecikme süresi sonunda değeri güncelle
        const handler = setTimeout(() => {
            setDebouncedValue(value);
        }, delay);

        // Cleanup fonksiyonu, komponent yeniden render edildiğinde veya 
        // gecikme süresi değiştiğinde mevcut zamanlayıcıyı temizler
        return () => {
            clearTimeout(handler);
        };
    }, [value, delay]); // Bu efekt yalnızca `value` veya `delay` değiştiğinde çalışır

    return debouncedValue;
}

export default useDebounce;
