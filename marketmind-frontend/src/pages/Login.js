import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { C } from '../styles/designTokens';

function LoginPage({ onLogin }) {
  const [mode, setMode] = useState("login");
  
  return (
    <div style={{ 
      minHeight:"100vh", 
      display:"flex", 
      alignItems:"center", 
      justifyContent:"center", 
      background:`linear-gradient(135deg, #EBF3FF 0%, #F0F4FF 40%, #FFF8E1 100%)`, 
      position:"relative", 
      overflow:"hidden", 
      fontFamily:"'Plus Jakarta Sans',sans-serif" 
    }}>
      <style>{`@import url('https://fonts.googleapis.com/css2?family=Plus+Jakarta+Sans:wght@400;500;600;700;800&display=swap');`}</style>

      {/* BG Blobs */}
      {[[C.blue,"-10%","10%","320px"],[C.yellow,"80%","60%","200px"],[C.green,"20%","80%","180px"]].map(([c,l,t,s],i)=>(
        <div key={i} style={{ position:"absolute", left:l, top:t, width:s, height:s, borderRadius:"50%", background:c, opacity:0.08, filter:"blur(60px)", pointerEvents:"none" }} />
      ))}

      <motion.div 
        initial={{ opacity:0, y:30, scale:0.96 }} 
        animate={{ opacity:1, y:0, scale:1 }} 
        transition={{ duration:0.5, ease:"easeOut" }}
        style={{ 
          width:420, 
          background:C.white, 
          borderRadius:24, 
          boxShadow:"0 8px 48px rgba(13,110,253,0.12),0 2px 8px rgba(0,0,0,0.06)", 
          padding:40, 
          position:"relative", 
          zIndex:2 
        }}>

        {/* Logo */}
        <div style={{ textAlign:"center", marginBottom:28 }}>
          <div style={{ 
            width:56, 
            height:56, 
            borderRadius:16, 
            background:`linear-gradient(135deg,${C.blue},#5B9EFF)`, 
            display:"flex", 
            alignItems:"center", 
            justifyContent:"center", 
            fontSize:28, 
            margin:"0 auto 12px", 
            boxShadow:`0 8px 20px ${C.blue}40` 
          }}>📡</div>
          <h1 style={{ fontSize:22, fontWeight:800, color:C.text }}>Market Intelligence AI</h1>
          <p style={{ fontSize:13, color:C.muted, marginTop:4 }}>Smart competitive intelligence for small business</p>
        </div>

        {/* Tabs */}
        <div style={{ display:"flex", background:C.light, borderRadius:12, padding:4, marginBottom:24 }}>
          {["login","signup"].map(t => (
            <button 
              key={t} 
              onClick={() => setMode(t)} 
              style={{ 
                flex:1, 
                padding:"8px 0", 
                borderRadius:9, 
                border:"none", 
                fontFamily:"inherit", 
                fontSize:13, 
                fontWeight:700, 
                cursor:"pointer", 
                background: mode===t ? C.white : "transparent", 
                color: mode===t ? C.blue : C.muted, 
                boxShadow: mode===t ? "0 1px 4px rgba(0,0,0,0.08)" : "none", 
                transition:"all 0.2s" 
              }}>
              {t === "login" ? "Sign In" : "Sign Up"}
            </button>
          ))}
        </div>

        {/* OAuth */}
        <div style={{ display:"flex", gap:10, marginBottom:20 }}>
          {[["🔵","Continue with Google"],["💼","Continue with LinkedIn"]].map(([ico,lbl],i) => (
            <button key={i} style={{ 
              flex:1, 
              padding:"10px 8px", 
              borderRadius:10, 
              border:`1px solid ${C.border}`, 
              background:C.white, 
              fontSize:12, 
              fontWeight:600, 
              color:C.text, 
              cursor:"pointer", 
              display:"flex", 
              alignItems:"center", 
              justifyContent:"center", 
              gap:6, 
              fontFamily:"inherit" 
            }}>
              <span>{ico}</span>{lbl}
            </button>
          ))}
        </div>

        <div style={{ display:"flex", alignItems:"center", gap:10, marginBottom:20 }}>
          <div style={{ flex:1, height:1, background:C.border }} />
          <span style={{ fontSize:12, color:C.muted }}>or continue with email</span>
          <div style={{ flex:1, height:1, background:C.border }} />
        </div>

        {/* Fields */}
        {mode === "signup" && (
          <div style={{ marginBottom:14 }}>
            <label style={{ fontSize:12, fontWeight:700, color:C.text, display:"block", marginBottom:6 }}>Full Name</label>
            <input placeholder="Jane Doe" style={{ 
              width:"100%", 
              padding:"11px 14px", 
              borderRadius:10, 
              border:`1.5px solid ${C.border}`, 
              fontSize:14, 
              fontFamily:"inherit", 
              outline:"none", 
              boxSizing:"border-box", 
              color:C.text 
            }} />
          </div>
        )}
        <div style={{ marginBottom:14 }}>
          <label style={{ fontSize:12, fontWeight:700, color:C.text, display:"block", marginBottom:6 }}>Email Address</label>
          <input type="email" placeholder="jane@mybusiness.com" style={{ 
            width:"100%", 
            padding:"11px 14px", 
            borderRadius:10, 
            border:`1.5px solid ${C.border}`, 
            fontSize:14, 
            fontFamily:"inherit", 
            outline:"none", 
            boxSizing:"border-box", 
            color:C.text 
          }} />
        </div>
        <div style={{ marginBottom:20 }}>
          <label style={{ fontSize:12, fontWeight:700, color:C.text, display:"block", marginBottom:6 }}>Password</label>
          <input type="password" placeholder="••••••••" style={{ 
            width:"100%", 
            padding:"11px 14px", 
            borderRadius:10, 
            border:`1.5px solid ${C.border}`, 
            fontSize:14, 
            fontFamily:"inherit", 
            outline:"none", 
            boxSizing:"border-box", 
            color:C.text 
          }} />
        </div>

        <motion.button 
          whileHover={{ scale:1.02 }} 
          whileTap={{ scale:0.97 }} 
          onClick={onLogin}
          style={{ 
            width:"100%", 
            padding:"13px", 
            borderRadius:12, 
            border:"none", 
            background:`linear-gradient(135deg,${C.blue},#5B9EFF)`, 
            color:"white", 
            fontSize:15, 
            fontWeight:800, 
            cursor:"pointer", 
            boxShadow:`0 6px 20px ${C.blue}40`, 
            fontFamily:"inherit" 
          }}>
          {mode === "login" ? "Sign In →" : "Create Account →"}
        </motion.button>

        {mode === "login" && (
          <p style={{ textAlign:"center", marginTop:16, fontSize:13, color:C.muted }}>
            Don't have an account?{" "}
            <span onClick={() => setMode("signup")} style={{ color:C.yellow, fontWeight:700, cursor:"pointer" }}>Sign up free</span>
          </p>
        )}

        {mode === "signup" && (
          <p style={{ textAlign:"center", marginTop:16, fontSize:12, color:C.muted, lineHeight:1.6 }}>
            By creating an account you agree to our{" "}
            <span style={{ color:C.blue, cursor:"pointer" }}>Terms of Service</span>
          </p>
        )}
      </motion.div>
    </div>
  );
}

export default LoginPage;