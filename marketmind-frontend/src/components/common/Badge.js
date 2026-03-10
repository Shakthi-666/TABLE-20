import React from 'react';
import { C } from '../../styles/designTokens';

const Badge = ({ label, type = "blue" }) => {
  const map = {
    high:    { bg:"#FDECEA", color:C.red,    dot:C.red    },
    medium:  { bg:"#FFF8E1", color:"#B45309",dot:C.yellow },
    low:     { bg:"#E8F5E9", color:C.green,  dot:C.green  },
    positive:{ bg:"#E8F5E9", color:C.green,  dot:C.green  },
    negative:{ bg:"#FDECEA", color:C.red,    dot:C.red    },
    neutral: { bg:"#FFF8E1", color:"#92400E",dot:C.yellow },
    implemented:{ bg:"#E8F5E9", color:C.green, dot:C.green },
    pending: { bg:"#EBF3FF", color:C.blue,   dot:C.blue   },
    up:      { bg:"#E8F5E9", color:C.green,  dot:C.green  },
    down:    { bg:"#FDECEA", color:C.red,    dot:C.red    },
    flat:    { bg:"#FFF8E1", color:"#92400E",dot:C.yellow },
    blue:    { bg:"#EBF3FF", color:C.blue,   dot:C.blue   },
  };
  const s = map[label] || map.blue;
  return (
    <span style={{ 
      background:s.bg, 
      color:s.color, 
      border:`1px solid ${s.dot}33`, 
      borderRadius:20, 
      padding:"2px 10px", 
      fontSize:11, 
      fontWeight:700, 
      display:"inline-flex", 
      alignItems:"center", 
      gap:5 
    }}>
      <span style={{ width:6, height:6, borderRadius:"50%", background:s.dot, display:"inline-block" }} />
      {label.charAt(0).toUpperCase() + label.slice(1)}
    </span>
  );
};

export default Badge;