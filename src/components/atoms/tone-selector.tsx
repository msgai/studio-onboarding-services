import React, { FunctionComponent } from 'react';
import { TONE_LIST, TONE_LIST_DATA } from '@/lib/contants.ts';
import { clsx } from 'clsx';

export interface OwnProps {
  value: string;
  onChange: (value: string) => void;
}

type Props = OwnProps;

const ToneSelector: FunctionComponent<Props> = ({ value, onChange }) => {
  function onClickHandler(color: string) {
    console.log('color', color);
    onChange(color);
  }
  return (
    <div>
      <div className={'flex gap-[14px]'}>
        {TONE_LIST.map((item) => {
          const isSelected = item === value;
          return (
            <div
              key={item}
              className={clsx([
                'flex h-14 w-[154px] cursor-pointer items-center justify-center rounded-lg border border-zinc-300 ',
                isSelected
                  ? 'bg-orange-400 text-white'
                  : 'bg-slate-50 text-neutral-500 hover:bg-slate-200 hover:text-neutral-500',
              ])}
              onClick={() => onClickHandler(item)}
            >
              {TONE_LIST_DATA[item].label}
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default ToneSelector;
