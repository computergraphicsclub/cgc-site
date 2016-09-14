var keystone = require('keystone');
var middleware = require('./middleware');
var importRoutes = keystone.importer(__dirname);

// Common Middleware
keystone.pre('routes', middleware.initLocals);
keystone.pre('render', middleware.flashMessages);

// Import Route Controllers
var routes = {
	views: importRoutes('./views'),
};

// Setup Route Bindings
exports = module.exports = function (app) {
	// Views
	app.get('/', routes.views.index);
	// app.get('/gallery', routes.views.gallery);
	// app.all('/contact', routes.views.contact);
	// app.get('/about', routes.views.about);
	// app.get('/members', routes.views.members);
	// app.get('/projects', routes.views.projects);
	// app.get('/projects/:page', routes.views.projectpage);
	// app.get('/projects/:page/documentation', routes.views.documents);
	// app.get('/events', routes.views.events);
	// app.get('/events/:page', routes.views.eventpage);
	app.get('/three', routes.views.three);
};
