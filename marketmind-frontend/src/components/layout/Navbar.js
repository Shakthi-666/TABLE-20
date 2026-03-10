import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { C } from '../../styles/designTokens';

function Navbar({ page, setPage, onGenerate }) {
  const [notif, setNotif] = useState(true);
  
  return (
    <div style={{ 
      background:C.white, 
      borderBottom:`1px solid ${C.border}`, 
      height:64, 
      display:"flex", 
      alignItems:"center", 
      padding:"0 24px", 
      gap:16, 
      position:"sticky", 
      top:0, 
      zIndex:100, 
      boxShadow:"0 1px 8px rgba(13,110,253,0.06)" 
    }}>
      {/* Logo */}
      <div style={{ display:"flex", alignItems:"center", gap:10, marginRight:8 }}>
        <div style={{ 
          width:36, 
          height:36, 
          borderRadius:10, 
          background:`linear-gradient(135deg,${C.blue},#5B9EFF)`, 
          display:"flex", 
          alignItems:"center", 
          justifyContent:"center", 
          boxShadow:`0 4px 12px ${C.blue}40` 
        }}>
          <span style={{ fontSize:18 }}>📡</span>
        </div>
        <div>
          <p style={{ fontSize:14, fontWeight:800, color:C.text, fontFamily:"'Plus Jakarta Sans',sans-serif", lineHeight:1 }}>Market</p>
          <p style={{ fontSize:11, fontWeight:700, color:C.blue, lineHeight:1 }}>Intelligence AI</p>
        </div>
      </div>

      {/* Search */}
      <div style={{ flex:1, maxWidth:400, position:"relative" }}>
        <span style={{ position:"absolute", left:12, top:"50%", transform:"translateY(-50%)", color:C.muted, fontSize:14 }}>🔍</span>
        <input 
          placeholder="Search competitors, insights, reports..." 
          style={{ 
            width:"100%", 
            padding:"8px 12px 8px 34px", 
            borderRadius:10, 
            border:`1px solid ${C.border}`, 
            fontSize:13, 
            color:C.text, 
            background:C.light, 
            outline:"none", 
            fontFamily:"inherit" 
          }} 
        />
      </div>

      <div style={{ flex:1 }} />

      {/* Generate Strategy */}
      <motion.button 
        whileHover={{ scale:1.03 }} 
        whileTap={{ scale:0.97 }} 
        onClick={onGenerate}
        style={{ 
          background:`linear-gradient(135deg,${C.blue},#5B9EFF)`, 
          color:"white", 
          border:"none", 
          borderRadius:10, 
          padding:"9px 18px", 
          fontSize:13, 
          fontWeight:700, 
          cursor:"pointer", 
          boxShadow:`0 4px 12px ${C.blue}35`, 
          display:"flex", 
          alignItems:"center", 
          gap:6 
        }}>
        ⚡ Generate Strategy
      </motion.button>

      {/* Notifications */}
      <button onClick={() => setNotif(false)} style={{ 
        width:38, 
        height:38, 
        borderRadius:10, 
        background:notif?C.yellowLight:C.light, 
        border:`1px solid ${notif?C.yellow:C.border}`, 
        cursor:"pointer", 
        fontSize:18, 
        position:"relative", 
        display:"flex", 
        alignItems:"center", 
        justifyContent:"center" 
      }}>
        🔔
        {notif && <span style={{ position:"absolute", top:6, right:6, width:8, height:8, borderRadius:"50%", background:C.red, border:"2px solid white" }} />}
      </button>

      {/* User */}
      <div style={{ 
        display:"flex", 
        alignItems:"center", 
        gap:8, 
        padding:"6px 10px", 
        borderRadius:10, 
        border:`1px solid ${C.border}`, 
        cursor:"pointer", 
        background:C.light 
      }}>
        <div style={{ 
          width:28, 
          height:28, 
          borderRadius:8, 
          background:`linear-gradient(135deg,${C.blue},#A78BFA)`, 
          display:"flex", 
          alignItems:"center", 
          justifyContent:"center", 
          fontSize:13, 
          color:"white", 
          fontWeight:700 
        }}>JD</div>
        <span style={{ fontSize:13, fontWeight:600, color:C.text }}>Jane Doe</span>
        <span style={{ fontSize:11, color:C.muted }}>▾</span>
      </div>
    </div>
  );
}

export default Navbar;