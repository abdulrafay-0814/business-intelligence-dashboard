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

// Export data to CSV file
export const exportToCSV = (data: any[], filename: string) => {
  if (data.length === 0) {
    return;
  }

  // Get headers from first object keys
  const headers = Object.keys(data[0]);

  // Create CSV header row
  const csvHeaders = headers.join(',');

  // Create CSV data rows
  const csvRows = data.map((row) =>
    headers
      .map((header) => {
        const value = row[header];
        // Wrap strings with commas in quotes
        if (typeof value === 'string' && value.includes(',')) {
          return `"${value}"`;
        }
        return value;
      })
      .join(',')
  );

  // Combine headers and rows
  const csvContent = [csvHeaders, ...csvRows].join('\n');

  // Create blob and download link
  const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
  const url = URL.createObjectURL(blob);
  const link = document.createElement('a');
  link.setAttribute('href', url);
  link.setAttribute('download', `${filename}.csv`);
  link.style.visibility = 'hidden';

  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
};