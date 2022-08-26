function gen_idkey_url(s) {
    s = s.trim()
    if (!s) return []
    results = s.match(/(\d+)(?:(?::|,)\s*(\d+))?/)
    if (!results) return []
    const idkey_id = results[1]
    const idkey_key = results[2] ? results[2] : ''
    result = []
    // 有key则展示一个idkey监控
    if (idkey_key) {
        result.push({
            title: 'IdKey Monitor',
            description: 'Monitor for ' + results[0],
            url: `https://wemonitor.woa.com/web/weidkeyweb/idkey-view?count=1&datatype=999&dbflag=1&diff_days=1&granularity=-1&idc=all&idkey_id=${idkey_id}&idkey_key=${idkey_key}&ip=&type=server`
        })
    }
    // 展示id的全监控
    result.push({
        title: 'Id Monitor',
        description: 'Monitor for ' + idkey_id,
        url: `https://wemonitor.woa.com/web/weidkeyweb/idkey-view?count=1&datatype=999&dbflag=1&diff_days=1&granularity=-1&idc=all&idkey_id=${idkey_id}&idkey_key=&ip=&type=server`
    })
    // 展示到codesearch的搜291087索
    result.push({
        title: 'Search',
        description: 'Search for ' + results[0],
        url: 'https://codes.woa.com/codesearch/search?q="' + encodeURIComponent(results[0].replace(':', ',')) + '"&defs=&refs=&path=&hist=&type=&project=ac&project=antispam&project=appplatform&project=astragateway&project=astragateway2&project=basic&project=bt&project=comm2&project=dry-basic&project=dry-platform&project=ilink&project=ilinkapplogin&project=ilinkcore&project=ilinkgateway&project=ilinkvoip&project=ilinkvoipgateway&project=imunion&project=imuniongateway&project=kvstore&project=micromsg&project=micromsg2&project=mm3rd&project=mm3rd2&project=mmad&project=mmadgateway&project=mmad_dataprocess_spark&project=mmaegateway&project=mmappengine&project=mmbdgateway&project=mmbiz&project=mmbiz2&project=mmbizgateway&project=mmbizgateway2&project=mmbiz_666&project=mmcomm&project=mmcomm2&project=mmcontrib&project=mmdatagateway&project=mmemoticonopen&project=mmfddatagateway&project=mmfindergateway&project=mmfindermcngateway&project=mmgamecenter&project=mmgamegateway&project=mmgateway&project=mmgog2&project=mmgoggateway&project=mmgoggateway2&project=mmiot&project=mmiotgateway&project=mmlife&project=mmlifegateway&project=mmocbiz&project=mmocbizgateway&project=mmoss&project=mmossgateway&project=mmpay&project=mmpaygateway&project=mmpaygitgateway&project=mmpay_git&project=mmpbkvclient&project=mmproto&project=mmrecgateway&project=mmsearch&project=mmsearch2&project=mmsearchgateway&project=mmsearchgateway2&project=mmspamgateway&project=mmsvrkitagent&project=mmtenpay&project=mmtenpay_bazel&project=mmtestservice&project=mmux&project=mmuxgateway&project=oss&project=phxgateway&project=phxpaxos&project=phxqueue&project=phxqueueapp&project=phxrpc&project=phxsql&project=platform&project=proxy&project=wego&project=wegraphdb&project=wqueue&project=wrpc&project=wxmesh&project=xmail&project=yard&project=yard-online'
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