import { COLOR_LIST } from '@/lib/contants.ts';
import { clsx } from 'clsx';
import pencil from '@/assets/pencil.svg';
interface Props {
  value: string;
  onChange: (value: string) => void;
}
export default function ColorPicker({ value, onChange }: Props) {
  function onClickHandler(color: string) {
    console.log('color', color);
    onChange(color);
  }

  function openColorPicker() {
    console.log('openColorPicker');
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
      <div
        className={clsx(['rounded-full border border-solid border-transparent bg-transparent p-[5px]'])}
        onClick={openColorPicker}
      >
        <div className={'flex h-[50px] w-[50px] cursor-pointer items-center justify-center rounded-[50%] bg-white'}>
          <img src={pencil} alt="plus" />
        </div>
      </div>
    </div>
  );
}
