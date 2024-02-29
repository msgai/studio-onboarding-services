// import Resource from '@/services/resource'
// import http from '@/services/http'
import headers  from './setDefaultHeaders'
const _endpoint = '/llm'
const llm = {
    async getLatestLLM () {
        // return http.get(
        //   this._buildConfig({
        //     url: `/api/resources${_endpoint}/latest`
        //   })
        // )
        let response = await fetch(`/api/resources${_endpoint}/latest`,{
            headers: headers
        })
        return response.json()
      },
      async getLLMListing () {
        // return http.get(
        //   this._buildConfig({
        //     url: `/api/resources${_endpoint}/listing`
        //   })
        // )
        let response = await fetch(`/api/resources${_endpoint}/listing`,{
            headers: headers
        })
        return response.json()
      },
      async getLLMCreationStatus () {
        // return http.get(
        //   this._buildConfig({
        //     url: `/api/resources${_endpoint}/event-status?event=LLM_CREATION`
        //   })
        // )
        let response = await fetch(`/api/resources${_endpoint}/event-status?event=LLM_CREATION`,{
            headers: headers
        })
        return response.json()
      },
      async extractQnAs ({llmId, reqPayload}:any) {
        // return http.put(
        //   this._buildConfig({
        //     url: `/api/resources${_endpoint}/${llmId}?extractQna=true`,
        //     data: reqPayload
        //   })
        // )
        let response = await fetch(`/api/resources${_endpoint}/${llmId}?extractQna=true`,{
            method: 'PUT',
            body: JSON.stringify(reqPayload),
            headers: headers
        })
        return response.json()
      },
      async qnaExtractionStatus () {
        // return http.get(
        //   this._buildConfig({
        //     url: `/api/resources${_endpoint}/event-status?event=ANSWER_AI_TRAINING&action=EXTRACT_QNA`
        //   })
        // )
        let response = await fetch(`/api/resources${_endpoint}/event-status?event=ANSWER_AI_TRAINING&action=EXTRACT_QNA`,{
            headers: headers
        })
        return response.json()
      }
}


// export default new LLM('/llm', ['*'])
export default llm;