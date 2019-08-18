class Bomb {
  constructor(bombX, bombY, bombW, bombH,speed) {
    this.bombX = bombX;
    this.bombY = bombY;
    this.bombW = bombW;
    this.bombH = bombH;
    this.speed=speed;
    this.initData();
    this.initBomb();
  }
  initData() {
    this.state=0;//0为爆炸状态，1为死亡状态
    this.bombIndex = 0;
    this.bombData = [
      "img/explosion01.png",
      "img/explosion02.png",
      "img/explosion03.png",
      "img/explosion04.png",
      "img/explosion05.png",
      "img/explosion06.png"
    ];
  }
  initBomb() {
    if (this.bombs == null) {
      this.bombs = [];
      for (let i = 0; i < this.bombData.length; i++) {
        let boobImage = new Image();
        boobImage.src = this.bombData[i];
        this.bombs.push(boobImage);
      }
    }
  }
  destroy() {
    for (let i = 0; i < this.bombs.length; i++) {
      this.bombs[i] = null;
    }
    this.bombs = null;
  }

  run(paint) {
    this.logic();
    this.draw(paint);
  }

  logic() {
    switch (this.state) {
      case 0:
        this.bombIndex++;
        if (this.bombIndex >= this.bombs.length) {
          this.state = 1;
        }
        break;
      case 1:
        break;
    }
  }
  draw(paint) {
    if(this.state==0){
      paint.drawImage(
          this.bombs[this.bombIndex],
          this.bombX,
          this.bombY,
          this.bombW,
          this.bombH
      );
    }
  }

}
