import nodeResolve from 'rollup-plugin-node-resolve'
import babel from 'rollup-plugin-babel'
import uglify from 'rollup-plugin-uglify'

const config = {
  entry: 'src/index.js',
  dest: 'dist/index.js',
  format: 'umd',
  moduleName: 'frtoggle',
  plugins: [
    nodeResolve()
  ]
}

if (!process.env.development) {
  config.plugins = [
    nodeResolve(),
    babel({ exclude: 'node_modules/**' }),
    uglify()
  ]
}

export default config
