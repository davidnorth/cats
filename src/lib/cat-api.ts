import superagent from 'superagent'

declare global
{
    namespace NodeJS
    {
        export interface ProcessEnv
        {
          REACT_APP_API_KEY: string
        }
    }
}

const BASE_URL = 'https://api.thecatapi.com/v1'

function getCats () {
  return superagent
    .get(BASE_URL + '/images')
    .query({limit: 100, include_vote: 1, include_favourite: 1})
    .set('X-API-Key', process.env.REACT_APP_API_KEY)
}

function uploadCat (file: File) {
  const formData = new FormData();
  formData.append("file", file);

  return superagent
    .post(BASE_URL + '/images/upload')
    .set('X-API-Key', process.env.REACT_APP_API_KEY)
    .send(formData)
}


export {uploadCat, getCats}
