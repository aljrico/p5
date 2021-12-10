// =====================
// "app/sketch.js"
// =====================
let myCanvas;

const idCanvas = 'divCanvas';
// const URL = "https://jeroen.github.io/images/frink.png";
// let URL = "http://jeroen.github.io/images/tiger.svg";
const URL = null;
let img = null;
let imgX = 30;
let imgY = 30;
let diff = 0;
let startImgX = 0;
let startImgY = 0;
let backgroundColour = "#FAFAFA";
const canvasWidth = 1181;
const canvasHeight = 1653;
let reductionRatio = 0.35;
let imageWidth = null;
let imageHeight = null;
let imagePath = null;

Shiny.addCustomMessageHandler('change-color', function(msg) {
  backgroundColour = msg.colour;
});

Shiny.addCustomMessageHandler('change-logo', function(msg) {
  imagePath = msg.filepath;
  img = loadImage(imagePath);
});


Shiny.addCustomMessageHandler('save', function(msg) {
  myCanvas.hide();
  Shiny.setInputValue("image_loading", makeid(16));
  loadImage(imagePath, img => {
    /* img.remove();
    resizeCanvas(canvasWidth, canvasHeight);
    const scaledX = imgX / reductionRatio;
    const scaledY = imgY / reductionRatio;
    image(img, scaledX, scaledX); */
    //const dataURL = myCanvas.elt.toDataURL('image/svg+xml');
    const dataURL = myCanvas.elt.toDataURL();
    //const imageBase64String = dataURL.replace(/^data:image\/svg\+xml;charset\=utf-8,/, "");
    const imageBase64String = dataURL.replace(/^data:image\/(png|jpg);base64,/, "");
    Shiny.setInputValue("imageBase64String", {base64: imageBase64String, url: dataURL});
  });
});

function mousePressed() {
  startImgX = mouseX;
  startImgY = mouseY;
}

function mouseDragged() {
	diff = startImgX - mouseX;
  imgX = imgX - diff;
  startImgX = mouseX;

  diff = startImgY - mouseY;
  imgY = imgY - diff;
  startImgY = mouseY;
}

function setup() {
  myCanvas = createCanvas(canvasWidth * reductionRatio, canvasHeight * reductionRatio);
  myCanvas.id(idCanvas);
}

function draw() {
  // myCanvas.drawingContext.__clearCanvas();
  background(backgroundColour);
  if(img){
    image(img, imgX, imgY);
/*
    if(!imageWidth & img.width != 1){
      imageWidth = img.width;
      imageHeight = img.height;
      img.resize(img.width * reductionRatio, img.height * reductionRatio);
    }
    */
  }
}

function keyTyped() {
  if (key === 's') {
    save();
  }
}

function makeid(length) {
    var result           = '';
    var characters       = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    var charactersLength = characters.length;
    for ( var i = 0; i < length; i++ ) {
      result += characters.charAt(Math.floor(Math.random() * charactersLength));
   }
   return result;
}
