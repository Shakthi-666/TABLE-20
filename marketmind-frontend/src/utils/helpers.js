import { C } from '../styles/designTokens';

// ─── FORMATTING HELPERS ─────────────────────────────────────────────────

/**
 * Format currency values
 * @param {number} value - The amount to format
 * @param {string} currency - Currency code (default: 'USD')
 * @param {string} locale - Locale string (default: 'en-US')
 * @returns {string} Formatted currency string
 */
export const formatCurrency = (value, currency = 'USD', locale = 'en-US') => {
  if (value === null || value === undefined) return '$0';
  
  return new Intl.NumberFormat(locale, {
    style: 'currency',
    currency: currency,
    minimumFractionDigits: 0,
    maximumFractionDigits: 0
  }).format(value);
};

/**
 * Format percentage values
 * @param {number} value - The percentage value
 * @param {number} decimals - Number of decimal places
 * @returns {string} Formatted percentage string
 */
export const formatPercentage = (value, decimals = 1) => {
  if (value === null || value === undefined) return '0%';
  
  return `${value >= 0 ? '+' : ''}${value.toFixed(decimals)}%`;
};

/**
 * Format large numbers with K/M/B suffixes
 * @param {number} num - The number to format
 * @param {number} digits - Number of decimal digits
 * @returns {string} Compact number string
 */
export const formatCompactNumber = (num, digits = 1) => {
  if (num === null || num === undefined) return '0';
  
  const lookup = [
    { value: 1, symbol: "" },
    { value: 1e3, symbol: "k" },
    { value: 1e6, symbol: "M" },
    { value: 1e9, symbol: "B" },
    { value: 1e12, symbol: "T" }
  ];
  
  const rx = /\.0+$|(\.[0-9]*[1-9])0+$/;
  const item = lookup.slice().reverse().find(item => num >= item.value);
  
  return item 
    ? (num / item.value).toFixed(digits).replace(rx, "$1") + item.symbol
    : "0";
};

/**
 * Format date to relative time (e.g., "2 days ago")
 * @param {string|Date} date - The date to format
 * @returns {string} Relative time string
 */
export const formatRelativeTime = (date) => {
  const now = new Date();
  const then = new Date(date);
  const diffInSeconds = Math.floor((now - then) / 1000);
  
  const intervals = [
    { label: 'year', seconds: 31536000 },
    { label: 'month', seconds: 2592000 },
    { label: 'week', seconds: 604800 },
    { label: 'day', seconds: 86400 },
    { label: 'hour', seconds: 3600 },
    { label: 'minute', seconds: 60 }
  ];
  
  for (const interval of intervals) {
    const count = Math.floor(diffInSeconds / interval.seconds);
    if (count >= 1) {
      return `${count} ${interval.label}${count > 1 ? 's' : ''} ago`;
    }
  }
  
  return 'just now';
};

/**
 * Format date to standard display format
 * @param {string|Date} date - The date to format
 * @param {string} format - Format style (short, long, numeric)
 * @returns {string} Formatted date string
 */
export const formatDate = (date, format = 'short') => {
  const d = new Date(date);
  
  const formats = {
    short: { month: 'short', day: 'numeric', year: 'numeric' },
    long: { weekday: 'long', month: 'long', day: 'numeric', year: 'numeric' },
    numeric: { month: '2-digit', day: '2-digit', year: 'numeric' },
    monthYear: { month: 'long', year: 'numeric' }
  };
  
  return new Intl.DateTimeFormat('en-US', formats[format] || formats.short).format(d);
};

// ─── DATA PROCESSING HELPERS ───────────────────────────────────────────

/**
 * Calculate growth percentage between two values
 * @param {number} current - Current value
 * @param {number} previous - Previous value
 * @returns {number} Growth percentage
 */
export const calculateGrowth = (current, previous) => {
  if (previous === 0) return current > 0 ? 100 : 0;
  return ((current - previous) / previous) * 100;
};

/**
 * Aggregate data by a specific key
 * @param {Array} data - Array of objects
 * @param {string} key - Key to group by
 * @param {string} valueKey - Key to sum (optional)
 * @returns {Object} Aggregated data
 */
export const aggregateByKey = (data, key, valueKey = null) => {
  return data.reduce((acc, item) => {
    const groupKey = item[key];
    if (!acc[groupKey]) {
      acc[groupKey] = valueKey ? 0 : [];
    }
    
    if (valueKey) {
      acc[groupKey] += item[valueKey] || 0;
    } else {
      acc[groupKey].push(item);
    }
    
    return acc;
  }, {});
};

/**
 * Sort data by a specific key
 * @param {Array} data - Array of objects
 * @param {string} key - Key to sort by
 * @param {string} order - 'asc' or 'desc'
 * @returns {Array} Sorted array
 */
export const sortByKey = (data, key, order = 'asc') => {
  return [...data].sort((a, b) => {
    if (a[key] < b[key]) return order === 'asc' ? -1 : 1;
    if (a[key] > b[key]) return order === 'asc' ? 1 : -1;
    return 0;
  });
};

/**
 * Filter data by search term across multiple fields
 * @param {Array} data - Array of objects
 * @param {string} term - Search term
 * @param {Array} fields - Fields to search in
 * @returns {Array} Filtered array
 */
export const searchData = (data, term, fields) => {
  if (!term) return data;
  
  const searchTerm = term.toLowerCase();
  return data.filter(item => 
    fields.some(field => 
      item[field]?.toString().toLowerCase().includes(searchTerm)
    )
  );
};

/**
 * Calculate summary statistics for an array of numbers
 * @param {Array} numbers - Array of numbers
 * @returns {Object} Statistics object
 */
export const calculateStats = (numbers) => {
  if (!numbers.length) return { min: 0, max: 0, avg: 0, sum: 0 };
  
  const sum = numbers.reduce((a, b) => a + b, 0);
  const avg = sum / numbers.length;
  const min = Math.min(...numbers);
  const max = Math.max(...numbers);
  
  return { min, max, avg, sum };
};

// ─── COLOR AND STYLE HELPERS ───────────────────────────────────────────

/**
 * Get color based on sentiment value
 * @param {string} sentiment - 'positive', 'negative', or 'neutral'
 * @returns {string} Color code
 */
export const getSentimentColor = (sentiment) => {
  const colors = {
    positive: C.green,
    negative: C.red,
    neutral: C.yellow
  };
  return colors[sentiment] || C.muted;
};

/**
 * Get color based on trend direction
 * @param {string} trend - 'up', 'down', or 'flat'
 * @returns {string} Color code
 */
export const getTrendColor = (trend) => {
  const colors = {
    up: C.green,
    down: C.red,
    flat: C.yellow
  };
  return colors[trend] || C.muted;
};

/**
 * Get background color with opacity
 * @param {string} color - Base color (from C object)
 * @param {number} opacity - Opacity value (0-1)
 * @returns {string} RGBA color string
 */
export const getColorWithOpacity = (color, opacity) => {
  // Convert hex to rgb
  const hex = color.replace('#', '');
  const r = parseInt(hex.substring(0, 2), 16);
  const g = parseInt(hex.substring(2, 4), 16);
  const b = parseInt(hex.substring(4, 6), 16);
  
  return `rgba(${r}, ${g}, ${b}, ${opacity})`;
};

/**
 * Get priority badge styles
 * @param {string} priority - 'high', 'medium', or 'low'
 * @returns {Object} Style object with bg and color
 */
export const getPriorityStyles = (priority) => {
  const styles = {
    high: { bg: C.redLight, color: C.red, dot: C.red },
    medium: { bg: C.yellowLight, color: '#B45309', dot: C.yellow },
    low: { bg: C.greenLight, color: C.green, dot: C.green }
  };
  return styles[priority] || styles.medium;
};

// ─── VALIDATION HELPERS ────────────────────────────────────────────────

/**
 * Validate email format
 * @param {string} email - Email to validate
 * @returns {boolean} True if valid
 */
export const isValidEmail = (email) => {
  const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return re.test(email);
};

/**
 * Validate password strength
 * @param {string} password - Password to validate
 * @returns {Object} Validation result with score and requirements
 */
export const validatePassword = (password) => {
  const requirements = [
    { test: /.{8,}/, message: 'At least 8 characters' },
    { test: /[A-Z]/, message: 'At least one uppercase letter' },
    { test: /[a-z]/, message: 'At least one lowercase letter' },
    { test: /[0-9]/, message: 'At least one number' },
    { test: /[^A-Za-z0-9]/, message: 'At least one special character' }
  ];
  
  const results = requirements.map(req => ({
    passed: req.test.test(password),
    message: req.message
  }));
  
  const score = results.filter(r => r.passed).length;
  const strength = score >= 4 ? 'strong' : score >= 2 ? 'medium' : 'weak';
  
  return { score, strength, results };
};

// ─── CHART DATA HELPERS ────────────────────────────────────────────────

/**
 * Prepare data for stacked area chart
 * @param {Array} data - Raw data array
 * @param {string} xKey - Key for x-axis
 * @param {Array} yKeys - Keys for y-axis series
 * @returns {Array} Formatted chart data
 */
export const prepareAreaChartData = (data, xKey, yKeys) => {
  return data.map(item => ({
    [xKey]: item[xKey],
    ...yKeys.reduce((acc, key) => ({
      ...acc,
      [key]: item[key]
    }), {})
  }));
};

/**
 * Calculate percentage distribution for pie chart
 * @param {Array} data - Array with value keys
 * @param {string} valueKey - Key containing values
 * @returns {Array} Data with percentage
 */
export const addPercentagesToPieData = (data, valueKey) => {
  const total = data.reduce((sum, item) => sum + item[valueKey], 0);
  
  return data.map(item => ({
    ...item,
    percentage: total > 0 ? (item[valueKey] / total) * 100 : 0
  }));
};

// ─── LOCAL STORAGE HELPERS ─────────────────────────────────────────────

/**
 * Save data to localStorage
 * @param {string} key - Storage key
 * @param {any} value - Value to store
 */
export const saveToStorage = (key, value) => {
  try {
    const serialized = JSON.stringify(value);
    localStorage.setItem(key, serialized);
  } catch (error) {
    console.error('Error saving to localStorage:', error);
  }
};

/**
 * Load data from localStorage
 * @param {string} key - Storage key
 * @param {any} defaultValue - Default value if not found
 * @returns {any} Retrieved value or default
 */
export const loadFromStorage = (key, defaultValue = null) => {
  try {
    const serialized = localStorage.getItem(key);
    if (serialized === null) return defaultValue;
    return JSON.parse(serialized);
  } catch (error) {
    console.error('Error loading from localStorage:', error);
    return defaultValue;
  }
};

/**
 * Remove data from localStorage
 * @param {string} key - Storage key
 */
export const removeFromStorage = (key) => {
  try {
    localStorage.removeItem(key);
  } catch (error) {
    console.error('Error removing from localStorage:', error);
  }
};

// ─── ARRAY AND OBJECT HELPERS ─────────────────────────────────────────

/**
 * Group array of objects by a key
 * @param {Array} array - Array to group
 * @param {string} key - Key to group by
 * @returns {Object} Grouped object
 */
export const groupBy = (array, key) => {
  return array.reduce((result, item) => {
    const groupKey = item[key];
    if (!result[groupKey]) {
      result[groupKey] = [];
    }
    result[groupKey].push(item);
    return result;
  }, {});
};

/**
 * Remove duplicates from array
 * @param {Array} array - Array with potential duplicates
 * @returns {Array} Array with unique values
 */
export const uniqueArray = (array) => {
  return [...new Set(array)];
};

/**
 * Deep clone an object
 * @param {Object} obj - Object to clone
 * @returns {Object} Cloned object
 */
export const deepClone = (obj) => {
  return JSON.parse(JSON.stringify(obj));
};

/**
 * Pick specific keys from an object
 * @param {Object} obj - Source object
 * @param {Array} keys - Keys to pick
 * @returns {Object} New object with only picked keys
 */
export const pick = (obj, keys) => {
  return keys.reduce((acc, key) => {
    if (obj.hasOwnProperty(key)) {
      acc[key] = obj[key];
    }
    return acc;
  }, {});
};

/**
 * Omit specific keys from an object
 * @param {Object} obj - Source object
 * @param {Array} keys - Keys to omit
 * @returns {Object} New object without omitted keys
 */
export const omit = (obj, keys) => {
  return Object.keys(obj).reduce((acc, key) => {
    if (!keys.includes(key)) {
      acc[key] = obj[key];
    }
    return acc;
  }, {});
};

// ─── EXPORT ALL HELPERS ────────────────────────────────────────────────

const helpers = {
  // Formatting
  formatCurrency,
  formatPercentage,
  formatCompactNumber,
  formatRelativeTime,
  formatDate,
  
  // Data Processing
  calculateGrowth,
  aggregateByKey,
  sortByKey,
  searchData,
  calculateStats,
  
  // Color and Style
  getSentimentColor,
  getTrendColor,
  getColorWithOpacity,
  getPriorityStyles,
  
  // Validation
  isValidEmail,
  validatePassword,
  
  // Chart Data
  prepareAreaChartData,
  addPercentagesToPieData,
  
  // Storage
  saveToStorage,
  loadFromStorage,
  removeFromStorage,
  
  // Array and Object
  groupBy,
  uniqueArray,
  deepClone,
  pick,
  omit
};

export default helpers;