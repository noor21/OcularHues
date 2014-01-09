function width() {
    return (window.innerWidth > 0) ? window.innerWidth : screen.width;
}
function height() {
    return (window.innerHeight > 0) ? window.innerHeight - 5 : screen.height;
}
function getRandomInt(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
}
function distTwoPoints(x1, y1, x2, y2) {
    return Math.sqrt(Math.pow(x2 - x1, 2) + Math.pow(y2 - y1, 2));
}
function overlaps(x, y) {
    var olaps = false;
    for (var i = 0; i < n_X.length; ++i) {
        if (distTwoPoints(n_X[i], n_Y[i], x, y) < 2 * spacer * _r) {
            olaps = true;
            break;
        }
    }
    if (olaps)
        return olaps;
    for (var i = 0; i < c_X.length; ++i) {
        if (distTwoPoints(c_X[i], c_Y[i], x, y) < 2 * spacer * _r) {
            olaps = true;
            break;
        }
    }
    if (olaps)
        return olaps;
    for (var i = 0; i < s_X.length; ++i) {
        if (distTwoPoints(s_X[i], s_Y[i], x, y) < 2 * spacer * _r) {
            olaps = true;
            break;
        }
    }
    return olaps;
}
function setGameColors() {
    mainColor = "rgb(" + R + "," + G + "," + B + ")";
    var g = G;
    var b = B;
    var dd = getRandomInt(2, 3);
    isblue = (dd == 3);
    if (dd == 2) { g += (11 - level) * 10; }
    if (dd == 3) { b += (11 - level) * 10; }
    adjustedColor = "rgb(" + R + "," + g + "," + b + ")";
}

function RefreshStats() {
    if (!localStorage.greenmissed)
        localStorage.greenmissed = 0;
    if (!localStorage.greentapped)
        localStorage.greentapped = 0;
    if (!localStorage.bluetapped)
        localStorage.bluetapped = 0;
    if (!localStorage.bluemissed)
        localStorage.bluemissed = 0;

    var gr_tapped_p = Math.round((Number(localStorage.greentapped) * 100) / (Number(localStorage.greenmissed) + Number(localStorage.greentapped)));
    var gr_missed_p = Math.round((Number(localStorage.greenmissed) * 100) / (Number(localStorage.greenmissed) + Number(localStorage.greentapped)));
    var bl_tapped_p = Math.round((Number(localStorage.bluetapped) * 100) / (Number(localStorage.bluemissed) + Number(localStorage.bluetapped)));
    var bl_missed_p = Math.round((Number(localStorage.bluemissed) * 100) / (Number(localStorage.bluemissed) + Number(localStorage.bluetapped)));

    $('#gr_total').html(Number(localStorage.greenmissed) + Number(localStorage.greentapped));
    $('#bl_total').html(Number(localStorage.bluemissed) + Number(localStorage.bluetapped));
    $('#gr_tapped').html(Number(localStorage.greentapped) + " (" + gr_tapped_p + "%)");
    $('#bl_tapped').html(Number(localStorage.bluetapped) + " (" + bl_tapped_p + "%)");
    $('#gr_missed').html(Number(localStorage.greenmissed) + " (" + gr_missed_p + "%)");
    $('#bl_missed').html(Number(localStorage.bluemissed) + " (" + bl_missed_p + "%)");
}

function RefreshScores() {
    if (!localStorage.points)
        localStorage.points = 0;

    if (!localStorage.tmd_level1)
        localStorage.tmd_level1 = 0;
    if (!localStorage.tmd_level2)
        localStorage.tmd_level2 = 0;
    if (!localStorage.tmd_level3)
        localStorage.tmd_level3 = 0;
    if (!localStorage.tmd_level4)
        localStorage.tmd_level4 = 0;
    if (!localStorage.tmd_level5)
        localStorage.tmd_level5 = 0;
    if (!localStorage.tmd_level6)
        localStorage.tmd_level6 = 0;
    if (!localStorage.tmd_level7)
        localStorage.tmd_level7 = 0;
    if (!localStorage.tmd_level8)
        localStorage.tmd_level8 = 0;
    if (!localStorage.tmd_level9)
        localStorage.tmd_level9 = 0;
    if (!localStorage.tmd_level10)
        localStorage.tmd_level10 = 0;

    if (!localStorage.level1)
        localStorage.level1 = 0;
    if (!localStorage.level2)
        localStorage.level2 = 0;
    if (!localStorage.level3)
        localStorage.level3 = 0;
    if (!localStorage.level4)
        localStorage.level4 = 0;
    if (!localStorage.level5)
        localStorage.level5 = 0;
    if (!localStorage.level6)
        localStorage.level6 = 0;
    if (!localStorage.level7)
        localStorage.level7 = 0;
    if (!localStorage.level8)
        localStorage.level8 = 0;
    if (!localStorage.level9)
        localStorage.level9 = 0;
    if (!localStorage.level10)
        localStorage.level10 = 0;

    $('#tlt_points').html(localStorage.points);

    if (istimelimit) {
        $('#a_level1').html("Level 1 (" + localStorage.tmd_level1 + " points)<span class=\"li_i\"><img src=\"img/arrowright.png\"/></span>");
        $('#a_level2').html("Level 2 (" + localStorage.tmd_level2 + " points)<span class=\"li_i\"><img src=\"img/arrowright.png\"/></span>");
        $('#a_level3').html("Level 3 (" + localStorage.tmd_level3 + " points)<span class=\"li_i\"><img src=\"img/arrowright.png\"/></span>");
        $('#a_level4').html("Level 4 (" + localStorage.tmd_level4 + " points)<span class=\"li_i\"><img src=\"img/arrowright.png\"/></span>");
        $('#a_level5').html("Level 5 (" + localStorage.tmd_level5 + " points)<span class=\"li_i\"><img src=\"img/arrowright.png\"/></span>");
        $('#a_level6').html("Level 6 (" + localStorage.tmd_level6 + " points)<span class=\"li_i\"><img src=\"img/arrowright.png\"/></span>");
        $('#a_level7').html("Level 7 (" + localStorage.tmd_level7 + " points)<span class=\"li_i\"><img src=\"img/arrowright.png\"/></span>");
        $('#a_level8').html("Level 8 (" + localStorage.tmd_level8 + " points)<span class=\"li_i\"><img src=\"img/arrowright.png\"/></span>");
        $('#a_level9').html("Level 9 (" + localStorage.tmd_level9 + " points)<span class=\"li_i\"><img src=\"img/arrowright.png\"/></span>");
        $('#a_level10').html("Level 10 (" + localStorage.tmd_level10 + " points)<span class=\"li_i\"><img src=\"img/arrowright.png\"/></span>");
    } else {
        $('#a_level1').html("Level 1 (" + localStorage.level1 + " points)<span class=\"li_i\"><img src=\"img/arrowright.png\"/></span>");
        $('#a_level2').html("Level 2 (" + localStorage.level2 + " points)<span class=\"li_i\"><img src=\"img/arrowright.png\"/></span>");
        $('#a_level3').html("Level 3 (" + localStorage.level3 + " points)<span class=\"li_i\"><img src=\"img/arrowright.png\"/></span>");
        $('#a_level4').html("Level 4 (" + localStorage.level4 + " points)<span class=\"li_i\"><img src=\"img/arrowright.png\"/></span>");
        $('#a_level5').html("Level 5 (" + localStorage.level5 + " points)<span class=\"li_i\"><img src=\"img/arrowright.png\"/></span>");
        $('#a_level6').html("Level 6 (" + localStorage.level6 + " points)<span class=\"li_i\"><img src=\"img/arrowright.png\"/></span>");
        $('#a_level7').html("Level 7 (" + localStorage.level7 + " points)<span class=\"li_i\"><img src=\"img/arrowright.png\"/></span>");
        $('#a_level8').html("Level 8 (" + localStorage.level8 + " points)<span class=\"li_i\"><img src=\"img/arrowright.png\"/></span>");
        $('#a_level9').html("Level 9 (" + localStorage.level9 + " points)<span class=\"li_i\"><img src=\"img/arrowright.png\"/></span>");
        $('#a_level10').html("Level 10 (" + localStorage.level10 + " points)<span class=\"li_i\"><img src=\"img/arrowright.png\"/></span>");
    }
}