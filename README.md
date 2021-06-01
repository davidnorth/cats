## Running the app

Create `.env` in the root and add your thecatapi key.

    `REACT_APP_API_KEY=your_key`

Then:

    `yarn start`

Runs the app in the development mode.<br />
Open [http://localhost:3000](http://localhost:3000) to view it in the browser.


## Implementation notes

My goal was to build the app following current best practices with React and Redux as much as possible in the time available.. For that reason I bootstrapped the app using Redux Toolkit though it would have been fun and a little quicker to build with no dependencies at all, or perhaps just Svelte.

## Improvements

### Automated testing

To test this app properly I would want a full integration test with a mocked version of the cats API. I would personally give that priority over unit tests in an app like this. I like Cypress for this purpose but last time I used it, file upload wasn't supported. Since there were a lot of features to implement and UI bits and pieces to pull together along with the complexities introduced by the API design I decided I'd have to leave this out. 

### Use of API

The API made it necessary, at least as far as I could tell, to implement the vote and favourite feaatures in a sensible and production ready way. That data isn't included with the images. All vote and favourite records had to be fetched first so they could be matched the the corresponding images by image_id. To remove a favourite, you need the favourite_id, not image_id for the endpoint and the image record doesn't have that, and the API doesn't provide a more efficient way to get it. Also, my implementation neglects paginating the vote and favourite results.  Were this a production app, a discussion about a more practical and performant approach for fetching votes and favourites would be needed. 


### Typescript

I decided to use Typescript for the first time here. I used Flow before which is similar but that was some time ago. I expect there'll be room for improvement here.

### Components

There's potential here to extract some generic components, Favourites being one example. That said, making a component generic incurrs an overhead and I think its best to put it off until it becomes necessary. Its a different matter if you're building components for a UI library of some sort which reusability is the goal from the outset.

### CSS and UI

These are a bit rough and ready. It would have been easy to spend a another whole day or more making all of this properly refined. 

