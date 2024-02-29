import { getUserIdFromLocalStorage } from '@/lib/utils.ts';
import { TONE } from '@/lib/contants.ts';

export async function getAiAgentPersona() {
  const botId = localStorage.getItem('currentBotId');
  const userId = getUserIdFromLocalStorage();
  const response = await fetch(`/api/resources/ai-agent-persona?type=BRAND_TONE`, {
    headers: {
      env: 'SANDBOX',
      'X-BOT-ID': botId,
      'X-Channel': 'NETOMI_WEB_WIDGET',
      'X-Service-Desk': 'NETOMI_WEB_WIDGET',
      'X-User-ID': userId,
    },
    credentials: 'include',
  });
  const data = await response.json();
  console.log('getAiAgentPersona', data);
  return data?.payload;
}

export async function updateAiAgentPersona(data: string) {
  const botId = localStorage.getItem('currentBotId');
  const userId = getUserIdFromLocalStorage();
  const response = await fetch(`/api/resources/ai-agent-persona?type=BRAND_TONE`, {
    method: 'PUT',
    body: data,
    headers: {
      env: 'SANDBOX',
      'X-BOT-ID': botId,
      'X-Channel': 'NETOMI_WEB_WIDGET',
      'X-Service-Desk': 'NETOMI_WEB_WIDGET',
      'X-User-ID': userId,
    },
    credentials: 'include',
  });
  const payload = await response.json();
  console.log('getAiAgentPersona updated', payload);
}
