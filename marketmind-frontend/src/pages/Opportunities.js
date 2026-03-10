import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { C } from '../styles/designTokens';
import Badge from '../components/common/Badge';
import { opportunities } from '../utils/constants';

function OpportunitiesPage({ onGenerate }) {
  const [statuses, setStatuses] = useState(opportunities.map(o => o.status));
  
  const toggle = (i) => setStatuses(prev => prev.map((s,j) => j===i ? (s==="pending"?"implemented":"pending") : s));
  
  return (
    <div>
      <div style={{ display:"flex", alignItems:"center", justifyContent:"space-between", marginBottom:24 }}>
        <div>
          <h2 style={{ fontSize:20, fontWeight:800, color:C.text, fontFamily:"'Plus Jakarta Sans',sans-serif" }}>Opportunities & Recommendations</h2>
          <p style={{ fontSize:13, color:C.muted, marginTop:2 }}>AI-powered strategic suggestions based on live market data</p>
        </div>
        <motion.button 
          whileHover={{ scale:1.03 }} 
          whileTap={{ scale:0.97 }} 
          onClick={onGenerate}
          style={{ 
            background:`linear-gradient(135deg,${C.blue},#5B9EFF)`, 
            color:"white", 
            border:"none", 
            borderRadius:12, 
            padding:"11px 22px", 
            fontSize:14, 
            fontWeight:700, 
            cursor:"pointer", 
            boxShadow:`0 4px 16px ${C.blue}40`, 
            fontFamily:"inherit", 
            display:"flex", 
            alignItems:"center", 
            gap:8 
          }}>
          ⚡ Generate New Strategy
        </motion.button>
      </div>

      {/* Priority summary */}
      <div style={{ display:"grid", gridTemplateColumns:"repeat(3,1fr)", gap:16, marginBottom:24 }}>
        {[["High Priority","2",C.red,"🔥"],["Medium Priority","2",C.yellow,"⚠️"],["Low Priority","1",C.green,"💡"]].map(([lbl,count,color,ico],i)=>(
          <div key={i} style={{ 
            background:C.white, 
            borderRadius:14, 
            border:`1.5px solid ${color}33`, 
            padding:"18px 22px", 
            display:"flex", 
            alignItems:"center", 
            gap:14, 
            boxShadow:`0 2px 8px ${color}10` 
          }}>
            <div style={{ 
              width:48, 
              height:48, 
              borderRadius:12, 
              background:`${color}15`, 
              display:"flex", 
              alignItems:"center", 
              justifyContent:"center", 
              fontSize:24 
            }}>{ico}</div>
            <div>
              <p style={{ fontSize:28, fontWeight:800, color, fontFamily:"'Plus Jakarta Sans',sans-serif", lineHeight:1 }}>{count}</p>
              <p style={{ fontSize:12, color:C.muted, fontWeight:600 }}>{lbl}</p>
            </div>
          </div>
        ))}
      </div>

      {/* Opportunity Cards */}
      <div style={{ display:"grid", gridTemplateColumns:"repeat(2,1fr)", gap:16 }}>
        {opportunities.map((o,i) => (
          <motion.div 
            key={i} 
            initial={{ opacity:0, y:20 }} 
            animate={{ opacity:1, y:0 }} 
            transition={{ delay:i*0.1 }}
            style={{ 
              background:C.white, 
              borderRadius:18, 
              border:`1.5px solid ${o.priority==="high"?C.red+"33":o.priority==="medium"?C.yellow+"44":C.border}`, 
              padding:22, 
              boxShadow:"0 2px 8px rgba(0,0,0,0.05)", 
              position:"relative", 
              overflow:"hidden" 
            }}>
            <div style={{ 
              position:"absolute", 
              top:0, 
              right:0, 
              width:80, 
              height:80, 
              borderRadius:"0 18px 0 80px", 
              background: o.priority==="high"?`${C.red}08`:o.priority==="medium"?`${C.yellow}10`:`${C.green}08` 
            }} />
            <div style={{ display:"flex", alignItems:"flex-start", gap:14, marginBottom:14 }}>
              <div style={{ fontSize:32, flexShrink:0 }}>{o.icon}</div>
              <div style={{ flex:1 }}>
                <div style={{ display:"flex", alignItems:"center", gap:8, marginBottom:6, flexWrap:"wrap" }}>
                  <h3 style={{ fontSize:15, fontWeight:800, color:C.text }}>{o.title}</h3>
                  <Badge label={o.priority} />
                  <Badge label={statuses[i]} />
                </div>
                <p style={{ fontSize:13, color:C.muted, lineHeight:1.7 }}>{o.desc}</p>
              </div>
            </div>
            <div style={{ display:"flex", alignItems:"center", justifyContent:"space-between", marginTop:14, paddingTop:14, borderTop:`1px solid ${C.border}` }}>
              <div style={{ display:"flex", gap:8 }}>
                <span style={{ fontSize:12, padding:"4px 10px", borderRadius:8, background:C.light, color:C.muted, fontWeight:600 }}>{o.category}</span>
                <span style={{ fontSize:12, padding:"4px 10px", borderRadius:8, background:C.greenLight, color:C.green, fontWeight:700 }}>{o.roi}</span>
              </div>
              <motion.button 
                whileHover={{ scale:1.04 }} 
                whileTap={{ scale:0.97 }} 
                onClick={() => toggle(i)}
                style={{ 
                  padding:"8px 16px", 
                  borderRadius:10, 
                  border:"none", 
                  background: statuses[i]==="pending" ? `linear-gradient(135deg,${C.blue},#5B9EFF)` : C.greenLight, 
                  color: statuses[i]==="pending" ? "white" : C.green, 
                  fontSize:12, 
                  fontWeight:700, 
                  cursor:"pointer", 
                  fontFamily:"inherit" 
                }}>
                {statuses[i] === "pending" ? "✓ Implement" : "✅ Done"}
              </motion.button>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
}

export default OpportunitiesPage;