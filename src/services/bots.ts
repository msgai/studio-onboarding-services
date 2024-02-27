export async function getAllBots() {
  const response = await fetch('/api/resources/bots', {
    credentials: 'include',
  });
  const data = response.json();
  return data;
}

export async function getBotDetail(botId: string) {
  if (!botId) {
    return;
  }
  const response = await fetch(`/api/resources/bots/${botId}`, {
    credentials: 'include',
  });
  const data = response.json();
  return data;
}
