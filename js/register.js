


$('#btn').click(function(){
  var data=$('#form1').serialize();
  console.log(data);
  $.ajax({
    type:'post',
    url:'data/2-register.php',
    data:data,
    success:function(obj){
      if(obj.code===200){
        alert('注册成功！');

      }else{
        alert('注册失败！');
      }

    }
  })
});

for(var i=0; i<30; i++){
  var c = document.createElementNS('http://www.w3.org/2000/svg','circle');//创建circle
  c.setAttribute('r', rn(10, 40));//获得圆的半径
  c.setAttribute('cx', rn(0, 1500));//获得圆心x坐标
  c.setAttribute('cy', rn(0, 450));//获得圆心y坐标
  c.setAttribute('fill', rc(0, 255));//给圆填充颜色，0-255随机颜色
  c.setAttribute('fill-opacity', Math.random());//给圆设置填充透明度

  //将新创建的元素挂载到DOM树上
  svg12.appendChild(c);

  //为新创建的元素添加单击事件监听
  c.onclick = function(){
    var me = this;
    me.onclick = null;//让当前circle无法再次被点击
    //慢慢变大、变淡
    var timer = setInterval(function(){
      //console.log(this);//window，此时的this指向window，解决var me = this;
      //修改半径
      var r = me.getAttribute('r');//获得当前鼠标点击的圆的半径，字符串值需转换
      r = parseFloat(r);
      r *= 1.05;//变大乘大于1的数
      me.setAttribute('r', r);//将变大的半径重新赋值给当前前的圆的半径
      //修改透明度
      var p = me.getAttribute('fill-opacity');//获得当前鼠标点击的圆的填充透明度，字符串值需转换
      p = parseFloat(p);
      p *= 0.9;//透明度变小显示，乘于小于1的数
      me.setAttribute('fill-opacity', p);//将填充透明度变淡的值，重新赋值给当前的圆的填充透明度
      //若足够透明，则删除该元素
      if(p<0.001){
        clearInterval(timer);
        svg12.removeChild(me);//将该圆从dom树上移除
      }
    },50)
  }
}

/*random number：返回指定范围内的随机整数*/
function rn(min, max){
  return Math.floor( Math.random()*(max-min) + min );
}

/*random color：返回指定范围内的随机颜色*/
function rc(min, max){
  var r = Math.floor(Math.random()*(max-min)+min);
  var g = Math.floor(Math.random()*(max-min)+min);
  var b = Math.floor(Math.random()*(max-min)+min);
  return `rgb(${r}, ${g}, ${b})`;
}

var w = 150;
var h = 30;
c1.width = w;
c1.height = h;
var ctx = c1.getContext('2d');

//1.填充一个矩形，作为背景颜色
ctx.fillStyle = rc(180, 230);
ctx.fillRect(0,0, w, h);

//2.绘制5个随机文字
var pool = 'ABCDEFGHJKLMNPQRSTUVWXY3456789';
for(var i=0; i<5; i++){
  //生成一个随机字符
  var txt = pool[rn(0,pool.length)];

  var fontSize = rn(12, 40);//字体大小
  ctx.font = fontSize+'px SimHei';
  var color = rc(80,180);//字体颜色
  ctx.fillStyle = color;
  ctx.textBaseline = 'top'; //文本基线

  ctx.save(); //保存画笔的当前状态：无旋转/无平移
  ctx.translate(30*i+30/2,  30/2);
  ctx.rotate( rn(-45,45)*Math.PI/180 );
  var x = -fontSize/2;
  var y = -fontSize/2;
  ctx.fillText(txt, x, y);  //绘制文本
  ctx.restore(); //恢复画笔状态到最近一次保存的效果
}

//3.绘制6条干扰直线
for(var i=0; i<6; i++){
  ctx.beginPath();
  var x1 = rn(0, w);
  var y1 = rn(0, h);
  ctx.moveTo(x1, y1);
  var x2 = rn(0, w);
  var y2 = rn(0, h);
  ctx.lineTo(x2, y2);

  ctx.strokeStyle = rc(0, 255);
  ctx.stroke();  //对直线路径进行描边
}

//4.绘制30个干扰点——半径为1的圆形路径
for(var i=0; i<50; i++){
  ctx.beginPath();
  var x = rn(0, w);
  var y = rn(0, h);
  ctx.arc(x, y, 1, 0, 2*Math.PI);

  ctx.fillStyle = rc(0, 255);
  ctx.fill(); //填充圆形路径
}
/*random number：返回指定范围内的随机整数*/
function rn(min, max){
  return Math.floor( Math.random()*(max-min) + min );
}
/*random color：返回指定范围内的随机颜色*/
function rc(min, max){
  var r = Math.floor(Math.random()*(max-min)+min);
  var g = Math.floor(Math.random()*(max-min)+min);
  var b = Math.floor(Math.random()*(max-min)+min);
  return `rgb(${r}, ${g}, ${b})`;
}