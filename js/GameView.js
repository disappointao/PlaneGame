class GameView {
  constructor(width, height) {
    this.width = width;
    this.height = height;
    this.enemys = [];
    this.initMap();
    this.initPlane();
    this.time = 0;
  }

  initMap() {
    let mapData = [
      'img/bg__01.png',
      'img/bg__02.png',
      'img/bg__03.png',
      'img/bg__04.png',
      'img/bg__05.png',
      'img/bg__06.png',
      'img/bg__07.png',
      'img/bg__08.png',
    ];
    this.map = new Map(this.width, this.height, mapData);

  }

  initPlane() {
    this.plane = new Plane(this.width, this.height);
  }

  initEnemy() {
    let enemyData = [
      'img/enemy1.png',
      'img/enemy2.png',
      'img/bigEmeny.png',
    ];
    let enemy = new Enemy(enemyData, this.width,this.height);
    this.enemys.push(enemy);
  }

  logic(paint) {
    let that = this;
    this.time++;
    if (this.time % 200 == 0) {
      this.initEnemy();
    }

    this.enemys.forEach(function(enemy, index) {
      if (enemy.img.imgY > that.height) {
        enemy=null;
        that.enemys.splice(index, 1);
      }
    });
    this.enemys.forEach(function(enemy) {
      enemy.run(paint);
    });
    //子弹和敌机碰撞

    this.plane.bullets.forEach(function(bullet) {
      if(bullet){
        that.enemys.forEach(function(enemy) {
          if(enemy&&enemy.state===0){
            bullet.collision(enemy);
          }
          if(enemy.bomb==null && enemy.state==1){
            enemy.setExploision();
            setInterval(function() {
              if(enemy.bomb && enemy.bomb.state!=1){
                enemy.bomb.run(paint);
              }
            },50);
          }
        });
      }
    });
  }

  run(paint) {
    this.map.run(paint);
    this.plane.run(paint);
    this.logic(paint);

  }
}