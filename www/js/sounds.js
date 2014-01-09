var p_laser;
var p_drop;

function InitSounds() {
    p_drop = document.getElementById('s_electric_drop');
    p_laser = document.getElementById('s_laser');
}
function PlayLaserEffect() {
    p_laser.currentTime = 0;
    p_laser.play();
}
function PlayDropEffect() {
    p_drop.currentTime = 0;
    p_drop.play();
}