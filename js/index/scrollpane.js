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
// 关于我们
$('.nav.about_us.anim').click(function(){
	navClick();
});
// 联系我们
$('.nav.contact_us.anim').click(function(){
	navClick();
});
// 操作帮助
$('.nav.oprate_help.anim').click(function(){
	navClick();
});
// 在线咨询
$('.nav.consult.anim').click(function(){
	navClick();
});
// 关于网博会
$("#about_expo").click(function(){
    var html = 		"<h4>关于虚拟网展</h4>"                                                          +
					"<p>中国国际贸易促进委员会电子信息行业分会（电子贸促会）顺应互联网时代会展经济发展趋势，基于互联网3D技术在会展信息化领域实现创新应用，为参展单位提供创新服务，搭建一个新颖的业内最具品牌效应的互联网展示平台，全面展现现阶段国内消费类电子产品的发展现状，有力促进消费类电子产品贸易活动。" +
                    "</p>" ;
    ScrollPane.refreshContent(html) ;
});
// 参展报名
$("#about_us").click(function(){
    var html = "<h4>参展报名</h4>"                                                                  +
			    "<p>参展咨询及报名：</p>"                                                                  +
                "<p style='margin-left: 85px;margin-top: 15px;'>王喜文&nbsp;&nbsp;&nbsp;&nbsp;王学军  &nbsp;&nbsp;&nbsp;&nbsp; 电话：13901192418 &nbsp;&nbsp;&nbsp;&nbsp; E-mail :&nbsp;&nbsp;lxshicheng@sina.com&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;孙振兴  &nbsp;&nbsp;&nbsp;&nbsp; 电话：18910767039   &nbsp;&nbsp;&nbsp;&nbsp;E-mail :&nbsp;&nbsp;sunzhenxing@spolo.org</p>" +
				"<p style='margin-left: 85px;margin-top: 15px;'>王俊  &nbsp;&nbsp;&nbsp;&nbsp; 电话：13701061443  &nbsp;&nbsp;&nbsp;&nbsp; E-mail :&nbsp;&nbsp;wangjun48135@sina.com&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;刘智爽 &nbsp;&nbsp;&nbsp;&nbsp;  电话：18612182266  &nbsp;&nbsp;&nbsp;&nbsp; E-mail :&nbsp;&nbsp;shicheng@sina.com</p>" ;


    ScrollPane.refreshContent(html) ;
});
// 参展须知
$("#about_xz").click(function(){
    var html = "<h4>参展须知</h4>"                                                                  +
			    "<p>1.	参展商须为在中华人民共和国合法注册的法人，并须提供下列证件复印件并加盖公司公章：&nbsp;&nbsp;&nbsp;&nbsp;（1）法人营业执照、组织机构代码证；（2）保健食品经营（流通）许可证、生产许可证；（3）产品注册证等批准文件；（4）有关知识产权注册登记证书或经注册登记的许可证书；（5）组委会认为需提供的其它文件。&nbsp;&nbsp;&nbsp;&nbsp;"+
				"2.	参展商按参展商品类别参展。&nbsp;&nbsp;&nbsp;&nbsp;3.参展商须自行管理好展厅后台登录账号。&nbsp;&nbsp;&nbsp;&nbsp;4.参展商展出产品须符合国家及相关行业标准。&nbsp;&nbsp;&nbsp;&nbsp;5.参展商发布参展信息应遵守国家相关法律法规, 如因参展商违反法律法规所产生的后果及法律责任均由参展商承担，主办方及组委会有权关闭其涉事展厅。"+
				"&nbsp;&nbsp;&nbsp;&nbsp;6.参展商合法发布信息，不得损害主办方及第三方、社会公益及国家利益，包括但不限于下列情况：&nbsp;&nbsp;&nbsp;&nbsp;（1）不得发布损害他人名誉权的信息；（2）不得发布未经核实的信息数据；（3）不得发布夸大宣传、虚构案例等违反《广告法》的产品信息；（4）不得展示侵犯他人知识产权的产品，不得发布侵犯他人知识产"+
				"权的产品信息；（5）不得发布含有反动、赌博、暴力、色情、民族歧视等违反《互联网信息服务管理办法》等法律法规和公序良俗的内容和信息。</p>" ;


    ScrollPane.refreshContent(html) ;
});

$("#about_btn").click(function(){
    var html = "<h4>参展须知</h4>"                                                                  +
			    "<p>1.	参展商须为在中华人民共和国合法注册的法人，并须提供下列证件复印件并加盖公司公章：&nbsp;&nbsp;&nbsp;&nbsp;（1）法人营业执照、组织机构代码证；（2）保健食品经营（流通）许可证、生产许可证；（3）产品注册证等批准文件；（4）有关知识产权注册登记证书或经注册登记的许可证书；（5）组委会认为需提供的其它文件。&nbsp;&nbsp;&nbsp;&nbsp;"+
				"2.	参展商按参展商品类别参展。&nbsp;&nbsp;&nbsp;&nbsp;3.参展商须自行管理好展厅后台登录账号。&nbsp;&nbsp;&nbsp;&nbsp;4.参展商展出产品须符合国家及相关行业标准。&nbsp;&nbsp;&nbsp;&nbsp;5.参展商发布参展信息应遵守国家相关法律法规, 如因参展商违反法律法规所产生的后果及法律责任均由参展商承担，主办方及组委会有权关闭其涉事展厅。"+
				"&nbsp;&nbsp;&nbsp;&nbsp;6.参展商合法发布信息，不得损害主办方及第三方、社会公益及国家利益，包括但不限于下列情况：&nbsp;&nbsp;&nbsp;&nbsp;（1）不得发布损害他人名誉权的信息；（2）不得发布未经核实的信息数据；（3）不得发布夸大宣传、虚构案例等违反《广告法》的产品信息；（4）不得展示侵犯他人知识产权的产品，不得发布侵犯他人知识产"+
				"权的产品信息；（5）不得发布含有反动、赌博、暴力、色情、民族歧视等违反《互联网信息服务管理办法》等法律法规和公序良俗的内容和信息。</p>" ;


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
$('.scroll_close').click(function(){
	ScrollPane.scrollIn();
});





