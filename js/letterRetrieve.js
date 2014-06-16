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
 *  author : [huyanan]
 **/
 var letter = {
	letterAscllStart : 65,
	letterAscllEnd : 90,
	letterArr : [],
	testJson : {},
	formatLetter : function(){
		var format = false;
		
		for(var i=this.letterAscllStart; i<=this.letterAscllEnd; i++){
			var letter = String.fromCharCode(i);
			this.letterArr.push(letter);
		}
		if(this.letterArr.length == 26){
			format = true;
		}
		return format;
	},
	getLetterArr : function(){
		if(this.letterArr.length != 26){
			if(!this.formatLetter()){
				console.error("formatLetter return false,letterArr is empty");
			}
		}
		return this.letterArr;
	},
	getTestJson : function(sucFc,erFc){
		if(this.testJson){
			sucFc(this.testJson);
		}else{
			erFc();
		}
	},
	crtTestJson : function(){
		for(var i=0; i<=this.letterArr.length; i++){
			this.testJson[this.letterArr[i]] = new Array();
			for(var n=0; n<=((Math.random()*100)-10); n++){
				var nameEnd = this.randomChar(10)
				
				this.testJson[this.letterArr[i]].push({
					"gdsName":this.letterArr[i]+""+nameEnd
				});
			}
			
		}
	},
	randomChar : function(l){
		var  x="0123456789qwertyuioplkjhgfdsazxcvbnm";
		var  tmp="";
		for(var  i=0;i<  l;i++)  {
			tmp  +=  x.charAt(Math.ceil(Math.random()*100000000)%x.length);
		}
		return  tmp;
	}
 };
 
 (function(){
	function getLtrItem(ltr){
		return $(".letter-retrieve-list>.letter-retrieve-item[ltrItm-Id=" + ltr + "]");
	}
	function cteLtrBox(ltr){
		var letterBox = $(".letter-list").append("<div class=\"letter-box\" ltrBox-Id=\"" + ltr + "\">" + ltr + "</div>");
		
	}
	function cteLtrRstBox(ltr){
		$(".letter-retrieve-list").append(
			"<div class=\"letter-retrieve-item\" ltrItm-Id=\"" + ltr + "\">"
			+	"<div class=\"letter-title-box\">"
			+		"<div class=\"letter-title-fishflag\">"
			+			 "<div class=\"linearBg1 title-bak\">" + ltr + "</div>"
			+			 "<div class=\"pacman1 title-rig\"></div>"
			+			 "<div class=\"arrow-left title-shd\"></div>"
			+		"</div>"
			+	"</div>"
			+	"<div class=\"radius-box shadow-box letter-retrieve-result-list\">"
			/*+		"<div class=\"letter-retrieve-result-item letter-retrieve-result-more\">"
			+			"更多<span class=\"icons-more\">></span>"
			+		"</div>"*/
			+	"</div>"
			+"</div>");
	}
	function cteRstItm(ltr,publishPath,gdsObj){
		var gdsName = gdsObj["exhibitionname"];
		var previewPath = "/web360/exhibition.html?url="+publishPath+"/index.html"
		getLtrItem(ltr)
			.children(".letter-retrieve-result-list")
			.prepend("<div class=\"letter-retrieve-result-item\"><a class=\"exhibition\" href=\""+previewPath+"\" target=\"_blank\">" + gdsName + "</a></div>");
	}
	function ltrBoxEnt(ltr){
		$(".letter-list>.letter-box[ltrBox-Id=" + ltr + "]").addClass("letter-hvr");
	}
	function ltrBoxLea(ltr){
		$(".letter-list>.letter-box[ltrBox-Id=" + ltr + "]").removeClass("letter-hvr");
	}
	function ltrBoxClk(ltr){
		clrltrBoxSlt();
		$(".letter-list>.letter-box[ltrBox-Id=" + ltr + "]").addClass("letter-selected");
	}
	function clrltrBoxSlt(){
		$(".letter-list>.letter-box").removeClass("letter-selected");
	}
	function scrollToElement(selector, time, verticalOffset) {
		time = typeof(time) != 'undefined' ? time : 1000;
		verticalOffset = typeof(verticalOffset) != 'undefined' ? verticalOffset : 0;
		element = $(selector);
		offset = element.offset();
		offsetTop = offset.top + verticalOffset;
		$('html,body').animate({
			scrollTop: offsetTop
		}, time);
	}
	function initLetterList(data,ltrArr){
		for(var i=0; i<ltrArr.length; i++){
			var letter = ltrArr[i];
			var letterData = data[letter];
			var totalNum = letterData["totalNum"];
			var gdsJson = letterData["data"];
			for(var pulishPath in gdsJson){
				if(typeof gdsJson[pulishPath] == "object"){
					cteRstItm(letter,pulishPath,gdsJson[pulishPath]);
				}
				
			}
		}
	}
	$(document).ready(function(){
		scrollToElement($("html,body"), 500);
		var ltrArr = letter.getLetterArr();
		for(var i=0; i<ltrArr.length; i++){
			cteLtrBox(ltrArr[i]);
			cteLtrRstBox(ltrArr[i]);
		}
		Gdata.getExhibitionByInitial({
			success:function(data){
				initLetterList(data,ltrArr);
				if (window.console != undefined) {
					window.console.log(data);
				};
			},
			error:function(err){
				if (window.console != undefined) {
					window.console.log(err);
				};
			}
		});
		// letter.getTestJson(
		// 	function(gdsJson){
		// 		for(var letter in gdsJson){
		// 			if(gdsJson[letter].length || gdsJson[letter].length==0){
		// 				for(var arindex=0; arindex<gdsJson[letter].length; arindex++){
		// 					cteRstItm(letter,gdsJson[letter][arindex]["gdsName"]);
		// 				}
		// 			}
					
		// 		}
		// 	},function(err){
		// 		console.error(err);
		// 	}
		// );
		$(".letter-box").mouseenter(function(evt){
			$(this).toggleClass("letter-hvr");
		});
		$(".letter-box").mouseleave(function(evt){
			$(this).toggleClass("letter-hvr");
		});
		$(".letter-box").click(function(evt){
			var ltr = $(this).attr("ltrBox-Id");
			ltrBoxClk(ltr);
			scrollToElement(getLtrItem(ltr), 500);
		});
		$("#scrollUp").click(function(evt){
			scrollToElement($("html,body"), 500);
		});
	});
 })();