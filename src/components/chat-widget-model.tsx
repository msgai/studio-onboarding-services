import React, { FunctionComponent } from 'react';
import { useState } from 'react';
import verticalEllipsisIcon from '../assets/vertical-ellipsis.svg';
import hyphenIcon from '../assets/hyphen.svg';
import crossIcon from '../assets/cross.svg';
import deleteIcon from '../assets/delete.svg';
import starIcon from '../assets/stars.svg';
import reloadIcon from '../assets/reload.svg';
import thumbsUpDown from '../assets/thumbs-up-down.svg';
import useFormStore from '@/store/formStore.ts';
import defaultLogo from '../assets/netomi_logo.svg';

export interface OwnProps {
  test?: string;
}

type Props = OwnProps;

const DEFAULT_GREETING = 'Hello! Welcome to AeroSkyline Airlines customer support. How can I assist you today?';

const ChatWidgetModel: FunctionComponent<Props> = () => {
  const { greetingPrompt, color, logoUrl, brandName } = useFormStore((state) => state);

  return (
    <div className={'h-[699px] w-[419px] scale-[.85] overflow-auto rounded-[20px] bg-white'}>
      <div
        className={
          'chat-widget-header flex items-center justify-between rounded-tl-[20px] rounded-tr-[20px] px-[30px] py-[16px] text-white'
        }
        style={{ backgroundColor: color }}
      >
        <div className={'mr-[24px]'}>
          <img src={verticalEllipsisIcon} />
        </div>
        <div className={'mr-[10px] w-[32px]'}>
          <img src={logoUrl || defaultLogo} />
        </div>
        <div className={'mr-[10px] w-[216px] overflow-hidden overflow-ellipsis whitespace-nowrap'}>{brandName}</div>
        <div className={'mr-[20px]'}>
          <img src={hyphenIcon} />
        </div>
        <div>
          <img src={crossIcon} />
        </div>
      </div>

      <div className={'chat-widget-content relative mt-[-64px] h-full px-[16px] pt-[180px]'}>
        <div className={'chat-widget-body mt-[90px] flex flex-col gap-y-[16px]'}>
          <div className={'flex'}>
            <div
              style={{ backgroundColor: color }}
              className={'mr-[12px] self-start rounded-[5px] bg-gray-100 p-[4px]'}
            >
              <img className="h-[13.6px] w-[13.6px]" src={logoUrl || defaultLogo} style={{ backgroundColor: color }} />
            </div>
            <div className="w-[320px] overflow-hidden rounded-[15px] bg-gray-100 py-[20px] pl-[16px] pr-[30px] text-black">
              {greetingPrompt || DEFAULT_GREETING}
            </div>
          </div>
          <div className="self-end rounded-[15px] px-[20px] py-[12px] text-white" style={{ backgroundColor: color }}>
            I need help with my flight?
          </div>
          <div className={'flex'}>
            <div
              style={{ backgroundColor: color }}
              className={'mr-[12px] self-start rounded-[5px] bg-gray-100 p-[4px]'}
            >
              <img className="h-[13.6px] w-[13.6px]" src={logoUrl || defaultLogo} style={{ backgroundColor: color }} />
            </div>
            <div>
              <div className="w-[320px] self-start rounded-[15px] bg-gray-100 py-[20px] pl-[16px] pr-[30px] text-black">
                Sure, I can help with your flight related questions.
              </div>
              <div className="pt-[6px] text-gray-700">Bot name. 7:28 PM</div>
              <div>
                <img src={thumbsUpDown} />
              </div>
            </div>
          </div>
        </div>

        <div className={'chat-widget-footer absolute bottom-[28px] flex items-center'}>
          <div className={'mr-[12px] px-[8px]'}>
            <img src={reloadIcon} />
          </div>
          <div
            className={
              'flex h-[43px] w-[343px] items-center rounded-[8px] border border-solid bg-neutral-50 px-[15px] text-neutral-500'
            }
          >
            Ask a question ...
          </div>
        </div>
      </div>
    </div>
  );
};

export default ChatWidgetModel;
