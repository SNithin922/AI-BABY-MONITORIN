img = "";
status="";
object= [];
song = "";




function setup()
{
    canvas = createCanvas(380,380);
    canvas.center();
    video = createCapture(VIDEO);
    video.size(380,380);
    video.hide();
}
function preload()
{
    song = loadSound("alarm.mp3");
}
function draw()
{
    image(video,0,0,380,380);
    if(status != "")
    {
        song.stop();
        for(i=0; i<object.length;i++)
        {
            r = random(255);
            g = random(255);
            b = random(255);
            document.getElementById("status").innerHTML = "baby is detected";
            document.getElementById("number_of_objects").innerHTML ="Number of object detected are : " +object.length;
            fill(r,g,b);
            percent = floor(object[i].confidence*100);
            text(object[i].label+ " "+percent+"%",object[i].x,object[i].y);
            noFill();
            stroke(r,g,b);
            rect(object[i].x,object[i].y,object[i].width,object[i].height);
        }
    }
    else
    {
          document.getElementById("status").innerHTML = "baby is not detected";
          song.start();
    }
}
function modelLoaded()
{
    console.log("model loaded");
    status = true;
    object_detector.detect(video,gotResult);
}
function gotResult(error,results)
{
    if(error)
    {
        console.log("error");
    }
    console.log(results);
    object = results;
}
function start()
{
    object_detector = ml5.objectDetector('cocossd',modelLoaded);
    document.getElementById("status").innerHTML = "status-detecting objects";
}