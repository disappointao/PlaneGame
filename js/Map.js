class Map{
  constructor(width,height,MapData){
    this.width=width;
    this.height=height/7;
    this.initMap(MapData);
  }
  initMap(MapData){
    this.map=[];
    for (let i = 0; i <MapData.length ; i++) {
      let img=document.createElement('img');
      img.src=MapData[i];
      img.imgW=this.width;
      img.imgH=this.height;
      img.imgX=0;
      img.imgY=img.imgH*i;
      this.map.push(img);
    }
  }
  draw(paint){
    for (let i = 0; i <this.map.length ; i++) {
      paint.drawImage(this.map[i],this.map[i].imgX, this.map[i].imgY,this.map[i].width,this.map[i].height);
    }
  }
  logic(){
    for (let i = 0; i < this.map.length; i++) {
      this.map[i].imgY-=0.5;
      if (this.map[i].imgY < -this.map[i].imgH)
        this.map[i].imgY = (this.map.length - 1) * this.map[i].imgH;
    }
  }
  run(paint){
    this.logic();
    this.draw(paint);
  }
}