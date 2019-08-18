class GameInit{
  constructor(width,height){
    this.width=width;
    this.height=height;
    this.initGameView();
    this.createCanvas();
  }
  start(){
    setInterval(this.run.bind(this),10)
  }
  initGameView(){
    this.gameView=new GameView(this.width,this.height);
  }
  createCanvas(){
    let canvas=document.createElement('canvas');
    canvas.height=this.height;
    canvas.width=this.width;
    canvas.style.border='1px solid black';
    document.body.appendChild(canvas);
    this.paint=document.querySelector('canvas').getContext('2d');
  }
  run(){
    this.gameView.run(this.paint);
  }
}