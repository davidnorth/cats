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
  // Fetch all favourites first so we can store the favourite record on the image 
  // so we can show the filled heart for cats that were favourited, and so we have the
  // favourite record id to use when un-favouriting.
  // I don't think this is a production quality solution by any means. It doesn't address 
  // that favourites are paginated so if the user had favourited 1000s of cats it would be
  // unrealistic to fetch all of those just so we can match the favourite to the image. 
  // In a production situation I'd expect that we'd want the images request to be cached 
  // and the user specific data to be fetched after. Then we might have an endpoint that would
  // allow fetching the favourited state for each paginated batch of image ids. Setting the
  // favourite state in the UI could be deffered to make everything more responsive.
  // If we're happy that the list of cats is user specific, then the API might include the favourite 
  // state (and votes) along with the images response. This endpoint has the option 'include_favourite' 
  // and 'include_vote' but their purpose is undocumented and they don't alter the response in any way.
  // I'm mindful that you might prefer an async/await solution here but this way is very natural to me.
  return superagent
    .get(BASE_URL + '/favourites')
    .set('X-API-Key', process.env.REACT_APP_API_KEY)
    .then((r) => {
      const favs = r.body.map((f:Favourite) => ({id: f.id, image_id: f.image_id}))
      return superagent
        .get(BASE_URL + '/images')
        .query({limit: 100, include_vote: 1, include_favourite: 1})
        .set('X-API-Key', process.env.REACT_APP_API_KEY)      
        .then((res) => {
          return res.body.map((cat: Cat) => {
            // Assign the matching favourite object to the cat for use in the heart widget
            // We need the favourite id so we can un-favourite. It isn't enough to just know that the image was favourited
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

// Return promise of newly created Favourite id
function makeFavourite (imageId: string) {
  return superagent
    .post(BASE_URL + '/favourites/')
    .set('X-API-Key', process.env.REACT_APP_API_KEY)
    .send({image_id: imageId})
    .then((res) => res.body.id)
}

function removeFavourite (favouriteId: string) {
  return superagent
    .delete(BASE_URL + '/favourites/' + favouriteId)
    .set('X-API-Key', process.env.REACT_APP_API_KEY)
}   

export {uploadCat, getCats, makeFavourite, removeFavourite}

