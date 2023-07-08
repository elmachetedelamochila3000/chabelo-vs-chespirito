song = "";

function preload(){
    song = loadSound("music.mp3");

}
scoreRightWrist = 0;
scoreLeftWrist = 0;

rightWristX =0;
rightWristY = 0;

leftWristX = 0;
leftWristY = 0;

function setup(){
    canvas = createCanvas (600, 500);
    canvas.center();

    video = createCapture(VIDEO);
    video.hide();

    poseNet = ml5.poseNet(video, modelLoaded);
    poseNet.on('pose', gotPoses);
}
 
function modelLoaded(){
    console.log('PoseNet inicializado siuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuu punto y coma');
}

function gotPoses(results){
    console.log("longitud de la matrix "+results.length);
    if(results.length >0){
        console.log(results);
       
        scoreRightWrist = results[0].pose.keypoints[10].score;
        scoreLeftWrist = results[0].pose.keypoints[9].score;
        console.log("muñeca Derecha = " + scoreRightWrist + "muñeca izquierda = "+ scoreLeftWrist);
        rightWristY = results[0].pose.rightWrist.y;
        rightWristX = results[0].pose.rightWrist.x;      
        console.log("muñeca derecha y = " + rightWristY);
        leftWristY = results[0].pose.leftWrist.y;
        leftWristX = results[0].pose.leftWrist.x;        
        console.log("muñeca izquierda y= " +leftWristY);

    }
}
function draw(){
    image(video, 0, 0, 600, 500);

    fill("#8B0000");
    stroke("#00BFFF");
    if(scoreRightWrist > 0.2){
        circle(rightWristX, rightWristY,20);
        if(rightWristY >0 && rightWristY <=100){
            document.getElementById("speed").innerHTML= "Speed = 0.5";
            song.rate(0.5);
        }else if(rightWristY >100 && rightWristY <=200){
            document.getElementById("speed").innerHTML= "Speed = 0.7";
            song.rate(0.7);
        }else if(rightWristY >200 && rightWristY <=300){
            document.getElementById("speed").innerHTML= "Speed = 0.9";
            song.rate(0.9);
        }else if(rightWristY >300 && rightWristY <=400){
        document.getElementById("speed").innerHTML= "Speed = 1.1";
        song.rate(1.1);
        }else if(rightWristY >400){
            document.getElementById("speed").innerHTML= "Speed = 1.5";
            song.rate(1.5);
        }   
    }
    if(scoreLeftWrist > 0.2){
        circle(leftWristX,leftWristY,20);

        InNumberleftWristY = Number(leftWristY);
        console.log("numero int "+InNumberleftWristY);
        remove_decimals = floor(InNumberleftWristY);
        console.log("Number sin decimal "+ remove_decimals);
        volume = remove_decimals/500;
        console.log("volumen "+volume);
        document.getElementById("volumen").innerHTML = "Volumen = " + volume;
        song.setVolume(volume);
    }
    }        
function tocar(){
    song.play();
    song.setVolume(1);
    song.rate(1);
}

function Stop(){
    song.stop();
}