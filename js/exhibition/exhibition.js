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
 *  author : [caobin]
 **/

/* 页面元素加载完成后，从地址栏中获取参数，设置iframe src */
(function(){
	var str ="";
	var jsonData = {} ;
	function getUrlVars(parName){
		if(!parName){
			console.error("exhibition.js: getUrlVars() parName is undefined!");
			return;
		}
		var map = {};
		var parts = window.location.href.replace(/[?&]+([^=&]+)=([^&]*)/gi, function(m,key,value) {
			map[key] = value;
		});
		return map[parName];
	}
	function exh_intr(callback)
	{
		var exhurl = "/web360/"+str+".2.json";
		$.ajax( {    
			url:exhurl,
			cache:false,
			type:'get',
			dataType:'json',
			success:function(data){
				// 成功的回调函数
				jsonData = data ;
				callback(data);
			},
			error : function(error){
				console.log(error);
			}    
		});  
	}

	$(document).ready(function(){		
		var url = getUrlVars("url");
		var arr = url.split("/");
		for(var i = 0;i < arr.length-1; i++){
			str += (arr[i] + "/");
		}
		
		var product = getUrlVars("product");
		/* 监听iframe加载完成的事件 */

		$('.ifr360').load(function(){
			if(product){
				$('.ifr360')[0].contentWindow.switchSWF(product);
			}
		});
		if(url){
			$('.ifr360').attr("src",url);
		}else{
			console.error("exhibition.js: ifr360 src error!");
			/* return */
		}
		//页脚信息的点击事件
		$('#intro_show').on('show',function(){
			
			if(jsonData["introduction"]){
				var introductionUrl = str + "introduction/introduction.jpg";
				if(jsonData["introduction"] && jsonData["introduction"]["introduction.jpg"]){
					$('#companyIntr').html("<img src='" +introductionUrl+ "'>")
				}else{
					$('#companyIntr').html("<div>公司暂未提供介绍信息</div>")
				}
			}else{
				exh_intr(function(data)
				{
					var introductionUrl = str + "introduction/introduction.jpg";
					if(data["introduction"] && jsonData["introduction"]["introduction.jpg"]){
						$('#companyIntr').html("<img src='" +introductionUrl+ "'>")
					}else{
						$('#companyIntr').html("<div>公司暂未提供介绍信息</div>")
					}
				});
			}
		});
		$('#hotproducts_show').on('show', function () {
		})
		$('#contact_show').on('show',function(){
		
			if(jsonData["contact"]){
				var contactUrl = str + "contact/contact.jpg"; 
				if(jsonData["contact"] && jsonData["contact"]["contact.jpg"]){
					$('#companyCon').html("<img src='" +contactUrl+ "'>")
				}else{
					$('#companyCon').html("<div>公司暂未提供联系信息</div>")
				} 
			}else{
				exh_intr(function(data)
				{
					var contactUrl = str + "contact/contact.jpg"; 
					if(data["contact"] && jsonData["contact"]["contact.jpg"]){
						$('#companyCon').html("<img src='" +contactUrl+ "'>")
					}else{
						$('#companyCon').html("<div>公司暂未提供联系信息</div>")
					} 
				});
			}
		})
		$('#enter_show').on('show',function(){
		})
		
		//关闭弹框
		$('#intro_show').on('hide',function(){
			
		})
		$('#hotproducts_show').on('hide', function () {
			
		})
		$('#contact_show').on('hide',function(){
			
		})
		$('#enter_show').on('hide',function(){
			
		})
	
		//在线咨询
		$('.nav.consult.anim').click(function(){
			$('.kefu').attr('style','display:inline-block');
		}); 
		$('.close').click(function(){
			$('.kefu').attr('style','display:none');
		});
		
		$('#openproduct').click(function(){
			openMoreproduct();
		});
		$('#companyexh').click(function(){
			window.open("http://www.baidu.com/");
		});

		//TODO 取得每个企业的更多产品
		function  openMoreproduct(){
			window.open("product.html" + "?url="+url )
		}
		
		//TODO  在线咨询客服方法
	});
})();




