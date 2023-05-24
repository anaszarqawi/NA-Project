import React from 'react';
import ArrowTop from '../assets/svg/arrowTop';
import { useRouter } from 'next/router';

const BackToTopBtn = () => {
  const path = useRouter().pathname;
  const [showTopBtn, setShowTopBtn] = React.useState(false);
  const [toBottom, setToBottom] = React.useState(true);

  React.useEffect(() => {
    setShowTopBtn(checkCanScroll());
    window.addEventListener('scroll', () => {
      if (window.scrollY > 400) {
        setShowTopBtn(true);
        setToBottom(false);
      } else {
        setShowTopBtn(true);
        setToBottom(true);
      }
    });
  }, []);

  const goToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth',
    });
  };

  const checkCanScroll = () => {
    return document.body.scrollHeight > window.innerHeight;
  };

  const goToBottom = () => {
    window.scrollTo({
      top: document.body.scrollHeight,
      behavior: 'smooth',
    });
  };

  return (
    showTopBtn && (
      <div className="back-to-top-btn-container">
        <div className="back-to-btn toTop" onClick={goToTop}>
          <ArrowTop />
        </div>
        <div className="back-to-btn toBottom" onClick={goToBottom}>
          <ArrowTop />
        </div>
      </div>
    )
  );
};

export default BackToTopBtn;
