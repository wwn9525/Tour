$('.img li').eq(0).show();
	$('.bt li').click(function(){
	$(this).addClass('on').siblings().removeClass('on');
	var index=$(this).index();
	$('.img li').eq(index).fadeIn().siblings().fadeOut();
});

// $("#index_Top .nav_ul a").attr("target","_blank");
