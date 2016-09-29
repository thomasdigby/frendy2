import nodeResolve from 'rollup-plugin-node-resolve'
import babel from 'rollup-plugin-babel'
import uglify from 'rollup-plugin-uglify'

export default {
  entry: 'src/index.js',
  dest: 'dist/index.js',
  format: 'umd',
  moduleName: 'frtabs',
  plugins: [
    nodeResolve(),
    babel({ exclude: 'node_modules/**' }),
    uglify()
  ]
}
