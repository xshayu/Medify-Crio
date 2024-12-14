'use client';

import React, { useId } from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Pagination } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/pagination';

interface SwiperCarouselProps {
    children: React.ReactNode;
    slidesPerView?: { mobile?: number; tablet?: number; desktop?: number } | number;
    spaceBetween?: number;
    className?: string;
}

export default function SwiperCarousel({
    children,
    slidesPerView = { mobile: 1, desktop: 3 },
    spaceBetween = 24,
    className = '',
  }: SwiperCarouselProps) {

    const carouselId = useId().replace(/:/g, '');
    const paginationClass = `pagination-${carouselId}`;

    const breakpoints = {
        320: {
          slidesPerView: typeof slidesPerView === 'object' ? slidesPerView.mobile : 1,
        },
        1024: {
          slidesPerView: typeof slidesPerView === 'object' ? slidesPerView.desktop : slidesPerView,
        },
      };

    return (
        <div className={`w-full ${className}`}>

            <Swiper
                modules={[Pagination]}
                spaceBetween={spaceBetween}
                pagination={{
                    clickable: true,
                    el: `.${paginationClass}`,
                    bulletActiveClass: 'swiper-pagination-bullet-active',
                    type: 'bullets',
                    renderBullet: function (index, className) {
                        return `<span class="swiper-pagination-bullet ${className}"></span>`;
                    },
                }}
                breakpoints={breakpoints}
                className={`w-full`}
            >
                {React.Children.map(children, (child, index) => (
                    <SwiperSlide key={index} style={{ minHeight: 'auto' }}>
                        {child}
                    </SwiperSlide>
                ))}
            </Swiper>
            <div className={`${paginationClass} flex justify-center mt-4`}></div>
        </div>
    )
}