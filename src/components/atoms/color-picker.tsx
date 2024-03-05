import { COLOR_LIST } from '@/lib/contants.ts';
import { clsx } from 'clsx';
import CustomColorPicker from '@/components/atoms/custom-color-picker.tsx';

interface Props {
  value: string;
  onChange: (value: string) => void;
}
export default function ColorPicker({ value, onChange }: Props) {
  function onClickHandler(color: string) {
    onChange(color);
  }

  return (
    <div className={'flex w-full gap-[24px]'}>
      {COLOR_LIST.map((color) => {
        const isSelected = color === value;
        return (
          <div
            className={clsx([
              'rounded-full border border-solid bg-transparent p-[5px]',
              isSelected ? 'border-white' : 'border-transparent',
            ])}
            onClick={() => onClickHandler(color)}
          >
            <div
              key={color}
              style={{
                backgroundColor: color,
              }}
              className={'h-[50px] w-[50px] cursor-pointer rounded-[50%] '}
            >
              &nbsp;
            </div>
          </div>
        );
      })}
      <div className={clsx(['rounded-full border border-solid border-transparent bg-transparent p-[5px]'])}>
        <CustomColorPicker />
      </div>
    </div>
  );
}
