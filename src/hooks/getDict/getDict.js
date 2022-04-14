import { reactive, onMounted, provide } from "vue";
/**
 * @describtion 统一请求字典数据
 *
 * */

const dictState = reactive({});

async function getDics(interfaceStr, interfaceObject) {
  const { data } = await interfaceObject[interfaceStr]();
  dictState[interfaceStr + "List"] = data || [];
}
/* 传入一个接口名字符数组&&接口对象=>字典响应数据 */
export const useGetDics = (interfaceStrArray = [], interfaceObject = {}) => {
  // onMounted(() => {
  interfaceStrArray.forEach((key) => key&&getDics(key, interfaceObject));
  // });

  return dictState;
};
