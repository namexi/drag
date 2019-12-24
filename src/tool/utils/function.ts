/**
 * Created by Xd on 2019/11/28.
 */

/**
 * 深拷贝
 * @param {*} obj 拷贝对象(object or array)
 * @param {*} cache 缓存数组
 */
export const deepCopy = (obj:any, cache: Array<any> = []) => {
    // typeof [] => 'object'
    // typeof {} => 'object'
    if (obj === null || typeof obj !== "object") {
        return obj;
    }
    // 如果传入的对象与缓存的相等, 则递归结束, 这样防止循环
    /**
     * 类似下面这种
     * var a = {b:1}
     * a.c = a
     */
    const hit: any = cache.filter((c: any) => c.original === obj)[0];
    if (hit) {
        return hit.copy;
    }

    const copy: any = Array.isArray(obj) ? [] : {};
    // 将copy首先放入cache
    cache.push({
        original: obj,
        copy
    });
    Object.keys(obj).forEach(key => {
        copy[key] = deepCopy(obj[key], cache);
    });

    return copy;
};

/**
 * MessageBox
 * @param {confirmButtonText: *,cancelButtonText:*} obj options对象(默认值：confirmButtonText: '确定',confirmButtonText: '取消',)
 * @param String className class样式 字符串
 * @param String 消息内容
 */
export const MessageBox = ($confirm:any,className: string, connect: string, obj: object = {}) => {
    $confirm(`<i class="el-icon-info success"></i>${connect}`, "创建流程", {
        dangerouslyUseHTMLString: true,
        ...obj
    });
};

export const replacepos = (text: string ,start: any,stop: any, replacetext:string) => {
   let mystr:string = text.substring(0, start - 1) + replacetext + text.substring(stop + 1);
    return mystr;
};

/*
*  /one-config/services 替换1个
*  /one-config/models  替换两个
*  /api  替换两个
*
* */
export const findReplacepos = (baseBeginning:string, url:string, classFlag:any,  getLen:any) =>{
    let returnConfig;
    // url=url.toLowerCase();
    const urls:string = url.toLowerCase()
    // classFlag.appidName = classFlag.appidName.toLowerCase();
    // classFlag.serviceId = classFlag.serviceId.toLowerCase();
    if (urls.indexOf(baseBeginning) != -1) {
        // todo 找到替换模板 如何区分是替换1个还是替换2个
        // 获取temp的长度  问题在这里 templat 不一定是 appid
        let findStringTemplen;
        // 获取 类标识的长度
        // const appidName = classFlag.appidName
        const appidNameLen = getLen(classFlag.appidName);
        const serviceIdNameLen = getLen(classFlag.serviceIdName);
        let startIndex;
        //todo findStringTemp 要与类标识精准一致
        // 服务约定判断
        if (urls.toLowerCase().indexOf('/services') !== -1){
            let index= url.lastIndexOf('/services/');
            startIndex = index + getLen('/services/');
            // 替换一个 替换谁？
            if (urls.lastIndexOf(classFlag.serviceIdName) + serviceIdNameLen ===`${baseBeginning}/services/${classFlag.serviceIdName}`.length) {
                findStringTemplen = serviceIdNameLen;
                let endIndex = startIndex + findStringTemplen;
                return returnConfig = {
                    url: replacepos(urls,startIndex,endIndex,`/${classFlag[classFlag.serviceIdName]}`)
                } }
            else if(urls.lastIndexOf(classFlag.appidName) + appidNameLen ===`${baseBeginning}/services/${classFlag.appidName}`.length) {
                console.log(urls,appidNameLen ,`${baseBeginning}/services/${classFlag.appidName}`.length)
                findStringTemplen = appidNameLen;
                let endIndex = startIndex + findStringTemplen;
                let urlLen= findStringTemplen+ getLen('/services/') +baseBeginning.length;
                let returnConfigUrl =  urls.lastIndexOf('?') === urlLen? replacepos(urls,startIndex,endIndex,`/${classFlag[classFlag.appidName]}?`) : (url.length === urlLen? replacepos(url,startIndex,endIndex,`/${classFlag[classFlag.appidName]}`) : replacepos(url,startIndex,endIndex,`/${classFlag[classFlag.appidName]}/`));
                return returnConfig = {
                    url: returnConfigUrl
                }
            }}
        else if (urls.toLowerCase().indexOf('/models') !== -1 && urls.lastIndexOf(`${classFlag.appidName}/${classFlag.serviceIdName}`)!== -1) {
            // 替换两个 替换谁
            let index= url.lastIndexOf('/models/');
            startIndex = index + getLen('/models/');
            findStringTemplen = serviceIdNameLen + appidNameLen + 1 ;
            let urlLen= findStringTemplen+ getLen('/models/') +baseBeginning.length
            let endIndex = startIndex + findStringTemplen;
            let returnConfigUrl =  url.lastIndexOf('?') === urlLen? replacepos(url,startIndex,endIndex,`/${classFlag.appid}/${classFlag.serviceId}?`) : (url.length === urlLen? replacepos(url,startIndex,endIndex,`/${classFlag.appid}/${classFlag.serviceId}`) : replacepos(url,startIndex,endIndex,`/${classFlag.appid}/${classFlag.serviceId}/`))
                 ;
            return returnConfig = {
                url:returnConfigUrl
            }
        }

    }
    return returnConfig
};
