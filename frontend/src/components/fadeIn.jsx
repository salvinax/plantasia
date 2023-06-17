import React from "react";
import { useEffect, useState, useRef } from "react";

function FadeIn(props) {
  const [isVisible, setVisible] = useState(false);
  const ref = useRef();

  useEffect(() => {
    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        setVisible(entry.isIntersecting);
      });
    });
    observer.observe(ref.current);
    return () => observer.disconnect();
  }, []);

  return (
    <div
      className={`fade-section ${isVisible ? "is-shown" : ""}`}
      style={{ transitionDelay: `${props.delay}` }}
      ref={ref}
    >
      {props.children}
    </div>
  );
}

export default FadeIn;
