const aliasPlugin = [
  [
    require.resolve('babel-plugin-module-resolver'),
    {
      root: ['./src/'],
      alias: {
        globals: './src/globals',
        hooks: './src/hooks',
        interface: './src/interface',
        navigation: './src/navigation',
        screens: './src/screens',
      },
    },
  ],
];


module.exports = {
  presets: ['module:@react-native/babel-preset'],
  env: {
    development: {
      plugins: [...aliasPlugin, 'react-native-reanimated/plugin'],
    },
    production: {
      plugins: [
        ...aliasPlugin,
        'react-native-reanimated/plugin',
      ],
    },
  },
};

