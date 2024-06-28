import React, { useState, MouseEvent } from 'react';

interface ImageWithCarouselProps {
  imageSrc: string;
  carouselImages: string[];
}

const ImageWithCarousel: React.FC<ImageWithCarouselProps> = ({ imageSrc, carouselImages }) => {
  const [isCarouselOpen, setIsCarouselOpen] = useState(false);
  const [currentIndex, setCurrentIndex] = useState(0);

  const handleImageClick = () => {
    setIsCarouselOpen(true);
  };

  const handleCloseCarousel = () => {
    setIsCarouselOpen(false);
  };

  const handlePrev = (e: MouseEvent) => {
    e.stopPropagation();
    setCurrentIndex((prevIndex) => (prevIndex === 0 ? carouselImages.length - 1 : prevIndex - 1));
  };

  const handleNext = (e: MouseEvent) => {
    e.stopPropagation();
    setCurrentIndex((prevIndex) => (prevIndex === carouselImages.length - 1 ? 0 : prevIndex + 1));
  };

  return (
    <div>
      <div style={styles.thumbnail} onClick={handleImageClick}>
        <img src={imageSrc} alt="Descripción de la imagen" style={styles.image} />
      </div>

      {isCarouselOpen && (
        <div style={styles.carouselContainer} onClick={handleCloseCarousel}>
          <button style={{ ...styles.button, left: '0' }} onClick={handlePrev}>
            {'‹'}
          </button>
          <img src={carouselImages[currentIndex]} alt={`Imagen ${currentIndex + 1}`} style={styles.carouselImage} />
          <button style={{ ...styles.button, right: '0' }} onClick={handleNext}>
            {'›'}
          </button>
        </div>
      )}
    </div>
  );
};

const styles: { [key: string]: React.CSSProperties } = {
  thumbnail: {
    width: '100%',
    height: 'auto',
    cursor: 'pointer',
    textAlign: 'center',
  },
  image: {
    width: '100%',
    height: 'auto',
  },
  text: {
    fontSize: '12px',
    color: '#333',
  },
  carouselContainer: {
    position: 'fixed',
    top: 0,
    left: 0,
    width: '100%',
    height: '100%',
    backgroundColor: 'rgba(0, 0, 0, 0.8)',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    zIndex: 1000,
  },
  carousel: {
    position: 'relative',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
  },
  carouselImage: {
    maxWidth: '80%',
    maxHeight: '80%',
  },
  button: {
    position: 'absolute',
    top: '50%',
    transform: 'translateY(-50%)',
    backgroundColor: 'rgba(255, 255, 255, 0.5)',
    border: 'none',
    cursor: 'pointer',
    padding: '10px',
    fontSize: '24px',
    userSelect: 'none',
  },
};

export default ImageWithCarousel;
