/**
 * @about 清单审查 批量淡出限价表 接口
 */

import { uploadFileXjbAll } from  "../../api/work/inventoryReview/check.js";

interface EnterType {
  getXjbLink: (arr: Array<string>) => Promise<any>;
}

const useOtherApiExcel = (): EnterType => {
  const getXjbLink = (arr: Array<string>): Promise<any> => {
    return new Promise((resolve, reject) => {
      uploadFileXjbAll(JSON.stringify(arr)).then((res) => {
        resolve(res);
      });
    });
  };
	
  return {
    getXjbLink,
  };
};

export { useOtherApiExcel };
