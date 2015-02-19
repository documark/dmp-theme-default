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
			document.applyPlugins($, [
				require('documark-plugin-loader'),
				require('documark-page-meta'),
				require('documark-table-of-contents'),
				require('documark-chapter-numbering'),
				require('documark-relative-paths'),
				require('documark-hr-to-page-break')
			], next);
				// .then(function ($) { next(); })
				// .fail(next)
				// ;
		}
	], done);
};
