import { C } from '../styles/designTokens';

// Mock Data
export const trendData = [
  { month:"Jan", us:42, rival1:38, rival2:31 },
  { month:"Feb", us:47, rival1:41, rival2:29 },
  { month:"Mar", us:44, rival1:45, rival2:33 },
  { month:"Apr", us:53, rival1:43, rival2:36 },
  { month:"May", us:58, rival1:47, rival2:34 },
  { month:"Jun", us:63, rival1:50, rival2:38 },
  { month:"Jul", us:71, rival1:52, rival2:40 },
];

export const sentimentData = [
  { name:"Positive", value:58, color:"#198754" },
  { name:"Neutral",  value:26, color:"#FFC107" },
  { name:"Negative", value:16, color:"#DC3545" },
];

export const competitors = [
  { name:"AlphaStore",  product:"SaaS Suite",  price:"$129",  discount:"10%", trend:"up",   share:34, change:"+12%" },
  { name:"BetaMarket",  product:"Analytics Pro",price:"$89",  discount:"5%",  trend:"up",   share:22, change:"+5%"  },
  { name:"GammaTech",   product:"Insights Hub", price:"$149", discount:"15%", trend:"down", share:18, change:"-3%"  },
  { name:"DeltaBI",     product:"Data Cloud",   price:"$99",  discount:"0%",  trend:"flat", share:14, change:"+1%"  },
  { name:"EpsilonAI",   product:"SmartDash",    price:"$79",  discount:"20%", trend:"up",   share:12, change:"+8%"  },
];

export const opportunities = [
  { title:"Price Optimization",   desc:"BetaMarket dropped prices by 5%. Consider a limited-time match offer to retain at-risk customers.", priority:"high",   status:"pending",  category:"Pricing",   roi:"+18% retention", icon:"💰" },
  { title:"Weekend Flash Sale",   desc:"Sentiment spikes 34% on Saturdays. A 48-hr discount campaign could drive 200+ conversions.", priority:"high",   status:"pending",  category:"Promotion", roi:"+$12K revenue",  icon:"⚡" },
  { title:"Feature Gap: AI Reports",desc:"3 of 5 competitors lack auto-PDF exports. Launch this to differentiate and capture their users.", priority:"medium", status:"implemented",category:"Product",   roi:"+27% NPS",       icon:"📊" },
  { title:"LinkedIn Ad Targeting", desc:"Your positive reviews mention 'ease of use' most. Build ad creatives around this specific theme.", priority:"medium", status:"pending",  category:"Marketing", roi:"+$8K pipeline",  icon:"📣" },
  { title:"Loyalty Program",      desc:"Churn risk for 3-month users is 2x average. A milestone reward at day 90 could cut it by 40%.", priority:"low",    status:"pending",  category:"Retention", roi:"-40% churn",     icon:"🎁" },
];

export const reviews = [
  { author:"Sarah M.",    text:"Absolutely love the competitor tracking — saves me hours every week!",  sentiment:"positive", date:"2d ago", stars:5 },
  { author:"James R.",    text:"Reports are great but the mobile app feels a bit slow sometimes.",      sentiment:"neutral",  date:"3d ago", stars:3 },
  { author:"Priya K.",    text:"Best investment for my small business. Insights are always spot-on.",   sentiment:"positive", date:"4d ago", stars:5 },
  { author:"Tom W.",      text:"Pricing feels a bit high compared to newer tools on the market.",       sentiment:"negative", date:"5d ago", stars:2 },
  { author:"Luna B.",     text:"The AI strategy feature is genuinely impressive. Highly recommend.",    sentiment:"positive", date:"6d ago", stars:5 },
];

export const weeklyTrend = [
  { day:"Mon", positive:60, negative:20, neutral:20 },
  { day:"Tue", positive:55, negative:25, neutral:20 },
  { day:"Wed", positive:62, negative:18, neutral:20 },
  { day:"Thu", positive:70, negative:12, neutral:18 },
  { day:"Fri", positive:68, negative:15, neutral:17 },
  { day:"Sat", positive:75, negative:10, neutral:15 },
  { day:"Sun", positive:72, negative:13, neutral:15 },
];

export const wordCloudWords = [
  { word:"Easy to use", size:28, color:C.blue },
  { word:"Saves time", size:22, color:C.green },
  { word:"Expensive", size:16, color:C.red },
  { word:"Insightful", size:24, color:C.blue },
  { word:"AI-powered", size:20, color:C.orange },
  { word:"Fast", size:18, color:C.green },
  { word:"Reliable", size:22, color:C.blue },
  { word:"Support", size:14, color:C.muted },
  { word:"Reports", size:19, color:C.green },
  { word:"Mobile", size:15, color:C.orange },
  { word:"Intuitive", size:21, color:C.blue },
  { word:"Value", size:17, color:C.yellow },
];

export const reportData = [
  { month:"Jan", revenue:18400, leads:142, conversions:38 },
  { month:"Feb", revenue:21200, leads:168, conversions:45 },
  { month:"Mar", revenue:19800, leads:155, conversions:41 },
  { month:"Apr", revenue:24600, leads:190, conversions:56 },
  { month:"May", revenue:27100, leads:215, conversions:68 },
  { month:"Jun", revenue:31500, leads:248, conversions:82 },
];

export const navItems = [
  { id:"dashboard",    icon:"🏠", label:"Dashboard"          },
  { id:"competitors",  icon:"⚔️", label:"Competitor Analysis" },
  { id:"insights",     icon:"💬", label:"Customer Insights"   },
  { id:"opportunities",icon:"🚀", label:"Opportunities"       },
  { id:"reports",      icon:"📊", label:"Reports & Exports"   },
  { id:"settings",     icon:"⚙️", label:"Settings"            },
];