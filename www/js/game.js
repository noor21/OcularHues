var view;
var canvas;

var istimelimit = false;
var has_loaded = false;
var is_playing = false;

var star_timeout;
var adren_timeout;
var first_star = true;

var background_i;
var star_i;
var quit_i;

var _r = 20;
var spacer = 1.3;
var fatfinger = 1.3;

var n_X = new Array();
var n_Y = new Array();

var t_X = new Array();
var t_Y = new Array();
var t_Z = new Array();
var tapped = 0;

var c_X = new Array();
var c_Y = new Array();

var s_X = new Array();
var s_Y = new Array();
var stars = 0;

var R = 255;//61;
var G = 0;//84;
var B = 0;//89;
var mainColor = "";
var adjustedColor = "";
var accentColor = "#4d4d4d";
var tappedColor = "green";
var adrenColor = "rgba(0, 0, 180, 0.6)";
var tappedwaits = 20;

var startTime = 0;
var d_Date;
var time_checker;

var score = 0;
var level = 1;
var isadren = false;
var basespeed = 300;

var misseddots = 0;
var tappeddots = 0;
var isblue = false;

$(document).ready(function () {

    //Create the drawing board
    $('#Page5').prepend('<canvas id="view" width="' + width() + '" height="' + height() + '">Your browser does not support the canvas element.</canvas>');
    canvas = document.getElementById("view");
    view = document.getElementById("view").getContext("2d");

    //Add a click handler
    $('#view').mousedown(function (e) {
        canvasOnTap(e);
    });

    InitSounds();

    //Load Background Image
    background_i = new Image();
    background_i.src = "img/background.png";
    background_i.onload = function () {
        //Preliminary Background
        view.drawImage(background_i, 0, 0, width(), height());

        star_i = new Image();
        star_i.src = "img/star.png";
        star_i.onload = function () {
            quit_i = new Image();
            quit_i.src = "img/quit.png";
            quit_i.onload = function () {
                has_loaded = true;
            };
        };
    };
});

function StartGame() {

    //Place preliminary dots
    for (var i = 0; i < 15; ++i) {
        var postX = getRandomInt(_r, width() - _r);
        var postY = getRandomInt(0, -1 * height());
        while (overlaps(postX, postY)) {
            postX = getRandomInt(_r, width() - _r);
            postY = getRandomInt(0, -1 * height());
        }
        n_X[i] = postX;
        n_Y[i] = postY;
    }
    for (var i = 0; i < 5; ++i) {
        var postX = getRandomInt(_r, width() - _r);
        var postY = getRandomInt(0, -1 * height());
        while (overlaps(postX, postY)) {
            postX = getRandomInt(_r, width() - _r);
            postY = getRandomInt(0, -1 * height());
        }
        c_X[i] = postX;
        c_Y[i] = postY;
    }

    //Preliminary
    setGameColors();
    isadren = false;
    first_star = true;
    score = 0;
    misseddots = 0;
    tappeddots = 0;

    //Let's do this!!
    if (istimelimit) {
        d_Date = new Date();
        startTime = d_Date.getTime();
        time_checker = setInterval(function () {
            d_Date = new Date();
            var t_now = d_Date.getTime();
            if (t_now - startTime > 120000) {
                if (navigator.notification) {
                    navigator.notification.alert("Two minutes have elapsed.", null, "Time's Up!", "OK");
                } else {
                    alert("Time's Up! Two minutes have elapsed.");
                }
                QuitGame();
            }
        }, 5000);
    }

    is_playing = true;
    runGame();
    StartAdrenalineMeter(true);
    LoopStars();
}

function QuitGame() {
    //Ding ding! Time over.
    is_playing = false;

    var pts = Number(localStorage.points);
    pts += Number(score);
    localStorage.points = pts;

    if (istimelimit) {
        var ipts = Number(localStorage["tmd_level" + level]);
        ipts += Number(score);
        localStorage["tmd_level" + level] = ipts;
    } else {
        var ipts = Number(localStorage["level" + level]);
        ipts += Number(score);
        localStorage["level" + level] = ipts;
    }

    if (isblue) {
        var bmssd = Number(localStorage.bluemissed);
        bmssd += Number(misseddots);
        localStorage.bluemissed = bmssd;

        var btppd = Number(localStorage.bluetapped);
        btppd += Number(tappeddots);
        localStorage.bluetapped = btppd;
    } else {
        var gmssd = Number(localStorage.greenmissed);
        gmssd += Number(misseddots);
        localStorage.greenmissed = gmssd;

        var gtppd = Number(localStorage.greentapped);
        gtppd += Number(tappeddots);
        localStorage.greentapped = gtppd;
    }

    //Because the home screen has a display
    RefreshScores();

    clearTimeout(star_timeout);
    clearTimeout(adren_timeout);
    clearInterval(time_checker);
    slide(previouspage);
}

function canvasOnTap(e) {
    var best = 0;
    var bestvalue = -1;
    var is_colored = false;
    var is_star = false;

    //Let's just see if the quit button was pressed
    if (!istimelimit) {
        var d = distTwoPoints(e.pageX, e.pageY, width() - 25, 25);
        if (d < 15) {
            QuitGame();
        }
    }

    for (var i = 19; i >= 0; --i) {
        var d = distTwoPoints(e.pageX, e.pageY, n_X[i], n_Y[i]);
        if (d < fatfinger * _r) {
            if (d < bestvalue || bestvalue == -1) {
                bestvalue = d;
                best = i;
            }
        }
    }
    for (var i = 4; i >= 0; --i) {
        var d = distTwoPoints(e.pageX, e.pageY, c_X[i], c_Y[i]);
        if (d < fatfinger * _r) {
            if (d < bestvalue || bestvalue == -1) {
                bestvalue = d;
                best = i;
                is_colored = true;
            }
        }
    }
    for (var i = 0; i < stars; ++i) {
        var d = distTwoPoints(e.pageX, e.pageY, s_X[i], s_Y[i]);
        if (d < fatfinger * _r) {
            if (d < bestvalue || bestvalue == -1) {
                bestvalue = d;
                best = i;
                is_colored = false;
                is_star = true;
            }
        }
    }
    if (bestvalue != -1) {
        if (is_colored) {
            //Play Sound
            PlayDropEffect();
            //Do the tapped effect
            t_X[tapped] = c_X[best];
            t_Y[tapped] = c_Y[best];
            t_Z[tapped] = tappedwaits;
            ++tapped;
            //Restart the tapped dot.
            var h = height();
            var w = width();
            var postY = getRandomInt(-1 * h, 0);
            var postX = getRandomInt(_r, w - _r);
            while (overlaps(postX, postY)) {
                postY = getRandomInt(-1 * h, 0);
                postX = getRandomInt(_r, w - _r);
            }
            c_Y[best] = postY;
            c_X[best] = postX;
            if (isadren) {
                score += 200;
            } else {
                score += 10;
            }
            ++tappeddots;
        } else if (is_star) {
            //Play Sound
            PlayLaserEffect();

            s_Y.splice(best, 1);
            s_X.splice(best, 1);
            --stars;
            if (isadren) {
                score += 1000;
            } else {
                score += 500;
            }
        } else {
            if (isadren) {
                score -= 80;
            } else {
                score -= 20;
            }
        }
    }
}

function runGame() {

    //Update game situation
    UpdateMovements();
    DrawGame();

    if (is_playing)
        setTimeout("runGame()", 20);
}

function UpdateMovements() {
    var h = height();
    var w = width();

    var sp = basespeed;
    if (isadren)
        sp /= 3;

    for (var i = 0; i < 15; ++i) {
        if (n_Y[i] > h) {
            var postY = getRandomInt(-1 * h, 0);
            var postX = getRandomInt(_r, w - _r);
            while (overlaps(postX, postY)) {
                postY = getRandomInt(-1 * h, 0);
                postX = getRandomInt(_r, w - _r);
            }
            n_Y[i] = postY;
            n_X[i] = postX;
        } else {
            //Just lamely move it down the screen
            n_Y[i] += h / sp;
        }
    }

    for (var i = 0; i < 5; ++i) {
        if (c_Y[i] > h) {
            var postY = getRandomInt(-1 * h, 0);
            var postX = getRandomInt(_r, w - _r);
            while (overlaps(postX, postY)) {
                postY = getRandomInt(-1 * h, 0);
                postX = getRandomInt(_r, w - _r);
            }
            c_Y[i] = postY;
            c_X[i] = postX;
            ++misseddots;
        } else {
            //Just lamely move it down the screen
            c_Y[i] += h / sp;
        }
    }

    for (var i = 0; i < t_X.length; ++i) {
        if (t_Z[i] == 0) {
            //Time's up! Delete the dot.
            t_Z.splice(i, 1);
            t_Y.splice(i, 1);
            t_X.splice(i, 1);
            --tapped;
        } else {
            //Count down to elimination
            --t_Z[i];
            //Move it down the screen
            t_Y[i] += h / sp;
        }
    }

    for (var i = 0; i < s_X.length; ++i) {
        if (s_Y[i] > h) {
            //It wasn't tapped!
            s_Y.splice(i, 1);
            s_X.splice(i, 1);
            --stars;
        } else {
            //Move it down the screen
            s_Y[i] += h / sp;
        }
    }
}

function DrawGame() {
    //Background
    view.drawImage(background_i, 0, 0, width(), height());

    //Adrenaline?
    if (isadren) {
        view.fillStyle = adrenColor;
        view.fillRect(0, 0, width(), height());
    }

    //Normal dots
    for (var i = 0; i < n_X.length; ++i) {
        if (n_Y[i] >= 0) {
            //var crc = view.createRadialGradient(n_X[i], n_Y[i], _r / 3, n_X[i], n_Y[i], _r);
            //crc.addColorStop(0, mainColor);
            //crc.addColorStop(1, accentColor);

            view.beginPath();
            view.arc(n_X[i], n_Y[i], _r, 0, 2 * Math.PI);
            view.fillStyle = mainColor;//crc;
            view.fill();
        }
    }

    //Off-Colored dots
    for (var i = 0; i < c_X.length; ++i) {
        if (c_Y[i] >= 0) {
            //var crc = view.createRadialGradient(c_X[i], c_Y[i], _r / 3, c_X[i], c_Y[i], _r);
            //crc.addColorStop(0, adjustedColor);
            //crc.addColorStop(1, accentColor);

            view.beginPath();
            view.arc(c_X[i], c_Y[i], _r, 0, 2 * Math.PI);
            view.fillStyle = adjustedColor;//crc;
            view.fill();
        }
    }

    //Tapped dots
    for (var i = 0; i < t_X.length; ++i) {
        view.beginPath();
        view.arc(t_X[i], t_Y[i], (t_Z[i] / tappedwaits) * _r, 0, 2 * Math.PI);
        view.fillStyle = tappedColor;
        view.fill();
    }

    //Stars
    for (var i = 0; i < s_X.length; ++i) {
        view.drawImage(star_i, s_X[i] - 20, s_Y[i] - 20, 40, 40);
    }

    //Game Controls
    view.font = "35px DigitalDream";
    var gradient = view.createLinearGradient(0, 0, 100, 0);
    gradient.addColorStop("0", "red");
    gradient.addColorStop("0.5", "green");
    gradient.addColorStop("1.0", "blue");
    view.fillStyle = "yellow";
    view.fillText(score, 10, 40);
    view.strokeStyle = gradient;
    view.strokeText(score, 10, 40);
    if (!istimelimit) {
        view.drawImage(quit_i, width() - 40, 10, 30, 30);
    }
}

function doAdrenaline() {
    isadren = true;
    fatfinger = 2;

    //End it in 10 sec
    var wait = 10000;
    adren_timeout = setTimeout(function () { StartAdrenalineMeter(false); }, wait);
}
function StartAdrenalineMeter(varcheck) {
    if (!varcheck) {
        //Finished
        isadren = false;
        fatfinger = 1.3;
        //Now Start again
        adren_timeout = StartAdrenalineMeter(true);
    }
    else {
        //Start again
        if (is_playing) {
            var wait = getRandomInt(10000, 40000); //10-40 sec
            adren_timeout = setTimeout(function () { doAdrenaline(); }, wait);
        }
    }
}

function CreateStar() {
    var postY = getRandomInt(-1 * height(), 0);
    var postX = getRandomInt(_r, width() - _r);
    while (overlaps(postX, postY)) {
        postY = getRandomInt(-1 * height(), 0);
        postX = getRandomInt(_r, width() - _r);
    }
    s_X[stars] = postX;
    s_Y[stars] = postY;
    ++stars;
}

function LoopStars() {
    //Skip the very first time.
    if (!first_star)
        CreateStar();

    first_star = false;
    if (is_playing) {
        var wait = getRandomInt(50000, 120000); //50-120 sec
        star_timeout = setTimeout(function () { LoopStars(); }, wait);
    }
}