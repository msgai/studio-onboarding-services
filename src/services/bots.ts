export async function getBotDetail(botId: string) {
  if (!botId) {
    return;
  }
  const response = await fetch(`/api/resources/bots/${botId}`, {
    credentials: 'include',
  });
  return await response.json();
}
