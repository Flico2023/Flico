import React from 'react';


const FlicoOnPhoto = () => {
  return (

    <div className="relative h-[45vh] w-full">
      {/* Arka Plan Fotoğrafı */}
      <img
        src={`https://www.sistemas.com.tr/site_images/dosya_link/16122022132757326.jpg`}
        alt="Background"
        className="h-[45vh] w-full object-cover"
      />

      {/* Siyah, Yarı Saydam Katman */}
      <div className="absolute top-0 left-0 right-0 bottom-0 bg-black bg-opacity-50 flex flex-col items-center justify-center space-y-4">
        {/* Marka İsmi */}
        <h1 className="text-white text-6xl font-bold">FLICO</h1>
        {/* Slogan */}
        <p className="text-white text-2xl">Travel without baggage</p>
      </div>
    </div>
  );
};

export default FlicoOnPhoto;
