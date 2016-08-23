var keystone = require('keystone');

exports = module.exports = function (req, res) {

	var view = new keystone.View(req, res);
	var locals = res.locals;

  // Init locals
  locals.section = 'projects';
  locals.filters = {
		name: req.params.name,
	};
	locals.data = {
		active: [],
		idle: [],
		complete: []
	};

	// locals.section is used to set the currently selected
	// item in the header navigation.
	locals.section = 'projects';

  view.on('init', function(next){

    var q = keystone.list('Project').paginate({
      page: req.query.page || 1,
      perPage: 10,
      maxPages: 10,
      filter: {
        state: 'published',
      }
    }).where('state', 'published')  //only published projects can be seen
			.where('status', 'active')
      .exec(function (err, results){
        locals.data.active = results;
        next(err);
      });

  });

	view.on('init', function(next){

    var q = keystone.list('Project').paginate({
      page: req.query.page || 1,
      perPage: 10,
      maxPages: 10,
      filter: {
        state: 'published',
      }
    }).where('state', 'published')  //only published projects can be seen
			.where('status', 'idle')
      .exec(function (err, results){
        locals.data.idle = results;
        next(err);
      });

  });

	view.on('init', function(next){

    var q = keystone.list('Project').paginate({
      page: req.query.page || 1,
      perPage: 10,
      maxPages: 10,
      filter: {
        state: 'published',
      }
    }).where('state', 'published')  //only published projects can be seen
			.where('status', 'complete')
      .exec(function (err, results){
        locals.data.complete = results;
        next(err);
      });

  });

	// Render the view
	view.render('projects');
};
