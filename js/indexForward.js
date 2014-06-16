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
var isLogined = Spolo.isLogined();
if(isLogined){          // 如果用户登录过
    var currentUser = Spolo.getUserId();            // 只有用户登录过才获取用户id，避免多余请求
    var decodeName = Spolo.decodeUname(currentUser);
    Gdata.getUserByID({
        "condition" : decodeName,
        "success" : function(data){
            var role = data["role"];
            var admin = data["userID"];
            if(role == "maker"){
                $("body").html("") ;
                window.location.href="maker/index.html" ;
            }else if(admin=="admin"){
                $("body").html("") ;
                window.location.href="admin/index.html" ;
            }else{
                $("body").html("") ;
                window.location.href="user/index.html" ;
            }
        }
    });

}