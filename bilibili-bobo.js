// ==UserScript==
// @name         Bilibili 啵啵表情包
// @namespace    https://github.com/AS042971/bilibili-bobo
// @supportURL   https://github.com/AS042971/bilibili-bobo/issues
// @license      BSD-3
// @version      0.2.3
// @description  在 Bilibili 表情包中增加啵啵系列
// @author       as042971
// @match        https://*.bilibili.com/*
// @exclude      https://live.bilibili.com/*
// @icon         https://experiments.sparanoid.net/favicons/v2/www.bilibili.com.ico
// @require      https://unpkg.com/xhook@1.4.9/dist/xhook.min.js
// @run-at       document-start
// @grant        none
// ==/UserScript==

(function() {
    'use strict';
    let emote_source = [
        // 来自 @风罗4个圈儿
        // https://t.bilibili.com/676767798070870018
        [3333111, "凑紫楠", "https://i0.hdslb.com/bfs/new_dyn/e7fb58dae8651b78666a97a964e394245858138.png"],
        [3333112, "叫我美女宝", "https://i0.hdslb.com/bfs/new_dyn/e25201330974e4227009a588b4861cdd5858138.png"],
        // https://t.bilibili.com/677505501543530521
        [3333113, "一正丨", "https://i0.hdslb.com/bfs/album/6c4402cd7de9737e666970f6299e61f5806bbf73.jpg"],
        [3333114, "大傻呗", "https://i0.hdslb.com/bfs/album/d60f6a9c5bc4a109a72aaa610525e3bae2e872bf.jpg"],
        [3333115, "你说谁", "https://i0.hdslb.com/bfs/album/58ac841450aa4da91f596f50cceb1fc893f5e16a.jpg"],
        [3333116, "你说谁唐", "https://i0.hdslb.com/bfs/album/51e6222e60a5c53fffa7259a6d1e26593791ee6f.jpg"],
        [3333117, "别急", "https://i0.hdslb.com/bfs/new_dyn/c1aa8cd73f9857e5545d38c1c98355f85858138.png"],

        // 来自 @爱茉-Merry-
        // https://t.bilibili.com/677805689726304279
        [3333211, "吃瓜", "https://i0.hdslb.com/bfs/new_dyn/bdd4c8815ef2c491c935d06c5eb36cc1173530952.png"],
        [3333212, "别在这理发店", "https://i0.hdslb.com/bfs/new_dyn/5e06547caaf3d72d0d54ace1bb26776c173530952.png"],
        [3333213, "要牛奶钱", "https://i0.hdslb.com/bfs/new_dyn/8457f7cb02d9a7f57db13537be0140d5173530952.png"],
        [3333214, "大傻呗2", "https://i0.hdslb.com/bfs/new_dyn/622049f688365262102f6b7ec084fd4d173530952.png"],
        [3333215, "绿码", "https://i0.hdslb.com/bfs/new_dyn/a4ff8b3a33852683392a4896adf7e93a173530952.png"],
        [3333216, "熬夜啵比", "https://i0.hdslb.com/bfs/new_dyn/c363244428dcbe1f21b71489b01e3949173530952.png"],
        [3333217, "喝涮锅水", "https://i0.hdslb.com/bfs/new_dyn/32f960833820746725d72898a29efd3d173530952.png"],
        [3333218, "结婚", "https://i0.hdslb.com/bfs/new_dyn/86686f3cbfa089027a20ab3029803db0173530952.png"],
        [3333219, "结婚2", "https://i0.hdslb.com/bfs/new_dyn/2d3f4f0c3a1a2489e72257959ac34ae8173530952.png"],

        // 来自 @卡古拉的醋昆布e
        // https://t.bilibili.com/675526380607242246
        [3333311, "可爱滴捏", "https://i0.hdslb.com/bfs/album/98de968a6274f9cb14c9aaade94c1a0d07d415b4.jpg"],

        // 来自 @玉桂狗美图分享bot
        // https://t.bilibili.com/665015380203274241
        [3333411, "吐舌1", "https://i0.hdslb.com/bfs/album/e4abe1c249b67f33a0064075bd0ea00b589769ea.jpg"],
        [3333412, "吐舌2", "https://i0.hdslb.com/bfs/album/723e1aee265863b491cf30d77c9b3f6c5aef2c0b.jpg"],
        [3333413, "吐舌3", "https://i0.hdslb.com/bfs/album/c6cdd070d77d2eea270f62e0ffa1e02068171930.jpg"],
        [3333414, "笑死", "https://i0.hdslb.com/bfs/album/84b6b70cdcc103d678d1f31d436df26c834748f8.jpg"],
        [3333415, "哭哭", "https://i0.hdslb.com/bfs/album/954cbdeb0712fc119e1184242b5396dd9069dd22.jpg"],
        [3333416, "晕", "https://i0.hdslb.com/bfs/album/fa4b087cd7ddadcb6112a179391d9ef384522257.jpg"],
        [3333417, "大小眼", "https://i0.hdslb.com/bfs/album/6a8e897a75f6a908ee7af054a6eeedd9ce7071c0.jpg"],
        [3333418, "安逸", "https://i0.hdslb.com/bfs/album/9297ea482b101cb19e0c91cddfaa884618491276.jpg"],
        [3333419, "失去高光", "https://i0.hdslb.com/bfs/album/9f35464759d59ac26ee0d8410260ebe57b60d855.jpg"],
        [3333421, "哼", "https://i0.hdslb.com/bfs/album/a535ba2ee900ff47334a44cd243d32d3ee28a829.jpg"],
        [3333422, "失败了", "https://i0.hdslb.com/bfs/album/a00e1b34b0079887fd37eba520693f59ba08b116.jpg"],
        [3333423, "委屈", "https://i0.hdslb.com/bfs/album/6e34c617292499da20f82a8b09364124a03eaf57.jpg"],
        [3333424, "诶？", "https://i0.hdslb.com/bfs/album/6098e9a0b6acd435ec71da48a243dae94eda4c42.jpg"],
        [3333425, "还不错嘛", "https://i0.hdslb.com/bfs/album/ac8e96351d7bf58936d77266db38edf8d723b47b.jpg"],
        [3333426, "可爱", "https://i0.hdslb.com/bfs/album/ec19639cca79d73895da936850981769c2fa48f3.jpg"],
        [3333427, "饿饿", "https://i0.hdslb.com/bfs/album/94422b4d3ae81e84ddb82f8439ef773cbdd8e709.jpg"],
        [3333428, "星星眼", "https://i0.hdslb.com/bfs/album/4e522af3fe0682d23bcbad98a01234220585418b.jpg"],
        [3333429, "嘻嘻", "https://i0.hdslb.com/bfs/album/52797832ae62644abcb5a246d547c89e5ff6c2cf.jpg"],
        [3333431, "别急", "https://i0.hdslb.com/bfs/album/a543e79390f7ab501d1a8610fb9508e2045140c9.jpg"],
        [3333432, "呃呃", "https://i0.hdslb.com/bfs/album/800cbf45317f0b4466b674c1d98d8bc7fb92152f.jpg"],
        [3333433, "要哭了", "https://i0.hdslb.com/bfs/album/90b5b2d1c3c99056a1b12cc4f885b027ac405a40.jpg"],
        [3333434, "微笑", "https://i0.hdslb.com/bfs/album/5a9b5cde55216d1a2028b47c64f72403f8bf39c6.jpg"],

        // 来自 @玉桂狗美图分享bot
        // https://t.bilibili.com/678266565489066008
        [3333441, "31", "https://i0.hdslb.com/bfs/new_dyn/1da0233090730f5212a36a86014ad1fe28020311.png"],
        [3333442, "呜呜", "https://i0.hdslb.com/bfs/new_dyn/8eefe811b1f4f06c6e6186d0f1c5816628020311.png"],
        [3333443, "耶", "https://i0.hdslb.com/bfs/new_dyn/026d0db9739486319b527353695e94ed28020311.png"],
        [3333444, "害羞", "https://i0.hdslb.com/bfs/new_dyn/7c4e948b0bb51f3495db4562935391dd28020311.png"],

        // 来自 @原来是小瘪终极
        // https://t.bilibili.com/677009063564804096
        [3333511, "飞！", "https://i0.hdslb.com/bfs/album/232079a3a2135966a4182aacc6744dbee9a3454d.jpg"],

        // 来自 @馒头卡今天吃什么
        // https://t.bilibili.com/667973375719636996
        [3333611, "啵叽王子", "https://i0.hdslb.com/bfs/new_dyn/37f5e9021dfdc7b7ed20cd4aac7a260b35645362.png"],

        // 来自 @四等双足多用途北极熊
        // https://t.bilibili.com/677933357627080774
        [3333711, "玉米肠", "https://i0.hdslb.com/bfs/new_dyn/652bd99b8073860cb21b5b111672003f1648242323.png"],
        [3333712, "哇库哇库", "https://i0.hdslb.com/bfs/new_dyn/a81c1ac0892b4d383758ef6e0d8dac821648242323.png"],
        [3333713, "可爱捏", "https://i0.hdslb.com/bfs/new_dyn/8be8ac2255438b617cbd6525c87382521648242323.png"],
        [3333714, "哭哭2", "https://i0.hdslb.com/bfs/new_dyn/5c85e9782af7ccdbd8541835830189b91648242323.png"],

        // 来自 @啵啵XXXIX
        // https://t.bilibili.com/678369275334885380
        [3333811, "天才上手", "https://i0.hdslb.com/bfs/album/9792ac4abc71af21b31f0c52976cff6a0da1040c.jpg"],

        // 来自 @风罗4个圈儿
        // https://t.bilibili.com/668646710612852743
        [3333191, "桂物敬礼", "https://i0.hdslb.com/bfs/album/f8f8de3ef0b36b69fbff630a30ac33aee1fdfc96.png"],

        // 来自 @爱茉-Merry-
        // https://t.bilibili.com/676773935585427481
        [3333291, "桂物mua", "https://i0.hdslb.com/bfs/album/bb3613eabd73892f0a2e31f4596cb2a37980b9bb.png"],
        [3333292, "桂物啵啵", "https://i0.hdslb.com/bfs/album/29d7a0b905556fe5a365e4b62a15024ccf4654ee.png"],
        [3333293, "桂物抱抱", "https://i0.hdslb.com/bfs/album/187fbc36bbf5efb168932a5591a120cdb840dd1d.png"],
    ]

    let getEmote = function(arr) {
        return {
                "id": arr[0],
                "package_id": 3333,
                "text": "[啵啵_" + arr[1] + "]",
                "url": arr[2],
                "mtime": 1654321000,
                "type": 3,
                "attr": 0,
                "meta": {
                    "size": 2,
                    "suggest": [
                        ""
                    ],
                    "alias": arr[1]
                },
                "flags": {
                    "unlocked": false
                },
                "activity": null
            }
    }
    let getReplyEmote = function(arr) {
        return {
            "id": arr[0],
            "package_id": 3333,
            "state": 0,
            "type": 3,
            "attr": 0,
            "text": "[啵啵_" + arr[1] + "]",
            "url": arr[2],
            "meta": {
                "size": 2
            },
            "mtime": 1654321000,
            "jump_title": arr[1]
        }
    }
    let bobo = {
        "id": 3333,
        "text": "啵啵 (来自 @风罗4个圈儿, @爱茉-Merry-, @卡古拉的醋昆布e, @玉桂狗美图分享bot, @原来是小瘪终极, @馒头卡今天吃什么, @四等双足多用途北极熊, @啵啵XXXIX)",
        "url": "https://i0.hdslb.com/bfs/new_dyn/3e1656dd6dd1255f65fb91389dd73f775858138.png",
        "mtime": 1654321000,
        "type": 3,
        "attr": 28,
        "meta": {
            "size": 2,
            "item_id": 3333,
            "item_url": "https://www.bilibili.com",
            "asset_id": 333333333
        },
        "emote":  emote_source.map(getEmote),
        "flags": {
            "added": true
        }
    }

    let emote_dict = {}
    let chn_emote_dict = {}
    let reply_emote_dict = {}
    emote_source.forEach(function (arr){
        emote_dict["[啵啵_" + arr[1] + "]"] = arr[2];
        chn_emote_dict["【啵啵_" + arr[1] + "】"] = ["[啵啵_" + arr[1] + "]", arr[2]];
        reply_emote_dict["【啵啵_" + arr[1] + "】"] = ["[啵啵_" + arr[1] + "]", getReplyEmote(arr)];
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
                                 "orig_text": replace[0],
                                 "text": replace[0],
                                 "type": "RICH_TEXT_NODE_TYPE_EMOJI",
                                 "emoji": {
                                     "icon_url": replace[1],
                                     "size": 2,
                                     "text": replace[0],
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
                        "icon_url": emote_dict[nodes[i].text],
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
        if (item?.content?.message?.includes('【')) {
            if (!('emote' in item.content)) {
                item.content.emote = {};
            }
            for (let emote_name in reply_emote_dict) {
                if (item.content.message.includes(emote_name)) {
                    let replace = reply_emote_dict[emote_name];
                    item.content.message = item.content.message.replace(new RegExp(emote_name,"gm"), " "+replace[0]);
                    item.content.emote[replace[0]] = replace[1];
                }
            }
        }
        if ('replies' in item) {
            for (let idx in item.replies) {
                injectReplyItem(item.replies[idx]);
            }
        }
    }

    // 动态直接通过 Hook XHR 响应完成
    xhook.after(function(request, response) {
        if (request.url.includes('//api.bilibili.com/x/emote/user/panel/web?business=reply')) {
            // 表情包面板
            let response_json = JSON.parse(response.text);
            response_json.data.packages.push(bobo);
            response.text = JSON.stringify(response_json);
        } else if (request.url.includes('//api.bilibili.com/x/polymer/web-dynamic/v1/detail')){
            // 动态详情页
            let response_json = JSON.parse(response.text);
            injectDynamicItem(response_json.data.item);
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
        }
    });

    // 添加jsonp钩子，评论数据使用jsonp方式获取，修改jquery的函数进行代理
    // jquery jsonp 原理见 https://www.cnblogs.com/aaronjs/p/3785646.html
    const jsonpMutation = new MutationObserver((mutationList, observer) => {
        for (const mutation of mutationList) {
            if (mutation.type === 'childList') {
                if (mutation.addedNodes.length > 0) {
                    for (const node of mutation.addedNodes) {
                        if (node.localName === 'script' && node.src.includes('//api.bilibili.com/x/v2/reply/main')) {
                            const callbackName = node.src.match(/callback=(.*?)&/)[1];
                            const originFunc = window[callbackName];
                            window[callbackName] = (value) => {
                                if (value.data.top_replies) {
                                    for (let i in value.data.top_replies) {
                                        injectReplyItem(value.data.top_replies[i]);
                                    }
                                }
                                for (let i in value.data.replies) {
                                    injectReplyItem(value.data.replies[i]);
                                }
                                originFunc(value);
                            }
                        }
                    }
                }
            }
        }
    });
    jsonpMutation.observe(window.document.head, { childList: true, subtree: true });
 })();
