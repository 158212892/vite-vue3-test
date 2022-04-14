/**
 * @about onlyOffice preview 
 * @createTime 2022/1/19 16:20
 * @author why
 */

import { computed } from 'vue';
import Utils from '../../utils/utils.js'

const useOnlyOffice = () => {
    const typeFileArr: string[] = ['jpg','ceb','png','tmp','zwqd','BJS2'];
    //is preview btn
    const usePreviewDisabled = computed(() => {
        return function (e:string | null):boolean {
			if(e == null) return false;
            let suffix:string = Utils.getSuffix(e);
            if(typeFileArr.includes(suffix)) return true;
            return false;
        };
    });

    return {
        usePreviewDisabled
    };
};

export {
    useOnlyOffice
};