import DEFAULT_HEADERS from '@/services/setDefaultHeaders.ts';

export async function getSocialConfig() {
  const response = await fetch(`/api/resources/social_config`, {
    headers: {
      ...DEFAULT_HEADERS,
    },
    credentials: 'include',
  });
  const data = await response.json();
  return data?.payload;
}

export async function getConfig(configKey: string) {
  const response = await fetch(`/api/config-app/getConfig?configKey=${configKey}`, {
    headers: {
      ...DEFAULT_HEADERS,
    },
    credentials: 'include',
  });
  const data = await response.json();
  return data?.payload;
}
