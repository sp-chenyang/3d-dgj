//点击图片显示文件选择器
function selectImg(imgNode){
	var $imgNode = $(imgNode);
	var imgSrc = $imgNode.src;
	$("#field1").alpaca({
        "data": "",
        "options": {
            "type": "file",
            "label": "更换图片:",
            "helper": "在电脑里选择图片替换当前图片."
        },
        "schema": {
            "type": "string",
            "format": "uri"
        }
    });
    $( "#dialog" ).dialog( "open" );
}
//点击文字显示文本输入框
function innerInput(textNode){
	var $textNode = $(textNode);
	var value = $textNode.html();
	$("#field1").alpaca({
        "data": value
    });
    $( "#dialog" ).dialog( "open" );
}

var ui = {
	form:{},
	image:{
		dialog:{},
		form:{},
		init:function(formWrap,dialogId,imgName){
			var $dialog = $("#"+dialogId);
			this.dialog = $dialog;
			var $formWrap = $("#"+formWrap);
			
			$formWrap.empty();
			$formWrap.alpaca({
		        "data": "",
		        "options": {
		        	"renderForm":true,
				    "fields": {
		                "photo":{
		                	"type": "file",
		                	"name": imgName,
		                	"styled": true,
				            "label": "更换图片:",
				            "helper": "在电脑里选择图片替换当前图片."
		                },
		                "photo@TypeHint": {
		                    "type": "hidden",
		                    "name": imgName+"@TypeHint"
		                },
		                "_charset_": {
		                	"type": "hidden"
		                }
		            },
		            "form":{
				        "attributes":{
				          "action":"",
				          "method":"post"
				        },
				        "buttons":{
				      		"submit": {
				      			"value": "提交"
				      		},
                   			"reset": {
                   				"value": "重置"
                   			}
				        }
				    }
		        },
		        "data":{
		        	"photo@TypeHint": "nt:file",
		            "_charset_":"utf-8"
		        },
		        "schema": {
		            title: "Customer Profile",
					type: "object",
					properties:{
						photo:{
							description: "Upload your profile picture.",
							format: "uri",
							title: "Photo",
							type: "string"
						},
						"photo@TypeHint": {
		                    "type": "string"
		                },
		                "_charset_": {
		                	"type": "string"
		                }
					}
					
		        },
		        "view": "VIEW_WEB_EDIT_LIST"
		    });
		    var formNode = $formWrap.find("form");
		    this.form = formNode;
		    return formNode;
		},
		show:function(){
			var $dialog = this.dialog;
			$dialog.dialog( "open" );
		},
		submit:function(fuc){
			var $form = this.form;
			var $submit = $form.find("button[type=submit]");
			$submit.click(function(event){
				event.preventDefault();
				fuc();
			});
		}
	},
	text:{
		init:function(formWrap,dialogId,textName,textValue){
			var $dialog = $("#"+dialogId);
			this.dialog = $dialog;
			var $formWrap = $("#"+formWrap);
			
			$formWrap.empty();
			$formWrap.alpaca({
		        "data": "",
		        "options": {
		        	"renderForm":true,
				    "fields": {
		                "text":{
		                	"type": "text",
		                	"name": textName,
				            "label": "修改文字",
				            "helper": "文本框不能为空",
		                },
		                "_charset_": {
		                	"type": "hidden"
		                }
		            },
		            "form":{
				        "attributes":{
				          "action":"",
				          "method":"post"
				        },
				        "buttons":{
				      		"submit": {
				      			"value": "提交"
				      		},
                   			"reset": {
                   				"value": "重置"
                   			}
				        }
				    }
		        },
		        "data":{
		        	"text": textValue,
		            "_charset_":"utf-8"
		        },
		        "schema": {
		            title: "文字编辑",
					type: "object",
					properties:{
						"text":{
							"type": "string",
							"required": true
						},
		                "_charset_": {
		                	"type": "string"
		                }
					}
					
		        },
		        "view": "VIEW_WEB_EDIT_LIST"
		    });
		    var formNode = $formWrap.find("form");
		    this.form = formNode;
		    return formNode;
		},
		show:function(){

		},
		submit:function(){

		}
	}
}