// pipelines/leave-utilization/utils.js
import { writeFileSync } from 'fs';
import { format } from 'date-fns';

export function calculateDays(start, end) {
  const ms = new Date(end) - new Date(start);
  return Math.ceil(ms / (1000 * 60 * 60 * 24)) || 0;
}

export async function writeCSV(filePath, data) {
  if (!data.length) return;
  const headers = Object.keys(data[0]);
  const rows = data.map(row => headers.map(h => row[h]).join(',')).join('\n');
  const content = [headers.join(','), rows].join('\n');
  writeFileSync(filePath, content);
}
