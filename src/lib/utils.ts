import { clsx, type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';
import * as Excel from 'exceljs'

export function getUserIdFromLocalStorage() {
  try {
    if (localStorage.getItem('user')) {
      return JSON.parse(localStorage.getItem('user'))?.id;
    }
  } catch (error) {
    console.error(error);
  }
}

export function getUserEmailFromLocalStorage() {
  try {
    if (localStorage.getItem('user')) {
      return JSON.parse(localStorage.getItem('user'))?.email;
    }
  } catch (error) {
    console.error(error);
  }
}

export function getCurrentBotId() {
  try {
    if (localStorage.getItem('currentBot')) {
      return JSON.parse(localStorage.getItem('currentBot'))?.id;
    }
  } catch (error) {
    console.error(error);
  }
}
export async function checkApiCompleted(service:Function, retryTime:number, addTimer:Function,setLLMStatus:Function): Promise<any> {
  return new Promise((resolve, reject) => {
    function poll() {
      // Make API call to get status from the service
      service()
        .then((response:any) => {
          const { status } = response.payload;

          if (status === 'IN_PROGRESS') {
            // If status is 'IN_TRAINING', retry after the specified time
            let timer = setTimeout(poll, retryTime);
            setLLMStatus('IN_PROGRESS')
            addTimer(timer);
            console.log('timer pushed')
          } else if (status === 'COMPLETED' || status === 'FAILED') {
            // If status is 'Completed' or 'Failed', resolve the promise with the final status
            resolve({ status, response });
          } else {
            // If status is neither 'IN_TRAINING', 'Completed', nor 'Failed', reject the promise
            reject('Invalid status received');
          }
        })
        .catch((error:any) => {
          // Handle errors during the API call
          reject(error);
        });
    }

    // Start polling
    poll();
  });
}
export function CSVFileReader (fileObj:any, validatorFunc:Function) {
  const fileExt = fileObj.name && fileObj.name.split('.').pop()
  if (fileExt !== 'csv') return false
  const reader = new window.FileReader()
  return new Promise(resolve => {
    reader.onerror = () => {
      reader.abort()
      console.error('Problem parsing input file.')
    }
    reader.onload = async () => {
      try {
        const isValid = validatorFunc(reader.result)
        return resolve(isValid)
      } catch (error) {
        return resolve(false)
      }
    }
    reader.readAsText(fileObj)
  })
}
export function excelFileValuesReader (fileObj:any, validatorFunc:any) {
  const fileExt = fileObj.name && fileObj.name.split('.').pop()
  if (fileExt !== 'xlsx') return false
  const reader = new window.FileReader()
  return new Promise((resolve, reject) => {
    reader.onerror = () => {
      reader.abort()
      console.error('Problem parsing input file.')
    }
    reader.onload = async () => {
      try {
        const values = await readExcel(reader.result)
        const isValid = validatorFunc(values)
        return resolve(isValid)
      } catch (error) {
        return reject(error)
      }
    }
    reader.readAsArrayBuffer(fileObj)
  })
}
export async function readExcel (fileBuffer:any) {
  const workbook = new Excel.Workbook()
  let response
  await workbook.xlsx
    .load(fileBuffer)
    .then((wb:any) => {
      wb.eachSheet((sheet:any) => {
        response = sheet.getSheetValues()
      })
    })
    .catch((error:any) => { response = error })
  console.log(response)
  return response
}

function delay(ms:any) {
  return new Promise(resolve => setTimeout(resolve, ms));
}

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

