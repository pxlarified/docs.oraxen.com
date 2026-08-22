import React from 'react';

export default function Highlight({children, color = '#1877F2', to}) {
  const style = {backgroundColor: color, borderRadius: 4, color: '#fff', padding: '0.2rem', textDecoration: 'none'};
  return to ? <a href={to} style={style}>{children}</a> : <span style={style}>{children}</span>;
}
