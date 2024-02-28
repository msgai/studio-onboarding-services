import React, { FunctionComponent, useEffect, useMemo, useRef, useState } from 'react';
import {getPreSignedURL} from '../../services/upload'
import Spinner from './spinner';
export interface OwnProps {
  value?: string;
  onChange?:Function
}

type Props = OwnProps;
// https://stackoverflow.com/questions/15960508/javascript-async-readasdataurl-multiple-files
  function getBase64(file:any) {
    const reader = new FileReader()
    return new Promise(resolve => {
      reader.onload = ev => {
        resolve(ev.target.result)
      }
      reader.readAsDataURL(file)
    })
  }

const IconUploader: FunctionComponent<Props> = ({ value, onChange }) => {
  const [loading, setLoading] = useState(false)
  // const [file, setFile] = useState(null)
  // const [value, onChange] = useState(value)
  const ref = useRef(null)
  const loadFile = async (event: any) =>{
    console.log(event, event.target.files)
    if(!event.target.files || event.target.files.length === 0) return
    setLoading(true)
    let botId = localStorage.getItem('currentBotId') || '5fe5fd10-c110-4f48-b950-82e85edac81e'
    let url = await getPreSignedURL(event.target.files[0],`CHAT-WIDGET/${botId}/logoImage`)
    console.log(url)
    onChange(url)
    setLoading(false)
  }
  const onButtonClick= ()=>{
    if(value) onChange(null)
    else ref.current.click()
  }
  let compLeft;
  if(loading){
    compLeft = <Spinner/>
  } else if(value){
    compLeft = <img height={50} width={50} src={value}/>
  } else {
    compLeft = <div>
    <p className="text-base font-normal text-neutral-400">Choose a file or drag & drop it here</p>
    <p className="text-xs font-normal text-gray-400">IMG, JPG, JPEG format, up to 2MB</p>
    </div>
  }
  return (<div className="rounded-lg bg-white p-[24px]">
  <label htmlFor="dropzone-file" className="flex items-center cursor-pointer hover:bg-gray-100 justify-between rounded-lg border border-dashed border-neutral-900 px-[20px]">
      <div className="flex flex-col items-center justify-center pt-[1.25rem] pb-[1.5rem]">
          {/* <svg className="w-8 h-8 mb-4 text-gray-500 dark:text-gray-400" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 20 16">
              <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 13h3a3 3 0 0 0 0-6h-.025A5.56 5.56 0 0 0 16 6.5 5.5 5.5 0 0 0 5.207 5.021C5.137 5.017 5.071 5 5 5a4 4 0 0 0 0 8h2.167M10 15V6m0 0L8 8m2-2 2 2"/>
          </svg> */}
          {compLeft}
      </div>
      <button
            className={
              'flex h-[45px] w-[135px] items-center justify-center rounded-full bg-indigo-700 text-sm text-white'
            }
            onClick={onButtonClick}
          >
            {value ? 'Delete File' : 'Browse File'}
          </button>
      <input ref={ref} onChange={loadFile} id="dropzone-file" type="file" className="hidden" />
  </label>
</div> )
};

export default IconUploader;
