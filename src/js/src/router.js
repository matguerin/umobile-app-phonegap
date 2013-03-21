/*global window:true, _:true, Backbone:true, jQuery:true, umobile:true, config:true, console:true */
(function ($, _, Backbone, umobile, config) {
	'use strict';

	/**
	Houses the Backbone.Router implementation.

	@class RouteManager
	@submodule router
	@namespace router
	**/
	umobile.router.RouteManager = Backbone.Router.extend({
		/**
		Property houses a reference to the ViewManager.

		@property viewManager
		@type Object
		**/
		viewManager: {},

		/**
		Property houses the current view class name.

		@property currentViewClass
		@type String
		**/
		currentViewClass: null,

		/**
		Property houses Backbone routes.

		@property routes
		@type Object
		**/
		routes: {
			'': 'dashboard',
			'login': 'login',
			'modules/*module': 'module'
		},

		/**
		Method initializes the Dashboard view.

		@method dashboard
		**/
		dashboard: function () {
			var dashboard = new umobile.view.DashboardView();
			this.viewManager.show(dashboard);
		},

		/**
		Method initializes the Login view.

		@method login
		**/
		login: function () {
			var login = new umobile.view.LoginView();
			this.viewManager.show(login);
		},

		/**
		Method initializes the Module view.

		@method module
		**/
		module: function () {
			var module = new umobile.view.ModuleView({path: Backbone.history.fragment});
			this.viewManager.show(module);
		},

		/**
		Listens for the route to change. When triggered,
		it updates the class name on the content container
		and broadcasts the changed route.

		@method onRouteChanged
		**/
		onRouteChanged: function (route, routeParam) {
			// Define.
			var className, container, view;

			// Initialize.
			container = $('#content');
			route = route.split(':');
			view = route[1];
			className = ('um-' + view);

			// Remove the class from the container when generated className
			// is different from the stored currentViewClass.
			if (this.currentViewClass && className !== this.currentViewClass) {
				container.removeClass(this.currentViewClass);
			}

			// Add class name to container.
			container.addClass(className);
			this.currentViewClass = className;

			// Broadcast route changed event.
			$.publish('route.changed', {name: view});
		},

		/**
		Method initializes the router.

		@method initialize
		**/
		initialize: function () {
			// Initialize the Page view.
			var page = new umobile.view.Page();

			// Initialize the ViewManager.
			this.viewManager = new umobile.view.ViewManager();

			// Bind to all the routes. When they change, call
			// the onRouteChanged method.
			this.on('all', _.bind(this.onRouteChanged, this));
		}
	});

})(jQuery, _, Backbone, umobile, config);