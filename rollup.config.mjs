import resolve from '@rollup/plugin-node-resolve';
import typescript from '@rollup/plugin-typescript';
import terser from '@rollup/plugin-terser';

export default {
  input: 'src/white-noise-card.ts',
  output: {
    file: 'dist/white-noise-card.js',
    format: 'es',
  },
  plugins: [
    resolve(),
    typescript(),
    terser(),
  ],
};
