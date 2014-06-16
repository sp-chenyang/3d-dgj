(function(){
	var cursorSelect;
	function submit(formId, url, callback) {
		var options =
		{
			url: url,
			success: function () {
				callback();
			},
			error: function () {
				alert("上传失败");
			}
		};
		$(formId).ajaxForm(options);
		$(formId).submit();
	}
	$(document).ready(function(){
		var product_name;
		//使父窗口的toolbar显示出来
		parent.document.getElementById("toolbar").style.display = "block";
		var win_url = window.location.pathname;
		var path = win_url.split("/edit.html")[0];
		var product_name_url = path + ".json";
		$.ajax({
			url:product_name_url,
			success:function(data){
				if(data["name"]){
					product_name = data["name"];
					$("#product_name_input").attr("value",product_name);
				}
			},
			error : function(error){
				console.log(error);
			}   
		})
		
		
		parent.document.getElementById("back_button").onmouseover=function(){
			$(this).addClass("setup_hover");
		};
		parent.document.getElementById("back_button").onmouseout = function(){
			$(this).removeClass("setup_hover");
		};
		parent.document.getElementById("back_button").onclick = function(){
			if(cursorSelect){
				cursorSelect.removeClass("setup_click");
			}
			cursorSelect = this;
			$(this).addClass("setup_click");
			window.location.href = "/web360/web360gen/user/index2.html";
		}
		parent.document.getElementById("normal_button").onmouseover=function(){
			$(this).addClass("setup_hover");
		};
		parent.document.getElementById("normal_button").onmouseout = function(){
			$(this).removeClass("setup_hover");
		};
		parent.document.getElementById("normal_button").onclick = function(){
			if(cursorSelect){
				$(cursorSelect).removeClass("setup_click");
			}
			cursorSelect = this;
			$(this).addClass("setup_click");
			$("#dialog").dialog("open");
		}
		parent.document.getElementById("personal_button").onmouseover=function(){
			$(this).addClass("setup_hover");
		};
		parent.document.getElementById("personal_button").onmouseout = function(){
			$(this).removeClass("setup_hover");
		};
		parent.document.getElementById("personal_button").onclick = function(){
			if(cursorSelect){
				$(cursorSelect).removeClass("setup_click");
			}
			cursorSelect = this;
			$(this).addClass("setup_click");
			//显示个人设置编辑框
			$("#personal_dialog").dialog("open");
		}
		parent.document.getElementById("edit_button").onmouseover=function(){
			$(this).addClass("setup_hover");
		};
		parent.document.getElementById("edit_button").onmouseout = function(){
			$(this).removeClass("setup_hover");
		};
		parent.document.getElementById("edit_button").onclick = function(){
			if(cursorSelect){
				$(cursorSelect).removeClass("setup_click");
			}
			cursorSelect = this;
			$(this).addClass("setup_click");
			//显示展品编译编辑框
			$("#product_edit_dialog").dialog("open");
		}
		$("#dialog").append("<div style='position:absolute;left:25px;height:16px;'>请输入展品名称</div>" + "<div style='height:20px;'></div>" +
		"<input id='product_name_input' type='text' style='width:150px;height:20px;'></input>"+
		"<div style='height:20px;'></div>" +
		"<div style='position:absolute;left:25px;height:16px;'>项目品名称</div>" +
		"<div style='height:20px;'></div>" +
		"<input id='project_name_input' type='text' style='width:150px;height:20px;'></input>");
		$( "#dialog" ).dialog({
			autoOpen: false,
			height:200,
			width:218,
			position:[1000,100],
			show: {
				effect: "blind",
				duration: 1000
			},
			hide: {
				effect: "explode",
				duration: 1000
			}
		});
		$( "#personal_dialog" ).dialog({
			autoOpen: false,
			height:200,
			width:218,
			position:[200,50],
			show: {
				effect: "blind",
				duration: 1000
			},
			hide: {
				effect: "explode",
				duration: 1000
			}
		});
		$("#product_edit_dialog").append("<form style='position:relative'>" + 
								"<input type='checkbox' name='pc' style='position:absolute;top:0;left:0'/><span style='position:absolute;top:0;left:20px'>pc版</span>" +
								"<input type='checkbox' name='android' style='position:absolute;top:20px;left:0'/><span style='position:absolute;top:20px;left:20px'>Android版本</span>" +
								"<input type='checkbox'name='ios' style='position:absolute;top:40px;left:0'><span style='position:absolute;top:40px;left:20px'>IOS版本</span>"+
							"</form>");
		$("#product_edit_dialog").dialog({
			autoOpen: false,
			height:177,
			width:177,
			position:[0,50],
			show: {
				effect: "blind",
				duration: 1000
			},
			hide: {
				effect: "explode",
				duration: 1000
			}
		});
		$("#product_name_input").focus(function(){
			$(this).css("border","1px solid blue");
		});
		$("#product_name_input").blur(function(){
			$(this).css("border","1px solid #888");
			var value = $(this).val();
			if(value && (value != product_name)){
				$("#product_name").attr("value",value);
				var url = path;
				submit("#form_product_name",url,function(){
					product_name = value;
				});
			}
		});
		$("#project_name_input").focus(function(){
			$(this).css("border","1px solid blue");
		});
		$("#project_name_input").blur(function(){
			$(this).css("border","1px solid #888");
			
		});
		// 获取toolbar上的按钮对象
		//var openDom = window.parent.
		//var toBackDom;
		//var complileDom;

		// 1. 给open按钮绑定事件
		//openDom.bind("click",function(){
			// 获取指定的div
		//	$("#dialog"). = true;
		//})

		// 2. dialog中显示UI
		//var dialog_ui_json = {
			
		//};

		// 3.绑定事件了。
	});
})();