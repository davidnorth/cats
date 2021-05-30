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
  // Fetch all favourites first so we can flag the favourite state on the image
  // later. Thought the include_favourite option would mean this was included in the /images response
  // but it isn't.  I have some thoughts on a more production quality way to handle this.
  return superagent
    .get(BASE_URL + '/favourites')
    .set('X-API-Key', process.env.REACT_APP_API_KEY)
    .then((r) => {

      console.log('favourites response:')
      console.log(r)
      console.log('favs:')
      const favs = r.body.map((f:Favourite) => ({id: f.id, image_id: f.image_id}))
      console.log(favs)

      return superagent
        .get(BASE_URL + '/images')
        .query({limit: 100, include_vote: 1, include_favourite: 1})
        .set('X-API-Key', process.env.REACT_APP_API_KEY)      
        .then((res) => {
          return res.body.map((cat: Cat) => {
            // Assign the matching favourite object to the cat for use in the heart widget
            // We need the favourite id so we can un-favourite
            return Object.assign(cat, {favourite: favs.find((f:Favourite) => f.image_id === cat.id) })
          }) 
        })
    })
}

function uploadCat (file: File) {
  const formData = new FormData();
  formData.append("file", file);

  return superagent
    .post(BASE_URL + '/images/upload')
    .set('X-API-Key', process.env.REACT_APP_API_KEY)
    .send(formData)
}

function makeFavourite (id: string) {
  console.log('make favourite ' + id)
  return superagent
    .post(BASE_URL + '/favourites/')
    .set('X-API-Key', process.env.REACT_APP_API_KEY)
    .send({image_id: id})
}

function removeFavourite (id: string) {
  return superagent
    .post(BASE_URL + '/favourites/')
    .set('X-API-Key', process.env.REACT_APP_API_KEY)
}   

export {uploadCat, getCats, makeFavourite, removeFavourite}

