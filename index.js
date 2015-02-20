var fs     = require('fs');
var path   = require('path');
var series = require('run-series');
var stylus = require('stylus-renderer');

module.exports = function documarkThemeDefault ($, document, done) {
	series([
		function (next) {
			// Add theme stylesheet
			document.config().pdf.userStyleSheet = 'file://' + path.resolve(__dirname, 'assets/style.css');

			stylus(path.join(__dirname, 'assets/style.styl'), {
				stylusOptions: {
					compress: ! document.config().debug
				}
			}, next);
		},
		function (next) {
			// Run these at the end
			var plugins = document.plugins();

			plugins.push(require('documark-table-of-contents'));
			plugins.push(require('documark-chapter-numbering'));
			plugins.push(require('documark-relative-paths'));
			plugins.push(require('documark-hr-to-page-break'));
			plugins.push(require('documark-page-meta'));

			// Run these now
			document.applyPlugins($, [
				require('documark-plugin-loader')
			], next);
				// .then(function ($) { next(); })
				// .fail(next)
				// ;
		}
	], done);
};
