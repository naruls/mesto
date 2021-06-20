const presets = [
  ['@babel/env', { // какой пресет использовать
    targets: { // какие версии браузеров поддерживать
      edge: '17',
      ie: '11',
      firefox: '50',
      chrome: '64',
      safari: '11.1'
    },

    // использовать полифиллы для браузеров из свойства target
    // по умолчанию babel использует поллифиллы библиотеки core-js
    useBuiltIns: "entry"
  }]
];

<<<<<<< HEAD
module.exports = { presets }; 
=======
module.exports = { presets }; 
>>>>>>> d19fcbfbc2d9d256d5f0752682866b0deab2c4a1
