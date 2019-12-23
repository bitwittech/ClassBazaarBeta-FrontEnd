import React from 'react';
import Up from '../assets/Up.png';

const ScrollToTop = () => {
  return (
    <div
      onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
      className="scrolltop"
    >
      <div>
        <img
          src={Up}
          alt="scrollTopIcon"
          style={{ width: '15px', marginTop: '8px' }}
        />
      </div>
    </div>
  );
};

export default ScrollToTop;
