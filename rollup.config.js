export default {
	format: 'umd',
	moduleName: 'angular-basic-modal',
	external: [
		'@angular/core',
		'@angular/common'
	],
	onwarn: ( warning ) => {
		const skip_codes = [
			'THIS_IS_UNDEFINED',
			'MISSING_GLOBAL_NAME'
		];
		if ( skip_codes.indexOf(warning.code) != -1 )
			return;
		console.error(warning);
	}
};

