import Input from '@/components/atoms/Input.tsx';
import React, { useEffect, useState } from 'react';
import { updateStage } from '@/services/bots.ts';
import useFormStore from '@/store/formStore.ts';
import useAppStore from '@/store/appStore.ts';
import answerAi from '@/services/answerAi';
import llm from '@/services/llm';
import Table from './atoms/source-table';
import Spinner from './atoms/spinner';
import { toast } from 'sonner';
import {
  getCurrentBotId,
  getKbKeyPrefix,
  isValidFileSize,
  validateCuratedFile,
  validateCustomFile,
  validateDOC,
} from '@/lib/utils';
import FileUploader from '@/components/atoms/file-uploader';
import {
  SOURCE_TYPE,
  SOURCE_TYPE_LIST,
  SOURCE_TYPE_LIST_DATA,
  STAGE_LIST,
  STAGES,
  subTypeConstants,
} from '@/lib/contants.ts';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/atoms/select';

export default function StageFormSources({ startPolling }: any) {
  const { webUrl, setWebUrl, llmCreationState, setShowLoading, sourceName, setSourceName, sourceUrl, setSourceUrl } =
    useFormStore((state) => state);
  const [loading, setLoading] = useState(true);
  const [sourceType, setSourceType] = useState('');
  const [isChecked, setIsChecked] = useState(false);
  const { setStage, botDetails, sources, setSources } = useAppStore();
  const kbKeyPrefix = getKbKeyPrefix();

  function validateForm() {
    if (!sourceName) {
      throw new Error('Source name is required');
    }
    if (!sourceType) {
      throw new Error('Source type is required');
    }
    if (sourceType === SOURCE_TYPE.WEB_URL) {
      if (!webUrl) {
        throw new Error('Web url is required');
      }
    } else {
      if (!sourceUrl) {
        throw new Error('Source url is required');
      }
    }
  }

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
    const id = toast.loading('Saving...');
    try {
      setShowLoading(true);
      if (llmCreationState !== 'IN_PROGRESS') {
        const payload = { sources: sources.map((source: any) => ({ sourceId: source.sourceId })) };
        await llm.create(payload);
        startPolling();
      }
      await updateStageData();
    } catch (e) {
      toast.error('Something went wrong');
    } finally {
      toast.dismiss(id);
      setShowLoading(false);
    }
  }

  async function onDelete(source: any) {
    try {
      setShowLoading(true);
      await answerAi.delete(source.sourceId);
      setSources(sources.filter((el: any) => el.sourceId !== source.sourceId));
      setShowLoading(false);
    } catch (e) {
      console.error(e);
      setShowLoading(false);
    }
  }

  const validateFile = async (fileObj: any) => {
    console.log(fileObj.size);
    console.log(fileObj.raw);
    let fileExt = fileObj.name && fileObj.name.split('.').pop();
    if (isValidFileSize(fileObj)) {
      switch (sourceType) {
        case subTypeConstants.PDF:
        case subTypeConstants.DOC:
          return validateDOC(fileExt);
        case subTypeConstants.CURATED_FAQ:
          return validateCuratedFile(fileObj, fileExt);
        case subTypeConstants.CUSTOM_KB:
          return validateCustomFile(fileObj, fileExt);
      }
    }
  };

  useEffect(() => {
    setLoading(true);
    answerAi
      .getAllSources()
      .then((res: any) => {
        setSources(res.payload);
      })
      .finally(() => {
        setLoading(false);
      });
  }, []);

  const handleAddSource = async () => {
    setShowLoading(true);
    toast.info('Saving');
    try {
      validateForm();
      let payload = {
        botId: getCurrentBotId(),
        sourceName: sourceName,
        webUrl: sourceType === SOURCE_TYPE.WEB_URL ? webUrl : null,
        fileUrl: sourceType === SOURCE_TYPE.CUSTOM_KB ? sourceUrl : null,
        subType: sourceType,
        sourceType: SOURCE_TYPE_LIST_DATA[sourceType].sourceType,
        isInternal: false,
        properties: {
          enableArchiveUtility: sourceType === SOURCE_TYPE.WEB_URL ? isChecked : false,
        },
      };
      let res = await answerAi.update([payload]);
      setSources([...sources, res?.payload[0]]);
      toast.success('Saved');
      setSourceName('');
      setSourceType('');
      setWebUrl('');
      setSourceUrl('');
      setIsChecked(false);
    } catch (e) {
      if (e.message) {
        toast.error(e.message);
      } else {
        toast.error('Something went wrong');
      }
    } finally {
      setShowLoading(false);
    }
  };

  return (
    <div className={'relative w-full'}>
      {!loading ? <Table data={sources} onDelete={onDelete} /> : <Spinner />}
      <div>
        <div className="mb-[10px] mt-[30px] text-lg font-bold leading-none text-white">Source Name*</div>
        <Input
          value={sourceName}
          onChange={(e) => {
            setSourceName(e.target.value);
          }}
        />
      </div>
      <div>
        <div className="mb-[10px] mt-[30px] text-lg font-bold leading-none text-white">Source Type*</div>
        <Select
          value={sourceType}
          onValueChange={(value) => {
            setSourceType(value);
          }}
        >
          <SelectTrigger className="h-[56px] w-full rounded-lg border border-gray-300 bg-white p-2.5 text-lg leading-none text-gray-500 outline-none focus:border-blue-500 focus:ring-blue-500 ">
            <SelectValue placeholder="Select" />
          </SelectTrigger>
          <SelectContent className={'bg-white'}>
            {SOURCE_TYPE_LIST.map((sourceType) => (
              <SelectItem key={sourceType} value={sourceType} className={'cursor-pointer text-zinc-800'}>
                {SOURCE_TYPE_LIST_DATA[sourceType].label}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>
      {sourceType === SOURCE_TYPE.WEB_URL && (
        <>
          <div className={'mt-[30px]'}>
            <div className="mb-[10px] text-lg font-bold leading-none text-white">Web Url*</div>
            <Input
              placeholder={'What would your chat bot be called?'}
              value={webUrl}
              onChange={(e) => {
                setWebUrl(e.target.value);
              }}
            />
          </div>
          <div className={'mt-[30px] flex items-center gap-[8px]'}>
            <input
              className={'h-[20px] w-[20px]'}
              type={'checkbox'}
              checked={isChecked}
              onChange={(e) => {
                setIsChecked(e.target.checked);
              }}
            />
            <div className="text-base font-normal leading-none text-white">
              Retry with archive.org in case of parsing challenges
            </div>
          </div>
        </>
      )}
      {sourceType === SOURCE_TYPE.CUSTOM_KB && (
        <>
          <div className={'mt-[30px]'}>
            <div className="mb-[10px] text-lg font-bold leading-none text-white">Upload File*</div>
            <FileUploader
              value={sourceUrl}
              description=".CSV, .XLSX containing website data"
              accept=".csv,.xlsx"
              uploadKeyPrefix={kbKeyPrefix}
              validateFile={validateFile}
              onChange={(url: any) => setSourceUrl(url)}
            />
          </div>
        </>
      )}
      <div className={'mt-[30px] flex items-center gap-[8px]'}>
        <button
          className="h-[56px] w-full rounded border border-solid border-gray-300 bg-white text-lg font-bold leading-none text-indigo-600"
          onClick={handleAddSource}
        >
          Add Source
        </button>
      </div>
      <div className={'mt-[50px] flex justify-end'}>
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
