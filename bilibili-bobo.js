// ==UserScript==
// @name         Bilibili 啵啵表情包
// @namespace    https://github.com/AS042971/bilibili-bobo
// @supportURL   https://github.com/AS042971/bilibili-bobo/issues
// @version      0.1.0
// @description  在Bilibili 表情包中增加啵啵系列
// @author       as042971
// @match        https://*.bilibili.com/*
// @icon         https://experiments.sparanoid.net/favicons/v2/www.bilibili.com.ico
// @require      https://jpillora.com/xhook/dist/xhook.min.js
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

        // 来自 @爱茉-Merry-
        // https://t.bilibili.com/677042972319023129
        [3333211, "吃瓜", "https://i0.hdslb.com/bfs/album/42fff4f4aa4ba7ad5a7ee448f1a952a1a6753741.png"],
        [3333212, "别在这理发店", "https://i0.hdslb.com/bfs/album/101dbcd54aa6a6a5fc253ea9095748a65da7ce4a.png"],
        [3333213, "要牛奶钱", "https://i0.hdslb.com/bfs/album/6ce670604e2a98810d2dcd97d458750ea8cc0d79.png"],
        [3333214, "大傻呗2", "https://i0.hdslb.com/bfs/album/9c195b9eaf46405059aeb8829a9945d6c44375ff.png"],

        // 来自 @卡古拉的醋昆布e
        // https://t.bilibili.com/675526380607242246
        [3333311, "可爱滴捏", "https://i0.hdslb.com/bfs/album/98de968a6274f9cb14c9aaade94c1a0d07d415b4.jpg"],

        // 来自 @玉桂狗美图分享bot
        // https://t.bilibili.com/665015380203274241
        [3333311, "吐舌1", "https://i0.hdslb.com/bfs/album/e4abe1c249b67f33a0064075bd0ea00b589769ea.jpg"],
        [3333312, "吐舌2", "https://i0.hdslb.com/bfs/album/723e1aee265863b491cf30d77c9b3f6c5aef2c0b.jpg"],
        [3333313, "吐舌3", "https://i0.hdslb.com/bfs/album/c6cdd070d77d2eea270f62e0ffa1e02068171930.jpg"],
        [3333314, "开心", "https://i0.hdslb.com/bfs/album/84b6b70cdcc103d678d1f31d436df26c834748f8.jpg"],
        [3333315, "哭", "https://i0.hdslb.com/bfs/album/954cbdeb0712fc119e1184242b5396dd9069dd22.jpg"],
        [3333316, "晕", "https://i0.hdslb.com/bfs/album/fa4b087cd7ddadcb6112a179391d9ef384522257.jpg"],
        [3333317, "大小眼", "https://i0.hdslb.com/bfs/album/6a8e897a75f6a908ee7af054a6eeedd9ce7071c0.jpg"],
        [3333318, "惬意", "https://i0.hdslb.com/bfs/album/9297ea482b101cb19e0c91cddfaa884618491276.jpg"],
        [3333319, "疑问1", "https://i0.hdslb.com/bfs/album/9f35464759d59ac26ee0d8410260ebe57b60d855.jpg"],
        [3333321, "微笑1", "https://i0.hdslb.com/bfs/album/a535ba2ee900ff47334a44cd243d32d3ee28a829.jpg"],
        [3333322, "委屈1", "https://i0.hdslb.com/bfs/album/a00e1b34b0079887fd37eba520693f59ba08b116.jpg"],
        [3333323, "委屈2", "https://i0.hdslb.com/bfs/album/6e34c617292499da20f82a8b09364124a03eaf57.jpg"],
        [3333324, "疑问2", "https://i0.hdslb.com/bfs/album/6098e9a0b6acd435ec71da48a243dae94eda4c42.jpg"],
        [3333325, "微笑2", "https://i0.hdslb.com/bfs/album/ac8e96351d7bf58936d77266db38edf8d723b47b.jpg"],
        [3333326, "爱心眼", "https://i0.hdslb.com/bfs/album/ec19639cca79d73895da936850981769c2fa48f3.jpg"],
        [3333327, "委屈3", "https://i0.hdslb.com/bfs/album/94422b4d3ae81e84ddb82f8439ef773cbdd8e709.jpg"],
        [3333328, "星星眼", "https://i0.hdslb.com/bfs/album/4e522af3fe0682d23bcbad98a01234220585418b.jpg"],
        [3333329, "吐舌4", "https://i0.hdslb.com/bfs/album/52797832ae62644abcb5a246d547c89e5ff6c2cf.jpg"],
        [3333331, "啊", "https://i0.hdslb.com/bfs/album/a543e79390f7ab501d1a8610fb9508e2045140c9.jpg"],
        [3333332, "呃呃", "https://i0.hdslb.com/bfs/album/800cbf45317f0b4466b674c1d98d8bc7fb92152f.jpg"],
        [3333333, "委屈4", "https://i0.hdslb.com/bfs/album/90b5b2d1c3c99056a1b12cc4f885b027ac405a40.jpg"],
        [3333334, "微笑3", "https://i0.hdslb.com/bfs/album/5a9b5cde55216d1a2028b47c64f72403f8bf39c6.jpg"],

        // 来自 @风罗4个圈儿
        // https://t.bilibili.com/668646710612852743
        [3333191, "桂物敬礼", "https://i0.hdslb.com/bfs/album/f8f8de3ef0b36b69fbff630a30ac33aee1fdfc96.png"],

        // 来自 @爱茉-Merry-
        // https://t.bilibili.com/676773935585427481
        [3333291, "桂物mua", "https://i0.hdslb.com/bfs/album/bb3613eabd73892f0a2e31f4596cb2a37980b9bb.png"],
        [3333292, "桂物啵啵", "https://i0.hdslb.com/bfs/album/29d7a0b905556fe5a365e4b62a15024ccf4654ee.png"],
        [3333293, "桂物抱抱", "https://i0.hdslb.com/bfs/album/187fbc36bbf5efb168932a5591a120cdb840dd1d.png"],
    ]

    let emote_dict = {}
    let chn_emote_dict = {}
    emote_source.forEach(function (arr){
        emote_dict["[啵啵_" + arr[1] + "]"] = arr[2];
        chn_emote_dict["【啵啵_" + arr[1] + "】"] = '<img src="' + arr[2] + '" alt="[啵啵_' + arr[1] + ']">';
    });

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
    let bobo = {
        "id": 3333,
        "text": "啵啵 (来自 @风罗4个圈儿, @爱茉-Merry-, @卡古拉的醋昆布e, @玉桂狗美图分享bot)",
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

    let injectDynamicItem = function(item) {
        if (item && "modules" in item && "module_dynamic" in item.modules && "desc" in item.modules.module_dynamic && item.modules.module_dynamic.desc && "rich_text_nodes" in item.modules.module_dynamic.desc) {
            for(let node of item.modules.module_dynamic.desc.rich_text_nodes) {
                if (node.text in emote_dict) {
                    node.type = 'RICH_TEXT_NODE_TYPE_EMOJI'
                    node.emoji = {
                        "icon_url": emote_dict[node.text],
                        "size": 2,
                        "text": node.text,
                        "type": 3
                    }
                }
            }
        }
        if (item && "orig" in item && item.orig) {
            injectDynamicItem(item.orig);
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
        }
    });

    // 评论区通过修改网页完成（感谢 @Sparanoid）
    window.addEventListener('load', () => {
        const DEBUG = false;
        const NAMESPACE = 'bilibili-bobo-emoji';

        console.log(`${NAMESPACE} loaded`);
        function debug(description = '', msg = '', force = false) {
            if (DEBUG || force) {
                console.log(`${NAMESPACE}: ${description}`, msg)
            }
        }

        function attachEl(item) {
            let injectWrap = item.querySelector('.con .info');

            // .text - comment content
            // .text-con - reply content
            let content = item.querySelector('.con .text') || item.querySelector('.reply-con .text-con');
            let id = item.dataset.id;
            let avID = window.aid;

            // Simple way to attach element on replies initially loaded with comment
            // which wouldn't trigger mutation inside observeComments
            let replies = item.querySelectorAll('.con .reply-box .reply-item');
            if (replies.length > 0) {
                [...replies].map(reply => {
                    attachEl(reply);
                });
            }
            console.log(content.innerHTML)
            if (content.innerHTML.includes('【啵啵_')) {
                let innerHTML = content.innerHTML;
                for (let item in chn_emote_dict) {
                    innerHTML = innerHTML.replace(item, chn_emote_dict[item]);
                }
                content.innerHTML = innerHTML;
            }
        }

        function observeComments(wrapper) {
            // .comment-list - general list for video, zhuanlan, and dongtai
            // .reply-box - replies attached to specific comment
            let commentLists = wrapper ? wrapper.querySelectorAll('.comment-list, .reply-box') : document.querySelectorAll('.comment-list, .reply-box');

            if (commentLists) {

                [...commentLists].map(commentList => {

                    // Directly attach elements for pure static server side rendered comments
                    // and replies list. Used by zhuanlan posts with reply hash in URL.
                    // TODO: need a better solution
                    [...commentList.querySelectorAll('.list-item, .reply-item')].map(item => {
                        attachEl(item);
                    });

                    const observer = new MutationObserver((mutationsList, observer) => {

                        for (const mutation of mutationsList) {

                            if (mutation.type === 'childList') {

                                debug('observed mutations', [...mutation.addedNodes].length);

                                [...mutation.addedNodes].map(item => {
                                    attachEl(item);

                                    // Check if the comment has replies
                                    // I check replies here to make sure I can disable subtree option for
                                    // MutationObserver to get better performance.
                                    let replies = item.querySelectorAll('.con .reply-box .reply-item');

                                    if (replies.length > 0) {
                                        observeComments(item)
                                        debug(item.dataset.id + ' has rendered reply(ies)', replies.length);
                                    }
                                })
                            }
                        }
                    });
                    observer.observe(commentList, { attributes: false, childList: true, subtree: false });
                });
            }
        }

        // .bb-comment loads directly for zhuanlan post. So load it directly
        observeComments();

        // .bb-comment loads dynamcially for dontai and videos. So observe it first
        const wrapperObserver = new MutationObserver((mutationsList, observer) => {

            for (const mutation of mutationsList) {

                if (mutation.type === 'childList') {

                    [...mutation.addedNodes].map(item => {
                        debug('mutation wrapper added', item);

                        if (item.classList?.contains('bb-comment')) {
                            debug('mutation wrapper added (found target)', item);

                            observeComments(item);

                            // Stop observing
                            // TODO: when observer stops it won't work for dynamic homepage ie. https://space.bilibili.com/703007996/dynamic
                            // so disable it here. This may have some performance impact on low-end machines.
                            // wrapperObserver.disconnect();
                        }
                    })
                }
            }
        });
        wrapperObserver.observe(document.body, { attributes: false, childList: true, subtree: true });

    }, false);

 })();
