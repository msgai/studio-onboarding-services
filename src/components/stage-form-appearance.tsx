import Input from '@/components/atoms/Input.tsx';
import ColorPicker from '@/components/atoms/color-picker.tsx';
import React, { useState } from 'react';
import IconUploader from '@/components/atoms/icon-uploader.tsx';

export default function StageFormAppearance() {
  const [color, setColor] = useState(ColorPicker[0]);

  function onColorUpdate(value: string) {
    setColor(value);
  }

  function handleFormSubmit() {
    console.log('Form Submitted');
  }

  return (
    <div className={'w-full'}>
      <div>
        <div className="mb-[10px] text-lg font-bold leading-none text-white">Greeting Prompt</div>
        <Input placeholder={'Welcome to {Company Chat Bot Name} customer support! How can I assist you today?'} />
      </div>
      <div className={'mt-[30px]'}>
        <div className="mb-[10px] text-lg font-bold leading-none text-white">Select color</div>
        <ColorPicker value={color} onChange={onColorUpdate} />
      </div>
      <div className={'mt-[30px]'}>
        <div className="mb-[10px] text-lg font-bold leading-none text-white">Upload Logo</div>
        <IconUploader />
      </div>
      <div className={'mt-[50px] flex justify-end'}>
        <button
          className={
            'flex items-center justify-center rounded-full bg-orange-400 px-[32px] py-[12px] text-sm text-white'
          }
          onClick={handleFormSubmit}
        >
          Continue
        </button>
      </div>
    </div>
  );
}
