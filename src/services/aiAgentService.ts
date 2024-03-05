import { getCurrentBotId } from '@/lib/utils.ts';
import { TONE } from '@/lib/contants.ts';
import DEFAULT_HEADERS from '@/services/setDefaultHeaders.ts';

export async function getAiAgentPersona() {
  const response = await fetch(`/api/resources/ai-agent-persona?type=BRAND_TONE`, {
    headers: {
      ...DEFAULT_HEADERS,
      env: 'SANDBOX',
      // 'X-BOT-ID': botId,
      // 'X-Channel': 'NETOMI_WEB_WIDGET',
      // 'X-Service-Desk': 'NETOMI_WEB_WIDGET',
      // 'X-User-ID': userId,
    },
    credentials: 'include',
  });
  const data = await response.json();
  console.log('getAiAgentPersona', data);
  return data?.payload;
}

export async function updateAiAgentPersona(data: string, method="PUT") {
  const response = await fetch(`/api/resources/ai-agent-persona?type=BRAND_TONE`, {
    method,
    body: data,
    headers: {
      ...DEFAULT_HEADERS,
      env: 'SANDBOX',
      // 'X-BOT-ID': botId,
      // 'X-Channel': 'NETOMI_WEB_WIDGET',
      // 'X-Service-Desk': 'NETOMI_WEB_WIDGET',
      // 'X-User-ID': userId,
    },
    credentials: 'include',
  });
  const payload = await response.json();
  console.log('getAiAgentPersona updated', payload);
}
export async function enableBrandTone (env:string) {
  // return http.patch(
  //   this._buildConfig({
  //     url: `/resources${this._endpoint}/config/${configType}`,
  //     data,
  //     headers: {
  //       env
  //     }
  //   })
  // )
  let data = {
    "botId": getCurrentBotId(),
    "env": env,
    "answerGPTProperties": {
      "brandToneEnabled": true
    }
  }
  let response = await fetch(`/api/resources/answers/config/answerNet`, {
    method: 'PATCH',
    body: JSON.stringify(data),
    headers: {...DEFAULT_HEADERS, env},
  });
  return response.json();
}