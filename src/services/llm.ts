import DEFAULT_HEADERS from './setDefaultHeaders';
const _endpoint = '/llm';
const llm = {
  async create (data:any) {
    let response = await fetch(`/api/resources${_endpoint}`, {
      method:'POST',
      body: JSON.stringify(data),
      headers: DEFAULT_HEADERS,
    });
    return response.json();
  },
  async getLatestLLM() {
    let response = await fetch(`/api/resources${_endpoint}/latest`, {
      headers: DEFAULT_HEADERS,
    });
    return response.json();
  },
  async getLLMListing() {
    let response = await fetch(`/api/resources${_endpoint}/listing`, {
      headers: DEFAULT_HEADERS,
    });
    return response.json();
  },
  async getLLMCreationStatus() {
    let response = await fetch(`/api/resources${_endpoint}/event-status?event=LLM_CREATION`, {
      headers: DEFAULT_HEADERS,
    });
    return response.json();
  },
  async extractQnAs({ llmId, reqPayload }: any) {
    let response = await fetch(`/api/resources${_endpoint}/${llmId}?extractQna=true`, {
      method: 'PUT',
      body: JSON.stringify(reqPayload),
      headers: DEFAULT_HEADERS,
    });
    return response.json();
  },
  async qnaExtractionStatus() {
    let response = await fetch(`/api/resources${_endpoint}/event-status?event=ANSWER_AI_TRAINING&action=EXTRACT_QNA`, {
      headers: DEFAULT_HEADERS,
    });
    return response.json();
  },
};

export default llm;
