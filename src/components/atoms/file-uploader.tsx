import React, { FunctionComponent, useEffect, useMemo, useRef, useState } from 'react';
import { getPreSignedURL } from '../../services/upload';
import Spinner from './spinner';
export interface OwnProps {
  value?: string;
  onChange?: Function;
  validateFile?: Function;
  description?: string;
  accept?: string;
  uploadKeyPrefix?: string;
  showIcon?: boolean;
}

type Props = OwnProps;
// https://stackoverflow.com/questions/15960508/javascript-async-readasdataurl-multiple-files
function getBase64(file: any) {
  const reader = new FileReader();
  return new Promise((resolve) => {
    reader.onload = (ev) => {
      resolve(ev.target.result);
    };
    reader.readAsDataURL(file);
  });
}

const FileUploader: FunctionComponent<Props> = ({
  value,
  onChange,
  accept,
  uploadKeyPrefix,
  description,
  validateFile,
  showIcon,
}) => {
  const [loading, setLoading] = useState(false);
  const [file, setFile] = useState(null);
  const [error, setError] = useState(null);
  // const [value, onChange] = useState(value)
  const ref = useRef(null);
  const loadFile = async (event: any) => {
    console.log(event, event.target.files);
    setError(null);
    try {
      if (!event.target.files || event.target.files.length === 0) return;
      setLoading(true);
      await validateFile(event.target.files[0]);
      let url = await getPreSignedURL(event.target.files[0], uploadKeyPrefix);
      setFile(event.target.files[0].name);
      console.log(url);
      onChange(url);
    } catch (e) {
      setError(e);
      console.error(e);
    } finally {
      setLoading(false);
    }
  };
  const onButtonClick = () => {
    if (value) {
      onChange(null);
      setFile(null);
    } else ref.current.click();
  };
  let compLeft;
  if (loading) {
    compLeft = <Spinner />;
  } else if (value) {
    if (showIcon) compLeft = <img height={30} width={30} src={value} />;
    else compLeft = <div className="break-all	">{file}</div>;
  } else {
    compLeft = (
      <div>
        <p className="text-base font-normal text-neutral-400">Choose a file or drag & drop it here</p>
        <p className="text-xs font-normal text-gray-400">{description}</p>
      </div>
    );
  }
  return (
    <div className="rounded-lg bg-white p-[24px]">
      <label
        htmlFor="dropzone-file"
        className="flex cursor-pointer items-center justify-between rounded-lg border border-dashed border-neutral-900 px-[20px] hover:bg-gray-100"
      >
        <div className="flex flex-col items-center justify-center pb-[1.5rem] pt-[1.25rem]">
          {/* <svg className="w-8 h-8 mb-4 text-gray-500 dark:text-gray-400" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 20 16">
              <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 13h3a3 3 0 0 0 0-6h-.025A5.56 5.56 0 0 0 16 6.5 5.5 5.5 0 0 0 5.207 5.021C5.137 5.017 5.071 5 5 5a4 4 0 0 0 0 8h2.167M10 15V6m0 0L8 8m2-2 2 2"/>
          </svg> */}
          {compLeft}
        </div>
        <button
          className={
            'flex h-[45px] w-[135px]	 shrink-0 items-center justify-center rounded-full bg-indigo-700 text-sm text-white'
          }
          onClick={onButtonClick}
        >
          {value ? 'Delete File' : 'Browse File'}
        </button>
        <input ref={ref} onChange={loadFile} accept={accept} id="dropzone-file" type="file" className="hidden" />
      </label>
      {error && <div className="text-red-500">{error.message}</div>}
    </div>
  );
};

export default FileUploader;
