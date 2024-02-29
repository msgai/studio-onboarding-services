import DEFAULT_HEADERS from './setDefaultHeaders';
// import uuid from 'uuid'
const _endpoint = '/client/data/source';
const answerAi = {
    async delete(id:String){
        // )
    let response = await fetch(`/api/resources${_endpoint}/${id}` , {
        method: 'DELETE',
        headers: DEFAULT_HEADERS,
      });
      return response.json()
    },
  async getAnswerAiTrainingStatus() {
    // return http.get(
    //   this._buildConfig({ url: `/api/resources${_endpoint}/training/status` })
    // )
    let response = await fetch(`/api/resources${_endpoint}/training/status`, {
      headers: DEFAULT_HEADERS,
    });
    return response.json();
  },
  async getAllSources() {
    // this._checkIfAllowed('getAll')
    // return http.get(
    //   this._buildConfig({ url: `/api/resources${_endpoint}/?dataType=KNOWLEDGE_BASE` })
    // )
    let response = await fetch(`/api/resources${_endpoint}/?dataType=KNOWLEDGE_BASE`, {
      headers: DEFAULT_HEADERS,
    });
    return response.json();
  },
  async update(data: any, options: any) {
    // this._checkIfAllowed('update')
    // return http.put(
    //   this._buildConfig({ url: `/api/resources${_endpoint}`, data, options })
    // )
    let response = await fetch(`/api/resources${_endpoint}`, {
      method: 'PUT',
      body: JSON.stringify(data),
      headers: { ...DEFAULT_HEADERS, ...options },
    });
    return response.json();
  },
  async trainSources(data: any) {
    // return http.post(
    //   this._buildConfig({ url: `/api/resources${_endpoint}/train`, data })
    // )
    let response = await fetch(`/api/resources${_endpoint}/train`, {
      method: 'POST',
      body: JSON.stringify(data),
      headers: DEFAULT_HEADERS,
    });
    return response.json();
  },
  async patchIsInternal({ id, val }: any) {
    // return http.patch(
    //   this._buildConfig({ url: `/api/resources${_endpoint}/${id}?isInternal=${val}` })
    // )
    let response = await fetch(`/api/resources${_endpoint}/${id}?isInternal=${val}`, {
      method: 'PATCH',
      headers: DEFAULT_HEADERS,
    });
    return response.json();
  },
};
export default answerAi;
