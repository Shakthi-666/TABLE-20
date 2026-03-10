import React from 'react';
import { motion } from 'framer-motion';
import { C } from '../../styles/designTokens';

const StatCard = ({ icon, label, value, sub, subColor, delay = 0, accent = C.blue }) => (
  <motion.div 
    initial={{ opacity:0, y:20 }} 
    animate={{ opacity:1, y:0 }} 
    transition={{ delay, duration:0.4 }}
    style={{ 
      background:C.white, 
      borderRadius:16, 
      border:`1px solid ${C.border}`, 
      boxShadow:"0 1px 3px rgba(0,0,0,0.06)", 
      padding:24, 
      position:"relative", 
      overflow:"hidden" 
    }}>
    <div style={{ 
      position:"absolute", 
      top:0, 
      right:0, 
      width:80, 
      height:80, 
      borderRadius:"0 16px 0 80px", 
      background:accent, 
      opacity:0.07 
    }} />
    <div style={{ 
      width:44, 
      height:44, 
      borderRadius:12, 
      background:`${accent}15`, 
      display:"flex", 
      alignItems:"center", 
      justifyContent:"center", 
      fontSize:22, 
      marginBottom:14 
    }}>{icon}</div>
    <p style={{ 
      fontSize:12, 
      color:C.muted, 
      fontWeight:600, 
      textTransform:"uppercase", 
      letterSpacing:"0.06em", 
      marginBottom:4 
    }}>{label}</p>
    <p style={{ 
      fontSize:30, 
      fontWeight:800, 
      color:C.text, 
      fontFamily:"'Plus Jakarta Sans',sans-serif", 
      lineHeight:1 
    }}>{value}</p>
    {sub && <p style={{ fontSize:12, color:subColor || C.green, fontWeight:600, marginTop:6 }}>{sub}</p>}
  </motion.div>
);

export default StatCard;