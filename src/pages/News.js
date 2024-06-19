import React, { useEffect } from 'react';
import '../styles/News.css';

function loadElfsightScript() {
  return new Promise((resolve, reject) => {
    const script = document.createElement('script');
    script.src = 'https://static.elfsight.com/platform/platform.js';
    script.setAttribute('data-use-service-core', '');
    script.defer = true;
    script.onload = () => resolve();
    script.onerror = () => reject(new Error('Failed to load Elfsight widget script'));
    document.body.appendChild(script);
  });
}

function News() {
  useEffect(() => {
    let script;
    loadElfsightScript()
      .then(() => {
        console.log('Elfsight widget script loaded');
      })
      .catch(error => {
        console.error('Error loading Elfsight widget script:', error);
      });

    return () => {
      script = document.querySelector('script[src="https://static.elfsight.com/platform/platform.js"]');
      if (script) document.body.removeChild(script);
    };
  }, []);

  return (
    <div className="news-container">
      <div className="elfsight-app-0d8bc1a3-8701-46b1-bd64-d3fd0ce00992" data-elfsight-app-lazy></div>
    </div>
  );
}

export default News;
