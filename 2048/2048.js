var game={
  //保存游戏二位数组,总行数,列数
  data:null,RN:4,CN:4,
  score:0,//保存得分
  state:1,//保存游戏状态: 1表示运行中,0表示结束
  RUNNING:1,//专门表示运行中状态
  GAMEOVER:0,//专门表示游戏结束状态
  //每个属性和方法之间必须用逗号分隔！
  //对象自己的方法要使用自己的属性，必须this.
  start(){//游戏启动
    this.state=this.RUNNING;//重置游戏状态为运行中
    this.score=0;//分数清零
    //this->game
    this.data=[];//新建空数组保存在data中
    //r从0开始，到<RN结束
    for(var r=0;r<this.RN;r++){
      //新建空数组保存到data中r行
      this.data[r]=[];
      //c从0开始，到<CN结束
      for(var c=0;c<this.CN;c++){
        //设置data中r行c列的值为0
        this.data[r][c]=0;
      }
    }//(遍历结束)
    this.randomNum();
    this.randomNum();
    this.updateView();
    //事件:内容/设备状态的改变
    //事件处理函数: 在事件发生时自动执行的操作
    document.onkeydown=function(e){
      //this->.前的document->game
      switch(e.keyCode){
        case 37: //左移
          this.moveLeft();
          break;
        case 38: //上移
          this.moveUp();
          break;
        case 39: //右移
          this.moveRight();
          break;
        case 40: //下移
          this.moveDown();
      }
    }.bind(this);
  },
  moveLeft(){//左移所有行
    //为数组拍照保存在before中
    var before=String(this.data);
    //r从0开始，到<RN结束
    for(var r=0;r<this.RN;r++){
      this.moveLeftInRow(r);//左移第r行
    }//(循环结束)
    //为数组拍照保存在after中
    var after=String(this.data);
    if(before!=after){//如果before!=after
      this.randomNum();//随机生成数
      if(this.isGameOver())//如果游戏结束
        this.state=this.GAMEOVER;//修改游戏状态
      this.updateView();//更新页面
    }
  },
  isGameOver(){//判断游戏是否结束
    //遍历data
      //如果当前元素是0,返回false
      //否则，如果c<CN-1且当前元素等于右侧元素
        //返回false
      //否则, 如果r<RN-1且当前元素等于下方元素
        //返回false
    //(遍历结束)
    //返回true
  },
  moveLeftInRow(r){//左移第r行
    //c从0开始，到<CN-1
    for(var c=0;c<this.CN-1;c++){
      //查找r行c列下一个不为0的位置nextc
      var nextc=this.getNextInRow(r,c);
      //如果没找到,就退出循环
      if(nextc==-1) break;
      else//否则
        //如果c位置的值是0
        if(this.data[r][c]==0){
          //将nextc位置的值赋值给c位置
          this.data[r][c]=this.data[r][nextc];
          //将nextc位置的值置为0
          this.data[r][nextc]=0;
          c--;//c留在原地
        }else if(
          this.data[r][c]==this.data[r][nextc]){
        //否则,如果c位置的值等于nextc位置的值
          //将c位置的值*2
          this.data[r][c]*=2;
          this.score+=this.data[r][c];
          //将nextc位置的值置为0
          this.data[r][nextc]=0;
        }
    }
  },
  getNextInRow(r,c){//查找r行c列下一个不为0的位置
    //i从c+1开始,到<CN结束
    for(var i=c+1;i<this.CN;i++){
      //如果i位置的值不为0,就返回i
      if(this.data[r][i]!=0) return i;
    }//(遍历结束)
    return -1;//返回-1
  },
  moveRight(){//右移所有行
    //为data拍照，保存在before中
    var before=String(this.data);
    //遍历data中每一行
    for(var r=0;r<this.RN;r++){
      this.moveRightInRow(r);//右移第r行
    }//(遍历结束)
    //为data拍照，保存在after中
    var after=String(this.data);
    if(before!=after){//如果发生了移动
      this.randomNum();//随机生成数
      this.updateView();//更新页面
    }
  },
  moveRightInRow(r){//右移第r行
    //c从CN-1开始，到>0结束，反向遍历r行中每个格
    for(var c=this.CN-1;c>0;c--){
      //找r行c列左侧前一个不为0的位置prevc
      var prevc=this.getPrevInRow(r,c);
      //如果prevc为-1,就退出循环
      if(prevc==-1) break;
      else{//否则
        if(this.data[r][c]==0){//如果c列的值是0
          //将prevc列的值赋值给c列
          this.data[r][c]=this.data[r][prevc];
          //将prevc列的值置为0
          this.data[r][prevc]=0;
          c++;//c留在原地
        }else if(this.data[r][c]
                  ==this.data[r][prevc]){
        //否则 如果c列的值等于prevc列的值
          this.data[r][c]*=2;//将c列的值*2
          this.score+=this.data[r][c];
          this.data[r][prevc]=0;//将prevc列置为0
        }
      }
    }
  },
  getPrevInRow(r,c){//查找r行c列左侧前一个不为0位置
    //i从c-1开始，到=0结束,每次-1
    for(var i=c-1;i>=0;i--){
      //如果data中r行i列的值不为0，就返回i
      if(this.data[r][i]!=0) return i;
    }//(循环结束)
    return -1;//返回-1
  },
  moveUp:function(){
    //为data拍照保存在before中
    var before=String(this.data);
    //遍历data中每一列
    for(var c=0;c<this.CN;c++){
      //调用moveUpInCol上移第c列
      this.moveUpInCol(c);
    }
    //为data拍照保存在after中
    var after=String(this.data);
    //如果before不等于after
    if(before!=after){
      this.randomNum();//随机生成数
      this.updateView();//更新页面
    }
  },
  moveUpInCol:function(c){
      //r从0开始,到r<RN-1结束，r每次递增1
    for(var r=0;r<this.RN-1;r++){
        //查找r行c列下方下一个不为0的位置nextr
      var nextr=this.getNextInCol(r,c);
        //如果没找到,就退出循环
      if(nextr==-1) break;
      else{//否则  
          //如果r位置c列的值为0
        if(this.data[r][c]==0){
            //将nextr位置c列的值赋值给r位置
          this.data[r][c]=this.data[nextr][c];
            //将nextr位置c列置为0
          this.data[nextr][c]=0;
          r--;//r留在原地
        }else if(this.data[r][c]
                  ==this.data[nextr][c]){
          //否则，如果r位置c列的值等于nextr位置的值 
            //将r位置c列的值*2
          this.data[r][c]*=2;
          this.score+=this.data[r][c];
            //将nextr位置c列的值置为0
          this.data[nextr][c]=0;
        }
      }
    }
  },
  getNextInCol:function(r,c){
      //r+1
      //循环，到<RN结束，r每次递增1
    for(var i=r+1;i<this.RN;i++){
        //如果i行c列不等于0, 就返回i
      if(this.data[i][c]!=0) return i;
    }//(遍历结束)
    return -1;//返回-1
  },
  moveDown:function(){
    //为data拍照保存在before中
    var before=String(this.data);
    //遍历data中每一列
    for(var c=0;c<this.CN;c++){
      //调用moveDownInCol下移第c列
      this.moveDownInCol(c);
    }
    //为data拍照保存在after中
    var after=String(this.data);
    if(before!=after){//如果before不等于after
      this.randomNum();//随机生成数
      this.updateView();//更新页面
    }
  },
  moveDownInCol:function(c){
      //r从RN-1开始，到r>0结束，r每次递减1
    for(var r=this.RN-1;r>0;r--){
        //查找r位置c列上方前一个不为0的位置prevr
      var prevr=this.getPrevInCol(r,c);
        //如果没找到,就退出循环
      if(prevr==-1) break;
      else{//否则  
          //如果r位置c列的值为0
        if(this.data[r][c]==0){
            //将prevr位置c列的值赋值给r位置
          this.data[r][c]=this.data[prevr][c];
            //将prevr位置c列置为0
          this.data[prevr][c]=0;
          r++;//r留在原地
        }else if(this.data[r][c]
                  ==this.data[prevr][c]){
          //否则，如果r位置c列的值等于prevr位置的值
            //将r位置c列的值*2
            this.data[r][c]*=2;
            this.score+=this.data[r][c];
            //将prevr位置c列置为0
            this.data[prevr][c]=0;
        }
      }
    }
  },
  getPrevInCol:function(r,c){
      //r-1
      //循环，r到>=0结束，每次递减1
    for(var i=r-1;i>=0;i--){
        //如果i行c列不等于0, 就返回i
      if(this.data[i][c]!=0) return i;
    }//(遍历结束)
    return -1;//返回-1
  },
  updateView(){//将data中的数据更新到每个div中
    //遍历二维数组
    for(var r=0;r<this.RN;r++){
      for(var c=0;c<this.CN;c++){
        var n=this.data[r][c];
        //找到id为crc的div
        var div=document.getElementById("c"+r+c);
        if(n!=0){//如果n不是0
          div.innerHTML=n;//设置div的内容为n
          //设置div的class为cell n+n
          div.className="cell n"+n;
        }else{
          div.innerHTML="";//清除div的内容
          //恢复div的class为cell
          div.className="cell";
        }
      }
    }
    //找到id为score的span,设置其内容为score属性
    document.getElementById("score")
            .innerHTML=this.score;
    //找到id为gameOver的div
    var div=document.getElementById("gameOver");
    //如果游戏状态为GAMEOVER就设置div显示
    if(this.state==this.GAMEOVER){
      div.style.display="block";
      //找到id为final的span，设置其内容为score
      document.getElementById("final")
              .innerHTML=this.score;
    }else{//否则就设置div隐藏
      div.style.display="none";
    }
  },
  randomNum(){//在一个随机位置生成2或4
    while(true){//反复:
      //在0~RN-1之间生成随机数r
      var r=Math.floor(Math.random()*this.RN);
      //在0~CN-1之间生成随机数c
      var c=Math.floor(Math.random()*this.CN);
      //如果data中r行c列的值为0
      if(this.data[r][c]==0){
        //将data中r行c列赋值为:
          //随机生成一个小数,如果<0.5，就取2,否则就取4
        this.data[r][c]=Math.random()<0.5?2:4;
        break;//退出循环
      }
    }
  },
}
game.start();