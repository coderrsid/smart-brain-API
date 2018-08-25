const Clarifai = require('clarifai');

const app = new Clarifai.App({
  apiKey: 'ae0d1604884145208c528fb6650115ea'
});

const handleApiCall = (req, res) => {
	app.models
      .predict(Clarifai.FACE_DETECT_MODEL, req.body.input)
      .then(data => res.json(data))
      .catch(err => res.status(400).json('unable to fetch api call'));
}

const handleImage = (req, res, db) => {

	const { id } = req.body;

	db('users').where('id', '=', id)
	 .increment('entries',1)
	  .returning('entries')
	   .then(entries => {
	   	 res.json(entries[0]);
	   }).catch(err => {
	   	 res.status(400).json('unable to get user');
	   });

}

module.exports = {
	handleImage: handleImage,
	handleApiCall: handleApiCall

} 	   