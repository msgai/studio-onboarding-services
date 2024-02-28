export enum STAGES {
  APPEARANCE = 'Appearance',
  TONE = 'Tone',
  SOURCES = 'Sources',
  FALLBACK = 'Fall Back',
  TEST = 'Test',
}

export const STAGE_LIST = [STAGES.APPEARANCE, STAGES.TONE, STAGES.SOURCES, STAGES.FALLBACK, STAGES.TEST];
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
    header: '',
    subHeader: '',
  },
  [STAGES.FALLBACK]: {
    title: 'Fall Back',
    subtitle: 'Curate error messages',
    header: '',
    subHeader: '',
  },
  [STAGES.TEST]: {
    title: 'Test',
    subtitle: 'Submit interface',
    header: '',
    subHeader: '',
  },
};

export const COLOR_LIST = ['#AFA4FF', '#E64B32', '#ECB940', '#5DC974', '#2B77F6'];

export const TONE_LIST = ['Friendly', 'Professional'];
