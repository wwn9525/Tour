/*banner轮播*/
$(function(){
   	// 轮播图开始 
    var left = $('.content_middle .btnLeft');//获取左点击
    var right = $('.content_middle .btnRight');//获取右点击
    var aSmall = $('.content_middle .table a');//获取显示名称的a标签
    var aLi = $('.content_middle ul li');//获取banner图片的li
    var iNow = 0;//下表初始值为0
    // 左点击  
    left.click(function(){
        iNow--;
          // 判断回流
        if(iNow<0){
              iNow=2;
        }
        //获取当前元素的所有同级元素，停止动画，透明度为0
        aLi.eq(iNow).siblings().stop().animate({
          opacity:0
         
        },2000);
        //获取当前元素停止动画，透明度为1（显示当前元素）
        aLi.eq(iNow).stop().animate({
          opacity:1
           
        },2000);
        //获取当前元素对应的a便签，给其添加class，并将a便签的所有同级元素去掉class
         aSmall.eq(iNow).addClass('small_active').siblings().removeClass('small_active');
    });
    
    // 右点击切换
    right.click(function(){
        iNow++;
        if(iNow>2){
              iNow=0;
        }
        aLi.eq(iNow).siblings().stop().animate({
          opacity:0
         
        },2000);
        aLi.eq(iNow).stop().animate({
          opacity:1
           
        },2000);
         aSmall.eq(iNow).addClass('small_active').siblings().removeClass('small_active');

    });

    //手动切换（对应的文字a）
    aSmall.mouseover(function(){
    	var n = $(this).index();
	//  var iNow = $(this).index();
	//  alert(iNow);
	    iNow = n;
	    aLi.eq(iNow).siblings().stop().animate({
	        opacity:0
	    },2000);
	    aLi.eq(iNow).stop().animate({
	        opacity:1
	           
	    },2000);
	    aSmall.eq(iNow).addClass('small_active').siblings().removeClass('small_active');
     })
    
	 // 封装函数体
	 function move1(){
	    aLi.eq(iNow).siblings().stop().animate({
	        opacity:0
	         
	    },2000);
	    aLi.eq(iNow).stop().animate({
	        opacity:1
	    },2000)
	    aSmall.eq(iNow).addClass('small_active').siblings().removeClass('small_active');
	 }
 
	// 定个定时器的初始值
	function run2(){
		iNow++;
	    if(iNow>2){
	      iNow=0;
	    }
	    move1();  
	}
	// 定时器
	timer = setInterval(run2,2000);
	  
	//当鼠标划入，停止轮播图切换
	$(".content_middle").hover(function(){
	    clearInterval(timer);
	},function(){
	    timer = setInterval(run2,2000);
	}) 
})

/*出境游切换*/
$('.main_first .main_first_content .main_first_tab .content_right').eq(0).show();
    $('.main_first .main_header_title li').click(function(){
      $(this).addClass('on').siblings().removeClass('on');
      var index=$(this).index();
      $('.main_first .main_first_content .main_first_tab .content_right').eq(index).fadeIn().siblings().fadeOut();
});


/*主题推荐*/
//取得id（没有特指哪一个id，$与选择器结合使用，就特指相应的id了）
function getId(id){
	return typeof id==='string'?document.getElementById(id):id;
}
$(function(){
	//获取鼠标滑过或点击的标签和要切换内容元素
	var titles=getId('tabqh').getElementsByTagName('li');
    var divs=getId('tabcontent').getElementsByTagName("div");
   
    //判断，如果titles与divs个数不对应的话，就没必要了，直接退出
    if(titles.length!=divs.length){
    	return;
    }
    //遍历所有titles下的li（进行操作）
    //必须知道当前li的下标，与对用的div的下标
    for(var i=0;i<titles.length;i++){
    	//取得每个li，然后给每个li加下标
    	titles[i].id=i;
    	//divs[i].id=i;
    	//给每个li添加一个鼠标滑过的事件
    	titles[i].onmouseover=function(){
    		//首先清除，除了当前li之外，所有li上的class,并且对应的div显示隐藏
    		for(var j=0;j<titles.length;j++){
    			titles[j].className='';
    			divs[j].style.display="none";
    		}
    		//给当前鼠标滑过的li上加一个样式
    		this.className="active";

    		//给显示内容的div加id为block
    		divs[this.id].style.display="block";
    	}
    } 
})
/*游记攻略*/
//取得id（没有特指哪一个id，$与选择器结合使用，就特指相应的id了）
function getId2(id){
	return typeof id==='string'?document.getElementById(id):id;
}
$(function(){
	//获取鼠标滑过或点击的标签和要切换内容元素
	var titles=getId2('tabqh1').getElementsByTagName('li');
    var divs=getId2('tabcontent1').getElementsByClassName('tab-body');
   
    //判断，如果titles与divs个数不对应的话，就没必要了，直接退出
    if(titles.length!=divs.length){
    	return;
    }
    //遍历所有titles下的li（进行操作）
    //必须知道当前li的下标，与对用的div的下标
    for(var i=0;i<titles.length;i++){
    	//取得每个li，然后给每个li加下标
    	titles[i].id=i;
    	//divs[i].id=i;
    	//给每个li添加一个鼠标滑过的事件
    	titles[i].onmouseover=function(){
    		//首先清除，除了当前li之外，所有li上的class,并且对应的div显示隐藏
    		for(var j=0;j<titles.length;j++){
    			titles[j].className='';
    			divs[j].style.display="none";
    		}
    		//给当前鼠标滑过的li上加一个样式
    		this.className="active";

    		//给显示内容的div加id为block
    		divs[this.id].style.display="block";
    	}
    } 
})
/*国内游切换*/
$('.main_five .china_content .content_right ul').eq(0).show();
    $('.main_five .china_nav li').click(function(){
      $(this).addClass('active').siblings().removeClass('active');
      var index=$(this).index();
      $('.main_five .china_content .content_right ul').eq(index).fadeIn().siblings().fadeOut();
});



$('#ddddlv').click(function(){
  $('#container1').css(
    "display","block"
  );
});

$("#container1 .close").click(function(){
  $('#container1').css("display","none");
})

  
$('#btn_dl').click(function(){
  var n = $('[name="uname"]').val();
  var p = $('[name="upwd"]').val();
  console.log(1);
  //发起异步POST请求，进行登录验证
  $.ajax({
    type: 'POST',
    url: 'data/2_user_login.php',
    data: {uname: n, upwd: p},
    success: function(data){

      if(data.code<0){  //登录失败
        $('p.alert').html(data.msg);
      }else {           //登录成功
        
        $('#container1').hide();
        // $('#denglu').hide();
        $('#welcome').html('欢迎回来：'+data.name);
        //loginUname = data.uname; //在全局范围保存登录用户名
        //loginUid = data.uid;//在全局范围保存登录用户编号
        sessionStorage['uName'] = data.name;
        console.log(data.name);
        sessionStorage['LoginUid'] = data.uid;
      }
    },
    error: function(){
      alert('响应消息有问题！请检查Network！');
    }
  });
});        