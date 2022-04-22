import { defineConfig, loadEnv /*config使用环境变量*/, UserConfig, ConfigEnv } from 'vite';
import path from 'path';
import vue from '@vitejs/plugin-vue';
import vueJsx from '@vitejs/plugin-vue-jsx';
//HTML 内容插入
import { createHtmlPlugin } from 'vite-plugin-html';
// 自动按需引入ref、reactive等api，包括'vue', "vue-router", "vuex", "@vueuse/core"
import AutoImport from 'unplugin-auto-import/vite';
// 自动按需引入UI库、公共组件等模板组件 默认"/src/components/"下的组件不需要手动导入
import Components from 'unplugin-vue-components/vite';
import { AntDesignVueResolver, ElementPlusResolver } from 'unplugin-vue-components/resolvers';
// 自动按需引入icones图标 @see:https://icones.netlify.app
import Icons from 'unplugin-icons/vite';
import IconsResolver from 'unplugin-icons/resolver';
import { viteMockServe } from 'vite-plugin-mock';

// import styleImport from 'vite-plugin-style-import';
// import viteCompression from 'vite-plugin-compression';

export default defineConfig(({ command, mode }: ConfigEnv): UserConfig => {
  const env = loadEnv(mode, process.cwd());
  const pathSrc = path.resolve(__dirname, 'src');
  let prodMock = true;
  return {
    build: {
      // outDir: "./dist", //打包后的文件目录 默认 dist
      // assetsDir: "assets", //指定生成静态资源的存放路径 默认 assets（相对于 build.outDir）
      // assetsInlineLimit: 4096, //小于此阈值的导入或引用资源将内联为 base64 编码，以避免额外的 http 请求。设置为 0 可以完全禁用此项。 默认 4096
      // sourcemap: false,  //默认 false
      // target: 'es2015',
      rollupOptions: {
        output: {
          assetFileNames: 'css/[name].[hash].css',
          chunkFileNames: 'js/[name].[hash].js',
          entryFileNames: 'js/[name].[hash].js',
        },
      },
    },
    server: {
      host: '0.0.0.0', // 默认为localhost
      port: 3000, // 端口号
      open: true, // 是否自动打开浏览器
      cors: false, // 类型： boolean | CorsOptions 为开发服务器配置 CORS。默认启用并允许任何源
      base: './', // 生产环境路径
      strictPort: true,

      proxy: {
        // 本地开发环境通过代理实现跨域，生产环境使用 nginx 转发
        // '/api': { //代理器中设置/api,项目中请求路径为/api的替换为target
        [env.VITE_APP_BASE_API]: {
          // target: 'http://172.16.22.133/prod-api/', // 后端服务实际地址
          target: 'http://127.0.0.1:3000', // 后端服务实际地址 本机
          changeOrigin: true,
          // rewrite: (path) => path.replace(/^\/api/, '')
          rewrite: path => path.replace(new RegExp('^\\' + [env.VITE_APP_BASE_API]), ''),
        },
      },
    },
    optimizeDeps: {
      // include: ['axios', 'element-plus'] // 引入第三方插件
    },
    // publicDir: './src/assets', //作为静态资源服务的文件夹。该目录中的文件在开发期间在 / 处提供，并在构建期间复制到 outDir 的根目录
    // ssr: {
    //   external: '',
    //   noExternal: '',
    //   target: '',
    // },
    resolve: {
      alias: {
        '@': pathSrc, // 设置 `@` 指向 `src` 目录
        '~@': pathSrc,
        '~components': path.resolve(pathSrc, 'components'),
        '~config': path.resolve(pathSrc, 'config'),
      },
    },
    css: {
      preprocessorOptions: {
        scss: {
          modifyVars: {},
          javascriptEnabled: true,
        },
        // postcss: {},
        modules: {
          scopeBehaviour: 'local',
          // generateScopedName: "[name]__[local]___[hash:base64:5]",
          // hashPrefix: "prefix",
          /**
           * 默认：'camelCaseOnly'
           */
          // localsConvention?: 'camelCase' | 'camelCaseOnly' | 'dashes' | 'dashesOnly'
        },
      },
    },
    plugins: [
      vue({
        include: [/\.vue$/, /\.md$/],
      }),
      vueJsx({
        // options are passed on to @vue/babel-plugin-jsx
        mergeProps: false,
        enableObjectSlots: false,
      }),
      createHtmlPlugin({
        minify: true,
        /**
         * After writing entry here, you will not need to add script tags in `index.html`, the original tags need to be deleted
         * @default src/main.ts
         */
        // entry: "src/main.ts",
        /**
         * If you want to store `index.html` in the specified folder, you can modify it, otherwise no configuration is required
         * @default index.html
         */
        // template: "public/index.html",

        /**
         * Data that needs to be injected into the index.html ejs template
         */
        inject: {
          data: {
            title: env.VITE_APP_TITLE,
            // injectScript: `<script src="./inject.js"></script>`,
          },
        },
      }),
      AutoImport({
        imports: ['vue', 'vue-router', 'vuex', '@vueuse/core'],
        resolvers: [IconsResolver(), AntDesignVueResolver(), ElementPlusResolver()],
        dts: path.resolve(pathSrc, 'auto-imports.d.ts'),
      }),
      Components({
        // 指定组件位置，默认是src/components
        // dirs: ['src/components'],
        // `customComponentsResolvers` has renamed to `resolver`  ui库解析器
        resolvers: [IconsResolver(), AntDesignVueResolver(), ElementPlusResolver()],
        extensions: ['vue', 'jsx', 'tsx'],
        // `globalComponentsDeclaration` has renamed to `dts` 配置文件生成位置
        dts: path.resolve(pathSrc, 'components.d.ts'),
      }),
      Icons({
        autoInstall: true,
        compiler: 'vue3',
      }),
      // styleImport({
      //   // css样式按需加载
      //   libs: [{
      //     libraryName: 'element-plus',
      //     esModule: true,
      //     ensureStyleFile: true,
      //     resolveStyle: name => {
      //       if (name === 'locale') return '';
      //       return `element-plus/lib/theme-chalk/${name}.css`;
      //     },
      //     resolveComponent: name => {
      //       return `element-plus/lib/${name}`;
      //     }
      //   }]
      // }),
      // viteCompression({
      //   // 开启gzip模式
      //   verbose: true,
      //   disable: false,
      //   threshold: 10240,
      //   algorithm: 'gzip',
      //   ext: '.gz'
      // }),
      viteMockServe({
        // default
        mockPath: 'mock',
        localEnabled: command === 'serve',
        prodEnabled: command !== 'serve' && prodMock,
        injectCode: `
       import { setupProdMockServer } from '../mock/_createProdMockServer';
 
       setupProdMockServer();
       `,
      }),
    ],
  };
});
