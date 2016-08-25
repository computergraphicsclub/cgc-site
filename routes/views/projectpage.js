var keystone = require('keystone');

exports = module.exports = function(req, res, next){

  var view = new keystone.View(req, res);
  var locals = res.locals;
  var projectID

  locals.section = 'projects';
  locals.filters = {
    slug: req.params.page,
  };
  locals.data = {
    projectpage: [],
    updates: [],
  }


  // Load the project from Project model
	view.on('init', function (next) {

		var projectQuery = keystone.list('Project').model.findOne({
			state: 'published',
			slug: locals.filters.slug,
		})
      .populate('main')
      .populate('additional')
      .populate('document', null, {state: 'published'}) // if !published, do not populate doc
      .populate('members', 'name')
      .populate('codes')
      .populate('tags')

		.exec(function (err, result) {
			locals.data.projectpage = result;
      if( result != null ){ projectID = result._doc._id }
      // console.log("ProjectQuery" + result)
			next(err);
		});
	});

  view.on('init', function (next){

    var updateQuery = keystone.list('Update').model.find({
      state: 'published',
      projects: projectID
    })
      .sort(-'publishedDate')
    .exec(function (err, results) {
			locals.data.updates = results;
      // console.log("UpdateQuery" + results)
			next(err);
		});
  })

  view.render('projectpage');
};
