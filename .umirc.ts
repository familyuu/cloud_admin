// https://umijs.org/config/
import os from 'os';
import pageRoutes from './config/router.config';
import webpackPlugin from './config/plugin.config';
import defaultSettings from './src/defaultSettings';
import slash from 'slash2';

const { pwa, primaryColor } = defaultSettings;
const { APP_TYPE, TEST } = process.env;
const plugins = [
  [
    'umi-plugin-react',
    {
      antd: true,
      dva: { hmr: true },
      locale: {
        enable: true, // default false
        default: 'en-US', // default en-US
        baseNavigator: false, // default true, when it is true, will use `navigator.language` overwrite default
      },
      dynamicImport: {
        loadingComponent: './components/PageLoading/index',
        webpackChunkName: true,
        level: 3,
      },

      pwa: pwa
        ? {
            workboxPluginMode: 'InjectManifest',
            workboxOptions: {
              importWorkboxFrom: 'local',
            },
          }
        : false,

      ...(!TEST && os.platform() === 'darwin'
        ? {
            dll: {
              include: ['dva', 'dva/router', 'dva/saga', 'dva/fetch'],
              exclude: ['@babel/runtime', 'netlify-lambda'],
            },
            hardSource: false,
          }
        : {}),
    },
  ],
];

export default {
  outputPath: './dist',
  history: 'hash',
  // exportStatic: true,
  plugins,
  routes: pageRoutes,
  define: {
    APP_TYPE: APP_TYPE || '',
  },
  treeShaking: true,
  targets: {
    ie: 11,
  },
  devtool: APP_TYPE ? 'source-map' : false,
  // https://ant.design/docs/react/customize-theme-cn
  theme: {
    'primary-color': primaryColor,
  },
  devServer: {
    compress: true,
    host: '10.240.217.156',
    port: 8000,
    hot: true,
  },
  proxy: {
    '/api': {
      target: 'http://localhost:3000/',
      changeOrigin: true,
      // pathRewrite: { '^/api': '' },
    },
  },
  ignoreMomentLocale: true,
  lessLoaderOptions: {
    javascriptEnabled: true,
  },
  disableRedirectHoist: true,
  cssLoaderOptions: {
    modules: true,
    getLocalIdent: (context, localIdentName, localName) => {
      if (
        context.resourcePath.includes('node_modules') ||
        context.resourcePath.includes('ant.design.pro.less') ||
        context.resourcePath.includes('global.less')
      ) {
        return localName;
      }
      const match = context.resourcePath.match(/src(.*)/);
      if (match && match[1]) {
        const antdProPath = match[1].replace('.less', '');
        const arr = slash(antdProPath)
          .split('/')
          .map(a => a.replace(/([A-Z])/g, '-$1'))
          .map(a => a.toLowerCase());
        return `antd-pro${arr.join('-')}-${localName}`.replace(/--/g, '-');
      }
      return localName;
    },
  },
  manifest: {
    basePath: '/',
  },

  chainWebpack: webpackPlugin,
};
