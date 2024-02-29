import Input from '@/components/atoms/Input.tsx';
import React, { useEffect, useState } from 'react';
import ToneSelector from '@/components/atoms/tone-selector.tsx';
import { TONE_LIST } from '@/lib/contants.ts';
import answerai from '@/services/answerAi'

export default function StageFormTone() {
  const [tone, setTone] = useState(TONE_LIST[0]);

  function onToneChange(value: string) {
    setTone(value);
  }

  function handleFormSubmit() {
    console.log('Form Submitted');
  }
  useEffect(() => {
    answerai.getAllSources().then((res: any) => {
      console.log('Answer', res)
    })
  },[])

  return (
    <div className={'w-full'}>
      <div>
        <div className="mb-[10px] text-lg font-bold leading-none text-white">Brand Name</div>
        <Input />
      </div>
      <div className={'mt-[30px]'}>
        <div className="mb-[10px] text-lg font-bold leading-none text-white">AI Agent Name</div>
        <Input placeholder={'What would your chat bot be called?'} />
      </div>
      <div className={'mt-[30px]'}>
        <div className="mb-[10px] text-lg font-bold leading-none text-white">Formality of Tone</div>
        <ToneSelector value={tone} onChange={onToneChange} />
        <div className="mt-[15px] text-base font-bold text-white">
          Informal: Allows casual usage of slang and other phrases
        </div>
      </div>
      <div className={'mt-[50px] flex justify-end  scale-[1.25] mr-[90px]'}>
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
