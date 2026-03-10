import React from 'react';
import { motion } from 'framer-motion';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { C } from '../styles/designTokens';
import Card from '../components/common/Card';
import StatCard from '../components/common/StatCard';
import SectionHeader from '../components/common/SectionHeader';
import Badge from '../components/common/Badge';
import { reviews, weeklyTrend, wordCloudWords } from '../utils/constants';

function InsightsPage() {
  return (
    <div>
      <SectionHeader title="Customer Insights" sub="Sentiment analysis from 1,248 reviews across all platforms" />

      <div style={{ display:"grid", gridTemplateColumns:"repeat(3,1fr)", gap:16, marginBottom:16 }}>
        <StatCard icon="😊" label="Positive Reviews" value="58%" sub="↑4% this week" delay={0}    accent={C.green}  />
        <StatCard icon="😐" label="Neutral Reviews"  value="26%" sub="No change"     delay={0.08} accent={C.yellow} />
        <StatCard icon="😞" label="Negative Reviews" value="16%" sub="↓2% this week" delay={0.16} accent={C.red}    />
      </div>

      <div style={{ display:"grid", gridTemplateColumns:"1fr 1fr", gap:16, marginBottom:16 }}>
        {/* Sentiment Trend */}
        <Card>
          <SectionHeader title="Sentiment Timeline" sub="Last 7 days (daily breakdown)" />
          <ResponsiveContainer width="100%" height={220}>
            <BarChart data={weeklyTrend} barSize={20}>
              <CartesianGrid strokeDasharray="3 3" stroke={C.border} vertical={false} />
              <XAxis dataKey="day" tick={{ fill:C.muted, fontSize:12 }} axisLine={false} tickLine={false} />
              <YAxis tick={{ fill:C.muted, fontSize:12 }} axisLine={false} tickLine={false} />
              <Tooltip contentStyle={{ borderRadius:10, fontSize:12, border:`1px solid ${C.border}` }} />
              <Bar dataKey="positive" name="Positive" fill={C.green}  radius={[4,4,0,0]} stackId="a" />
              <Bar dataKey="neutral"  name="Neutral"  fill={C.yellow} radius={[0,0,0,0]} stackId="a" />
              <Bar dataKey="negative" name="Negative" fill={C.red}    radius={[4,4,0,0]} stackId="a" />
            </BarChart>
          </ResponsiveContainer>
        </Card>

        {/* Word Cloud */}
        <Card>
          <SectionHeader title="Common Feedback Themes" sub="Top keywords from customer reviews" />
          <div style={{ display:"flex", flexWrap:"wrap", gap:8, padding:"8px 0", alignItems:"center" }}>
            {wordCloudWords.map((w,i) => (
              <motion.span 
                key={i} 
                initial={{ opacity:0, scale:0.8 }} 
                animate={{ opacity:1, scale:1 }} 
                transition={{ delay:i*0.05 }}
                style={{ 
                  fontSize:w.size * 0.55, 
                  fontWeight:700, 
                  color:w.color, 
                  padding:"3px 8px", 
                  borderRadius:20, 
                  background:`${w.color}15`, 
                  cursor:"default", 
                  whiteSpace:"nowrap" 
                }}>
                {w.word}
              </motion.span>
            ))}
          </div>
        </Card>
      </div>

      {/* Review List */}
      <Card>
        <SectionHeader title="Recent Customer Reviews" sub="With AI sentiment tagging" />
        <div style={{ display:"flex", flexDirection:"column", gap:12 }}>
          {reviews.map((r,i) => (
            <motion.div 
              key={i} 
              initial={{ opacity:0, y:10 }} 
              animate={{ opacity:1, y:0 }} 
              transition={{ delay:i*0.08 }}
              style={{ 
                padding:"16px 18px", 
                borderRadius:12, 
                background:C.light, 
                border:`1px solid ${C.border}`, 
                display:"flex", 
                gap:14, 
                alignItems:"flex-start" 
              }}>
              <div style={{ 
                width:40, 
                height:40, 
                borderRadius:12, 
                background:C.blueLight, 
                display:"flex", 
                alignItems:"center", 
                justifyContent:"center", 
                fontSize:16, 
                fontWeight:800, 
                color:C.blue, 
                flexShrink:0 
              }}>{r.author[0]}</div>
              <div style={{ flex:1 }}>
                <div style={{ display:"flex", alignItems:"center", gap:10, marginBottom:6 }}>
                  <p style={{ fontSize:14, fontWeight:700, color:C.text }}>{r.author}</p>
                  <span style={{ color:C.yellow, fontSize:13 }}>{"★".repeat(r.stars)}{"☆".repeat(5-r.stars)}</span>
                  <Badge label={r.sentiment} />
                  <span style={{ marginLeft:"auto", fontSize:12, color:C.muted }}>{r.date}</span>
                </div>
                <p style={{ fontSize:13, color:C.muted, lineHeight:1.6 }}>{r.text}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </Card>
    </div>
  );
}

export default InsightsPage;