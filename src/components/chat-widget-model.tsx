import React, { FunctionComponent } from 'react';
import { useState } from 'react';
import verticalEllipsisIcon from '../assets/vertical-ellipsis.svg';
import hyphenIcon from '../assets/hyphen.svg';
import crossIcon from '../assets/cross.svg';
import deleteIcon from '../assets/delete.svg';
import starIcon from '../assets/stars.svg';
import reloadIcon from '../assets/reload.svg';
import thumbsUpDown from '../assets/thumbs-up-down.svg'


export interface OwnProps {
  test?: string;
}

type Props = OwnProps;

const ChatWidgetModel: FunctionComponent<Props> = ({ test }) => {

  const [config, setConfig] = useState({
    botName: 'Aeroskyline Chat Bot Name',
    color: '#E64B32',
  });

  return (
    <div className={'h-[699px] w-[419px] rounded-[20px] bg-white'}>
      <div className={'chat-widget-header rounded-tl-[20px] rounded-tr-[20px] text-white flex justify-between items-center px-[30px] py-[16px]'} style={{ backgroundColor : config.color }}>
        <div className={'mr-[24px]'}><img src={verticalEllipsisIcon}/></div>
        <div className={'mr-[10px] w-[32px]'}><img src={deleteIcon}/></div>
        <div className={'mr-[10px] w-[216px] whitespace-nowrap overflow-hidden overflow-ellipsis'}>{config.botName}</div>
        <div className={'mr-[20px]'}><img src={hyphenIcon}/></div>
        <div><img src={crossIcon}/></div>
      </div>
  
      <div className={'chat-widget-content h-full mt-[-64px] px-[16px] pt-[180px] relative'}>
        <div className={'chat-widget-body flex flex-col gap-y-[16px]'}>
          <div className='px-[20px] py-[12px] rounded-[15px] self-end text-white' style={{ backgroundColor : config.color }}>Hi</div>
          <div className={'flex'}>
            <div className={'p-[4px] bg-gray-100 self-start mr-[12px] rounded-[5px]'}><img src={starIcon}/></div>
            <div className='pl-[16px] pr-[30px] pl-[16px] py-[20px] bg-gray-100 text-black rounded-[15px] self-start w-[320px]'>Hello! Welcome to AeroSkyline Airlines customer support. How can I assist you today?</div>
          </div>
          <div className='px-[20px] py-[12px] rounded-[15px] self-end text-white' style={{ backgroundColor : config.color }}>I need help with my flight?</div>
          <div className={'flex'}>
            <div className={'p-[4px] bg-gray-100 self-start mr-[12px] rounded-[5px]'}><img src={starIcon}/></div>
            <div>
              <div className='pl-[16px] pr-[30px] pl-[16px] py-[20px] bg-gray-100 text-black rounded-[15px] self-start w-[320px]'>Sure, I can help with your flight related questions.</div>
              <div className='pt-[6px] text-gray-700'>Bot name. 7:28 PM</div>
              <div><img src={thumbsUpDown}/></div>
            </div>
          </div>
        </div>

        <div className={'chat-widget-footer absolute bottom-[28px] flex items-center'}>
          <div className={'px-[8px] mr-[12px]'}><img src={reloadIcon}/></div>
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
