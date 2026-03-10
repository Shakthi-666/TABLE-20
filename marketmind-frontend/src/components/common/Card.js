import React from 'react';
import { C } from '../../styles/designTokens';

const Card = ({ children, style = {}, className = "" }) => (
  <div style={{ 
    background:C.white, 
    borderRadius:16, 
    border:`1px solid ${C.border}`, 
    boxShadow:"0 1px 3px rgba(0,0,0,0.06),0 4px 16px rgba(13,110,253,0.04)", 
    padding:24, 
    ...style 
  }}>
    {children}
  </div>
);

export default Card;