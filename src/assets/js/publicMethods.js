// import { format } from "core-js/core/date";

/**
 *替换不存在或空值为指定字符
 */
export function inexistent(val, char) {
    return val ? val : char;
}


export function log(val) {
    console.log(val);
}
export function formatCode(code, prop, label, target = [],type='') {
    const temp = target.filter((item, i, arr) => {
        return item[code] === prop;
    });
    return temp[label];
    switch(type){
        case 'specialty':
            break;
    }
}