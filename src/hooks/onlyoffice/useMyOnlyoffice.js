/**
 * @description onlyOffice hook  请先引入后台配置好的onlyofficeJs后再实例化
 * @author lgb
 * @param {object} option required  onlyoffice配置参数
 * @param {url | string} src  required 后端配置onlyoffice地址
 * @property myOnlyOfficeWrap required onlyOffice容器
 * **/
import { ref, reactive, onMounted, nextTick, h, watch } from "vue";

// 判断js是否加载 并执行回调
export const loadScript = (src, callback) => {
  var script = document.createElement("script"),
    head = document.getElementsByTagName("head")[0];
  script.type = "text/javascript";
  script.charset = "UTF-8";
  script.src = src;
  if (script.addEventListener) {
    script.addEventListener(
      "load",
      function () {
        callback();
      },
      false
    );
  } else if (script.attachEvent) {
    script.attachEvent("onreadystatechange", function () {
      var target = window.event.srcElement;
      if (target.readyState == "loaded") {
        callback();
      }
    });
  }
  head.appendChild(script);
};

/**
 * @description 根据后缀判断文档类型
 * @param {String} 文件后缀
 * */
export function handleDocType(fileType) {
  let docType = "";
  let fileTypesDoc = [
    "doc",
    "docm",
    "docx",
    "dot",
    "dotm",
    "dotx",
    "epub",
    "fodt",
    "htm",
    "html",
    "mht",
    "odt",
    "ott",
    "pdf",
    "rtf",
    "txt",
    "djvu",
    "xps",
  ];
  let fileTypesCsv = [
    "csv",
    "fods",
    "ods",
    "ots",
    "xls",
    "xlsm",
    "xlsx",
    "xlt",
    "xltm",
    "xltx",
  ];
  let fileTypesPPt = [
    "fodp",
    "odp",
    "otp",
    "pot",
    "potm",
    "potx",
    "pps",
    "ppsm",
    "ppsx",
    "ppt",
    "pptm",
    "pptx",
  ];
  if (fileTypesDoc.includes(fileType)) {
    docType = "word";
  }
  if (fileTypesCsv.includes(fileType)) {
    docType = "cell";
  }
  if (fileTypesPPt.includes(fileType)) {
    docType = "slide";
  }
  return docType;
}
/*onlyOffice容器*/
export const myOnlyOfficeWrap = h("div", {
  id: "monitorOffice",
});
export const myOnlyoffice = (option, src, callback) => {
  // const option = reactive(option1);
  let docEditor = ref(null);
  let doctype;

  const setEditor = (option) => {
    doctype = handleDocType(option.fileType);
    // office配置参数
    let config = {
      document: {
        fileType: option.fileType,
        key: option.key,
        title: option.title,
        permissions: {
          comment: false,
          download: false,
          modifyContentControl: true,
          modifyFilter: true,
          print: false,
          edit: option.edit, //是否可以编辑: 只能查看，传false
          // "fillForms": true,//是否可以填写表格，如果将mode参数设置为edit，则填写表单仅对文档编辑器可用。 默认值与edit或review参数的值一致。
          // "review": true //跟踪变化
        },
        url: option.url,
      },

      documentType: doctype,
      editorConfig: {
        callbackUrl: option.callbackUrl, //"编辑word后保存时回调的地址，这个api需要自己写了，将编辑后的文件通过这个api保存到自己想要的位置
        //语言设置
        lang: "zh-CN",
        location: "zh-CN",
        customization: {
          autosave: false, //是否自动保存
          chat: false,
          forcesave: true, // true 表示强制文件保存请求添加到回调处理程序
          feedback: {
            visible: false, // 隐藏反馈按钮
          },
          comments: false,
          help: false,
          hideRightMenu: true, //定义在第一次加载时是显示还是隐藏右侧菜单。 默认值为false
          logo: {
            image: "https://file.iviewui.com/icon/viewlogo.png",
            imageEmbedded: "https://file.iviewui.com/icon/viewlogo.png",
          },
          spellcheck: false, //拼写检查
        },
      },
      width: "100%",
      height: "100%",
    };
    console.log(config);
    docEditor.value = new DocsAPI.DocEditor("monitorOffice", config);
  };

  watch(
    () => option,
    (n, o) => {
      if (n.url) {
        loadScript(src, () => setEditor(option));
      }
    },
    { deep: true, immediate: true }
  );

  return /*onlyOffice实例*/ docEditor;
};
