import React, { useMemo, useReducer } from 'react';
// import { finishOnboarding, updateStage } from '@/services/bots.ts';
// import useAppStore from '@/store/appStore.ts';
// import { STAGE_LIST, STAGES } from '@/lib/contants.ts';
import { toast } from 'sonner';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/atoms/select';
import Input from './atoms/Input';
import { generateTimeZones, getCurrentBotId, getHoursInADay } from '@/lib/utils';
import useAppStore from '@/store/appStore';
import { updateChatWidgetDetails } from '@/services/chatWidget';
import { getBotDetail, updateBot, updateQuickSightOperatingHours, updateStage } from '@/services/bots';
import { STAGES } from '@/lib/contants';

const AGENTDESK_OPTIONS = ['Zendesk', 'FreshDesk', 'Salesforce', 'LivePerson', 'Gladly'] as const;

type FallbackConfig = {
  handoff: string;
  agentDesk?: (typeof AGENTDESK_OPTIONS)[number];
  authenticationKey?: string;
  agentOperatingHours?: {
    timezone?: string;
    startTime?: string;
    endTime?: string;
  };
  agentNotAvailableText?: string;
};

type FallbackFormAction =
  | {
      type: 'HANDOFF_TO_AGENT';
      handoff: FallbackConfig['handoff'];
    }
  | {
      type: 'AGENTDESK';
      agentDesk: FallbackConfig['agentDesk'];
    }
  | {
      type: 'AUTHENTICATION_KEY';
      authenticationKey: string;
    }
  | {
      type: 'TIMEZONE';
      timezone: string;
    }
  | {
      type: 'START_TIME';
      startTime: string;
    }
  | {
      type: 'END_TIME';
      endTime: string;
    }
  | {
      type: 'OPERATING_HOURS';
      operatingHours: FallbackConfig['agentOperatingHours'];
    }
  | {
      type: 'AGENT_UNAVAILABLE';
      agentNotAvailableText: string;
    };

function reducer(state: FallbackConfig, action: FallbackFormAction) {
  switch (action.type) {
    case 'HANDOFF_TO_AGENT': {
      return {
        ...state,
        handoff: action.handoff,
      };
    }
    case 'AGENTDESK': {
      return {
        ...state,
        agentDesk: action.agentDesk,
      };
    }
    case 'AUTHENTICATION_KEY': {
      return {
        ...state,
        authenticationKey: action.authenticationKey,
        agentOperatingHours: undefined,
      };
    }
    case 'TIMEZONE': {
      return {
        ...state,
        agentOperatingHours: {
          ...state.agentOperatingHours,
          timezone: action.timezone,
        },
      };
    }
    case 'START_TIME': {
      return {
        ...state,
        agentOperatingHours: {
          ...state.agentOperatingHours,
          startTime: action.startTime,
        },
      };
    }
    case 'END_TIME': {
      return {
        ...state,
        agentOperatingHours: {
          ...state.agentOperatingHours,
          endTime: action.endTime,
        },
      };
    }
    case 'OPERATING_HOURS': {
      return {
        ...state,
        agentOperatingHours: action.operatingHours,
      };
    }
    case 'AGENT_UNAVAILABLE': {
      return {
        ...state,
        agentNotAvailableText: action.agentNotAvailableText,
      };
    }
  }
}

const HANDOFF_OPTIONS = ['Yes', 'No'];

export default function StageFormFallback() {
  const { botDetails, chatWidgetConfig, chatWidgetAppEnv, botRefIdStaging, chatWidgetCdnUrl, setBotDetails } =
    useAppStore();
  console.log(botDetails, 'btf');
  const getTimezoneOptions = useMemo(() => generateTimeZones, []);
  const getHours = useMemo(() => getHoursInADay, []);
  const timezones = getTimezoneOptions();
  const hours = getHours();
  const [formData, dispatch] = useReducer(reducer, {
    handoff: 'No',
    agentOperatingHours: {
      endTime: botDetails?.operatingHours?.['end_time'],
      startTime: botDetails?.operatingHours?.['start_time'],
      timezone: timezones.find(({ name }) => name === botDetails?.['timezone'])?.name,
    },
    authenticationKey: chatWidgetConfig?.liveAgentDeskConfig?.agentDeskAuthKey,
    agentDesk: AGENTDESK_OPTIONS.find(
      (option) => option.toUpperCase().replace(/ /g, '') == chatWidgetConfig?.liveAgentDeskConfig?.agentDeskChannelName,
    ),
  });

  async function updateStageData() {
    // const payload = await updateStage({
    //   stage: STAGES.APPEARANCE,
    //   botDetails: botDetails,
    // });
    // await finishOnboarding({
    //   botDetails,
    // });
    // if (payload?.statusCode === 'SUCCESS') {
    //   setStage(STAGE_LIST[STAGE_LIST.indexOf(STAGES.FALLBACK)]);
    // }
  }

  async function handleStagingData() {
    const chatWidgetConfigCopy = JSON.parse(JSON.stringify(chatWidgetConfig));
    chatWidgetConfigCopy.liveAgentDeskConfig = chatWidgetConfigCopy.liveAgentDeskConfig || {};
    if (formData.agentDesk == 'Zendesk') {
      chatWidgetConfigCopy.liveAgentDeskConfig.agentDeskChannelName = formData.agentDesk.toUpperCase();
      chatWidgetConfigCopy.liveAgentDeskConfig.agentDeskAuthKey = formData.authenticationKey;
      try {
        const payloadString = JSON.stringify(chatWidgetConfigCopy);
        await updateChatWidgetDetails({
          env: chatWidgetAppEnv,
          botRefId: botRefIdStaging,
          payloadString,
        });
      } catch {
        toast.error('Something went wrong.');
      }
    } else {
      chatWidgetConfigCopy.liveAgentDeskConfig.agentDeskChannelName = formData.agentDesk
        .toUpperCase()
        .replace(/ /g, '');

      try {
        const payloadString = JSON.stringify(chatWidgetConfigCopy);
        const { endTime, startTime, timezone } = formData.agentOperatingHours;
        const aiAgentOperatingDetails = {
          aiEndTime: endTime,
          aiStartTime: startTime,
          timezone,
          title: botDetails.title,
          alias: botDetails.alias,
          confidenceLevel: 'HIGH',
        };

        await Promise.all([
          updateChatWidgetDetails({
            env: chatWidgetAppEnv,
            botRefId: botRefIdStaging,
            payloadString,
          }),
          updateBot(aiAgentOperatingDetails),
          updateQuickSightOperatingHours(aiAgentOperatingDetails),
        ]);
      } catch {
        toast.error('Something went wrong.');
      }
    }
  }

  function validateForm() {
    if (formData.handoff === 'No') return true;

    if (formData.agentDesk === 'Zendesk' && formData.authenticationKey) return true;

    if (formData.agentOperatingHours) {
      const { endTime, startTime, timezone } = formData.agentOperatingHours;
      return endTime && startTime && timezone && formData.agentNotAvailableText;
    }

    return false;
  }

  async function syncBotDetails() {
    try {
      const res = await getBotDetail(getCurrentBotId());
      if (res?.payload) setBotDetails(res.payload);
    } catch (e) {
      toast.error(e?.message);
    }
  }

  function openInteractiveTab() {
    const cdnUrl = new URL(chatWidgetCdnUrl);
    const url = `https://${window.location.host}/preview?botRefId=${botRefIdStaging}&src=${cdnUrl.origin}`;
    window.open(url, '_blank');
  }

  async function handleFormSubmit() {
    const id = toast('Saving...');
    if (!validateForm()) {
      toast.dismiss(id);
      toast.error('Please fill all the fields.');
      return;
    }
    await handleStagingData();
    await syncBotDetails();
    // await updateStageData();
    openInteractiveTab();

    window.location.href = '/';

    toast.dismiss(id);
    toast.success('Saved');
  }

  const FieldsForHandoff = formData.agentDesk ? (
    <>
      {formData.agentDesk == 'Zendesk' ? (
        <div>
          <div className="mb-[10px] text-lg font-bold leading-none text-white">Input Authentication Key</div>
          <Input
            onChange={(e) => dispatch({ type: 'AUTHENTICATION_KEY', authenticationKey: e.target.value })}
            type="password"
            className="text-3xl"
          />
        </div>
      ) : (
        <>
          <div>
            <div className="flex gap-4">
              <div className="basis-1/5">
                <div className="mb-[10px] text-lg font-bold leading-none text-white">Start Time</div>
                <Select
                  value={formData?.agentOperatingHours?.startTime}
                  onValueChange={(value) => {
                    dispatch({ type: 'START_TIME', startTime: value });
                  }}
                >
                  <SelectTrigger className="h-[56px] w-full rounded-lg border border-gray-300 bg-white p-2.5 text-lg leading-none text-gray-500 outline-none focus:border-blue-500 focus:ring-blue-500 ">
                    <SelectValue placeholder="Choose an option" />
                  </SelectTrigger>
                  <SelectContent className="max-h-[300px] overflow-hidden bg-white">
                    {hours.map((option) => (
                      <SelectItem key={option} value={option} className={'cursor-pointer text-zinc-800'}>
                        {option}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              <div className="basis-1/5">
                <div className="mb-[10px] text-lg font-bold leading-none text-white">End Time</div>
                <Select
                  value={formData?.agentOperatingHours?.endTime}
                  onValueChange={(value) => {
                    dispatch({ type: 'END_TIME', endTime: value });
                  }}
                >
                  <SelectTrigger className="h-[56px] w-full rounded-lg border border-gray-300 bg-white p-2.5 text-lg leading-none text-gray-500 outline-none focus:border-blue-500 focus:ring-blue-500 ">
                    <SelectValue placeholder="Choose an option" />
                  </SelectTrigger>
                  <SelectContent className="max-h-[300px] overflow-hidden bg-white">
                    {hours.map((option) => (
                      <SelectItem key={option} value={option} className={'cursor-pointer text-zinc-800'}>
                        {option}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              <div className="flex-1">
                <div className="mb-[10px] text-lg font-bold leading-none text-white">Select Time Zone</div>
                <Select
                  value={formData?.agentOperatingHours?.timezone}
                  onValueChange={(value) => {
                    dispatch({ type: 'TIMEZONE', timezone: value });
                  }}
                >
                  <SelectTrigger className="h-[56px] w-full rounded-lg border border-gray-300 bg-white p-2.5 text-lg leading-none text-gray-500 outline-none focus:border-blue-500 focus:ring-blue-500 ">
                    <SelectValue placeholder="Choose an option" />
                  </SelectTrigger>
                  <SelectContent className="max-h-[300px] overflow-hidden bg-white">
                    {timezones.map((option) => (
                      <SelectItem key={option.name} value={option.name} className={'cursor-pointer text-zinc-800'}>
                        {option.label}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            </div>
          </div>
          <div>
            <div className="mb-[10px] text-lg font-bold leading-none text-white">
              What should the AI respond in case agents are not available?
            </div>
            <Input
              onChange={(e) => dispatch({ type: 'AGENT_UNAVAILABLE', agentNotAvailableText: e.target.value })}
              value={formData?.agentNotAvailableText}
              className="text-lg"
            />
          </div>
        </>
      )}
    </>
  ) : null;

  return (
    <div className="h-full w-full">
      <div className="flex flex-col gap-6">
        <div>
          <div className="mb-[10px] text-lg font-bold leading-none text-white">
            Does your AI agent support live handoff to human agent?
          </div>
          <Select
            value={formData.handoff.toString()}
            onValueChange={(value) => {
              dispatch({ type: 'HANDOFF_TO_AGENT', handoff: value });
            }}
          >
            <SelectTrigger className="h-[56px] w-full rounded-lg border border-gray-300 bg-white p-2.5 text-lg leading-none text-gray-500 outline-none focus:border-blue-500 focus:ring-blue-500 ">
              <SelectValue placeholder="Select" />
            </SelectTrigger>
            <SelectContent className={'bg-white'}>
              {HANDOFF_OPTIONS.map((option) => (
                <SelectItem key={option} value={option} className={'cursor-pointer text-zinc-800'}>
                  {option}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
        {formData.handoff == 'Yes' && (
          <>
            <div>
              <div className="mb-[10px] text-lg font-bold leading-none text-white">
                Select the agent desk option below
              </div>
              <Select
                value={formData.agentDesk}
                onValueChange={(value) => {
                  // const operatingHours = botDetails?.operatingHours;
                  // const agentDeskKey = chatWidgetConfig?.liveAgentDeskConfig?.agentDeskAuthKey;
                  // if (value !== AGENTDESK_OPTIONS[0] && operatingHours) {
                  //   dispatch({
                  //     type: 'OPERATING_HOURS',
                  //     operatingHours: {
                  //       endTime: operatingHours?.['end_time'],
                  //       startTime: operatingHours?.['start_time'],
                  //       timezone: timezones.find(({ name }) => name === operatingHours?.['timezone']).name,
                  //     },
                  //   });
                  // } else if (value === AGENTDESK_OPTIONS[0] && agentDeskKey) {
                  //   dispatch({ type: 'AUTHENTICATION_KEY', authenticationKey: agentDeskKey });
                  // }
                  dispatch({ type: 'AGENTDESK', agentDesk: value as (typeof AGENTDESK_OPTIONS)[number] });
                }}
              >
                <SelectTrigger className="h-[56px] w-full rounded-lg border border-gray-300 bg-white p-2.5 text-lg leading-none text-gray-500 outline-none focus:border-blue-500 focus:ring-blue-500 ">
                  <SelectValue placeholder="Choose an option" />
                </SelectTrigger>
                <SelectContent className={'bg-white'}>
                  {AGENTDESK_OPTIONS.map((option) => (
                    <SelectItem key={option} value={option} className={'cursor-pointer text-zinc-800'}>
                      {option}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            {FieldsForHandoff}
          </>
        )}
      </div>
      <div className={'mt-[50px] flex justify-end'}>
        <button
          className={
            'flex items-center justify-center rounded-full bg-orange-400 px-[40px]  py-[15px] text-lg text-white'
          }
          onClick={handleFormSubmit}
        >
          Submit & Test
        </button>
      </div>
    </div>
  );
}
