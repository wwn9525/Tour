// var reg_source = 'http://'+window.location.host;
var reg_source = REG_SOURCE;
var flag_email = false;
var flag_username = false;
var flag_code = false;
$(document).ready(function(){
	$('#code_img').attr('src',url_sso+'/captcha?r='+Math.random());
    //回车
	$("body").keydown(function(e){
		if(e.which == 13){
			register();
		}
	});	
});
function appcan(){
	window.location.href="http://www.appcan.cn";
}

function email_cue(){
	document.getElementById("email_cue").style.display="none";
	document.getElementById("email_tip").style.display="none";
	document.getElementById("emailadd").style.display="none";
}

//检测邮箱
function check_email(){
	var email = $.trim($("#email").val());
	if(email == ''){
		$("#email_cue").hide();
		$("#email_tip").text("请填写邮箱");
		$("#email_tip").show();
		$("#emailadd").hide();
		return false;			
	}
	var pattern = /^[a-zA-z0-9][a-zA-Z0-9_\-\.]*@([a-zA-Z0-9]+[_\-\.])+[a-zA-Z]{2,4}$/;
	if(!pattern.test(email)){
		$("#email_cue").hide();
		$("#email_tip").text("邮箱格式错误");
		$("#email_tip").show();
		$("#emailadd").hide();
		return false;			
	}	
	
	// $.getJSON(url_sso+'/userCheck?jsoncallback=?',{propName:'name',propValue:email},function(data){
	// 	if(data.retCode == 'ok'){
	// 		//$("#email").attr("class","app_input");
	// 		$("#email_tip").text("");
	// 		flag_email = true;
	// 	}else{
	// 		$("#email_cue").hide();
	// 		$("#email_tip").text("邮箱已被注册！");
	// 		$("#email_tip").show();
	// 		$("#emailadd").hide();
	// 		flag_email = false;
	// 	}
	// });
	$("#emailadd").show();
}
function username_cue(){
	document.getElementById("nicknamesuccess").style.display="none";
	document.getElementById("username_cue").style.display="none";
	document.getElementById("username_tip").style.display="none";
}

//检测昵称
function check_username(){
	var username = $.trim($("#username").val());
	if(username == ''){
		$("#username_cue").hide();
		$("#username_tip").text("请填写昵称！");
		$("#username_tip").show();
		$("#nicknamesuccess").hide();
		return false;			
	}
	if(username.length<2 || username.length>20){
		$("#username_cue").hide();
		$("#username_tip").text("2-20个字符！");
		$("#username_tip").show();
		$("#nicknamesuccess").hide();
		return false;		
	}
	var pattern = /^[\u4e00-\u9fa5a-zA-z0-9_+]+$/;
	if(!pattern.test(username)){
		$("#username_cue").hide();
		$("#username_tip").text("包含非法字符！");
		$("#username_tip").show();
		$("#nicknamesuccess").hide();
		return false;			
	}	
	$.getJSON(url_sso+'/userCheck?jsoncallback=?',{propName:'nick',propValue:username},function(data){
		if(data.retCode == 'ok'){
			$("#username_tip").text("");
			$("#nicknamesuccess").hide();
			document.getElementById("nicknamesuccess").style.display="";
			flag_username = true;
		}else{
			$("#username_cue").hide();
			$("#username_tip").text("昵称已被使用！");
			$("#username_tip").show();
			$("#nicknamesuccess").hide();
			flag_username = false;
		}
	});
	
}
function password_cue(){
	document.getElementById("password_cue").style.display="none";
	document.getElementById("password_tip").style.display="none";
	document.getElementById("passwdright").style.display="none";
}

//检测密码
function check_password(){
	var password = $("#password").val();
	if(password == ""){
		$("#password_cue").hide();
		$("#password_tip").text("请填写密码！");
		$("#password_tip").show();
		$("#passwdright").hide();
		return false;			
	}
	if(password.length<6 || password.length>20){
		$("#password_cue").hide();
		$("#password_tip").text("6-20个字符！");
		$("#password_tip").show();
		$("#passwdright").hide();
		return false;		
	}
	$("#password_tip").text("");
	$("#passwdright").show();
}
function password2_cue(){
	document.getElementById("password2_cue").style.display="none";
	document.getElementById("password2_tip").style.display="none";
	document.getElementById("passwd2right").style.display="none";
}
//检测密码2
function check_password2(){
	var password = $("#password").val();
	var password2 = $("#password2").val();
	if(password2 == ""){
		$("#password2_cue").hide();
		$("#password2_tip").text("请填写密码！");
		$("#password2_tip").show();
		$("#passwd2right").hide();
		return false;			
	}
	if(password != password2){
		$("#password2_cue").hide();
		$("#password2_tip").text("密码输入不一致！");
		$("#password2_tip").show();
		$("#passwd2right").hide();
		return false;		
	}
	$("#password2_tip").text("");
	$("#passwd2right").show();
}
//验证码
function code_cue(){
	document.getElementById("code_tip").style.display="none";
	document.getElementById("coderight").style.display="none";
}
function change_code(){
	var url = url_sso+'/captcha?r='+Math.random();
	$('#code_img').attr('src',url);
}
function check_code(){
	var code = $("#code").val();
	$.getJSON(url_sso+'/captchaValidate?jsoncallback=?',{code:code},function(data){
		if(data.retCode == 'ok'){
			$("#code_tip").text("");
			$("#code_tip").hide();
			$("#coderight").show();
			flag_code = true;
		}else{
			$("#code_tip").text("验证码错误");
			$("#coderight").hide();
			$("#code_tip").show();
			flag_code = false;
		}
	});
}
//注册
function register(){
	if($("#register").text() == '注册中...') return false;
	
	//邮箱
	var email = $.trim($("#email").val());
	if(email == ''){
		$("#email_tip").text("请填写邮箱");
		return false;			
	}
	var pattern = /^[a-zA-z0-9][a-zA-Z0-9_\-\.]*@([a-zA-Z0-9]+[_\-\.])+[a-zA-Z]{2,4}$/;
	if(!pattern.test(email)){
		$("#email_tip").text("邮箱格式错误");
		return false;			
	}
	//昵称
	var username = $.trim($("#username").val());
	if(username == ''){
		$("#username_tip").text("请填写昵称");
		return false;			
	}
	if(username.length<2 || username.length>20){
		$("#username_tip").text("2-20个字符");
		return false;		
	}
	var pattern = /^[\u4e00-\u9fa5a-zA-z0-9_+]+$/;
	if(!pattern.test(username)){
		$("#username_tip").text("包含非法字符");
		return false;			
	}
	//密码
	var password = $("#password").val();
	if(password == ""){
		$("#password_tip").text("请填写密码");
		return false;			
	}
	if(password.length<6 || password.length>20){
		$("#password_tip").text("6-20个字符");
		return false;		
	}
	$("#password_tip").text("");
	//密码2
	var password2 = $("#password2").val();
	if(password2 == ""){
		$("#password2_tip").text("请填写密码");
		return false;			
	}
	if(password != password2){
		$("#password2_tip").text("密码输入不一致");
		return false;		
	}
	$("#password2_tip").text("");
	//验证码
	var code = $("#code").val();
	if(code == ""){
		$("#code_tip").text("请填写验证码");
		return false;			
	}	
	//服务条款
	if(!$("#agree").is(':checked')){
		alert("请勾选服务条款");
		return false;
	}
	//注册
	if(!flag_email || !flag_username || !flag_code){
		return false;
	}
	
	$("#register").text('注册中...');
	$.getJSON(url_sso+'/signup?jsoncallback=?',$("#register_form").serialize()+"&regSource="+reg_source+"&regFrom="+getQueryString("regFrom"),function(data){
		if(data.retCode == 'ok'){
			window.location = "/register/succ?email="+email;
		}else{
			$("#register").text('注册');
			alert(data.retMsg);
		}
	});	
}


function getQueryString(name) {
	var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)", "i");
	var r = window.location.search.substr(1).match(reg);
	if (r != null) return unescape(r[2]); return null;
}

//重发邮件
function send_mail(){
	$.getJSON(url_sso+'/reSendActiveEmail?jsoncallback=?',{loginName:$("#email").val(),regSource:reg_source},function(data){
		if(data.retCode == 'ok'){
			alert("邮件发送成功");
		}else{
			alert(data.retMsg);
		}
	});		
}
