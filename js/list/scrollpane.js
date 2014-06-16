/**
 *  This file is part of the Glue(Superpolo Glue).
 *  Copyright (C) by SanPolo Co.Ltd.
 *  All rights reserved. 
 *
 *  See http://www.spolo.org/ for more information.
 *
 *  SanPolo Co.Ltd
 *  http://www.spolo.org/
 *  Any copyright issues, please contact: spolo@spolo.org
 *  
 **/
 
var ScrollPane = {
	/* 滑出 */
	scrollOut : function(){
		$('.scroll_pane').css("display","block");
		$('.scroll_pane').animate({
			height : '200px'
		},300);
	},
	
	/* 滑入 */
	scrollIn: function(){
		$('.scroll_pane').animate({
			height : '0px'
		},300,function(){
			$('.scroll_pane').css("display","none");
		});
	},
	
	/* 刷新文字内容 */
	refreshText: function(html){
		$('.scroll_pane').html(html);
	},
    /* 更新关于博览会、联系我们*/
    refreshContent: function(html){
		$('#scroll_content').html(html);
	}
};


/* 导航栏的事件 */
// 关于网博会
$('#about_expo').click(function(){
	navClick();
});
// 参展报名
$('#about_us').click(function(){
	navClick();
});
// 关于网博会
$("#about_expo").click(function(){
    var html = 		"<h4>关于网博会</h4>"                                                          +
					"<p>为贯彻落实自治区党委、人民政府“把旅游业培育成自治区国民经济战略性支柱产业，"    +
                    "改善民生的重要富民产业和人民群众满意的现代服务业”的要求，促进旅游商品开发和"  +
                    "市场繁荣，提升旅游商品质量，打造具有地域特色的旅游商品品牌，增加旅游商品消费" +
                    "在旅游总收入中的比重，使旅游商品经济成为旅游产业新的增长点，加快旅游产业转型" +
                    "升级，丰富旅游供给，推进新疆旅游业跨越式发展。中国旅游协会、自治区旅游局、克" +
                    "拉玛依市人民政府拟于2013年8月16日——20日在克拉玛依市会展中心举办“2013中国西"   +
                    "部旅游商品博览会”。</p>"                                                      +
                    "<p>为了扩大旅游商品博览会的影响以及在网络上的扩展，使“无地域、无时间”的网络"  +
                    "博览会模式，能够做到永不闭幕。为新疆旅游做出应有的贡献，在网络博览会举办的同时，" +
                    "我们采用3D展厅的方式，利用新技术建立使人耳目一新的新疆国际旅游商品网博会。</p> " ;
    ScrollPane.refreshContent(html) ;
});
// 参展报名
$("#about_us").click(function(){
    var html = "<h4>参展报名</h4>"                                                                  +
			    "<p>参展报名：</p>"                                                                  +
                "<p style='margin-left: 85px;margin-top: 15px;'>电话：18609919152  &nbsp;&nbsp;&nbsp;&nbsp;"                                     +
                "E-mail :&nbsp;&nbsp;"                                                                           +
                "caojun@dayou.com.cn </p>" +
                "<p>参展咨询：</p>"                                                                  +
                "<p style='margin-left: 85px;margin-top: 15px;'>电话：18612182266  &nbsp;&nbsp;&nbsp;&nbsp;"                                     +
                "E-mail :&nbsp;&nbsp;"                                                                           +
                "shicheng1166@sina.com </p>" ;


    ScrollPane.refreshContent(html) ;
});

// 展馆实景
$("#exhibition_all").click(function(){
   var text = $("#exhibition_in").text() ;
   if(text){
        $("#exhibition_in").text("") ;
        $("#exhibition_in").css("background-color","none") ;
        $("#exhibition_out").text("") ;
        $("#exhibition_out").css("background-color","none") ;
        return ;
   }
   $("#exhibition_in").text("会展中心室内") ;
   $("#exhibition_in").css("background-color","#979a9b") ;
   $("#exhibition_out").text("会展中心室外") ;
   $("#exhibition_out").css("background-color","#979a9b") ;
}) ;


// 统一处理导航栏的点击事件
function navClick(){
	ScrollPane.scrollOut();
}


/* 关闭按钮的点击事件 */
$('.close').click(function(){
	ScrollPane.scrollIn();
});





