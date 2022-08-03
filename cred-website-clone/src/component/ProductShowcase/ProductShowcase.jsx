import React, { useState } from "react";
import { useRef } from "react";
import { useEffect } from "react";
import "./productShowcase.css";

const ProductShowcase = () => {
  const [showAnimation, setShowAnimation] = useState(false);
  const ref = useRef();
  function toggleCallback(e) {
    if (e[0].isIntersecting) {
      setShowAnimation(true);
    }
  }
  useEffect(() => {
    const observer = new IntersectionObserver(toggleCallback, {
      root: null,
      rootMargin: "0px",
      threshold: 0.6,
    });

    if (!showAnimation) {
      if (ref.current) {
        observer.observe(ref.current);
      }
    }

    return () => {
      if (ref.current) {
        observer.unobserve(ref.current);
      }
    };
  });
  return (
    <div
      className={`product-showcase ${showAnimation ? `scale-up-bottom` : ""}`}
      ref={ref}
    >
      <div className="show-wrapper">
        <img
          src="https://web-images.credcdn.in/_next/assets/images/home-page/phone/left-2.png"
          alt="product"
          className="showcase-ui showcase-mockup-1"
        />
        <img
          src="https://web-images.credcdn.in/_next/assets/images/home-page/phone/left-1.png"
          alt="product"
          className="showcase-ui showcase-mockup-2"
        />
        <img
          src="https://web-images.credcdn.in/_next/assets/images/home-page/phone/center.png"
          alt="product"
          className="showcase-ui showcase-mockup-3"
        />
        <img
          src="https://web-images.credcdn.in/_next/assets/images/home-page/phone/right-1.png"
          alt="product"
          className="showcase-ui showcase-mockup-4"
        />
        <img
          src="https://web-images.credcdn.in/_next/assets/images/home-page/phone/right-2.png"
          alt="product"
          className="showcase-ui showcase-mockup-5"
        />
      </div>
    </div>
  );
};

export default ProductShowcase;
