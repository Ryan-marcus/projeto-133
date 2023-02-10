
objects=[]
modelStatus=""
img=""
function preload() {
    img=loadImage("dog_cat.jpg")
}
function setup() {
    canvas=createCanvas(640,420)
    canvas.center()
    objectDetector=ml5.objectDetector("cocossd",modelLoaded)
    document.getElementById("status").innerHTML="status:detectando o objeto"
}
function modelLoaded() {
    console.log("modelo carregado")
    modelStatus=true
    objectDetector.detect(img,gotResults)
}
function gotResults(error,results) {
    if (error) {
        console.error(error)
    } else {
        console.log(results)
        objects=results
    }
    
}
function draw() {
    image(img,0,0,640,420)
    if (modelStatus!="") {
        for(i=0; i<objects.length; i++){
            document.getElementById("status").innerHTML="status: objeto detectado"
            fill("red")
            percent=floor(objects[i].confidence*100)
            text(objects[i].label+""+percent+"%",objects[i].x+15,objects[i].y+15)
            noFill()
            stroke("yellow")
            rect(objects[i].x,objects[i].y,objects[i].width,objects[i].height)
        }
    }
    
}