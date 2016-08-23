var keystone = require('keystone');

exports = module.exports = function (req, res) {

	var view = new keystone.View(req, res);
	var locals = res.locals;

	// locals.section is used to set the currently selected
	// item in the header navigation.
	locals.section = 'about';
  locals.data = {
    about: []
  }

  view.on('init', function(next){
    var aboutQuery = keystone.list('About').model.findOne()
        .where('state', 'published')
        .sort('-publishedDate')
        // .limit(1)
			.exec(function(err, result){
				locals.data.about = result;
				console.log(result);
				next(err);
			})
  });

  // Render the view
  view.render('about');
};
