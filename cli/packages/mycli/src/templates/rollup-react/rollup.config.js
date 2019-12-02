import nodeResolve from 'rollup-plugin-node-resolve';
import commonjs from 'rollup-plugin-commonjs';
import livereload from 'rollup-plugin-livereload';
import postcss from 'rollup-plugin-postcss';
import typescript from 'rollup-plugin-typescript';
import replace from 'rollup-plugin-replace';

const isProduction = !process.env.ROLLUP_WATCH;

export default (async () => ({
  input: 'src/index.tsx',
  output: {
    sourcemap: true,
    format: 'iife',
    name: 'app',
    file: 'public/build/bundle.js'
  },
  plugins: [
    nodeResolve({ browser: true }),
    typescript({ module: 'CommonJS' }),
    commonjs({ extensions: ['.js', '.ts', '.tsx'] }), // the ".ts" extension is required
    replace({
      'process.env.NODE_ENV': JSON.stringify('production')
    }),
    postcss({
      config: {
        path: './postcss.config.js'
      },
      extensions: ['.css'],
      extract: true,
      minimize: isProduction
      // modules: true,
    }),
    !isProduction && serve(),
    !isProduction && livereload('public'),
    isProduction && (await import('rollup-plugin-terser')).terser()
  ],
  watch: {
    clearScreen: false
  }
}))();

function serve() {
  let started = false;

  return {
    writeBundle() {
      if (!started) {
        started = true;

        require('child_process').spawn('npm', ['run', 'serve', '--', '--dev'], {
          stdio: ['ignore', 'inherit', 'inherit'],
          shell: true
        });
      }
    }
  };
}
