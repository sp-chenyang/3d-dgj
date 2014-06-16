/* 
 *  This file is part of the SPP(Superpolo Platform).
 *  Copyright (C) by SanPolo Co.Ltd.
 *  All rights reserved.
 *
 *  See http://spp.spolo.org/ for more information.
 *
 *  SanPolo Co.Ltd
 *  http://spp.spolo.org/
 *  Any copyright issues, please contact: copr@spolo.org
 */
var prdCls = {
	prdHotListData: [],
	prdListData: [],
	getPrdListData: function() {
		return this.prdListData;
	},
	getPrdHotListData: function() {
		return this.prdHotListData;
	},
	setTestData: function(hotPrdDataLth, prdDataLtn) {
		var prdData = {
			preview: "./image/nopreview.jpg",
			exhiName: "戒指",
			//prdDes  : "钻石戒指",
			swfUrl: "xiaoshoubao/xsb_nibianqi"
		};
		if (hotPrdDataLth) {
			for (var i = 0; i < hotPrdDataLth; i++) {
				this.prdHotListData.push(prdData);
			};

		}
		if (prdDataLtn) {
			for (var i = 0; i < prdDataLtn; i++) {
				this.prdListData.push(prdData);
			};

		}
	}

};

(function() {
	var url = getUrlVars("url");
	url = formatUrl(url);

	function formatUrl(url) {
		var rtVal = "";
		var start = url.indexOf("/content/") + 1;
		if (url) {
			rtVal = url.substr(start);
		}
		return rtVal;
	}

	function getUrlVars(parName) {
		if (!parName) {
			console.error("exhibition.js: getUrlVars() parName is undefined!");
			return;
		}
		var map = {};
		var parts = window.location.href.replace(/[?&]+([^=&]+)=([^&]*)/gi, function(m, key, value) {
			map[key] = value;
		});
		return map[parName];
	}

	$(document).ready(function() {
		// var container = document.querySelector('#prd-list');
		// var msnry = new Masonry( container, {
		//   // options
		//   columnWidth: 200,
		//   itemSelector: '.prd-hot-ctr'
		// });
		//热门产品
		Gdata.searchHotProducts({
			path: url,
			"success": function(data) {
				if (data) {
					var hotPrdArr = data["data"];
					for (var hotPrdPath in hotPrdArr) {
						var hotPrdObj = hotPrdArr[hotPrdPath];
						if (typeof hotPrdObj == "object") {
							adHotPrd(hotPrdObj);
						}
					}
				}
			}
		});
		//产品橱窗
		Gdata.searchMoreProducts({
			path: url,
			"success": function(data) {
				if (data) {
					var prdArr = data["data"];
					for (var prdPath in prdArr) {
						var prdObj = prdArr[prdPath];
						if (typeof prdObj == "object") {
							adPrd(prdObj);
						}
					}
				}
			}
		});
		// var prdListData = prdCls.getPrdListData();
		// for(var i=0;i<prdListData.length;i++){
		// 	adPrd(prdListData[i]);
		// }
		// var prdHotListData = prdCls.getPrdHotListData();
		// for(var i=0;i<prdHotListData.length;i++){
		// 	adHotPrd(prdHotListData[i]);
		// }
	});

	function getPrdHotListNode() {
		var prdHotListNode;
		prdHotListNode = $("#prd-hot-list");
		return prdHotListNode;
	}

	function getPrdListNode() {
		var prdListNode;
		prdListNode = $("#prd-list");
		return prdListNode;
	}

	function adHotPrd(hotPrd) {

		var hotPrdHtm =
			"<li class=\"prd-hot-ctr\">" + "<div class=\"prd-hot-ctr-item\">" + "<a class=\"prd-hot-ctr-item-hrf\" href=\"./exhibition.html?url=" + (url ? url : "content/gen360/exhibitionlib/exh01/index.html") + "&product=" + hotPrd["swfUrl"] + "\">" + "<div class=\"prd-hot-ctr-img\">" + "<img title=\"" + hotPrd["exhiName"] + "\" src=\"" + (hotPrd["preview"] ? hotPrd["preview"] : "./image/nopreview.jpg") + "\"></img>" + "</div>" + "</a>" + "<div class=\"prd-hot-ctr-info\">" + "<div class=\"prd-hot-ctr-name\">" + "<h4>" + "<a class=\"\" href=\"./exhibition.html?url=" + (url ? url : "content/gen360/exhibitionlib/exh01/index.html") + "&product=" + hotPrd["swfUrl"] + "\">" + "" + hotPrd["exhiName"] + "" + "</a>" + "</h4>" + "</div>" + "</a>" + "</div>" + "</div>" + "</li>";

		var hotListNode = getPrdHotListNode();
		if (hotListNode) {
			hotListNode.append(hotPrdHtm);
		}
	}

	function adPrd(prd) {
		var prdHtm =
			"<li class=\"prd-hot-ctr\">" + "<div class=\"prd-hot-ctr-item\">" + "<a class=\"prd-hot-ctr-item-hrf\" href=\"./exhibition.html?url=" + (url ? url : "content/gen360/exhibitionlib/exh01/index.html") + "&product=" + prd["swfUrl"] + "\">" + "<div class=\"prd-hot-ctr-img\">" + "<img title=\"" + prd["exhiName"] + "\" src=\"" + (prd["preview"] ? prd["preview"] : "./image/nopreview.jpg") + "\"></img>" + "</div>" + "</a>" + "<div class=\"prd-hot-ctr-info\">" + "<div class=\"prd-hot-ctr-name\">" + "<h4>" + "<a class=\"\" href=\"./exhibition.html?url=" + (url ? url : "content/gen360/exhibitionlib/exh01/index.html") + "&product=" + prd["swfUrl"] + "\">" + "" + prd["exhiName"] + "" + "</a>" + "</h4>" + "</div>" + "</div>" + "</div>" + "</li>";

		var listNode = getPrdListNode();
		if (listNode) {
			listNode.append(prdHtm);
		}

	}

})();