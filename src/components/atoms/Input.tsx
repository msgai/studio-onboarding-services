import { InputHTMLAttributes } from 'react';
import { twMerge } from 'tailwind-merge';

export default function Input(props: InputHTMLAttributes<HTMLInputElement>) {
  const inputProps = { ...props };
  delete inputProps.className;
  return (
    <input
      {...inputProps}
      className={twMerge([
        ' h-[56px] w-full rounded-lg border border-zinc-300 bg-slate-50 px-[16px] text-base font-normal text-neutral-500 outline-none ',
        props.className || '',
      ])}
    />
  );
}
