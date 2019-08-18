class EnemyBullet {
  constructor(url, bulletX, bulletY, bulletW, bulletH,speed) {
    this.bulletX = bulletX;
    this.bulletY = bulletY;
    this.bulletW = bulletW;
    this.bulletH = bulletH;
    this.state=0;
    this.speed=speed+3;
    this.initImage(url);
  }

  initImage(url) {
    this.img = new Image();
    this.img.src = url;
  }

  run(paint) {
    this.logic();
    this.draw(paint);
  }

  logic() {
    this.bulletY = this.bulletY + this.speed;
  }

  draw(paint) {
    paint.drawImage(
        this.img,
        this.bulletX,
        this.bulletY,
        this.bulletW,
        this.bulletH
    );
  }
}
