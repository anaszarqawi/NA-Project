import React from 'react';
import ArrowTop from '../assets/svg/arrowTop';

const BackToTopBtn = () => {
  const [showTopBtn, setShowTopBtn] = React.useState(false);

  React.useEffect(() => {
    window.addEventListener('scroll', () => {
      if (window.scrollY > 400) {
        setShowTopBtn(true);
      } else {
        setShowTopBtn(false);
      }
    });
  }, []);

  const goToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth',
    });
  };

  return (
    showTopBtn && (
      <div className="back-to-top-btn-container" onClick={goToTop}>
        <ArrowTop />
      </div>
    )
  );
};

export default BackToTopBtn;
