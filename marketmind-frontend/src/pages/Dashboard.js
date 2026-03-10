import React from 'react';
import { motion } from 'framer-motion';
import { 
  AreaChart, Area, PieChart, Pie, Cell,
  XAxis, YAxis, CartesianGrid, Tooltip, 
  ResponsiveContainer, Legend 
} from 'recharts';
import { C } from '../styles/designTokens';
import Card from '../components/common/Card';
import StatCard from '../components/common/StatCard';
import SectionHeader from '../components/common/SectionHeader';
import Badge from '../components/common/Badge';
import { trendData, sentimentData, competitors, opportunities } from '../utils/constants';

function DashboardPage({ onGenerate }) {
  return (
    <div>
      {/* Hero Banner */}
      <motion.div 
        initial={{ opacity:0, y:-10 }} 
        animate={{ opacity:1, y:0 }}
        style={{ 
          background:`linear-gradient(135deg,${C.blue} 0%,#5B9EFF 100%)`, 
          borderRadius:20, 
          padding:"28px 32px", 
          marginBottom:24, 
          display:"flex", 
          alignItems:"center", 
          justifyContent:"space-between", 
          position:"relative", 
          overflow:"hidden" 
        }}>
        <div style={{ position:"absolute", right:-20, top:-20, width:180, height:180, borderRadius:"50%", background:"rgba(255,255,255,0.08)" }} />
        <div style={{ position:"absolute", right:60, bottom:-40, width:120, height:120, borderRadius:"50%", background:"rgba(255,255,255,0.06)" }} />
        <div>
          <h1 style={{ fontSize:24, fontWeight:800, color:"white", fontFamily:"'Plus Jakarta Sans',sans-serif", marginBottom:6 }}>Good morning, Jane! 👋</h1>
          <p style={{ fontSize:14, color:"rgba(255,255,255,0.8)", marginBottom:16 }}>Your market has 3 new signals today. Stay ahead of the competition.</p>
          <div style={{ display:"flex", gap:10 }}>
            <motion.button 
              whileHover={{ scale:1.04 }} 
              whileTap={{ scale:0.96 }} 
              onClick={onGenerate}
              style={{ 
                background:"white", 
                color:C.blue, 
                border:"none", 
                borderRadius:10, 
                padding:"10px 20px", 
                fontSize:13, 
                fontWeight:800, 
                cursor:"pointer", 
                boxShadow:"0 4px 12px rgba(0,0,0,0.15)", 
                fontFamily:"inherit" 
              }}>
              ⚡ Generate Strategy
            </motion.button>
            <button style={{ 
              background:"rgba(255,255,255,0.15)", 
              color:"white", 
              border:"1px solid rgba(255,255,255,0.3)", 
              borderRadius:10, 
              padding:"10px 20px", 
              fontSize:13, 
              fontWeight:600, 
              cursor:"pointer", 
              fontFamily:"inherit" 
            }}>
              View Report →
            </button>
          </div>
        </div>
        <div style={{ display:"flex", gap:16 }}>
          {[["📈","Market Share","36%","+2.1%"],["🏆","Rank","#2 of 5","↑1 this week"],["⚡","Signals","14 new","3 high priority"]].map(([ico,lbl,val,sub],i)=>(
            <div key={i} style={{ 
              background:"rgba(255,255,255,0.15)", 
              borderRadius:14, 
              padding:"16px 20px", 
              backdropFilter:"blur(10px)", 
              border:"1px solid rgba(255,255,255,0.2)", 
              minWidth:120 
            }}>
              <p style={{ fontSize:20, marginBottom:4 }}>{ico}</p>
              <p style={{ fontSize:11, color:"rgba(255,255,255,0.7)", fontWeight:600 }}>{lbl}</p>
              <p style={{ fontSize:20, fontWeight:800, color:"white", lineHeight:1.2 }}>{val}</p>
              <p style={{ fontSize:11, color:"#A7F3D0", fontWeight:600 }}>{sub}</p>
            </div>
          ))}
        </div>
      </motion.div>

      {/* Stat Cards */}
      <div style={{ display:"grid", gridTemplateColumns:"repeat(4,1fr)", gap:16, marginBottom:24 }}>
        <StatCard icon="⚔️" label="Competitors" value="5" sub="2 new threats detected" delay={0} accent={C.blue} />
        <StatCard icon="😊" label="Sentiment Score" value="72%" sub="↑4% from last week" delay={0.08} accent={C.green} />
        <StatCard icon="🚀" label="Opportunities" value="5" sub="2 high priority" subColor={C.red} delay={0.16} accent={C.yellow} />
        <StatCard icon="📉" label="Avg Competitor Price" value="$109" sub="We're at $99 — cheaper!" delay={0.24} accent={C.orange} />
      </div>

      {/* Charts Row */}
      <div style={{ display:"grid", gridTemplateColumns:"2fr 1fr", gap:16, marginBottom:16 }}>
        <Card>
          <SectionHeader title="Market Share Trends" sub="Monthly comparison vs top rivals" action="View Details" />
          <ResponsiveContainer width="100%" height={220}>
            <AreaChart data={trendData}>
              <defs>
                {[["us",C.blue],["r1",C.yellow],["r2",C.red]].map(([k,c])=>(
                  <linearGradient key={k} id={`g${k}`} x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%"  stopColor={c} stopOpacity={0.2} />
                    <stop offset="95%" stopColor={c} stopOpacity={0}   />
                  </linearGradient>
                ))}
              </defs>
              <CartesianGrid strokeDasharray="3 3" stroke={C.border} />
              <XAxis dataKey="month" tick={{ fill:C.muted, fontSize:12 }} axisLine={false} tickLine={false} />
              <YAxis tick={{ fill:C.muted, fontSize:12 }} axisLine={false} tickLine={false} />
              <Tooltip contentStyle={{ borderRadius:10, border:`1px solid ${C.border}`, boxShadow:"0 4px 12px rgba(0,0,0,0.08)", fontSize:12 }} />
              <Legend wrapperStyle={{ fontSize:12, paddingTop:8 }} />
              <Area type="monotone" dataKey="us"     name="Us"          stroke={C.blue}   fill="url(#gus)" strokeWidth={2.5} />
              <Area type="monotone" dataKey="rival1" name="AlphaStore"  stroke={C.yellow} fill="url(#gr1)" strokeWidth={2} />
              <Area type="monotone" dataKey="rival2" name="BetaMarket"  stroke={C.red}    fill="url(#gr2)" strokeWidth={2} />
            </AreaChart>
          </ResponsiveContainer>
        </Card>

        <Card>
          <SectionHeader title="Customer Sentiment" sub="Based on 1,248 reviews" />
          <ResponsiveContainer width="100%" height={160}>
            <PieChart>
              <Pie data={sentimentData} cx="50%" cy="50%" innerRadius={45} outerRadius={72} paddingAngle={3} dataKey="value">
                {sentimentData.map((d,i) => <Cell key={i} fill={d.color} />)}
              </Pie>
              <Tooltip formatter={(v) => `${v}%`} contentStyle={{ borderRadius:10, fontSize:12 }} />
            </PieChart>
          </ResponsiveContainer>
          <div style={{ display:"flex", flexDirection:"column", gap:6, marginTop:8 }}>
            {sentimentData.map(d => (
              <div key={d.name} style={{ display:"flex", alignItems:"center", gap:8 }}>
                <div style={{ width:8, height:8, borderRadius:"50%", background:d.color }} />
                <span style={{ fontSize:12, color:C.muted, flex:1 }}>{d.name}</span>
                <div style={{ flex:1, height:6, background:C.light, borderRadius:99 }}>
                  <div style={{ width:`${d.value}%`, height:"100%", background:d.color, borderRadius:99 }} />
                </div>
                <span style={{ fontSize:12, fontWeight:700, color:C.text, width:30, textAlign:"right" }}>{d.value}%</span>
              </div>
            ))}
          </div>
        </Card>
      </div>

      {/* Bottom Row */}
      <div style={{ display:"grid", gridTemplateColumns:"1fr 1fr", gap:16 }}>
        {/* Competitor Table */}
        <Card>
          <SectionHeader title="Top Competitors" sub="Live tracking" action="Full Analysis →" />
          <table style={{ width:"100%", borderCollapse:"collapse" }}>
            <thead>
              <tr style={{ borderBottom:`1.5px solid ${C.border}` }}>
                {["Company","Price","Share","Trend"].map(h => (
                  <th key={h} style={{ textAlign:"left", fontSize:11, fontWeight:700, color:C.muted, textTransform:"uppercase", letterSpacing:"0.06em", padding:"0 0 10px" }}>{h}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {competitors.slice(0,4).map((c,i) => (
                <motion.tr key={i} initial={{ opacity:0 }} animate={{ opacity:1 }} transition={{ delay:0.1*i }}
                  style={{ borderBottom:`1px solid ${C.border}` }}>
                  <td style={{ padding:"10px 0", fontSize:13, fontWeight:600, color:C.text }}>{c.name}</td>
                  <td style={{ padding:"10px 0", fontSize:13, color:C.muted, fontFamily:"monospace" }}>{c.price}</td>
                  <td style={{ padding:"10px 0" }}>
                    <div style={{ display:"flex", alignItems:"center", gap:6 }}>
                      <div style={{ width:40, height:5, background:C.light, borderRadius:99 }}>
                        <div style={{ width:`${c.share/40*100}%`, height:"100%", background:C.blue, borderRadius:99 }} />
                      </div>
                      <span style={{ fontSize:12, color:C.muted }}>{c.share}%</span>
                    </div>
                  </td>
                  <td style={{ padding:"10px 0" }}><Badge label={c.trend} /></td>
                </motion.tr>
              ))}
            </tbody>
          </table>
        </Card>

        {/* Opportunities Preview */}
        <Card>
          <SectionHeader title="Top Opportunities" sub="AI-generated insights" action="View All →" />
          <div style={{ display:"flex", flexDirection:"column", gap:10 }}>
            {opportunities.slice(0,3).map((o,i) => (
              <motion.div 
                key={i} 
                initial={{ opacity:0, x:10 }} 
                animate={{ opacity:1, x:0 }} 
                transition={{ delay:0.1*i }}
                style={{ 
                  padding:"12px 14px", 
                  borderRadius:12, 
                  background:C.light, 
                  border:`1px solid ${C.border}`, 
                  display:"flex", 
                  gap:12, 
                  alignItems:"flex-start" 
                }}>
                <span style={{ fontSize:22 }}>{o.icon}</span>
                <div style={{ flex:1, minWidth:0 }}>
                  <div style={{ display:"flex", alignItems:"center", gap:8, marginBottom:4 }}>
                    <p style={{ fontSize:13, fontWeight:700, color:C.text }}>{o.title}</p>
                    <Badge label={o.priority} />
                  </div>
                  <p style={{ fontSize:12, color:C.muted, lineHeight:1.5, whiteSpace:"nowrap", overflow:"hidden", textOverflow:"ellipsis" }}>{o.desc}</p>
                </div>
                <span style={{ fontSize:12, fontWeight:700, color:C.green, whiteSpace:"nowrap" }}>{o.roi}</span>
              </motion.div>
            ))}
          </div>
        </Card>
      </div>
    </div>
  );
}

export default DashboardPage;