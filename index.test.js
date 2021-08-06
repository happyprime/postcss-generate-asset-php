const postcss = require( 'postcss' );
const { join } = require( 'path' );
const { tmpdir } = require( 'os' );
const { readFileSync, writeFileSync, readdirSync, unlinkSync } = require( 'fs' );
const plugin = require( './' );

// Provide a list of temporary CSS files to create and the hash file contents expected from each.
const TEMP_CSS_FILES = {
	'style01.css': {
		css: '.container { font-size: 1rem; }',
		result: `<?php\nreturn array( 'version' => '9158bd9497a56a81c91f5718718eba33' );\n`,
	},
	'style02.css': {
		css: '.container { font-size: 2rem; }',
		result: `<?php\nreturn array( 'version' => 'c8d21f0a71c61120e4abe5e308b89cc1' );\n`,
	}
}

// Generate temporary CSS files to process through the plugin.
beforeEach( () => {
	Object.keys( TEMP_CSS_FILES ).forEach( file => writeFileSync( join( tmpdir(), file ), TEMP_CSS_FILES[file].css ) );
} );

// Clean up temporary CSS files after each test.
afterEach( () => {
	Object.keys( TEMP_CSS_FILES ).forEach( file => unlinkSync( join( tmpdir(), file ) ) );
} );

async function processFile( filePath ) {
	await postcss( [ plugin() ] ).process( readFileSync( filePath ), {
		from: filePath,
		to: filePath,
	} );
}

// Test that files are being generated with the expected contents.
test( 'hash generation', () => {
	const files = readdirSync( tmpdir() ).filter( name => /css$/.test( name ) );

	return Promise.all(
        files.map( file => {
            const filePath = join( tmpdir(), file );

			processFile( filePath );

			expect( TEMP_CSS_FILES[file].result ).toMatch( readFileSync( filePath + '.php' ).toString() );
        })
    );
})
