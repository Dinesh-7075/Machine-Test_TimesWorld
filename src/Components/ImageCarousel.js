import React, { useEffect, useState } from 'react';

//Sample Images for Carousel
const images = [
    "https://img.freepik.com/free-photo/painting-mountain-lake-with-mountain-background_188544-9126.jpg",
    "https://t4.ftcdn.net/jpg/05/72/82/85/360_F_572828530_ofzCYowQVnlOwkcoBJnZqT36klbJzWdn.jpg",
    "https://images.pexels.com/photos/36717/amazing-animal-beautiful-beautifull.jpg?auto=compress&cs=tinysrgb&dpr=1&w=500",
    "https://preview.redd.it/cool-wallpapers-v0-zk60molghkvb1.png?width=640&crop=smart&auto=webp&s=4978b41abb0d2b2eea2b97057ab8980adae94506",
];

const ImageCarousel = () => {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  const nextImage = () => {
    setCurrentImageIndex((prevIndex) => (prevIndex + 1) % images.length);
  };

  const prevImage = () => {
    setCurrentImageIndex((prevIndex) => (prevIndex - 1 + images.length) % images.length);
  };
  

  useEffect(() => {
    let timer = setTimeout(() => {
        nextImage();
    }, 3000);
    return () => {
      clearTimeout(timer);
    };
  }, [currentImageIndex]);

  return (
    <div className="d-flex w-100 gap-3 corouselContainer">
        <div className="carousel-container d-flex align-items-center mt-3 corousel">
            <img src={images[currentImageIndex]} alt={`Image ${currentImageIndex + 1}`} className="carousel-image" />
            <div className="carousel-dots">
            <i className="bi bi-arrow-left-short icon" onClick={prevImage}></i>
                {images.map((_, index) => (
                <span 
                    key={index} 
                    className={`dot ${index === currentImageIndex ? 'active' : ''}`}
                    onClick={() => setCurrentImageIndex(index)}
                />
                ))}
            <i className="bi bi-arrow-right-short icon" onClick={nextImage}></i>
            </div>
        </div>
        <div className='slidingImg'>
            <img src={images[currentImageIndex]} alt={`Image ${currentImageIndex + 1}`} className="sideImg mt-3" />
        </div>
    </div>
  );
};

export default ImageCarousel;