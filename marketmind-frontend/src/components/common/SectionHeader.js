import React from 'react';
import { C } from '../../styles/designTokens';

const SectionHeader = ({ title, sub, action, onAction }) => (
  <div style={{ display:"flex", alignItems:"center", justifyContent:"space-between", marginBottom:20 }}>
    <div>
      <h2 style={{ fontSize:20, fontWeight:800, color:C.text, fontFamily:"'Plus Jakarta Sans',sans-serif" }}>{title}</h2>
      {sub && <p style={{ fontSize:13, color:C.muted, marginTop:2 }}>{sub}</p>}
    </div>
    {action && (
      <button onClick={onAction} style={{ 
        background:C.blueLight, 
        color:C.blue, 
        border:`1px solid ${C.blue}33`, 
        borderRadius:10, 
        padding:"8px 16px", 
        fontSize:13, 
        fontWeight:600, 
        cursor:"pointer" 
      }}>
        {action}
      </button>
    )}
  </div>
);

export default SectionHeader;