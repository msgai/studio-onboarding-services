export async function getSocialConfig() {
  const botId = localStorage.getItem('currentBotId');
  const userId = getUserIdFromLocalStorage();
  const response = await fetch(`/api/resources/social_config`, {
    headers: {
      'X-BOT-ID': botId,
      'X-Channel': 'NETOMI_WEB_WIDGET',
      'X-Service-Desk': 'NETOMI_WEB_WIDGET',
      'X-User-ID': userId,
    },
    credentials: 'include',
  });
  const data = response.json();
  return data;
}
