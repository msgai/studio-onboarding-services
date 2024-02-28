import { getUserEmailFromLocalStorage, getUserIdFromLocalStorage } from '@/lib/utils.ts';

export async function getChatWidgetDetails({ env, botRefId }: { env: string; botRefId: string }) {
  const botId = localStorage.getItem('currentBotId');
  const userId = getUserIdFromLocalStorage();
  const response = await fetch(`/api/upload/get-object`, {
    method: 'POST',
    body: JSON.stringify({
      bucket: 'chat-widget',
      uploadKeyPrefix: `${env}/json-config/${botRefId}.json`,
    }),
    headers: {
      'X-BOT-ID': botId,
      'X-Channel': 'NETOMI_WEB_WIDGET',
      'X-Service-Desk': 'NETOMI_WEB_WIDGET',
      'X-User-ID': userId,
      env: 'LIVE',
      'content-type': 'application/json',
    },
    credentials: 'include',
  });
  return await response.json();
}

export async function updateChatWidgetDetails({
  env,
  botRefId,
  payloadString,
}: {
  env: string;
  botRefId: string;
  payloadString: string;
}) {
  const botId = localStorage.getItem('currentBotId');
  const userId = getUserIdFromLocalStorage();
  const userEmail = getUserEmailFromLocalStorage();
  const response = await fetch(`/api/upload/put-object`, {
    method: 'POST',
    body: JSON.stringify({
      bucket: 'chat-widget',
      contentType: 'application/json; charset=utf-8',
      uploadKeyPrefix: `${env}/json-config/${botRefId}.json`,
      user: userEmail,
      contents: payloadString,
    }),
    headers: {
      'X-BOT-ID': botId,
      'X-Channel': 'NETOMI_WEB_WIDGET',
      'X-Service-Desk': 'NETOMI_WEB_WIDGET',
      'X-User-ID': userId,
      env: 'LIVE',
      'content-type': 'application/json',
    },
    credentials: 'include',
  });
  return await response.json();
}

export async function invalidateCloudfront({ env, botRefId }: { env: string; botRefId: string }) {
  const botId = localStorage.getItem('currentBotId');
  const userId = getUserIdFromLocalStorage();
  const response = await fetch(`/api/cloudfront/invalidate`, {
    method: 'POST',
    body: JSON.stringify({
      env,
      path: `/json-config/${botRefId}.json`,
    }),
    headers: {
      'X-BOT-ID': botId,
      'X-Channel': 'NETOMI_WEB_WIDGET',
      'X-Service-Desk': 'NETOMI_WEB_WIDGET',
      'X-User-ID': userId,
      env: 'LIVE',
      'content-type': 'application/json',
    },
    credentials: 'include',
  });
  return await response.json();
}
