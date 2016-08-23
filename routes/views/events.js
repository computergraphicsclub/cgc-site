var keystone = require('keystone');

exports = module.exports = function (req, res) {

  var view = new keystone.View(req, res);
  var locals = res.locals;

  //Init locals
  locals.section = 'events';
  locals.data = {
    upcoming: [],
    past: [],
  };

  // locals.section is used to set the currently selected
	// item in the header navigation.
	locals.section = 'events';

  // Query for Upcoming Events
  view.on('init', function(next) {
    var query = keystone.list('Event').paginate({
      page: req.query.page || 1,
      perPage: 10,
      maxPages: 10,
    })
      .where('state', 'draft')
      .where('timeAndDate').gte(Date.now())
			.sort('timeAndDate')

      query.exec(function (err, results){
        locals.data.upcoming = results;
        next(err);
      })
  })

  // Query for Past Events
  view.on('init', function(next) {
    var query = keystone.list('Event').paginate({
      page: req.query.page || 1,
      perPage: 10,
      maxPages: 10,
      filter: {
        state: 'draft',
      }
    })
      .where('state', 'draft')
      .where('timeAndDate').lt(Date.now())  //
			.sort(-'timeAndDate')

      query.exec(function (err, results){
        locals.data.past = results;
        next(err);
      })
  })

  view.render('events');
}
