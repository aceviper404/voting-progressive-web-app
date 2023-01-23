import React, { useState, useEffect } from 'react';
import HomePage from './HomePage';

function SplashScreen() {
  const [showHomePage, setShowHomePage] = useState(false);

  useEffect(() => {
    setTimeout(() => {
      setShowHomePage(true);
    }, 2000);
  }, []);

  return (
    <div>
      {showHomePage ? <HomePage /> : (
        <div>
          <h1>Mawkhar Presbyterian Church App</h1>
          <p>[Test App]</p>
        </div>
      )}
    </div>
  );
}

export default SplashScreen;