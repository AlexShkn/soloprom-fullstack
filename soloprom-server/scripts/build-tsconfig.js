const fs = require('fs');
const IS_DEV_ENV = process.env.NODE_ENV === 'development';

console.log(process.env);

const config = {
  compilerOptions: {
    module: 'commonjs',
    declaration: true,
    removeComments: true,
    emitDecoratorMetadata: true,
    experimentalDecorators: true,
    allowSyntheticDefaultImports: true,
    target: 'ES2021',
    sourceMap: true,
    outDir: './dist',
    rootDir: IS_DEV_ENV ? '' : './src',
    baseUrl: './src',
    incremental: true,
    resolveJsonModule: true,
    esModuleInterop: true,
    skipLibCheck: true,
    strictNullChecks: false,
    noImplicitAny: false,
    strictBindCallApply: false,
    forceConsistentCasingInFileNames: false,
    noFallthroughCasesInSwitch: false,
    jsx: 'react',
    moduleResolution: 'node',
    paths: {
      '@/*': ['./*'],
    },
  },
  include: [
    'src/**/*',
    'add-products.js',
    'update-images.js',
    'image-downloader.ts',
  ],
  exclude: ['node_modules', 'dist'],
};

console.log('generate');

fs.writeFileSync('tsconfig.json', JSON.stringify(config, null, 2));
