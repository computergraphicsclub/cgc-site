var keystone = require('keystone');

exports = module.exports = function (req, res) {

	var view = new keystone.View(req, res);
	var locals = res.locals;

	// locals.section is used to set the currently selected
	// item in the header navigation.
	locals.section = 'projects';
	locals.filters = {
    page: req.params.page,
  };
  locals.data = {
    pages: [],
  }

  // load documentation
	view.on('init', function (next) {

		var projectQuery = keystone.list('Projects').model.findOne({
			state: 'published',
			slug: locals.filters.page,
		})
		.populate('doc', null, {state: 'published'}) // if !published, do not populate doc

		//load doc seperately
		projectQuery.exec(function (err, result) {
			locals.data.page = result;
			console.log(result);
			next(err);
		});
	});


	// Render the view
	view.render('documentation');
};
