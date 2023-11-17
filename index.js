const fs = require( 'fs' );
const { createHash } = require( 'crypto' );
const json2php = require( 'json2php' );

module.exports = () => {
	return {
		postcssPlugin: 'postcss-generate-asset-php',
		Once( root, { result } ) {
			// Only create a hash file if CSS is being output to a file.
			/* istanbul ignore if */
			if ( undefined === result.opts.to ) {
				return;
			}

			const cssString = root.nodes.toString().replace( /\s+/g, '' );
			const hash = createHash( 'md5' ).update( cssString ).digest( 'hex' );

			const fileData = {
				version: hash,
			};

			const phpString = json2php( JSON.parse( JSON.stringify( fileData ) ) )
				.replace( "('", "( '" ) // WordPress coding standards require space after array opener.
				.replace( "')", "' )" ); // WordPress coding standards require space before array closer.

			const fileString = `<?php\nreturn ${phpString};\n`;

			const fileName = result.opts.to + '.php';

			fs.writeFile( fileName, fileString, () => {} );
		},
	};
};
module.exports.postcss = true;
