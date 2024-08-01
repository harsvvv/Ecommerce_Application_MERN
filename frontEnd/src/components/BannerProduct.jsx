/* eslint-disable no-unused-vars */
import React from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation } from 'swiper/modules';  // Correct import for Swiper modules
import 'swiper/css';
import 'swiper/css/navigation';

import image1 from '../assest/banner/img1.webp';
import image1Mobile from '../assest/banner/img1_mobile.jpg';
import image2 from '../assest/banner/img2.webp';
import image2Mobile from '../assest/banner/img2_mobile.webp';
import image3 from '../assest/banner/img3.jpg';
import image3Mobile from '../assest/banner/img3_mobile.jpg';
import image4 from '../assest/banner/img4.jpg';
import image5 from '../assest/banner/img5.webp';
import image4Mobile from '../assest/banner/img4_mobile.jpg';
import image5Mobile from '../assest/banner/img5_mobile.png';

const BannerProduct = () => {
  const desktopImages = [
    image1,
    image2,
    image3,
    image4,
    image5
  ];
  const mobileImages = [
    image1Mobile,
    image2Mobile,
    image3Mobile,
    image4Mobile,
    image5Mobile
  ];

  return (
    <div className='mx-auto container px-4 rounded'>
      <div className='hidden md:block'>
        <Swiper
          modules={[Navigation]} // Use modules prop to include Navigation
          navigation
        >
          {desktopImages.map((imageUrl, index) => (
            <SwiperSlide key={index}>
              <div className='h-80 w-full bg-slate-200'>
                <img src={imageUrl} alt={`Slide ${index}`} className='w-full h-full' />
              </div>
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
      <div className='block md:hidden'>
        <Swiper
          modules={[Navigation]} // Use modules prop to include Navigation
          navigation
        >
          {mobileImages.map((imageUrl, index) => (
            <SwiperSlide key={index}>
              <div className='h-72 w-full bg-slate-200'>
                <img src={imageUrl} alt={`Slide ${index}`} className='w-full h-full object-scale-down' />
              </div>
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
    </div>
  );
};

export default BannerProduct;
