class Enemy{
  constructor(imgData,width,height){
    this.width_S=width;
    this.height_S=height;
    this.initEnemy(imgData);
    this.state=0;//0为初始状态，1为爆炸状态，2为爆炸结束后状态
    this.enemyBullets=[];
    this.time=0;
  }


  initEnemy(imgDate){
    this.img=new Image();
    let index=Math.floor(Math.random()*18);
    if(index==9){
      this.img.width=this.width_S/3.4;
      this.img.height=this.img.width/1.4;
      this.speed=0.5;
      this.img.src=imgDate[2];
      this.hp=20;
    }else{
      if(index%2==0){
        this.img.src=imgDate[0];
        this.hp=4;
        this.speed=3;
      }else{
        this.img.src=imgDate[1];
        this.hp=8;
        this.speed=1.5
      }
      this.img.width=this.width_S/6.3;
      this.img.height=this.img.width/1.4;
    }
    this.img.imgX=Math.random()*(this.width_S-this.img.width);
    this.img.imgY=-this.img.height;
  }

  //初始化敌机子弹

  initEnemyBullet(){
    let bulletW = this.img.width / 6;
    let bulletH = bulletW * 2;
    let bulletX = this.img.imgX + (this.img.width - bulletW) / 2;
    let bulletY = this.img.imgY + this.img.height;
    let enemyBullte=new EnemyBullet('img/enemyBullet.png',bulletX,bulletY,bulletW,bulletH,this.speed);
    this.enemyBullets.push(enemyBullte);
  }

  //初始化爆炸

  initExploision() {
    let bombW = Math.floor((this.img.width / 3) * 4);
    let bombX = this.img.imgX + (this.img.width - bombW) / 2;
    let bombY = this.img.imgY + (this.img.height - bombW) / 2;
    this.bomb = new Bomb(bombX, bombY, bombW, bombW,this.speed);
  }
  setExploision() {
    this.state=1;
    this.initExploision();
  }
  logic(paint){
    let that=this;
    this.time++;
    this.img.imgY+=this.speed;
    if(this.img.imgY>30 && this.time%50==0&&this.state==0){
      this.initEnemyBullet();
    }
    this.enemyBullets.forEach(function(item,index) {
      if(item.bulletY>that.height_S){
       item=null;
       that.enemyBullets.splice(index,1);
      }
      if(item) {
        item.run(paint);
      }
    });

    //爆炸完后清楚爆炸特效

    if(this.bomb && this.bomb.state==1){
      this.bomb.destroy();
      this.bomb=null;
      this.state=2;
    }
  }
  draw(paint){
    if(this.state ==0){
      paint.drawImage(this.img,this.img.imgX,this.img.imgY,this.img.width,this.img.height);
    }
  }
  run(paint){
    this.logic(paint);
    this.draw(paint);
  }
}