import { useEffect, useState } from "react";

import "./styles.css";

const BackToTopButton = () => {
  const [backToTopButton, setBackToTopButton] = useState(false);

  useEffect(() => {
    window.addEventListener("scroll", () => {
      if (window.screenX > 100) {
        setBackToTopButton(true);
      } else {
        setBackToTopButton(false);
      }
    });
  }, []);

  const scrollUp = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  return (
    <div>{backToTopButton && <button className="to-top-button" onClick={scrollUp}>⌃</button>}</div>
  );
};
export default BackToTopButton;
