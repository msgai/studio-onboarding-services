import { STAGE_LIST, STAGES } from '@/lib/contants.ts';
import { getCurrentBotId } from '@/lib/utils.ts';
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
    },
    credentials: 'include',
  });
  const payload = await response.json();
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
    },
    credentials: 'include',
  });
  const payload = await response.json();
  return payload;
}

export async function updateBot(botDetails: Record<string, any>) {
  const botId = getCurrentBotId();
  const response = await fetch(`/api/resources/bots/${botId}`, {
    method: 'PUT',
    body: JSON.stringify({ ...botDetails, id: botId }),
    headers: {
      ...DEFAULT_HEADERS,
    },
    credentials: 'include',
  });
  const payload = await response.json();
  return payload;
}

export async function updateQuickSightOperatingHours(botDetails: Record<string, any>) {
  const botId = getCurrentBotId();
  const response = await fetch(`/api/quicksight/operatingHours/${botId}`, {
    method: 'PUT',
    body: JSON.stringify({ ...botDetails, id: botId }),
    headers: {
      ...DEFAULT_HEADERS,
    },
    credentials: 'include',
  });
  const payload = await response.json();
  return payload;
}
