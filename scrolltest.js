console.log('It works!');

var rainbow = new Rainbow();
var best = 0;
rainbow.setSpectrum("#59e3ff","#ff0055","#cc00cc");
rainbow.setNumberRange(0, 25000);
window.addEventListener('wheel', mouseWheelEvent);   
var lastSecond = [];

function mouseWheelEvent(e) {
  lastSecond.push({delta:Math.floor(Math.abs(e.deltaY)), timestamp: new Date().getTime()});
}
setInterval(function(){
  var pixelsPerSecond = displayLastSecond();
  if(pixelsPerSecond > best){
    best = pixelsPerSecond;
  }
  $(".pixels").text(numberWithCommas(pixelsPerSecond) + " pixels per second");
  console.log(makeGradient(pixelsPerSecond));
  $("body").css("background", "#" + rainbow.colourAt(pixelsPerSecond));
  if(pixelsPerSecond < 140001){
    $(".pixels").css("font-size",fontSize(pixelsPerSecond) + "px");
  }
  if(pixelsPerSecond > 0){
    $(".headline").css("display", "none");
    $(".container").css("display", "block");
  }else{
    var headline = "Use your mouse wheel to scroll!";
    if(best > 0){
      headline += "<div class='best'>Your best is "+ numberWithCommas(best)+" pixels per second</div>";
      $(".headline").css("height", "100px");
    }
    $(".headline").html(headline);
    $(".headline").css("display", "block");
    $(".container").css("display", "none");
  }
}, 50);

function displayLastSecond(){
  var now = new Date().getTime();
  var total = 0;
  var timestamps = 0;
  for(var x = 0; x < lastSecond.length; x++){
    if(now - lastSecond[x].timestamp <= 1000){
      total += lastSecond[x].delta;
      timestamps++;
    }else{
      lastSecond.splice(x, 1);
      x--;
    }
  }
  if(timestamps == 0){
    return 0;
  }
  return Math.round(total);
}
function fontSize(pps){
  return 32 + 20 * pps/25000;
}
function numberWithCommas(x) {
    return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
}
function makeGradient(pps){
  var color1 = rainbow.colourAt(pps);
  var color2 = rainbow.colourAt(pps+5000);
  return "radial-gradient(40% 40% at center, #" + color2 + ", #" + color1 + ")";
}