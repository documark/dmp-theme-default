module.exports = function dmpThemeDefault ($, document, done) {
	// Run these at the end
	document.plugins().push(
		require('dmp-chapter-numbering'),
		require('dmp-table-of-contents'),
		require('dmp-relative-paths'),
		require('dmp-hr-to-page-break'),
		require('dmp-page-meta')
	);

	// Run these now
	document.applyPlugins($, [
		require('dmp-style-basic'),
		require('dmp-plugin-loader')
	], done);
};
