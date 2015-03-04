var fs     = require('fs');
var path   = require('path');
var series = require('run-series');
var stylus = require('stylus-renderer');

module.exports = function dmpThemeDefault ($, document, done) {
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
			document.plugins().push(
				require('dmp-table-of-contents'),
				require('dmp-chapter-numbering'),
				require('dmp-relative-paths'),
				require('dmp-hr-to-page-break'),
				require('dmp-page-meta')
			);

			// Run these now
			document.applyPlugins($, [
				require('dmp-plugin-loader')
			], next);
		}
	], done);
};
