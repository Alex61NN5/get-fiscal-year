import babel from 'rollup-plugin-babel';
import resolve from 'rollup-plugin-node-resolve';
import commonjs from 'rollup-plugin-commonjs';
import { terser } from 'rollup-plugin-terser';
import pkg from './package.json';

export default [
	{
		input: 'src/get-fiscal-year.js',
		output: {
			name: 'GetFiscalYear',
			file: pkg.main,
			format: 'umd'
		},
		plugins: [
			babel({
				exclude: ['/**/node_modules/**']
			}),
			resolve(),
			commonjs(),
			terser()
		]
	},
	{
		input: 'src/get-fiscal-year.js',
		output: {
			name: 'GetFiscalYear',
			file: 'dist/get-fiscal-year.js',
			format: 'umd'
		},
		plugins: [
			babel({
				exclude: ['/**/node_modules/**']
			}),
			resolve(),
			commonjs()
		]
	},
	{
		input: 'src/get-fiscal-year.js',
		output: {
			file: pkg.module,
			format: 'es',
			sourceMap: true
		},
		plugins: [
			babel({
				exclude: ['/**/node_modules/**']
			})
		]
	}
];
