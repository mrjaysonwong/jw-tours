'use client';

import React, { useState, useEffect } from 'react';
import Image from 'next/image';
import {
  Typography,
  Box,
  Grid,
  Container,
  TextField,
  Paper,
} from '@mui/material';
import ArrowLeftIcon from '@mui/icons-material/ArrowLeft';
import ArrowRightIcon from '@mui/icons-material/ArrowRight';

// local imports
import { StyledHeroCarousel } from '../styled/StyledCarousels';


export default function CarouselLanding({ data }) {
  const [slide, setSlide] = useState(0);

  const nextSlide = () => {
    setSlide((prevSlide) =>
      prevSlide === data.slides.length - 1 ? 0 : prevSlide + 1
    );
  };

  const prevSlide = () => {
    setSlide((prevSlide) =>
      prevSlide === 0 ? data.slides.length - 1 : prevSlide - 1
    );
  };

  // useEffect(() => {
  //   const intervalId = setInterval(nextSlide, 15000);

  //   return () => clearInterval(intervalId);
  // }, [data.slides.length]);

  return (
    <StyledHeroCarousel>
      <ArrowLeftIcon className="arrow arrow-left" onClick={prevSlide} />

      {data.slides.map((item, idx) => {
        return (
          <Image
            key={item.src}
            src={item.src}
            alt={item.alt}
            className={slide === idx ? 'slide' : 'slide slide-hidden'}
            width={1700}
            height={900}
            style={{
              objectFit: 'cover',
              objectPosition: '50% 70%',
            }}
            priority
          />
        );
      })}

      <ArrowRightIcon className="arrow arrow-right" onClick={nextSlide} />

      <span className="indicators">
        {data.slides.map((_, idx) => {
          return (
            <button
              key={idx}
              onClick={() => setSlide(idx)}
              className={
                slide === idx ? 'indicator' : 'indicator indicator-inactive'
              }
            />
          );
        })}
      </span>
      <Box className="overlay" />
    </StyledHeroCarousel>
  );
}
