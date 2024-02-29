import { getUserIdFromLocalStorage } from '@/lib/utils.ts';
const botId = localStorage.getItem('currentBotId');
const userId = getUserIdFromLocalStorage();

 const headers = {
    'content-type': 'application/json; charset=utf-8',
    'X-BOT-ID': botId,
    'X-Channel': 'NETOMI_WEB_WIDGET',
    'X-Service-Desk': 'NETOMI_WEB_WIDGET',
    'X-User-ID': userId,
    env: 'LIVE',
  }
  export default headers;