import React, { FunctionComponent, useState } from 'react';
import pencil from '@/assets/pencil.svg';
import { HexColorPicker } from 'react-colorful';
import { Popover, PopoverContent, PopoverTrigger, PopoverClose } from './popover';
import useFormStore from '@/store/formStore.ts';

export interface OwnProps {
  test?: string;
}

type Props = OwnProps;

const CustomColorPicker: FunctionComponent<Props> = () => {
  const { color, setColor } = useFormStore();
  const [temporaryColor, setTemporaryColor] = useState(color);

  return (
    <div>
      <Popover>
        <PopoverTrigger asChild>
          <div className={'flex h-[50px] w-[50px] cursor-pointer items-center justify-center rounded-[50%] bg-white'}>
            <img src={pencil} alt="add color" />
          </div>
        </PopoverTrigger>
        <PopoverContent className="w-fit border-0 bg-white p-2">
          <HexColorPicker
            color={color}
            onChange={(newColor) => {
              setTemporaryColor(newColor);
            }}
          />
          <div className="mt-2 flex items-center justify-end gap-2">
            <PopoverClose>
              <button
                className="rounded-md border-[1px] border-solid border-indigo-700 px-2 py-1 text-indigo-700"
                onClick={() => {
                  setTemporaryColor(color);
                }}
              >
                Cancel
              </button>
            </PopoverClose>
            <PopoverClose>
              <button
                className="rounded-md border-[1px] border-solid border-indigo-700 bg-indigo-700 px-2 py-1 text-white"
                onClick={() => {
                  setColor(temporaryColor);
                }}
              >
                Save
              </button>
            </PopoverClose>
          </div>
        </PopoverContent>
      </Popover>
    </div>
  );
};

export default CustomColorPicker;
