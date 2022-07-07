// ==UserScript==
// @name         Bilibili 啵啵表情包
// @namespace    https://github.com/AS042971/bilibili-bobo
// @supportURL   https://github.com/AS042971/bilibili-bobo/issues
// @license      BSD-3
// @version      0.2.5
// @description  在 Bilibili 表情包中增加啵啵系列
// @author       as042971
// @author       milkiq
// @match        https://*.bilibili.com/*
// @exclude      https://live.bilibili.com/*
// @icon         https://experiments.sparanoid.net/favicons/v2/www.bilibili.com.ico
// @run-at       document-start
// @grant        unsafeWindow
// @grant        GM_getValue
// @grant        GM_setValue
// @grant        GM_xmlhttpRequest
// @connect      raw.githubusercontent.com
// @connect      api.bilibili.com
// ==/UserScript==

(async function() {
    'use strict';
    // 使用沙盒模式只能自己穿透注入xhook，否则xhook无法初始化
    let xhookLoad = new Promise(resolve => {
        if (!unsafeWindow.xhook) {
            const xhookScriptEl = unsafeWindow.document.createElement('script');
            xhookScriptEl.type = 'text/javascript';
            xhookScriptEl.src = 'https://unpkg.com/xhook@1.4.9/dist/xhook.min.js';

            // script 标签加载完成后添加钩子
            xhookScriptEl.onload = () => {
                resolve();
            }
            unsafeWindow.document.head.appendChild(xhookScriptEl);
        } else {
            // 如果其他插件注入了脚本就不用自己插入了
            resolve();
        }
    });

    let resolveEmoteURL = function(url){
        return new Promise(resolve => {
            GM_xmlhttpRequest({
                url: url,
                method : "GET",
                onload : function(data){
                    try {
                        let json = JSON.parse(data.responseText);
                        resolve(json.data.packages)
                    } catch (error) {
                        resolve([]);
                    }
                },
                onerror : function(err) {
                    resolve([]);
                }
            });
        });
    };

    let urls = [
        // 啵啵
        "https://raw.githubusercontent.com/AS042971/bili-emotes/main/%E5%95%B5%E5%95%B5.json",
        // 约战狂三
        "https://api.bilibili.com/x/emote/package?business=reply&ids=123"
    ];
    let resolved_emote_packs = [];
    for (let i in urls) {
        let packs = await resolveEmoteURL(urls[i]);
        resolved_emote_packs = resolved_emote_packs.concat(packs);
    }
    console.log(resolved_emote_packs);

    let emote_dict = {}
    let chn_emote_dict = {}
    let getReplyItem = function(resolved_emote) {
        return {
            "id": resolved_emote.id,
            "package_id": resolved_emote.package_id,
            "state": 0,
            "type": 3,
            "attr": 0,
            "text": resolved_emote.text,
            "url": resolved_emote.url,
            "meta": {
                "size": 2
            },
            "mtime": resolved_emote.mtime,
            "jump_title": resolved_emote.meta.alias
        }
    }
    resolved_emote_packs.forEach(function (pack) {
        pack.emote.forEach(function(emote) {
            let key = emote.text;
            let chn_key = key.replace('[','【').replace(']','】');
            let reply_item = getReplyItem(emote);
            emote_dict[key] = reply_item;
            chn_emote_dict[chn_key] = reply_item;
        })
    });

    let injectDynamicItem = function(item) {
        let nodes = item?.modules?.module_dynamic?.desc?.rich_text_nodes;
        if (nodes) {
            for (let i = 0; i < nodes.length; i++) {
                // 处理【】的问题
                if (nodes[i].text.includes('【')) {
                    let splitResult = nodes[i].text.split(/(【.+?】)/g).filter(str=>{return str != ""});
                    nodes.splice(i,1)
                    for (let idx in splitResult) {
                         if (splitResult[idx] in chn_emote_dict) {
                             let replace = chn_emote_dict[splitResult[idx]];
                             let node = {
                                 "orig_text": replace.text,
                                 "text": replace.text,
                                 "type": "RICH_TEXT_NODE_TYPE_EMOJI",
                                 "emoji": {
                                     "icon_url": replace.url,
                                     "size": 2,
                                     "text": replace.text,
                                     "type": 3
                                 }
                             }
                             nodes.splice(i,0,node);
                             i++;
                         } else {
                             let node = {
                                 "orig_text": splitResult[idx],
                                 "text": splitResult[idx],
                                 "type": "RICH_TEXT_NODE_TYPE_TEXT"
                             }
                             nodes.splice(i,0,node);
                             i++;
                         }
                    }
                } else if (nodes[i].text in emote_dict) {
                    nodes[i].type = 'RICH_TEXT_NODE_TYPE_EMOJI'
                    nodes[i].emoji = {
                        "icon_url": emote_dict[nodes[i].text].url,
                        "size": 2,
                        "text": nodes[i].text,
                        "type": 3
                    }
                }
            }
        }
        if (item?.orig) {
            injectDynamicItem(item.orig);
        }
    }
    let injectReplyItem = function(item) {
        if (!item) return;

        if (item?.content?.message?.includes('【')) {
            if (!('emote' in item.content)) {
                item.content.emote = {};
            }
            for (let emote_name in chn_emote_dict) {
                if (item.content.message.includes(emote_name)) {
                    let replace = chn_emote_dict[emote_name];
                    item.content.message = item.content.message.replace(new RegExp(emote_name,"gm"), " " + replace.text);
                    item.content.emote[replace.text] = replace;
                }
            }
        }
        if ('replies' in item && item.replies) {
            for (let idx in item.replies) {
                injectReplyItem(item.replies[idx]);
            }
        }
    }

    xhookLoad.then(() => {
        // 动态直接通过 Hook XHR 响应完成
        xhook.after(function(request, response) {
            if (request.url.includes('//api.bilibili.com/x/emote/user/panel/web?business=reply')) {
                // 表情包面板
                let response_json = JSON.parse(response.text);
                response_json.data.packages = response_json.data.packages.concat(resolved_emote_packs);
                response.text = JSON.stringify(response_json);
            } else if (request.url.includes('//api.bilibili.com/x/polymer/web-dynamic/v1/detail')){
                // 动态详情页
                let response_json = JSON.parse(response.text);
                injectDynamicItem(response_json?.data?.item);
                response.text = JSON.stringify(response_json);
            } else if (request.url.includes('//api.bilibili.com/x/polymer/web-dynamic/v1/feed/space') || request.url.includes('//api.bilibili.com/x/polymer/web-dynamic/v1/feed/all')) {
                // 主时间线和个人主页
                let response_json = JSON.parse(response.text);
                for (let i in response_json.data.items) {
                    injectDynamicItem(response_json.data.items[i]);
                }
                response.text = JSON.stringify(response_json);
            } else if (request.url.includes('//app.bilibili.com/x/topic/web/details/cards')) {
                // 话题页
                let response_json = JSON.parse(response.text);
                for (let i in response_json.data.topic_card_list.items) {
                    let item = response_json.data.topic_card_list.items[i]
                    if (item.topic_type == 'DYNAMIC') {
                        injectDynamicItem(item.dynamic_card_item);
                    }
                }
                response.text = JSON.stringify(response_json);
            } else if (request.url.includes('//api.bilibili.com/x/v2/reply/main')) {
                // 手机网页用的是XHR...
                let response_json = JSON.parse(response.text);
                if (response_json.data.top_replies) {
                    for (let i in response_json.data.top_replies) {
                        injectReplyItem(response_json.data.top_replies[i]);
                    }
                }
                for (let i in response_json.data.replies) {
                    injectReplyItem(response_json.data.replies[i]);
                }
                response.text = JSON.stringify(response_json);
            } else if (request.url.includes('//api.bilibili.com/x/v2/reply/add')) {
                // 新增评论的 POST 接口，返回值中是处理过的评论内容
                // 拦截这个就可以新增后立刻显示表情包
                let response_json = JSON.parse(response.text);
                injectReplyItem(response_json.data.reply);
                response.text = JSON.stringify(response_json);
            }
        });
    })

    // 添加jsonp钩子，评论数据使用jsonp方式获取，修改jquery的函数进行代理
    // jquery jsonp 原理见 https://www.cnblogs.com/aaronjs/p/3785646.html
    const jsonpMutation = new MutationObserver((mutationList, observer) => {
        for (const mutation of mutationList) {
            if (mutation.type !== 'childList' || mutation.addedNodes.length === 0) continue;

            for (const node of mutation.addedNodes) {
                if (node.localName !== 'script') continue;

                const src = node.src;
                if (src.includes('//api.bilibili.com')) {
                    const matchResult = src.match(/callback=(.*?)&/);
                    console.log(src, matchResult);
                    if (!matchResult) return;
                    const callbackName = matchResult[1];
                    const originFunc = unsafeWindow[callbackName];

                    unsafeWindow[callbackName] = (value) => {
                        if (src.includes('//api.bilibili.com/x/v2/reply')) {
                            for (let i in value.data.replies) {
                                injectReplyItem(value.data.replies[i]);
                            }
                            if (value.data.top_replies) {
                                for (let i in value.data.top_replies) {
                                    injectReplyItem(value.data.top_replies[i]);
                                }
                            }
                            if (value.data.top) {
                                injectReplyItem(value.data.top.upper);
                            }
                            if (value.data.upper) {
                                injectReplyItem(value.data.upper.top);
                            }
                        }

                        originFunc(value);
                    }
                }
            }
        }
    });
    jsonpMutation.observe(unsafeWindow.document.head, { childList: true, subtree: true });

    console.log("啵啵表情包加载完成");
 })();
