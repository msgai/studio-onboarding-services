import DEFAULT_HEADERS from './setDefaultHeaders';
// import uuid from 'uuid'
const _endpoint = '/client/data/source';
const answerAi = {
  async delete(id:String){
    let response = await fetch(`/api/resources${_endpoint}/${id}` , {
        method: 'DELETE',
        headers: DEFAULT_HEADERS,
      });
      return response.json()
    },
  async getAllSources() {
    let response = await fetch(`/api/resources${_endpoint}/?dataType=KNOWLEDGE_BASE`, {
      headers: DEFAULT_HEADERS,
    });
    return response.json();
  },
  async update(data: any, options: any) {
    let response = await fetch(`/api/resources${_endpoint}`, {
      method: 'PUT',
      body: JSON.stringify(data),
      headers: { ...DEFAULT_HEADERS, ...options },
    });
    return response.json();
  },
  async patchIsInternal({ id, val }: any) {
    let response = await fetch(`/api/resources${_endpoint}/${id}?isInternal=${val}`, {
      method: 'PATCH',
      headers: DEFAULT_HEADERS,
    });
    return response.json();
  },
};
export default answerAi;
