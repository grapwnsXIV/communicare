const API_URL = 'http://localhost:4000/api';

export async function submitSymptomReport(report) {
  const response = await fetch(`${API_URL}/symptoms`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(report)
  });

  const data = await response.json();

  if (!response.ok) {
    throw new Error(data.error || 'Failed to submit report');
  }

  return data;
}
