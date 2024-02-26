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
  },
  [STAGES.TONE]: {
    title: 'Tone & Persona',
    subtitle: 'Provide details',
  },
  [STAGES.SOURCES]: {
    title: 'Sources',
    subtitle: 'Add files',
  },
  [STAGES.FALLBACK]: {
    title: 'Fall Back',
    subtitle: 'Curate error messages',
  },
  [STAGES.TEST]: {
    title: 'Test',
    subtitle: 'Submit interface',
  },
};
