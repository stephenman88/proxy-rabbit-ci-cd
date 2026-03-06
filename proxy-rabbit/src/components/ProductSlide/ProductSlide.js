import ProductCard from "../ProductCard/ProductCard";
import left from "../../assets/icons/left.svg";
import right from "../../assets/icons/right.svg";
import {useRef} from "react";
import './ProductSlide.scss';

function ProductSlide({productArray, onProductCardClicked}){
    const slideRef = useRef()

    const prev = () => {
        slideRef &&
          slideRef.current &&
          slideRef.current.scrollTo({
            behavior: "smooth",
            top: 0,
            left:
              slideRef.current.scrollLeft - slideRef.current.clientWidth,
          });
      };
    
      const next = () => {
        slideRef &&
          slideRef.current &&
          slideRef.current.scrollTo({
            behavior: "smooth",
            top: 0,
            left:
              slideRef.current.scrollLeft + slideRef.current.clientWidth,
          });
      };

    return (<div className= 'slide'>
      <button className='slide-button' onClick={prev}>
        <img className='slide-button__image' src={left} alt="left button" />
      </button>
      <div className='slide-slide'>
        <div className='slide-slide-scroll' ref={slideRef}>
          {productArray.map((product, i) => (
            <ProductCard key={product.id} onCardClicked={onProductCardClicked} product={{country_id: product.country_id, image: product.image_url, name:product.name, description: product.country_name}} />
          ))}
        </div>
      </div>
      <button className='slide-button' onClick={next}>
        <img className='slide-button__image' src={right} alt="right button" />
      </button>
    </div>)
}

export default ProductSlide;