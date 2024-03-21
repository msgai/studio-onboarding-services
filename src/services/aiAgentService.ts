import { getCurrentBotId } from '@/lib/utils.ts';
import DEFAULT_HEADERS from '@/services/setDefaultHeaders.ts';

export async function getAiAgentPersona() {
  const response = await fetch(`/api/resources/ai-agent-persona?type=BRAND_TONE`, {
    headers: {
      ...DEFAULT_HEADERS,
      env: 'SANDBOX',
    },
    credentials: 'include',
  });
  const data = await response.json();
  return data?.payload;
}

export async function updateAiAgentPersona(data: string, method = 'PUT') {
  const response = await fetch(`/api/resources/ai-agent-persona?type=BRAND_TONE`, {
    method,
    body: data,
    headers: {
      ...DEFAULT_HEADERS,
      env: 'SANDBOX',
    },
    credentials: 'include',
  });
  const payload = await response.json();
}
export async function enableBrandTone(env: string) {
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
    botId: getCurrentBotId(),
    env: env,
    answerGPTProperties: {
      brandToneEnabled: true,
      // answerGPTEnabled: true
    },
  };
  let response = await fetch(`/api/resources/answers/config/answerNet`, {
    method: 'PATCH',
    body: JSON.stringify(data),
    headers: { ...DEFAULT_HEADERS, env },
  });
  return response.json();
}
export async function enableAnswerGpt(env: string) {
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
    botId: getCurrentBotId(),
    env: env,
    answerGPTProperties: {
      // brandToneEnabled: true,
      answerGPTEnabled: true
      // [key]:true
    },
  };
  let response = await fetch(`/api/resources/answers/config/answerGPT`, {
    method: 'PATCH',
    body: JSON.stringify(data),
    headers: { ...DEFAULT_HEADERS, env },
  });
  return response.json();
}
export async function updateEnableDisableSettings (env:any) {

  let data = await getEnableDisableSettings(env)
  data = data.payload
  data = {
    ...data,
    isAnswerAiEnabled: true
  }
  delete data.updatedBy
  delete data.updatedAt
  delete data.conversationOsFlags
  // {"env":"SANDBOX","channel":["NETOMI_WEB_WIDGET"],"isAnswerAiEnabled":false}
  // return http.patch(
  //   this._buildConfig({
  //     url: `/resources${this._endpoint}/config/${configType}`,
  //     data,
  //     headers: {
  //       env
  //     }
  //   })
  // )
  let response = await fetch(`/api/resources/kb/response-templates/config/qna`, {
    method: 'PATCH',
    body: JSON.stringify(data),
    headers: { ...DEFAULT_HEADERS, env },
  });
  return response.json();
}
export async function getEnableDisableSettings (env:any) {
  // return http.get(
  //   this._buildConfig({
  //     url: `/resources${this._endpoint}/config/qna`,
  //     headers: {
  //       env
  //     }
  //   })
  // )
  let response = await fetch(`/api/resources/kb/response-templates/config/qna`, {
    headers: { ...DEFAULT_HEADERS, env },
  });
  return response.json();
}