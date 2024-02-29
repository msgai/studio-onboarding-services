import { STAGE_LIST, STAGES } from '@/lib/contants.ts';
import { getCurrentBotId, getUserIdFromLocalStorage } from '@/lib/utils.ts';
import DEFAULT_HEADERS from '@/services/setDefaultHeaders.ts';

export async function getBotDetail(botId: string) {
  if (!botId) {
    return;
  }
  const response = await fetch(`/api/resources/bots/${botId}`, {
    credentials: 'include',
  });
  return await response.json();
}

export async function updateStage({ stage, botDetails }: { stage: STAGES; botDetails: any }) {
  const botId = getCurrentBotId();
  const properties = botDetails?.properties;
  properties['ONBOARDING_STAGE'] = {
    value: STAGE_LIST.indexOf(stage) + 1,
    name: 'ONBOARDING_STAGE',
    type: '',
  };
  const response = await fetch(`/api/resources/bots/${botId}`, {
    method: 'PUT',
    body: JSON.stringify({
      id: botId,
      properties: properties,
    }),
    headers: {
      ...DEFAULT_HEADERS,
      // 'content-type': 'application/json; charset=utf-8',
      // 'X-BOT-ID': botId,
      // 'X-Channel': 'NETOMI_WEB_WIDGET',
      // 'X-Service-Desk': 'NETOMI_WEB_WIDGET',
      // 'X-User-ID': userId,
      // env: 'LIVE',
    },
    credentials: 'include',
  });
  return await response.json();
}

export async function finishOnboarding({ botDetails }: { botDetails: any }) {
  const botId = getCurrentBotId();
  const properties = botDetails?.properties;
  properties['IS_ONBOARDING_COMPLETE'] = {
    value: true,
    name: 'IS_ONBOARDING_COMPLETE',
    type: '',
  };
  const response = await fetch(`/api/resources/bots/${botId}`, {
    method: 'PUT',
    body: JSON.stringify({
      id: botId,
      properties: properties,
    }),
    headers: {
      ...DEFAULT_HEADERS,
      // 'content-type': 'application/json',
    },
    credentials: 'include',
  });
  const payload = await response.json();
  console.log('payload', payload);
  return payload;
}

export async function updateAiAgentName(data: string) {
  const botId = getCurrentBotId();
  const response = await fetch(`/api/resources/bots/${botId}`, {
    method: 'PUT',
    body: JSON.stringify({
      id: botId,
      alias: data,
    }),
    headers: {
      ...DEFAULT_HEADERS,
      // 'content-type': 'application/json',
    },
    credentials: 'include',
  });
  const payload = await response.json();
  console.log('payload', payload);
  return payload;
}
