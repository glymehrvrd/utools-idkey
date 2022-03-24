function gen_idkey_url(s) {
    s = s.trim()
    if (!s) return []
    results = s.match(/(\d+)(?:(?::|,)\s*(\d+))?/)
    if (!results) return []
    const idkey_id = results[1]
    const idkey_key = results[2] ? results[2] : ''
    result = []
    // 有key则展示一个idkey监控
    if(idkey_key){
        result.push({
                    title: results[0],
                    description: results[0],
                    url: `https://wego.weixin.oa.com/wego/weviewweb/idkey-view?type=server&idkey_id=${idkey_id}&idkey_key=${idkey_key}&idc=all&granularity=-1&diff_days=1&dbflag=1&ip=&count=1&datatype=999`
            })
    }
    result.push({
                    title: idkey_id,
                    description: idkey_id,
                    url: `https://wego.weixin.oa.com/wego/weviewweb/idkey-view?type=server&idkey_id=${idkey_id}&idkey_key=&idc=all&granularity=-1&diff_days=1&dbflag=1&ip=&count=1&datatype=999`
            })
    return result
}

window.exports = {
    "idkey": { // 注意：键对应的是 plugin.json 中的 features.code
        mode: "list",  // 列表模式
        args: {
            // 进入插件时调用（可选）
            enter: (action, callbackSetList) => {
                const result = gen_idkey_url(action.payload)
                return callbackSetList(result)
            },
            // 子输入框内容变化时被调用 可选 (未设置则无搜索)
            search: (action, searchWord, callbackSetList) => {
                const result = gen_idkey_url(searchWord)
                return callbackSetList(result)
            },
            // 用户选择列表中某个条目时被调用
            select: (action, itemData, callbackSetList) => {
                window.utools.hideMainWindow()
                const url = itemData.url
                utools.shellOpenExternal(url)
                window.utools.outPlugin()
            },
            // 子输入框为空时的占位符，默认为字符串"搜索"
            placeholder: "搜索"
        }
    }
}