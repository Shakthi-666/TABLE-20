import React, { useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { C } from './styles/designTokens';
import Navbar from './components/layout/Navbar';
import Sidebar from './components/layout/Sidebar';
import LoginPage from './pages/Login';
import DashboardPage from './pages/Dashboard';
import CompetitorPage from './pages/CompetitorAnalysis';
import InsightsPage from './pages/CustomerInsights';
import OpportunitiesPage from './pages/Opportunities';
import ReportsPage from './pages/Reports';
import SettingsPage from './pages/Profile';
import StrategyModal from './components/modals/StrategyModal';

function App() {
  const [loggedIn, setLoggedIn] = useState(false);
  const [page, setPage] = useState("dashboard");
  const [showStrategy, setShowStrategy] = useState(false);

  if (!loggedIn) return <LoginPage onLogin={() => setLoggedIn(true)} />;

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Plus+Jakarta+Sans:wght@400;500;600;700;800&display=swap');
        * { box-sizing:border-box; margin:0; padding:0; }
        body { background:${C.bg}; font-family:'Plus Jakarta Sans',sans-serif; }
        ::-webkit-scrollbar { width:5px; }
        ::-webkit-scrollbar-track { background:transparent; }
        ::-webkit-scrollbar-thumb { background:${C.border}; border-radius:3px; }
        button,input,select { font-family:'Plus Jakarta Sans',sans-serif; }
      `}</style>

      <div style={{ minHeight:"100vh", display:"flex", flexDirection:"column" }}>
        <Navbar page={page} setPage={setPage} onGenerate={() => setShowStrategy(true)} />
        <div style={{ flex:1, display:"flex" }}>
          <Sidebar page={page} setPage={setPage} />
          <main style={{ flex:1, padding:28, overflowY:"auto", maxHeight:"calc(100vh - 64px)" }}>
            <AnimatePresence mode="wait">
              <motion.div 
                key={page} 
                initial={{ opacity:0, y:10 }} 
                animate={{ opacity:1, y:0 }} 
                exit={{ opacity:0, y:-10 }} 
                transition={{ duration:0.25 }}
              >
                {page === "dashboard"     && <DashboardPage onGenerate={() => setShowStrategy(true)} />}
                {page === "competitors"   && <CompetitorPage />}
                {page === "insights"      && <InsightsPage />}
                {page === "opportunities" && <OpportunitiesPage onGenerate={() => setShowStrategy(true)} />}
                {page === "reports"       && <ReportsPage />}
                {page === "settings"      && <SettingsPage />}
              </motion.div>
            </AnimatePresence>
          </main>
        </div>
      </div>

      <AnimatePresence>
        {showStrategy && <StrategyModal onClose={() => setShowStrategy(false)} />}
      </AnimatePresence>
    </>
  );
}

export default App;