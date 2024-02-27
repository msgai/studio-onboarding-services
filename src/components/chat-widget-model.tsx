import React, { FunctionComponent } from 'react';

export interface OwnProps {
  test?: string;
}

type Props = OwnProps;

const ChatWidgetModel: FunctionComponent<Props> = ({ test }) => {
  console.log(test);
  return (
    <div className={'h-[699px] w-[419px] rounded-[20px] bg-white'}>
      <div></div>
      <div></div>
      <div className={'flex gap-[12px] px-[16px] py-[22px] pb-[28px]'}>
        <div></div>
        <div
          className={
            'flex h-[43px] w-[343px] items-center rounded-[8px] border border-solid bg-neutral-50 px-[15px] text-neutral-500'
          }
        >
          Ask a question ...
        </div>
      </div>
    </div>
  );
};

export default ChatWidgetModel;
