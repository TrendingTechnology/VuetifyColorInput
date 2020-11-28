import {terser} from 'rollup-plugin-terser';
import babel from '@rollup/plugin-babel';
import serve from 'rollup-plugin-serve';

import {main} from './package.json';

let plugins = [
	babel({
		babelHelpers: 'bundled',
		presets: ['@babel/preset-env'],
	}),
	terser(),
];

if (process.env.ROLLUP_WATCH) {
	plugins.push(serve({
		contentBase: '',
		openPage: '/demo',
		open: true,
	}));
}

let globals = {
	'vue': 'Vue',
};

export default {
	external: Object.keys(globals),
	input: 'src/index.js',
	plugins,
	output: {
		file: main,
		format: 'umd',
		name: 'VuetifyColorInput',
		globals,
	},
};
