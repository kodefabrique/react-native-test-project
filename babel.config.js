module.exports = {
  presets: ['module:metro-react-native-babel-preset'],
  plugins: [
    [
      'module-resolver',
      {
        root: ['./app'],
        alias: {
          types: './app/types',
          utils: './app/utils',
          store: './app/store',
          values: './app/values',
          screens: './app/screens',
          widgets: './app/widgets',
          templates: './app/templates',
          router: './app/router',
          styles: './app/styles',
          graphql: './app/graphql',
          logging: './app/logging',
          translation: './app/translation',
          hooks: './app/hooks',
          storage: './app/storage',
          core: './app/core',
          fragments: './app/fragments',
        },
      },
    ],
  ],
};
