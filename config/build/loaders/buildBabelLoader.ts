import babelRemovePropsPlugin from '../../babel/babelRemovePropsPlugin';

export const buildBabelLoader = (isTsx: boolean) => ({
  test: isTsx ? /\.(jsx|tsx)$/ : /\.(js|ts)$/,
  exclude: /node_modules/,
  use: {
    loader: 'babel-loader',
    options: {
      cacheDirectory: true,
      presets: ['@babel/preset-env'],
      plugins: [
        ['@babel/plugin-transform-typescript', { isTsx }],
        '@babel/plugin-transform-runtime',
        [babelRemovePropsPlugin, { props: ['data-testid'] }],
      ],
    },
  },
});
