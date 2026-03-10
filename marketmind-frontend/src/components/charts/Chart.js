import React from 'react';
import {
  LineChart, Line, BarChart, Bar, AreaChart, Area,
  PieChart, Pie, Cell, XAxis, YAxis, CartesianGrid,
  Tooltip, ResponsiveContainer, Legend
} from 'recharts';
import { C } from '../../styles/designTokens';

// Generic Chart Wrapper Components
export const ChartContainer = ({ children, height = 300 }) => (
  <ResponsiveContainer width="100%" height={height}>
    {children}
  </ResponsiveContainer>
);

// Area Chart Component
export const MarketShareChart = ({ data, colors = [C.blue, C.yellow, C.red] }) => {
  return (
    <ChartContainer height={220}>
      <AreaChart data={data}>
        <defs>
          {data && Object.keys(data[0] || {}).filter(key => key !== 'month').map((key, index) => (
            <linearGradient key={key} id={`gradient-${key}`} x1="0" y1="0" x2="0" y2="1">
              <stop offset="5%" stopColor={colors[index % colors.length]} stopOpacity={0.2} />
              <stop offset="95%" stopColor={colors[index % colors.length]} stopOpacity={0} />
            </linearGradient>
          ))}
        </defs>
        <CartesianGrid strokeDasharray="3 3" stroke={C.border} />
        <XAxis dataKey="month" tick={{ fill: C.muted, fontSize: 12 }} axisLine={false} tickLine={false} />
        <YAxis tick={{ fill: C.muted, fontSize: 12 }} axisLine={false} tickLine={false} />
        <Tooltip 
          contentStyle={{ 
            borderRadius: 10, 
            border: `1px solid ${C.border}`, 
            boxShadow: "0 4px 12px rgba(0,0,0,0.08)", 
            fontSize: 12 
          }} 
        />
        <Legend wrapperStyle={{ fontSize: 12, paddingTop: 8 }} />
        {data && Object.keys(data[0] || {}).filter(key => key !== 'month').map((key, index) => (
          <Area 
            key={key}
            type="monotone" 
            dataKey={key} 
            name={key.charAt(0).toUpperCase() + key.slice(1)} 
            stroke={colors[index % colors.length]} 
            fill={`url(#gradient-${key})`} 
            strokeWidth={key === 'us' ? 2.5 : 2} 
          />
        ))}
      </AreaChart>
    </ChartContainer>
  );
};

// Bar Chart Component
export const SentimentBarChart = ({ data }) => {
  return (
    <ChartContainer height={220}>
      <BarChart data={data} barSize={20}>
        <CartesianGrid strokeDasharray="3 3" stroke={C.border} vertical={false} />
        <XAxis dataKey="day" tick={{ fill: C.muted, fontSize: 12 }} axisLine={false} tickLine={false} />
        <YAxis tick={{ fill: C.muted, fontSize: 12 }} axisLine={false} tickLine={false} />
        <Tooltip 
          contentStyle={{ 
            borderRadius: 10, 
            fontSize: 12, 
            border: `1px solid ${C.border}` 
          }} 
        />
        <Bar dataKey="positive" name="Positive" fill={C.green} radius={[4, 4, 0, 0]} stackId="a" />
        <Bar dataKey="neutral" name="Neutral" fill={C.yellow} radius={[0, 0, 0, 0]} stackId="a" />
        <Bar dataKey="negative" name="Negative" fill={C.red} radius={[4, 4, 0, 0]} stackId="a" />
      </BarChart>
    </ChartContainer>
  );
};

// Pie Chart Component
export const SentimentPieChart = ({ data }) => {
  return (
    <ChartContainer height={160}>
      <PieChart>
        <Pie 
          data={data} 
          cx="50%" 
          cy="50%" 
          innerRadius={45} 
          outerRadius={72} 
          paddingAngle={3} 
          dataKey="value"
        >
          {data.map((entry, index) => (
            <Cell key={`cell-${index}`} fill={entry.color} />
          ))}
        </Pie>
        <Tooltip 
          formatter={(value) => `${value}%`} 
          contentStyle={{ borderRadius: 10, fontSize: 12 }} 
        />
      </PieChart>
    </ChartContainer>
  );
};

// Revenue Area Chart
export const RevenueChart = ({ data }) => {
  return (
    <ChartContainer height={220}>
      <AreaChart data={data}>
        <defs>
          <linearGradient id="revenueGradient" x1="0" y1="0" x2="0" y2="1">
            <stop offset="5%" stopColor={C.blue} stopOpacity={0.2} />
            <stop offset="95%" stopColor={C.blue} stopOpacity={0} />
          </linearGradient>
        </defs>
        <CartesianGrid strokeDasharray="3 3" stroke={C.border} />
        <XAxis dataKey="month" tick={{ fill: C.muted, fontSize: 12 }} axisLine={false} tickLine={false} />
        <YAxis 
          tick={{ fill: C.muted, fontSize: 12 }} 
          axisLine={false} 
          tickLine={false} 
          tickFormatter={(value) => `$${(value / 1000).toFixed(0)}k`} 
        />
        <Tooltip 
          formatter={(value) => `$${value.toLocaleString()}`} 
          contentStyle={{ 
            borderRadius: 10, 
            fontSize: 12, 
            border: `1px solid ${C.border}` 
          }} 
        />
        <Area 
          type="monotone" 
          dataKey="revenue" 
          name="Revenue" 
          stroke={C.blue} 
          fill="url(#revenueGradient)" 
          strokeWidth={2.5} 
        />
      </AreaChart>
    </ChartContainer>
  );
};

// Leads vs Conversions Bar Chart
export const LeadsChart = ({ data }) => {
  return (
    <ChartContainer height={220}>
      <BarChart data={data} barSize={16}>
        <CartesianGrid strokeDasharray="3 3" stroke={C.border} vertical={false} />
        <XAxis dataKey="month" tick={{ fill: C.muted, fontSize: 12 }} axisLine={false} tickLine={false} />
        <YAxis tick={{ fill: C.muted, fontSize: 12 }} axisLine={false} tickLine={false} />
        <Tooltip 
          contentStyle={{ 
            borderRadius: 10, 
            fontSize: 12, 
            border: `1px solid ${C.border}` 
          }} 
        />
        <Bar dataKey="leads" name="Leads" fill={C.blue} radius={[4, 4, 0, 0]} />
        <Bar dataKey="conversions" name="Conversions" fill={C.green} radius={[4, 4, 0, 0]} />
      </BarChart>
    </ChartContainer>
  );
};

// Multi-series Line Chart
export const TrendLineChart = ({ data, lines = [] }) => {
  return (
    <ChartContainer height={250}>
      <LineChart data={data}>
        <CartesianGrid strokeDasharray="3 3" stroke={C.border} />
        <XAxis dataKey="month" tick={{ fill: C.muted, fontSize: 12 }} axisLine={false} tickLine={false} />
        <YAxis tick={{ fill: C.muted, fontSize: 12 }} axisLine={false} tickLine={false} />
        <Tooltip 
          contentStyle={{ 
            borderRadius: 10, 
            border: `1px solid ${C.border}`, 
            boxShadow: "0 4px 12px rgba(0,0,0,0.08)", 
            fontSize: 12 
          }} 
        />
        <Legend wrapperStyle={{ fontSize: 12, paddingTop: 8 }} />
        {lines.map((line, index) => (
          <Line 
            key={line.dataKey}
            type="monotone" 
            dataKey={line.dataKey} 
            name={line.name} 
            stroke={line.color || C.blue} 
            strokeWidth={line.strokeWidth || 2}
            dot={line.dot || false}
          />
        ))}
      </LineChart>
    </ChartContainer>
  );
};

// Export all chart components
const Charts = {
  Container: ChartContainer,
  MarketShare: MarketShareChart,
  SentimentBar: SentimentBarChart,
  SentimentPie: SentimentPieChart,
  Revenue: RevenueChart,
  Leads: LeadsChart,
  TrendLine: TrendLineChart
};

export default Charts;