import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { C } from '../styles/designTokens';
import Card from '../components/common/Card';
import StatCard from '../components/common/StatCard';
import SectionHeader from '../components/common/SectionHeader';
import { RevenueChart, LeadsChart } from '../components/charts/Chart';
import { Table } from '../components/tables/Table';
import { reportData } from '../utils/constants';

function ReportsPage() {
  const [dateRange, setDateRange] = useState("6months");
  const [selectedReport, setSelectedReport] = useState(null);

  // Calculate summary metrics
  const totalRevenue = reportData.reduce((sum, item) => sum + item.revenue, 0);
  const totalLeads = reportData.reduce((sum, item) => sum + item.leads, 0);
  const totalConversions = reportData.reduce((sum, item) => sum + item.conversions, 0);
  
  const previousPeriodRevenue = 120000; // Mock data
  const revenueGrowth = ((totalRevenue - previousPeriodRevenue) / previousPeriodRevenue * 100).toFixed(0);
  
  const previousPeriodLeads = 950; // Mock data
  const leadsGrowth = ((totalLeads - previousPeriodLeads) / previousPeriodLeads * 100).toFixed(0);
  
  const previousPeriodConversions = 280; // Mock data
  const conversionsGrowth = ((totalConversions - previousPeriodConversions) / previousPeriodConversions * 100).toFixed(0);

  // Report templates data
  const reportTemplates = [
    {
      id: 1,
      icon: "📊",
      title: "Competitor Analysis Report",
      description: "Full competitor breakdown with pricing, trends, and recommendations",
      formats: ["PDF", "CSV"],
      category: "Competitor",
      lastGenerated: "2 days ago"
    },
    {
      id: 2,
      icon: "💬",
      title: "Customer Sentiment Report",
      description: "Detailed sentiment analysis, keyword themes, and review breakdown",
      formats: ["PDF"],
      category: "Customer",
      lastGenerated: "5 days ago"
    },
    {
      id: 3,
      icon: "🚀",
      title: "Opportunity Pipeline",
      description: "All AI-generated opportunities with ROI estimates and status",
      formats: ["CSV", "PDF"],
      category: "Strategy",
      lastGenerated: "1 day ago"
    },
    {
      id: 4,
      icon: "📈",
      title: "Market Trends Report",
      description: "6-month market share and pricing movement analysis",
      formats: ["PDF"],
      category: "Market",
      lastGenerated: "1 week ago"
    },
    {
      id: 5,
      icon: "⚙️",
      title: "Agent Activity Log",
      description: "Automated tracking activity, data sources, and update history",
      formats: ["CSV"],
      category: "System",
      lastGenerated: "3 days ago"
    },
    {
      id: 6,
      icon: "📅",
      title: "Monthly Performance",
      description: "Month-over-month KPI comparison and executive summary",
      formats: ["PDF", "CSV"],
      category: "Executive",
      lastGenerated: "Just now"
    }
  ];

  // Scheduled reports data
  const scheduledReports = [
    {
      name: "Weekly Competitor Update",
      frequency: "Every Monday",
      format: "PDF",
      recipients: "jane@mybusiness.com, team@mybusiness.com",
      nextRun: "Mar 16, 2026"
    },
    {
      name: "Monthly Executive Summary",
      frequency: "1st of each month",
      format: "PDF",
      recipients: "executives@mybusiness.com",
      nextRun: "Apr 1, 2026"
    },
    {
      name: "Daily Sentiment Alert",
      frequency: "Daily at 9 AM",
      format: "CSV",
      recipients: "jane@mybusiness.com",
      nextRun: "Tomorrow"
    }
  ];

  // Columns for scheduled reports table
  const scheduledColumns = [
    { header: "Report Name", accessor: "name" },
    { header: "Frequency", accessor: "frequency" },
    { header: "Format", accessor: "format" },
    { header: "Recipients", accessor: "recipients" },
    { header: "Next Run", accessor: "nextRun" }
  ];

  // Handle export
  const handleExport = (format, reportId) => {
    console.log(`Exporting report ${reportId} as ${format}`);
    // In production, this would trigger actual export/download
    alert(`Exporting report as ${format}... (Demo functionality)`);
  };

  // Handle schedule
  const handleSchedule = () => {
    alert("Schedule report dialog would open here (Demo functionality)");
  };

  return (
    <div>
      {/* Header with actions */}
      <div style={{ 
        display: "flex", 
        alignItems: "center", 
        justifyContent: "space-between", 
        marginBottom: 24 
      }}>
        <div>
          <h2 style={{ 
            fontSize: 20, 
            fontWeight: 800, 
            color: C.text, 
            fontFamily: "'Plus Jakarta Sans',sans-serif" 
          }}>
            Reports & Exports
          </h2>
          <p style={{ fontSize: 13, color: C.muted, marginTop: 2 }}>
            Download and schedule your market intelligence data
          </p>
        </div>
        
        <div style={{ display: "flex", gap: 12 }}>
          {/* Date range selector */}
          <select 
            value={dateRange}
            onChange={(e) => setDateRange(e.target.value)}
            style={{ 
              padding: "9px 14px", 
              borderRadius: 10, 
              border: `1.5px solid ${C.border}`, 
              fontSize: 13, 
              color: C.text, 
              background: C.white, 
              fontFamily: "inherit", 
              cursor: "pointer",
              outline: "none"
            }}
          >
            <option value="3months">Last 3 months</option>
            <option value="6months">Last 6 months</option>
            <option value="12months">This year</option>
            <option value="custom">Custom range</option>
          </select>

          {/* Schedule new report button */}
          <button
            onClick={handleSchedule}
            style={{ 
              padding: "9px 18px", 
              borderRadius: 10, 
              border: `1.5px solid ${C.blue}`, 
              background: C.white, 
              color: C.blue, 
              fontSize: 13, 
              fontWeight: 700, 
              cursor: "pointer", 
              fontFamily: "inherit",
              display: "flex",
              alignItems: "center",
              gap: 6
            }}
          >
            <span>📅</span> Schedule Report
          </button>
        </div>
      </div>

      {/* Summary Statistics */}
      <div style={{ 
        display: "grid", 
        gridTemplateColumns: "repeat(3,1fr)", 
        gap: 16, 
        marginBottom: 20 
      }}>
        <StatCard 
          icon="💰" 
          label="Total Revenue" 
          value={`$${totalRevenue.toLocaleString()}`} 
          sub={`↑${revenueGrowth}% vs last period`} 
          delay={0} 
          accent={C.blue} 
        />
        <StatCard 
          icon="👤" 
          label="Total Leads" 
          value={totalLeads.toLocaleString()} 
          sub={`↑${leadsGrowth}% vs last period`} 
          delay={0.08} 
          accent={C.green} 
        />
        <StatCard 
          icon="🎯" 
          label="Conversions" 
          value={totalConversions.toLocaleString()} 
          sub={`↑${conversionsGrowth}% vs last period`} 
          delay={0.16} 
          accent={C.yellow} 
        />
      </div>

      {/* Charts Row */}
      <div style={{ 
        display: "grid", 
        gridTemplateColumns: "2fr 1fr", 
        gap: 16, 
        marginBottom: 24 
      }}>
        <Card>
          <SectionHeader 
            title="Revenue Over Time" 
            sub="Monthly performance with trend analysis" 
            action="Download Chart"
            onAction={() => handleExport('PNG', 'revenue-chart')}
          />
          <RevenueChart data={reportData} />
        </Card>

        <Card>
          <SectionHeader 
            title="Leads vs Conversions" 
            sub="Monthly comparison" 
            action="Download Chart"
            onAction={() => handleExport('PNG', 'leads-chart')}
          />
          <LeadsChart data={reportData} />
        </Card>
      </div>

      {/* Detailed Data Table */}
      <Card style={{ marginBottom: 24 }}>
        <SectionHeader 
          title="Monthly Performance Details" 
          sub="Raw data for export" 
          action="Export as CSV"
          onAction={() => handleExport('CSV', 'monthly-data')}
        />
        
        <div style={{ overflowX: "auto" }}>
          <table style={{ width: "100%", borderCollapse: "collapse" }}>
            <thead>
              <tr style={{ background: C.light, borderBottom: `2px solid ${C.border}` }}>
                <th style={{ padding: "12px 16px", textAlign: "left", fontSize: 13, fontWeight: 700, color: C.muted }}>Month</th>
                <th style={{ padding: "12px 16px", textAlign: "right", fontSize: 13, fontWeight: 700, color: C.muted }}>Revenue</th>
                <th style={{ padding: "12px 16px", textAlign: "right", fontSize: 13, fontWeight: 700, color: C.muted }}>Leads</th>
                <th style={{ padding: "12px 16px", textAlign: "right", fontSize: 13, fontWeight: 700, color: C.muted }}>Conversions</th>
                <th style={{ padding: "12px 16px", textAlign: "right", fontSize: 13, fontWeight: 700, color: C.muted }}>Conv. Rate</th>
              </tr>
            </thead>
            <tbody>
              {reportData.map((row, i) => (
                <motion.tr
                  key={i}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: i * 0.05 }}
                  style={{ borderBottom: `1px solid ${C.border}` }}
                >
                  <td style={{ padding: "12px 16px", fontWeight: 600, color: C.text }}>{row.month}</td>
                  <td style={{ padding: "12px 16px", textAlign: "right", fontFamily: "monospace" }}>
                    ${row.revenue.toLocaleString()}
                  </td>
                  <td style={{ padding: "12px 16px", textAlign: "right" }}>{row.leads}</td>
                  <td style={{ padding: "12px 16px", textAlign: "right" }}>{row.conversions}</td>
                  <td style={{ padding: "12px 16px", textAlign: "right" }}>
                    <span style={{ 
                      background: C.greenLight, 
                      color: C.green, 
                      padding: "4px 8px", 
                      borderRadius: 6,
                      fontSize: 12,
                      fontWeight: 600
                    }}>
                      {((row.conversions / row.leads) * 100).toFixed(1)}%
                    </span>
                  </td>
                </motion.tr>
              ))}
            </tbody>
            <tfoot>
              <tr style={{ background: C.light, borderTop: `2px solid ${C.border}` }}>
                <td style={{ padding: "12px 16px", fontWeight: 700 }}>Total</td>
                <td style={{ padding: "12px 16px", textAlign: "right", fontWeight: 700, fontFamily: "monospace" }}>
                  ${totalRevenue.toLocaleString()}
                </td>
                <td style={{ padding: "12px 16px", textAlign: "right", fontWeight: 700 }}>{totalLeads}</td>
                <td style={{ padding: "12px 16px", textAlign: "right", fontWeight: 700 }}>{totalConversions}</td>
                <td style={{ padding: "12px 16px", textAlign: "right", fontWeight: 700 }}>
                  <span style={{ 
                    background: C.blueLight, 
                    color: C.blue, 
                    padding: "4px 8px", 
                    borderRadius: 6,
                    fontSize: 12
                  }}>
                    {((totalConversions / totalLeads) * 100).toFixed(1)}%
                  </span>
                </td>
              </tr>
            </tfoot>
          </table>
        </div>
      </Card>

      {/* Report Templates Grid */}
      <Card style={{ marginBottom: 24 }}>
        <div style={{ 
          display: "flex", 
          alignItems: "center", 
          justifyContent: "space-between",
          marginBottom: 20
        }}>
          <div>
            <h3 style={{ fontSize: 16, fontWeight: 700, color: C.text }}>Available Report Templates</h3>
            <p style={{ fontSize: 13, color: C.muted, marginTop: 2 }}>Pre-built reports ready to export</p>
          </div>
          
          {/* Category filters */}
          <div style={{ display: "flex", gap: 8 }}>
            {["All", "Competitor", "Customer", "Market", "Executive"].map(cat => (
              <button
                key={cat}
                style={{ 
                  padding: "5px 12px",
                  borderRadius: 20,
                  border: `1px solid ${C.border}`,
                  background: "transparent",
                  fontSize: 12,
                  color: C.muted,
                  cursor: "pointer"
                }}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>

        <div style={{ 
          display: "grid", 
          gridTemplateColumns: "repeat(3, 1fr)", 
          gap: 16 
        }}>
          {reportTemplates.map((report, i) => (
            <motion.div
              key={report.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.06 }}
              whileHover={{ y: -4, boxShadow: "0 12px 24px rgba(0,0,0,0.1)" }}
              style={{ 
                padding: "20px",
                borderRadius: 16,
                border: `1px solid ${C.border}`,
                background: C.white,
                display: "flex",
                flexDirection: "column",
                gap: 12,
                transition: "all 0.2s",
                cursor: "pointer"
              }}
              onClick={() => setSelectedReport(report)}
            >
              <div style={{ display: "flex", alignItems: "flex-start", justifyContent: "space-between" }}>
                <span style={{ fontSize: 32 }}>{report.icon}</span>
                <span style={{ 
                  fontSize: 11,
                  padding: "3px 8px",
                  borderRadius: 12,
                  background: C.blueLight,
                  color: C.blue,
                  fontWeight: 600
                }}>
                  {report.category}
                </span>
              </div>
              
              <div>
                <h4 style={{ fontSize: 15, fontWeight: 700, color: C.text, marginBottom: 4 }}>
                  {report.title}
                </h4>
                <p style={{ fontSize: 12, color: C.muted, lineHeight: 1.5 }}>
                  {report.description}
                </p>
              </div>
              
              <div style={{ 
                display: "flex", 
                alignItems: "center", 
                justifyContent: "space-between",
                marginTop: "auto"
              }}>
                <div style={{ display: "flex", gap: 6 }}>
                  {report.formats.map(format => (
                    <span
                      key={format}
                      style={{ 
                        fontSize: 11,
                        padding: "2px 6px",
                        borderRadius: 4,
                        background: C.light,
                        color: C.muted,
                        fontWeight: 600
                      }}
                    >
                      {format}
                    </span>
                  ))}
                </div>
                
                <div style={{ display: "flex", gap: 6 }}>
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      handleExport('PDF', report.id);
                    }}
                    style={{ 
                      padding: "6px 12px",
                      borderRadius: 8,
                      border: "none",
                      background: C.blueLight,
                      color: C.blue,
                      fontSize: 11,
                      fontWeight: 600,
                      cursor: "pointer"
                    }}
                  >
                    Export
                  </button>
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      handleSchedule();
                    }}
                    style={{ 
                      padding: "6px 12px",
                      borderRadius: 8,
                      border: `1px solid ${C.border}`,
                      background: "transparent",
                      color: C.muted,
                      fontSize: 11,
                      fontWeight: 600,
                      cursor: "pointer"
                    }}
                  >
                    Schedule
                  </button>
                </div>
              </div>
              
              <div style={{ 
                fontSize: 10, 
                color: C.muted,
                borderTop: `1px solid ${C.border}`,
                paddingTop: 8,
                marginTop: 4
              }}>
                Last generated: {report.lastGenerated}
              </div>
            </motion.div>
          ))}
        </div>
      </Card>

      {/* Scheduled Reports */}
      <Card>
        <SectionHeader 
          title="Scheduled Reports" 
          sub="Automated deliveries configured for your account"
          action="+ Add Schedule"
          onAction={handleSchedule}
        />
        
        <Table 
          columns={scheduledColumns}
          data={scheduledReports}
          striped
          hoverable
        />
        
        <div style={{ 
          marginTop: 16,
          padding: 12,
          background: C.blueLight,
          borderRadius: 8,
          display: "flex",
          alignItems: "center",
          gap: 8
        }}>
          <span style={{ fontSize: 14 }}>💡</span>
          <p style={{ fontSize: 12, color: C.blue }}>
            You can schedule up to 10 automated reports. Upgrade to Pro for unlimited schedules.
          </p>
          <button style={{ 
            marginLeft: "auto",
            padding: "4px 12px",
            borderRadius: 6,
            border: "none",
            background: C.blue,
            color: "white",
            fontSize: 11,
            fontWeight: 600,
            cursor: "pointer"
          }}>
            Upgrade
          </button>
        </div>
      </Card>

      {/* Export Options Modal (simplified version - would be a proper modal in production) */}
      {selectedReport && (
        <div style={{
          position: "fixed",
          bottom: 24,
          right: 24,
          width: 320,
          padding: 20,
          background: C.white,
          borderRadius: 16,
          border: `1px solid ${C.border}`,
          boxShadow: "0 12px 32px rgba(0,0,0,0.15)",
          zIndex: 1000
        }}>
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 12 }}>
            <h4 style={{ fontSize: 14, fontWeight: 700, color: C.text }}>Export Options</h4>
            <button 
              onClick={() => setSelectedReport(null)}
              style={{ background: "none", border: "none", cursor: "pointer", fontSize: 18 }}
            >
              ×
            </button>
          </div>
          <p style={{ fontSize: 13, color: C.text, marginBottom: 8 }}>Selected: {selectedReport.title}</p>
          <div style={{ display: "flex", gap: 8, marginBottom: 12 }}>
            {selectedReport.formats.map(format => (
              <button
                key={format}
                onClick={() => {
                  handleExport(format, selectedReport.id);
                  setSelectedReport(null);
                }}
                style={{
                  flex: 1,
                  padding: "8px",
                  borderRadius: 8,
                  border: `1px solid ${C.blue}`,
                  background: C.white,
                  color: C.blue,
                  fontWeight: 600,
                  cursor: "pointer"
                }}
              >
                {format}
              </button>
            ))}
          </div>
          <button
            onClick={() => setSelectedReport(null)}
            style={{
              width: "100%",
              padding: "8px",
              borderRadius: 8,
              border: "none",
              background: C.light,
              color: C.muted,
              cursor: "pointer"
            }}
          >
            Cancel
          </button>
        </div>
      )}
    </div>
  );
}

export default ReportsPage;