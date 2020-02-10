import React from 'react';
import Up from '../assets/Up.png';
import { trackEvent } from 'react-with-analytics/lib/utils';

const ScrollToTop = () => {
  return (
    <div
      onClick={() => {
        window.scrollTo({ top: 0, behavior: 'smooth' });
        trackEvent('Back to Top', 'click', 'toTop');
      }}
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
