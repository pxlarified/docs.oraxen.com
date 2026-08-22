import React, {useEffect} from 'react';
import {useLocation} from '@docusaurus/router';

function enhanceSummaryLinks() {
  document.querySelectorAll('summary[id]:not(:has(.summary-link))').forEach((summary) => {
    const link = document.createElement('a');
    link.className = 'summary-link';
    link.href = `#${encodeURIComponent(summary.id)}`;
    link.setAttribute('aria-label', 'Open direct link');
    link.setAttribute('title', 'Open direct link');
    link.innerHTML = '<span aria-hidden="true">#</span>';
    link.addEventListener('click', (event) => {
      event.stopPropagation();
    });
    summary.appendChild(link);
  });

  const target = location.hash && document.getElementById(decodeURIComponent(location.hash.slice(1)));
  if (target?.tagName === 'SUMMARY') target.parentElement.open = true;
}

export default function Root({children}) {
  const location = useLocation();

  useEffect(() => {
    enhanceSummaryLinks();

    const observer = new MutationObserver(enhanceSummaryLinks);
    observer.observe(document.body, {childList: true, subtree: true});
    return () => observer.disconnect();
  }, []);

  useEffect(enhanceSummaryLinks, [location.hash]);

  return children;
}
