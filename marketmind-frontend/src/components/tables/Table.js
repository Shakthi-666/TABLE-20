import React from 'react';
import { motion } from 'framer-motion';
import { C } from '../../styles/designTokens';
import Badge from '../common/Badge';

// Generic Table Component
export const Table = ({ 
  columns = [], 
  data = [], 
  onRowClick, 
  striped = true,
  hoverable = true,
  bordered = false,
  compact = false
}) => {
  const tableStyle = {
    width: "100%",
    borderCollapse: "collapse",
    fontSize: compact ? "12px" : "14px"
  };

  const thStyle = {
    textAlign: "left",
    fontSize: 11,
    fontWeight: 700,
    color: C.muted,
    textTransform: "uppercase",
    letterSpacing: "0.06em",
    padding: compact ? "8px 12px" : "10px 16px",
    borderBottom: `2px solid ${C.border}`,
    background: C.light
  };

  const tdStyle = {
    padding: compact ? "10px 12px" : "14px 16px",
    borderBottom: bordered ? `1px solid ${C.border}` : "none",
    color: C.text
  };

  return (
    <table style={tableStyle}>
      <thead>
        <tr>
          {columns.map((col, index) => (
            <th key={index} style={thStyle}>
              {col.header}
            </th>
          ))}
        </tr>
      </thead>
      <tbody>
        {data.map((row, rowIndex) => (
          <motion.tr
            key={rowIndex}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: rowIndex * 0.05 }}
            style={{
              background: striped && rowIndex % 2 === 0 ? C.light : "transparent",
              cursor: onRowClick ? "pointer" : "default",
              transition: "background 0.15s"
            }}
            onMouseEnter={hoverable ? (e) => e.currentTarget.style.background = C.blueLight : null}
            onMouseLeave={hoverable ? (e) => e.currentTarget.style.background = striped && rowIndex % 2 === 0 ? C.light : "transparent" : null}
            onClick={onRowClick ? () => onRowClick(row) : null}
          >
            {columns.map((col, colIndex) => (
              <td key={colIndex} style={{ ...tdStyle, ...col.cellStyle }}>
                {col.render ? col.render(row[col.accessor], row) : row[col.accessor]}
              </td>
            ))}
          </motion.tr>
        ))}
      </tbody>
    </table>
  );
};

// Competitor Table Component
export const CompetitorTable = ({ data, onTrack }) => {
  const columns = [
    { 
      header: "Company", 
      accessor: "name",
      render: (value, row) => (
        <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
          <div style={{ 
            width: 30, 
            height: 30, 
            borderRadius: 8, 
            background: C.blueLight, 
            display: "flex", 
            alignItems: "center", 
            justifyContent: "center", 
            fontSize: 13, 
            fontWeight: 800, 
            color: C.blue 
          }}>
            {value[0]}
          </div>
          <span style={{ fontSize: 13, fontWeight: 700, color: C.text }}>{value}</span>
        </div>
      )
    },
    { header: "Product", accessor: "product" },
    { 
      header: "Price", 
      accessor: "price",
      render: (value) => (
        <span style={{ fontFamily: "monospace", fontWeight: 700 }}>{value}</span>
      )
    },
    { 
      header: "Discount", 
      accessor: "discount",
      render: (value) => (
        <span style={{ 
          background: C.yellowLight, 
          color: "#92400E", 
          fontSize: 12, 
          fontWeight: 700, 
          padding: "3px 8px", 
          borderRadius: 6 
        }}>
          {value}
        </span>
      )
    },
    { 
      header: "Market Share", 
      accessor: "share",
      render: (value) => (
        <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
          <div style={{ width: 60, height: 6, background: C.light, borderRadius: 99 }}>
            <div style={{ 
              width: `${(value / 40) * 100}%`, 
              height: "100%", 
              background: C.blue, 
              borderRadius: 99 
            }} />
          </div>
          <span style={{ fontSize: 12, fontWeight: 700, color: C.text }}>{value}%</span>
        </div>
      )
    },
    { 
      header: "MoM Change", 
      accessor: "change",
      render: (value) => {
        const color = value.startsWith("+") ? C.green : value.startsWith("-") ? C.red : C.muted;
        return <span style={{ fontSize: 13, fontWeight: 700, color }}>{value}</span>;
      }
    },
    { 
      header: "Trend", 
      accessor: "trend",
      render: (value) => <Badge label={value} />
    },
    { 
      header: "Actions", 
      accessor: "actions",
      render: (_, row) => (
        <button 
          onClick={() => onTrack?.(row)}
          style={{ 
            background: C.blueLight, 
            color: C.blue, 
            border: "none", 
            borderRadius: 8, 
            padding: "5px 12px", 
            fontSize: 12, 
            fontWeight: 600, 
            cursor: "pointer",
            fontFamily: "inherit"
          }}
        >
          Track
        </button>
      )
    }
  ];

  return <Table columns={columns} data={data} striped hoverable />;
};

// Simple Compact Table (for dashboards)
export const CompactTable = ({ data, columns }) => {
  return (
    <table style={{ width: "100%", borderCollapse: "collapse" }}>
      <thead>
        <tr style={{ borderBottom: `1.5px solid ${C.border}` }}>
          {columns.map((col, i) => (
            <th key={i} style={{ 
              textAlign: "left", 
              fontSize: 11, 
              fontWeight: 700, 
              color: C.muted, 
              textTransform: "uppercase", 
              letterSpacing: "0.06em", 
              padding: "0 0 10px" 
            }}>
              {col.header}
            </th>
          ))}
        </tr>
      </thead>
      <tbody>
        {data.map((row, i) => (
          <motion.tr 
            key={i} 
            initial={{ opacity: 0 }} 
            animate={{ opacity: 1 }} 
            transition={{ delay: 0.1 * i }}
            style={{ borderBottom: `1px solid ${C.border}` }}
          >
            {columns.map((col, j) => (
              <td key={j} style={{ padding: "10px 0", fontSize: 13, color: C.text }}>
                {col.render ? col.render(row[col.accessor], row) : row[col.accessor]}
              </td>
            ))}
          </motion.tr>
        ))}
      </tbody>
    </table>
  );
};

// Review Table/List Component
export const ReviewTable = ({ data }) => {
  return (
    <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
      {data.map((review, i) => (
        <motion.div 
          key={i}
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: i * 0.08 }}
          style={{ 
            padding: "16px 18px", 
            borderRadius: 12, 
            background: C.light, 
            border: `1px solid ${C.border}`, 
            display: "flex", 
            gap: 14, 
            alignItems: "flex-start" 
          }}
        >
          <div style={{ 
            width: 40, 
            height: 40, 
            borderRadius: 12, 
            background: C.blueLight, 
            display: "flex", 
            alignItems: "center", 
            justifyContent: "center", 
            fontSize: 16, 
            fontWeight: 800, 
            color: C.blue, 
            flexShrink: 0 
          }}>
            {review.author[0]}
          </div>
          <div style={{ flex: 1 }}>
            <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 6 }}>
              <p style={{ fontSize: 14, fontWeight: 700, color: C.text }}>{review.author}</p>
              <span style={{ color: C.yellow, fontSize: 13 }}>
                {"★".repeat(review.stars)}
                {"☆".repeat(5 - review.stars)}
              </span>
              <Badge label={review.sentiment} />
              <span style={{ marginLeft: "auto", fontSize: 12, color: C.muted }}>{review.date}</span>
            </div>
            <p style={{ fontSize: 13, color: C.muted, lineHeight: 1.6 }}>{review.text}</p>
          </div>
        </motion.div>
      ))}
    </div>
  );
};

// Export all table components
const Tables = {
  Basic: Table,
  Competitor: CompetitorTable,
  Compact: CompactTable,
  Review: ReviewTable
};

export default Tables;