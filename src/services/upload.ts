import DEFAULT_HEADERS from '@/services/setDefaultHeaders.ts';

const baseUrl = '/api';

export async function getPreSignedURL(file: any, uploadKeyPrefix: string) {
  try {
    const response = await getPreSignedPostURL(file, uploadKeyPrefix);
    const uploadUrl = response.payload.url;
    const uploadParams = response.payload.fields;
    await uploadFileToS3ByPreSignedURL(file, uploadUrl, uploadParams);

    return `https://${uploadParams.bucket}.s3.amazonaws.com/${uploadParams.key}`;
  } catch (error) {
    // logger.error('Error in fetching pre-signed url', error)
    // this.$emit('direct-s3-upload-failure', error)
    throw error;
  }
}
export async function getPreSignedPostURL(file: File, uploadKeyPrefix: string) {
  try {
    const response = await fetch('/api/upload/get-post-url-all', {
      method: 'POST',
      headers: {
        ...DEFAULT_HEADERS,
      },
      body: JSON.stringify({
        bucket: 'aistudio-cdata',
        preSignedUrl: file.type,
        uploadKeyPrefix,
      }),
      credentials: 'include',
    });
    return response.json();
  } catch (error) {
    console.error(error);
    throw new Error('Upload file failed');
  }
}

export async function putObjectToS3(
  bucket: String,
  uploadKeyPrefix: String,
  contents: String,
  contentType: String,
  user: String,
  type: String,
) {
  try {
    const data = await fetch('/api/upload/put-object', {
      method: 'POST',
      body: JSON.stringify({
        bucket,
        uploadKeyPrefix,
        contents,
        contentType,
        type,
        user,
      }),
      headers: {
        ...DEFAULT_HEADERS,
      },
      credentials: 'include',
    });
    return data;
  } catch (error) {
    throw new Error('Failed to put object in s3');
  }
}
export async function invalidateCache(env: string, path: string) {
  try {
    const data = await fetch('/api/cloudfront/invalidate', {
      method: 'POST',
      body: JSON.stringify({
        env,
        path,
      }),
      headers: {
        ...DEFAULT_HEADERS,
      },
      credentials: 'include',
    });
    return data.json();
  } catch (error) {
    throw new Error('Failed to invalidate cache');
  }
}
// }
export async function uploadFileToS3ByPreSignedURL(file: File, uploadUrl: string, uploadParams: object) {
  const formData = new window.FormData();
  for (const param in uploadParams) {
    formData.append(param, uploadParams[param]);
  }
  formData.append('acl', 'public-read');
  formData.append('Content-Type', file.type);
  formData.append('file', file);
  try {
    const responsePromise = fetch(uploadUrl, {
      method: 'POST',
      body: formData,
    });
    // const responsePromise = axios.post(
    //   uploadUrl,
    //   formData
    // )
    return responsePromise;
  } catch (e) {
    throw new Error('Upload file failed');
  }
}

//  export async function getPreSignedDownloadUrl(fileType: string,uploadKeyPrefix: string){
//     try {
//       const response = await axiosClient.post('/upload/download', {
//         bucket: "heimdall",
//         fileType: fileType,
//         uploadKeyPrefix
//     },{
//       baseURL:baseUrl
//     })
//       return response.data.payload
//     }  catch (e) {
//       throw new Error('Download file failed')
//     }

//   }

// fetch("https://studio-dev1.netomi.com/api/upload/get-post-url-all", {
//   "DEFAULT_HEADERS": {
//     "accept": "application/json, text/plain, */*",
//     "accept-language": "en-GB,en;q=0.9",
//     "content-type": "application/json",
//     "env": "LIVE",
//     "sec-ch-ua": "\"Chromium\";v=\"122\", \"Not(A:Brand\";v=\"24\", \"Google Chrome\";v=\"122\"",
//     "sec-ch-ua-mobile": "?0",
//     "sec-ch-ua-platform": "\"macOS\"",
//     "sec-fetch-dest": "empty",
//     "sec-fetch-mode": "cors",
//     "sec-fetch-site": "same-origin",
//     "x-bot-id": "5fe5fd10-c110-4f48-b950-82e85edac81e",
//     "x-channel": "NETOMI_WEB_WIDGET",
//     "x-service-desk": "NETOMI_WEB_WIDGET",
//     "x-user-id": "0467e4c0-defa-11eb-9d2e-7b4840440f16"
//   },
//   "referrer": "https://studio-dev1.netomi.com/",
//   "referrerPolicy": "origin",
//   "body": "{\"preSignedUrl\":\"image/png\",\"uploadKeyPrefix\":\"CHAT-WIDGET/5fe5fd10-c110-4f48-b950-82e85edac81e/logoImage\"}",
//   "method": "POST",
//   "mode": "cors",
//   "credentials": "include"
// });

// fetch("http://localhost:5173/api/upload/get-post-url-all", {
//   "DEFAULT_HEADERS": {
//     "accept": "*/*",
//     "accept-language": "en-GB,en-US;q=0.9,en;q=0.8",
//     "content-type": "text/plain;charset=UTF-8",
//     "sec-ch-ua": "\"Chromium\";v=\"122\", \"Not(A:Brand\";v=\"24\", \"Google Chrome\";v=\"122\"",
//     "sec-ch-ua-mobile": "?0",
//     "sec-ch-ua-platform": "\"macOS\"",
//     "sec-fetch-dest": "empty",
//     "sec-fetch-mode": "cors",
//     "sec-fetch-site": "same-origin"
//   },
//   "referrer": "http://localhost:5173/",
//   "referrerPolicy": "strict-origin-when-cross-origin",
//   "body": "{\"bucket\":\"aistudio-cdata\",\"preSignedUrl\":\"image/png\",\"uploadKeyPrefix\":\"CHAT-WIDGET/5fe5fd10-c110-4f48-b950-82e85edac81e/logoImage\"}",
//   "method": "POST",
//   "mode": "cors",
//   "credentials": "include"
// });
