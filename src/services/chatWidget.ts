export async function getChatWidgetDetails(botId: string) {
  const response = await fetch(`/api/upload/get-object`, {
    headers: {
      'X-BOT-ID': botId,
      'X-Channel': 'NETOMI_WEB_WIDGET',
      'X-Service-Desk': 'NETOMI_WEB_WIDGET',
      'X-User-ID': 'b44520b0-789a-11ee-8295-a52f86cd7a1d',
    },
    credentials: 'include',
  });
  const data = response.json();
  return data;
}
