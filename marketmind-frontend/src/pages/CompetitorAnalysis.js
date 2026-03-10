import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { C } from '../styles/designTokens';
import Card from '../components/common/Card';
import SectionHeader from '../components/common/SectionHeader';
import Badge from '../components/common/Badge';
import { competitors } from '../utils/constants';

function CompetitorPage() {
  const [filter, setFilter] = useState("all");
  
  const filteredCompetitors = filter === "all" 
    ? competitors 
    : competitors.filter(c => c.trend === filter);

  return (
    <div>
      <SectionHeader title="Competitor Analysis" sub="Track 5 competitors across pricing, products, and trends" />

      {/* Filters */}
      <div style={{ display:"flex", gap:10, marginBottom:20, flexWrap:"wrap" }}>
        {["all","up","flat","down"].map(f => (
          <button 
            key={f} 
            onClick={() => setFilter(f)}
            style={{ 
              padding:"7px 16px", 
              borderRadius:10, 
              border:`1.5px solid ${filter===f?C.blue:C.border}`, 
              background: filter===f?C.blueLight:C.white, 
              color: filter===f?C.blue:C.muted, 
              fontSize:13, 
              fontWeight:600, 
              cursor:"pointer", 
              fontFamily:"inherit", 
              textTransform:"capitalize" 
            }}>
            {f === "all" ? "All Trends" : f === "up" ? "📈 Growing" : f === "flat" ? "➡️ Stable" : "📉 Declining"}
          </button>
        ))}
        <div style={{ marginLeft:"auto", display:"flex", gap:8 }}>
          {["📥 Export CSV","📄 Export PDF"].map((btn,i) => (
            <button key={i} style={{ 
              padding:"7px 16px", 
              borderRadius:10, 
              border:`1.5px solid ${C.border}`, 
              background:C.white, 
              color:C.muted, 
              fontSize:13, 
              fontWeight:600, 
              cursor:"pointer", 
              fontFamily:"inherit" 
            }}>
              {btn}
            </button>
          ))}
        </div>
      </div>

      {/* Competitor cards */}
      <div style={{ display:"grid", gridTemplateColumns:"repeat(5,1fr)", gap:12, marginBottom:20 }}>
        {filteredCompetitors.map((c,i) => (
          <motion.div 
            key={i} 
            initial={{ opacity:0, y:16 }} 
            animate={{ opacity:1, y:0 }} 
            transition={{ delay:i*0.08 }}
            style={{ 
              background:C.white, 
              borderRadius:16, 
              border:`1px solid ${C.border}`, 
              padding:18, 
              boxShadow:"0 1px 4px rgba(0,0,0,0.05)" 
            }}>
            <div style={{ display:"flex", justifyContent:"space-between", alignItems:"flex-start", marginBottom:12 }}>
              <div style={{ 
                width:36, 
                height:36, 
                borderRadius:10, 
                background:C.blueLight, 
                display:"flex", 
                alignItems:"center", 
                justifyContent:"center", 
                fontSize:16, 
                fontWeight:800, 
                color:C.blue 
              }}>{c.name[0]}</div>
              <Badge label={c.trend} />
            </div>
            <p style={{ fontSize:14, fontWeight:800, color:C.text, marginBottom:2 }}>{c.name}</p>
            <p style={{ fontSize:12, color:C.muted, marginBottom:10 }}>{c.product}</p>
            <div style={{ display:"flex", justifyContent:"space-between" }}>
              <div>
                <p style={{ fontSize:10, color:C.muted, fontWeight:600 }}>PRICE</p>
                <p style={{ fontSize:16, fontWeight:800, color:C.text, fontFamily:"monospace" }}>{c.price}</p>
              </div>
              <div style={{ textAlign:"right" }}>
                <p style={{ fontSize:10, color:C.muted, fontWeight:600 }}>CHANGE</p>
                <p style={{ fontSize:16, fontWeight:800, color: c.change.startsWith("+") ? C.green : C.red }}>{c.change}</p>
              </div>
            </div>
            <div style={{ marginTop:10, padding:"6px 10px", background:C.light, borderRadius:8 }}>
              <p style={{ fontSize:11, color:C.muted }}>Discount: <strong style={{ color:C.orange }}>{c.discount}</strong> · Market share: <strong style={{ color:C.blue }}>{c.share}%</strong></p>
            </div>
          </motion.div>
        ))}
      </div>

      {/* Detailed table */}
      <Card>
        <SectionHeader title="Detailed Comparison Table" sub="All tracked attributes" />
        <table style={{ width:"100%", borderCollapse:"collapse" }}>
          <thead>
            <tr style={{ borderBottom:`2px solid ${C.border}`, background:C.light }}>
              {["Competitor","Product","Price","Discount","Market Share","MoM Change","Trend","Actions"].map(h=>(
                <th key={h} style={{ textAlign:"left", fontSize:11, fontWeight:700, color:C.muted, textTransform:"uppercase", letterSpacing:"0.06em", padding:"10px 12px" }}>{h}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            {filteredCompetitors.map((c,i) => (
              <motion.tr 
                key={i} 
                initial={{ opacity:0 }} 
                animate={{ opacity:1 }} 
                transition={{ delay:i*0.06 }}
                style={{ borderBottom:`1px solid ${C.border}` }}
                onMouseEnter={e => e.currentTarget.style.background=C.light}
                onMouseLeave={e => e.currentTarget.style.background="transparent"}>
                <td style={{ padding:"13px 12px" }}>
                  <div style={{ display:"flex", alignItems:"center", gap:8 }}>
                    <div style={{ 
                      width:30, 
                      height:30, 
                      borderRadius:8, 
                      background:C.blueLight, 
                      display:"flex", 
                      alignItems:"center", 
                      justifyContent:"center", 
                      fontSize:13, 
                      fontWeight:800, 
                      color:C.blue 
                    }}>{c.name[0]}</div>
                    <span style={{ fontSize:13, fontWeight:700, color:C.text }}>{c.name}</span>
                  </div>
                </td>
                <td style={{ padding:"13px 12px", fontSize:13, color:C.muted }}>{c.product}</td>
                <td style={{ padding:"13px 12px", fontSize:13, fontWeight:700, color:C.text, fontFamily:"monospace" }}>{c.price}</td>
                <td style={{ padding:"13px 12px" }}>
                  <span style={{ background:C.yellowLight, color:"#92400E", fontSize:12, fontWeight:700, padding:"3px 8px", borderRadius:6 }}>{c.discount}</span>
                </td>
                <td style={{ padding:"13px 12px" }}>
                  <div style={{ display:"flex", alignItems:"center", gap:8 }}>
                    <div style={{ width:60, height:6, background:C.light, borderRadius:99 }}>
                      <div style={{ width:`${c.share/40*100}%`, height:"100%", background:C.blue, borderRadius:99 }} />
                    </div>
                    <span style={{ fontSize:12, fontWeight:700, color:C.text }}>{c.share}%</span>
                  </div>
                </td>
                <td style={{ padding:"13px 12px" }}>
                  <span style={{ fontSize:13, fontWeight:700, color: c.change.startsWith("+") ? C.green : c.change.startsWith("-") ? C.red : C.muted }}>{c.change}</span>
                </td>
                <td style={{ padding:"13px 12px" }}><Badge label={c.trend} /></td>
                <td style={{ padding:"13px 12px" }}>
                  <button style={{ 
                    background:C.blueLight, 
                    color:C.blue, 
                    border:"none", 
                    borderRadius:8, 
                    padding:"5px 12px", 
                    fontSize:12, 
                    fontWeight:600, 
                    cursor:"pointer", 
                    fontFamily:"inherit" 
                  }}>Track</button>
                </td>
              </motion.tr>
            ))}
          </tbody>
        </table>
      </Card>
    </div>
  );
}

export default CompetitorPage;