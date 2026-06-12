// Format number with commas (1000 -> 1,000)
export const formatNumber = (num: number): string => {
  return num.toLocaleString('en-US');
};

// Format currency ($1,000)
export const formatCurrency = (num: number): string => {
  return `$${num.toLocaleString('en-US')}`;
};

// Format short number (1000 -> 1k, 1000000 -> 1M)
export const formatShortNumber = (num: number): string => {
  if (num >= 1000000) {
    return `${(num / 1000000).toFixed(1)}M`;
  }
  if (num >= 1000) {
    return `${(num / 1000).toFixed(1)}K`;
  }
  return num.toString();
};

// Format percentage
export const formatPercent = (num: number): string => {
  return `${num.toFixed(1)}%`;
};