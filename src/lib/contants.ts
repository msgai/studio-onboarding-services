export enum STAGES {
  APPEARANCE = 'Appearance',
  TONE = 'Tone',
  SOURCES = 'Sources',
  FALLBACK = 'Fall Back',
  TEST = 'Test',
}

export const STAGE_LIST = [STAGES.APPEARANCE, STAGES.TONE, STAGES.SOURCES, STAGES.FALLBACK];
export const FIRST_STAGE = STAGE_LIST[0];
export const LAST_STAGE = STAGE_LIST[STAGE_LIST.length - 1];

export const STAGE_LIST_DATA = {
  [STAGES.APPEARANCE]: {
    title: 'Appearance',
    subtitle: 'Select branding',
    header: 'How should Netomi look?',
    subHeader: 'We suggest matching your website to create a unified experience',
  },
  [STAGES.TONE]: {
    title: 'Tone & Persona',
    subtitle: 'Provide details',
    header: 'How should Netomi interact?',
    subHeader: 'Set goals for the optimal communication approach',
  },
  [STAGES.SOURCES]: {
    title: 'Sources',
    subtitle: 'Add files',
    header: 'How should Netomi interact?',
    subHeader: 'Set goals for the optimal communication approach',
  },
  [STAGES.FALLBACK]: {
    title: 'Fall Back',
    subtitle: 'Curate error messages',
    header: 'How should Netomi interact?',
    subHeader: 'Set goals for the optimal communication approach',
  },
  [STAGES.TEST]: {
    title: 'Test',
    subtitle: 'Submit interface',
    header: 'How should Netomi interact?',
    subHeader: 'Set goals for the optimal communication approach',
  },
};

export const COLOR_LIST = ['#AFA4FF', '#E64B32', '#ECB940', '#5DC974', '#2B77F6'];

export enum TONE {
  FRIENDLY = 'FRIENDLY',
  PROFESSIONAL = 'PROFESSIONAL',
}

export const TONE_LIST_DATA = {
  [TONE.FRIENDLY]: {
    label: 'Friendly',
  },
  [TONE.PROFESSIONAL]: {
    label: 'Professional',
  },
};

export const TONE_LIST = [TONE.FRIENDLY, TONE.PROFESSIONAL];

export enum SOURCE_TYPE {
  WEB_URL = 'WEB_URL',
  CUSTOM_KB = 'CUSTOM_KB',
}

export const SOURCE_TYPE_LIST_DATA = {
  [SOURCE_TYPE.WEB_URL]: {
    label: 'Web URL',
    sourceType: 'WEB',
  },
  [SOURCE_TYPE.CUSTOM_KB]: {
    label: 'Custom KB',
    sourceType: 'FILE',
  },
};

export const SOURCE_TYPE_LIST = [SOURCE_TYPE.WEB_URL, SOURCE_TYPE.CUSTOM_KB];
export const subTypeConstants = {
  CUSTOM_KB: 'CUSTOM_KB',
  CURATED_FAQ: 'CURATED_FAQ',
  DOC: 'DOC',
  PDF: 'PDF',
  WEB_URL: 'WEB_URL',
  ZENDESK_KB_JSON: 'ZENDESK_KB_JSON',
  ONLINE_PDF: 'ONLINE_PDF',
  SITE_MAP: 'SITE_MAP',
};
export const defaultBrandToneSettings = {
  botId: 'SYSTEM',
  aiAgentPersonaConfig: {
    communicationTone: {
      tone: 'PROFESSIONAL',
    },
    responseFormat: {
      formatType: 'AUTO',
      formatDescription: '',
    },
    responseLength: {
      contentDepth: 'AUTO',
    },
  },
};
