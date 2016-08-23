var keystone = require('keystone');

exports = module.exports = function (req, res) {

	var view = new keystone.View(req, res);
	var locals = res.locals;

	// locals.section is used to set the currently selected
	// item in the header navigation.
	locals.section = 'members';
  locals.data = {
    board: [],
    faculty: [],
    members: [],
  }

  view.on('init', function(next){

    var membersQuery = keystone.list('Member').paginate({
      page: req.query.page || 1,
      perPage: 30,
    })
      .sort('name')
      .exec(function(err, results){
        locals.data.members = results;
        console.log(results)
        next(err)
      })
  })

	// Render the view
	view.render('members');
};
