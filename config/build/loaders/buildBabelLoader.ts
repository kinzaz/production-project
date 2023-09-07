import babelRemovePropsPlugin from '../../babel/babelRemovePropsPlugin';

export const buildBabelLoader = (isTsx: boolean, isDev: boolean) => {
  const plugins: unknown[] = [
    ['@babel/plugin-transform-typescript', { isTsx }],
    '@babel/plugin-transform-runtime',
  ];

  if (isDev === false) {
    plugins.push([babelRemovePropsPlugin, { props: ['data-testid'] }]);
  }

  return {
    test: isTsx ? /\.(jsx|tsx)$/ : /\.(js|ts)$/,
    exclude: /node_modules/,
    use: {
      loader: 'babel-loader',
      options: {
        cacheDirectory: true,
        presets: ['@babel/preset-env'],
        plugins,
      },
    },
  };
};
