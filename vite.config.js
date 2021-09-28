import { defineConfig } from "vite";
import vue from "@vitejs/plugin-vue";
import vueJsx from "@vitejs/plugin-vue-jsx";
// import styleImport from 'vite-plugin-style-import';
// import viteCompression from 'vite-plugin-compression';

const path = require("path");

//config使用环境变量
import { loadEnv } from "vite";

//HTML 内容插入
import { injectHtml } from "vite-plugin-html";

export default async ({ command, mode }) => {
  const env = loadEnv(mode, process.cwd());
  // const data = await asyncFunction()
  return defineConfig({
    build: {
      // outDir: "./dist", //打包后的文件目录 默认 dist
      // assetsDir: "assets", //指定生成静态资源的存放路径 默认 assets（相对于 build.outDir）
      // assetsInlineLimit: 4096, //小于此阈值的导入或引用资源将内联为 base64 编码，以避免额外的 http 请求。设置为 0 可以完全禁用此项。 默认 4096
      // sourcemap: false,  //默认 false
      // 去除console
      terserOptions: {
        compress: {
          drop_console: true,
          drop_debugger: true,
        },
      },
      rollupOptions: {
        output: {
          assetFileNames: "css/[name].[hash].css",
          chunkFileNames: "js/[name].[hash].js",
          entryFileNames: "js/[name].[hash].js",
        },
      },
    },
    server: {
      host: "0.0.0.0", // 默认为localhost
      port: 3000, // 端口号
      open: true, // 是否自动打开浏览器
      base: "./", // 生产环境路径
      strictPort: true,
      optimizeDeps: {
        // include: ['axios', 'element-plus'] // 引入第三方插件
      },
      proxy: {
        // 本地开发环境通过代理实现跨域，生产环境使用 nginx 转发
        // '/api': { //代理器中设置/api,项目中请求路径为/api的替换为target
        [env.VITE_APP_BASE_API]: {
          // target: 'http://172.16.22.133/prod-api/', // 后端服务实际地址
          target: "http://127.0.0.1:3000", // 后端服务实际地址 本机
          changeOrigin: true,
          // rewrite: (path) => path.replace(/^\/api/, '')
          rewrite: (path) =>
            path.replace(new RegExp("^\\" + [env.VITE_APP_BASE_API]), ""),
        },
      },
    },
    // publicDir: './src/assets', //作为静态资源服务的文件夹。该目录中的文件在开发期间在 / 处提供，并在构建期间复制到 outDir 的根目录
    // ssr: {
    //   external: '',
    //   noExternal: '',
    //   target: '',
    // },
    resolve: {
      alias: {
        "@": path.resolve(__dirname, "src"), // 设置 `@` 指向 `src` 目录
      },
    },
    css: {
      preprocessorOptions: {
        scss: {
          modifyVars: {},
          javascriptEnabled: true,
        },
      },
    },
    plugins: [
      vue({
        include: [/\.vue$/, /\.md$/],
      }),
      injectHtml({
        injectData: {
          title: env.VITE_APP_TITLE,
        },
      }),
      vueJsx({
        // options are passed on to @vue/babel-plugin-jsx
        mergeProps: false,
        enableObjectSlots: false,
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
      // })
    ],
  });
};
