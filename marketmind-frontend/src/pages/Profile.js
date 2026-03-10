import React, { useState } from 'react';
import { C } from '../styles/designTokens';
import Card from '../components/common/Card';
import SectionHeader from '../components/common/SectionHeader';
import Badge from '../components/common/Badge';

function SettingsPage() {
  const [notifPrefs, setNotifPrefs] = useState({ email:true, sms:false, weekly:true, instant:true });
  const [trackingPrefs, setTrackingPrefs] = useState({ pricing:true, products:true, social:true, news:false });
  
  return (
    <div>
      <SectionHeader title="Settings & Profile" sub="Manage your account and preferences" />
      <div style={{ display:"grid", gridTemplateColumns:"1fr 1fr", gap:16 }}>

        {/* Profile */}
        <Card>
          <p style={{ fontSize:15, fontWeight:700, color:C.text, marginBottom:16 }}>Profile Information</p>
          <div style={{ display:"flex", alignItems:"center", gap:14, marginBottom:24, padding:16, background:C.light, borderRadius:12 }}>
            <div style={{ 
              width:56, 
              height:56, 
              borderRadius:16, 
              background:`linear-gradient(135deg,${C.blue},#A78BFA)`, 
              display:"flex", 
              alignItems:"center", 
              justifyContent:"center", 
              fontSize:22, 
              color:"white", 
              fontWeight:800 
            }}>JD</div>
            <div>
              <p style={{ fontSize:15, fontWeight:700, color:C.text }}>Jane Doe</p>
              <p style={{ fontSize:13, color:C.muted }}>jane@mybusiness.com</p>
              <Badge label="blue" />
            </div>
            <button style={{ 
              marginLeft:"auto", 
              background:C.blueLight, 
              color:C.blue, 
              border:"none", 
              borderRadius:8, 
              padding:"6px 14px", 
              fontSize:12, 
              fontWeight:700, 
              cursor:"pointer", 
              fontFamily:"inherit" 
            }}>Edit Photo</button>
          </div>
          {[["Full Name","Jane Doe"],["Email","jane@mybusiness.com"],["Business Name","Doe Analytics"],["Industry","SaaS / Software"]].map(([lbl,val],i) => (
            <div key={i} style={{ marginBottom:14 }}>
              <label style={{ fontSize:12, fontWeight:700, color:C.muted, display:"block", marginBottom:5, textTransform:"uppercase", letterSpacing:"0.05em" }}>{lbl}</label>
              <input defaultValue={val} style={{ 
                width:"100%", 
                padding:"10px 14px", 
                borderRadius:10, 
                border:`1.5px solid ${C.border}`, 
                fontSize:14, 
                color:C.text, 
                fontFamily:"inherit", 
                outline:"none", 
                boxSizing:"border-box" 
              }} />
            </div>
          ))}
          <div style={{ marginBottom:14 }}>
            <label style={{ fontSize:12, fontWeight:700, color:C.muted, display:"block", marginBottom:5, textTransform:"uppercase", letterSpacing:"0.05em" }}>New Password</label>
            <input type="password" placeholder="Leave blank to keep current" style={{ 
              width:"100%", 
              padding:"10px 14px", 
              borderRadius:10, 
              border:`1.5px solid ${C.border}`, 
              fontSize:14, 
              color:C.text, 
              fontFamily:"inherit", 
              outline:"none", 
              boxSizing:"border-box" 
            }} />
          </div>
          <button style={{ 
            width:"100%", 
            padding:"11px", 
            borderRadius:10, 
            border:"none", 
            background:`linear-gradient(135deg,${C.blue},#5B9EFF)`, 
            color:"white", 
            fontSize:14, 
            fontWeight:700, 
            cursor:"pointer", 
            fontFamily:"inherit" 
          }}>Save Changes</button>
        </Card>

        <div style={{ display:"flex", flexDirection:"column", gap:16 }}>
          {/* Tracking Preferences */}
          <Card>
            <p style={{ fontSize:15, fontWeight:700, color:C.text, marginBottom:16 }}>Agent Tracking Preferences</p>
            <p style={{ fontSize:13, color:C.muted, marginBottom:14, lineHeight:1.6 }}>Choose what data your AI agents should monitor and how frequently.</p>
            {[["Competitor Pricing","pricing","Track real-time price changes"],["Product Updates","products","Monitor new features and releases"],["Social Media","social","Track competitor social mentions"],["Industry News","news","Pull relevant news articles"]].map(([lbl,key,sub]) => (
              <div key={key} style={{ display:"flex", alignItems:"center", justifyContent:"space-between", padding:"10px 0", borderBottom:`1px solid ${C.border}` }}>
                <div>
                  <p style={{ fontSize:13, fontWeight:600, color:C.text }}>{lbl}</p>
                  <p style={{ fontSize:12, color:C.muted }}>{sub}</p>
                </div>
                <button 
                  onClick={() => setTrackingPrefs(p => ({...p,[key]:!p[key]}))}
                  style={{ 
                    width:44, 
                    height:24, 
                    borderRadius:12, 
                    border:"none", 
                    background: trackingPrefs[key] ? C.blue : C.border, 
                    cursor:"pointer", 
                    position:"relative", 
                    transition:"background 0.2s" 
                  }}>
                  <div style={{ 
                    width:18, 
                    height:18, 
                    borderRadius:"50%", 
                    background:"white", 
                    position:"absolute", 
                    top:3, 
                    left: trackingPrefs[key] ? 23 : 3, 
                    transition:"left 0.2s", 
                    boxShadow:"0 1px 4px rgba(0,0,0,0.2)" 
                  }} />
                </button>
              </div>
            ))}
            <div style={{ marginTop:14 }}>
              <label style={{ fontSize:12, fontWeight:700, color:C.muted, display:"block", marginBottom:8, textTransform:"uppercase", letterSpacing:"0.05em" }}>Update Frequency</label>
              <div style={{ display:"flex", gap:8 }}>
                {["Hourly","Daily","Weekly"].map((f,i) => (
                  <button key={f} style={{ 
                    flex:1, 
                    padding:"8px 0", 
                    borderRadius:9, 
                    border:`1.5px solid ${i===1?C.blue:C.border}`, 
                    background:i===1?C.blueLight:C.white, 
                    color:i===1?C.blue:C.muted, 
                    fontSize:12, 
                    fontWeight:700, 
                    cursor:"pointer", 
                    fontFamily:"inherit" 
                  }}>{f}</button>
                ))}
              </div>
            </div>
          </Card>

          {/* Notifications */}
          <Card>
            <p style={{ fontSize:15, fontWeight:700, color:C.text, marginBottom:16 }}>Notification Preferences</p>
            {[["Email Alerts","email","Receive alerts via email"],["SMS Alerts","sms","Receive alerts via SMS"],["Weekly Summary","weekly","Weekly digest every Monday"],["Instant Signals","instant","Real-time high-priority alerts"]].map(([lbl,key,sub]) => (
              <div key={key} style={{ display:"flex", alignItems:"center", justifyContent:"space-between", padding:"10px 0", borderBottom:`1px solid ${C.border}` }}>
                <div>
                  <p style={{ fontSize:13, fontWeight:600, color:C.text }}>{lbl}</p>
                  <p style={{ fontSize:12, color:C.muted }}>{sub}</p>
                </div>
                <button 
                  onClick={() => setNotifPrefs(p => ({...p,[key]:!p[key]}))}
                  style={{ 
                    width:44, 
                    height:24, 
                    borderRadius:12, 
                    border:"none", 
                    background: notifPrefs[key] ? C.green : C.border, 
                    cursor:"pointer", 
                    position:"relative", 
                    transition:"background 0.2s" 
                  }}>
                  <div style={{ 
                    width:18, 
                    height:18, 
                    borderRadius:"50%", 
                    background:"white", 
                    position:"absolute", 
                    top:3, 
                    left: notifPrefs[key] ? 23 : 3, 
                    transition:"left 0.2s", 
                    boxShadow:"0 1px 4px rgba(0,0,0,0.2)" 
                  }} />
                </button>
              </div>
            ))}
          </Card>
        </div>
      </div>
    </div>
  );
}

export default SettingsPage;