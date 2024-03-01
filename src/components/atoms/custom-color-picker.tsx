import React, { FunctionComponent } from 'react';
import pencil from '@/assets/pencil.svg';
import { HexColorPicker } from 'react-colorful';
import { Popover, PopoverContent, PopoverTrigger } from './popover';
import useFormStore from '@/store/formStore.ts';

export interface OwnProps {
  test?: string;
}

type Props = OwnProps;

const CustomColorPicker: FunctionComponent<Props> = () => {
  const { color, setColor } = useFormStore();
  return (
    <div>
      <Popover>
        <PopoverTrigger asChild>
          <div className={'flex h-[50px] w-[50px] cursor-pointer items-center justify-center rounded-[50%] bg-white'}>
            <img src={pencil} alt="add color" />
          </div>
        </PopoverTrigger>
        <PopoverContent className="w-fit border-0 p-0">
          <HexColorPicker color={color} onChange={setColor} />
        </PopoverContent>
      </Popover>
    </div>
  );
};

export default CustomColorPicker;
