import React, { FunctionComponent } from 'react';

export interface OwnProps {
  test?: string;
}

type Props = OwnProps;

const IconUploader: FunctionComponent<Props> = ({ test }) => {
  console.log(test);
  return (
    <div className={'rounded-lg bg-white p-[24px]'}>
      <div
        className={
          'flex items-center justify-between rounded-lg border border-dashed border-neutral-900 px-[20px] py-[16px]'
        }
      >
        <div>
          <div className="text-base font-normal text-neutral-400">Choose a file or drag & drop it here</div>
          <div className="text-xs font-normal text-gray-400">IMG, JPG, JPEG format, up to 2MB</div>
        </div>
        <div>
          <button
            className={
              'flex h-[45px] w-[135px] items-center justify-center rounded-full bg-indigo-700 text-sm text-white'
            }
          >
            Browse File
          </button>
        </div>
      </div>
    </div>
  );
};

export default IconUploader;
