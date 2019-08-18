class Plane{
  constructor(width,height,speed) {
    this.width_S = width;
    this.height_S = height;
    this.speed=2;
    this.initPlane();
    this.initData();
    this.bullets = [];
    this.time = 0;
    this.key_pressed={};
  }
  initData(){
    this.keycode_up=87;
    this.keycode_down=83;
    this.keycode_left=65;
    this.keycode_right=68;
    this.keycode_attack=13;
  }
  initPlane(){
    this.img=new Image();
    this.img.src='img/player.png';
    this.img.width=this.width_S/6;
    this.img.height=this.img.width/3*2;
    this.img.imgX=(this.width_S-this.img.width)/2;
    this.img.imgY=this.height_S-this.img.height;
  }
  initBullet(){
    let bullet=new Bullet('img/bullet.png',this.img.imgX,this.img.imgY,this.img.width,this.img.height,4);
    this.bullets.push(bullet);
  }
  logic(paint){
    let that=this;
    document.onkeyup=function(ev) {
      that.key_pressed[ev.keyCode]=false;
    }
    document.onkeydown=function(ev) {
      that.key_pressed[ev.keyCode]=true;
    }
      for(let key in that.key_pressed){
        if(that.key_pressed[key]){
          if(key == that.keycode_left){
            that.img.imgX-=that.speed;
          }
          if(key == that.keycode_right){
            that.img.imgX+=that.speed;
          }
          if(key == that.keycode_up){
            that.img.imgY-=that.speed;
          }
          if(key == that.keycode_down){
            that.img.imgY+=that.speed;
          }
          if(key == that.keycode_attack){
            if(this.time%15==0){
              this.initBullet();
            }
          }
        }
      }
    //飞机上下左右移动并且发射子弹
    //判断飞机是否超出边界
    if(this.img.imgX<=0){
      this.img.imgX=0;
    }
    if(this.img.imgX>this.width_S-this.img.width){
      this.img.imgX=this.width_S-this.img.width;
    }
    if(this.img.imgY>this.height_S-this.img.height){
      this.img.imgY=this.height_S-this.img.height;
    }
    if(this.img.imgY<=this.img.height+15){
      this.img.imgY=this.img.height+15;
    }
    //创建子弹；
    this.time++;

    //摧毁子弹

    this.bullets.forEach(function(bullet,index) {
      if(bullet.imgY<=0){
        bullet.state=1;
      }
      if(bullet.state==1){
        bullet=null;
        that.bullets.splice(index,1);
      }
    })

    //绘制子弹

    this.bullets.forEach(function(bullet) {
      bullet.run(paint);
    })
  }
  draw(paint){
    paint.drawImage(this.img,this.img.imgX,this.img.imgY,this.img.width,this.img.height);
  }
  run(paint){
    let that=this;
    this.logic(paint);
    this.draw(paint);
  }
}