import React, { useState, useEffect } from 'react';
import { IconButton } from '@mui/material';
import { ArrowUpward } from '@mui/icons-material';

function ScrollToTopButton() {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    // Adds the scroll event listener to check whether to show the button
    const handleScroll = () => {
      if (window.pageYOffset > 300) {
        setIsVisible(true);
      } else {
        setIsVisible(false);
      }
    };

    window.addEventListener('scroll', handleScroll);

    // Remove scroll event listener on component unmount
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth',
    });
  };

  return (
    <IconButton
      aria-label="Scroll to top"
      color="primary"
      sx={{
        display: isVisible ? 'block' : 'none',
        position: 'fixed',
        bottom: '20px',
        right: '20px',
        zIndex: 1000,
      }}
      onClick={scrollToTop}
    >
      <ArrowUpward />
    </IconButton>
  );
}

export default ScrollToTopButton;
