var keystone = require('keystone');

exports = module.exports = function(req, res, next){

  var view = new keystone.View(req, res);
  var locals = res.locals;
  var eventID

  locals.section = 'events';
  locals.sec = 'update';
  locals.filters = {
    slug: req.params.page,
    // update: req.params.update
  };
  locals.data = {
    eventpage: [],
    updates: [],
  }


// Load the event from Event model
view.on('init', function (next) {

  var eventQuery = keystone.list('Event').model.findOne({
    state: 'published',
    slug: locals.filters.slug,
  })
    .populate('displayPrimary')
    .populate('displayAuxillary')
    .populate('members', 'name')
    .populate('codes')
    .populate('tags')

  .exec(function (err, result) {
    locals.data.eventpage = result;
    if( result != null ){ eventID = result._doc._id }
    // console.log("ProjectQuery" + result)
    next(err);
  });
});

  view.on('init', function (next){

    var updateQuery = keystone.list('Update').model.find({
      state: 'published',
      events: eventID
    })
      .sort(-'publishedDate')
    .exec(function (err, results) {
			locals.data.updates = results;
      // console.log("UpdateQuery" + results)
			next(err);
		});
  })

  view.render('eventpage');
};
