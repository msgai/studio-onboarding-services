import Input from '@/components/atoms/Input.tsx';
import React, { useEffect, useState } from 'react';
import {  updateStage } from '@/services/bots.ts';
import useFormStore from '@/store/formStore.ts';
import useAppStore from '@/store/appStore.ts';
import answerai from '@/services/answerAi';
import llm from '@/services/llm';
import { STAGE_LIST, STAGES,subTypeConstants } from '@/lib/contants.ts';
import Table from './atoms/source-table';
import Spinner from './atoms/spinner';
import { toast } from 'sonner';
import { getCurrentBotId, CSVFileReader, excelFileValuesReader } from '@/lib/utils';
import FileUploader from '@/components/atoms/file-uploader';

export default function StageFormSources({startPolling}:any) {
  const { brandName, setBrandName, aiAgentName, setAiAgentName, llmCreationState } = useFormStore((state) => state);
  const [sources, updateSources] = useState([]);
  const [loading, setLoading] = useState(true);
  const [overlayLoading, setOverlayLoading] = useState(false);
  const { setStage, botDetails } = useAppStore();
  const [payload, setPayload] = useState({
    sourceName: '',
    sourceType: '',
    fileUrl: '',
    webUrl: '',
    subType: subTypeConstants.CUSTOM_KB,
    botId: getCurrentBotId()
  })
  async function updateStageData() {
    const payload = await updateStage({
      stage: STAGES.SOURCES,
      botDetails: botDetails,
    });
    if (payload?.statusCode === 'SUCCESS') {
      setStage(STAGE_LIST[STAGE_LIST.indexOf(STAGES.SOURCES) + 1]);
    }
  }
  async function handleFormSubmit() {
    // const promise = Promise.all([updateChatWidgetData(), updateAiAgentName(aiAgentName), updateToneData()]);
    // await promise;
    const id = toast.loading('Saving...');
    if( llmCreationState!=='IN_PROGRESS') {
      const payload = {sources: sources.map(source => ({sourceId: source.sourceId}))}
      await llm.create(payload)
      startPolling()
    }
    await updateStageData();
    toast.dismiss(id);
    toast.success('Saved');
  }
  async function onDelete(source: any) {
    try {
      setOverlayLoading(true);
      await answerai.delete(source.sourceId);
      updateSources(sources.filter((el) => el.sourceId !== source.sourceId));
      setOverlayLoading(false);
    } catch (e) {
      console.error(e);
      setOverlayLoading(false);
    }
  }
  async function addSource(source: any) {
    try {
       console.log(source)
      setOverlayLoading(true);
      let payload = {    
        "botId": getCurrentBotId(),
        "sourceName": "TESTADD1",
        "webUrl": "https://netomi.com",
        "subType": "WEB_URL",
        "sourceType": "WEB",
        "isInternal":false,
        "properties": {
            "enableArchiveUtility": false
        }
    }
      let res = await answerai.update([payload]);
      updateSources([...sources, res.payload[0]]);
      setOverlayLoading(false);
    } catch (e) {
      console.error(e);
      setOverlayLoading(false);
    }
  }
  const kbKeyPrefix = `SETTINGS/KBANSAI/SOURCES/${getCurrentBotId()}/`;
  const isValidFileSize = (fileObj:any) => {
    if (fileObj.size > 1024 * 1024 * 20 || fileObj.size === 0) {
      throw new Error('File size must be smaller than 20mb')
    }
    return true
  }
  function validateDOC (ext:any) {
    if (ext === 'doc' || ext === 'docx' || ext === 'pdf') {
      return true
    }
    return false
  }
  function validateCustomKBCSV (fileData:any) {
    if(!(fileData.split('\n').length > 0 && /title,body,html_url/gi.test(fileData.split('\n')[0]))) {
      throw new Error('Upload Valid file')
    }
  }
  function validateCustomExcel (fileData:any) {
    console.log(fileData, fileData.length > 1 && /title,body,html_url/gi.test(fileData[1]))
    if(!(fileData.length > 1 && /title,body,html_url/gi.test(fileData[1]))) {
      throw new Error('Upload Valid file')
    }
  }
  function validateCuratedCSV (fileData:any) {
    if(!(fileData.split('\n').length > 0 && /question(?:,display question|\s*),short answer,long answer(?:,source url|\s*)(?:,topic mapped|\s*)(?:,tags|\s*)$/gi.test(fileData.split('\n')[0]))) {
      throw new Error('Upload Valid file')
    }
  }
  function validateCuratedExcel (fileData:any) {
    if(!(fileData.length > 1 && /question(?:,display question|\s*),short answer,long answer(?:,source url|\s*)(?:,topic mapped|\s*)(?:,tags|\s*)$/gi.test(fileData[1]))) {
      throw new Error('Upload Valid file')
    }
  }
  function validateCuratedFile (fileObj:any, fileExt:any) {
    if (fileExt === 'xlsx') return excelFileValuesReader(fileObj, validateCuratedExcel)
    else if (fileExt === 'csv') return CSVFileReader(fileObj, validateCuratedCSV)
    else return false
  }
  function validateCustomFile (fileObj:any, fileExt:any) {
    if (fileExt === 'xlsx') return excelFileValuesReader(fileObj, validateCustomExcel)
    else if (fileExt === 'csv') return CSVFileReader(fileObj, validateCustomKBCSV)
    else return false
  }
  const validateFile = async (fileObj: any) => {
    console.log(fileObj.size);
    console.log(fileObj.raw)
    let fileExt = fileObj.name && fileObj.name.split('.').pop()
    if (isValidFileSize(fileObj)) {
      switch (payload.subType) {
        case subTypeConstants.PDF:
        case subTypeConstants.DOC:
          return validateDOC(fileExt)
        case subTypeConstants.CURATED_FAQ:
          return validateCuratedFile(fileObj, fileExt)
        case subTypeConstants.CUSTOM_KB:
          return validateCustomFile(fileObj, fileExt)
      }
    }
  };
  function onFileUpload(fileUrl:string) {
    setPayload({...payload, fileUrl: fileUrl})
  }
  useEffect(() => {
    setLoading(true);
    answerai
      .getAllSources()
      .then((res: any) => {
        console.log('Answer', res);
        updateSources(res.payload);
      })
      .finally(() => {
        setLoading(false);
      });
  }, []);
  if (loading) return <Spinner />;
  return (
    <div className={'relative w-full'}>
      {overlayLoading && (
        <div className="absolute h-full w-full bg-gray-700 opacity-50	">
          <div className="absolute left-[50%] top-[50%]">
            <Spinner />
          </div>
        </div>
      )}
      <Table data={sources} onDelete={onDelete} />
      <div>
        <div className="mb-[10px] mt-[30px] text-lg font-bold leading-none text-white">Source Name</div>
        <Input
          value={brandName}
          onChange={(e) => {
            setBrandName(e.target.value);
          }}
        />
      </div>
      <div>
        <div className="mb-[10px] mt-[30px] text-lg font-bold leading-none text-white">Source Type</div>
        <select
          id="countries"
          className=" outline-none h-[56px] block w-full rounded-lg border border-gray-300 p-2.5 text-lg leading-none text-gray-500 focus:border-blue-500 focus:ring-blue-500 "
        >
          <option selected>Choose a country</option>
          <option value="US">United States</option>
          <option value="CA">Canada</option>
          <option value="FR">France</option>
          <option value="DE">Germany</option>
        </select>
      </div>
      <div className={'mt-[30px]'}>
        <div className="mb-[10px] text-lg font-bold leading-none text-white">Web Url</div>
        <Input
          placeholder={'What would your chat bot be called?'}
          value={aiAgentName}
          onChange={(e) => {
            setAiAgentName(e.target.value);
          }}
        />
      </div>
      <div className={'mt-[30px]'}>
      <div className="mb-[10px] text-lg font-bold leading-none text-white">Upload File</div>
        <FileUploader value={payload.fileUrl} description=".CSV, .XLSX containing website data" accept='.csv,.xlsx' uploadKeyPrefix={kbKeyPrefix} validateFile={validateFile} onChange={onFileUpload}/>
      </div>
          <button onClick={addSource}> Add Source</button>
          
      <div className={'mr-[90px] mt-[50px] flex justify-end'}>
        <button
          className={
            'flex items-center justify-center rounded-full bg-orange-400 px-[40px]  py-[15px] text-lg text-white'
          }
          onClick={handleFormSubmit}
        >
          Continue
        </button>
      </div>
    </div>
  );
}
