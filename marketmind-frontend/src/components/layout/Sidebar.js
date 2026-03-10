import React from 'react';
import { motion } from 'framer-motion';
import { C } from '../../styles/designTokens';
import { navItems } from '../../utils/constants';

function Sidebar({ page, setPage }) {
  return (
    <div style={{ 
      width:220, 
      background:C.white, 
      borderRight:`1px solid ${C.border}`, 
      display:"flex", 
      flexDirection:"column", 
      padding:"20px 12px", 
      gap:4, 
      height:"100%", 
      position:"sticky", 
      top:64 
    }}>
      <p style={{ 
        fontSize:10, 
        fontWeight:700, 
        color:C.muted, 
        textTransform:"uppercase", 
        letterSpacing:"0.1em", 
        padding:"4px 12px 8px" 
      }}>Main Menu</p>
      {navItems.map((item, i) => {
        const active = page === item.id;
        return (
          <motion.button 
            key={item.id} 
            onClick={() => setPage(item.id)}
            initial={{ opacity:0, x:-12 }} 
            animate={{ opacity:1, x:0 }} 
            transition={{ delay:i*0.05 }}
            whileHover={{ x:3 }}
            style={{ 
              display:"flex", 
              alignItems:"center", 
              gap:10, 
              padding:"10px 12px", 
              borderRadius:10, 
              border:"none", 
              cursor:"pointer", 
              textAlign:"left", 
              fontFamily:"inherit", 
              background: active ? C.blueLight : "transparent", 
              color: active ? C.blue : C.muted, 
              fontWeight: active ? 700 : 500, 
              fontSize:14, 
              transition:"background 0.15s" 
            }}>
            <span style={{ fontSize:16 }}>{item.icon}</span>
            {item.label}
            {active && <span style={{ marginLeft:"auto", width:4, height:4, borderRadius:"50%", background:C.blue }} />}
          </motion.button>
        );
      })}
      {/* Bottom */}
      <div style={{ marginTop:"auto", padding:"16px 12px", borderTop:`1px solid ${C.border}` }}>
        <div style={{ display:"flex", alignItems:"center", gap:8 }}>
          <div style={{ 
            width:32, 
            height:32, 
            borderRadius:8, 
            background:`linear-gradient(135deg,${C.blue},#A78BFA)`, 
            display:"flex", 
            alignItems:"center", 
            justifyContent:"center", 
            fontSize:14, 
            color:"white", 
            fontWeight:700 
          }}>JD</div>
          <div>
            <p style={{ fontSize:12, fontWeight:700, color:C.text }}>Jane Doe</p>
            <p style={{ fontSize:11, color:C.muted }}>Pro Plan</p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Sidebar;