const API_BASE_URL = import.meta.env.PROD ? '' : 'http://localhost:3001';

export async function fetchDeadlines() {
  const response = await fetch(`${API_BASE_URL}/api/deadlines`);
  if (!response.ok) throw new Error('Failed to fetch deadlines');
  const data = await response.json();
  return data.data || data; // Handle both formats
}

export async function fetchCareerPathways() {
  const response = await fetch(`${API_BASE_URL}/api/career-pathways`);
  if (!response.ok) throw new Error('Failed to fetch career pathways');
  const data = await response.json();
  return data.data || data;
}

export async function fetchTopColleges() {
  const response = await fetch(`${API_BASE_URL}/api/colleges?type=top`);
  if (!response.ok) throw new Error('Failed to fetch colleges');
  const data = await response.json();
  return data.data || data;
}

export async function searchColleges(query: string) {
  const response = await fetch(`${API_BASE_URL}/api/colleges?q=${encodeURIComponent(query)}`);
  if (!response.ok) throw new Error('Failed to search colleges');
  const data = await response.json();
  return data.data || data;
}