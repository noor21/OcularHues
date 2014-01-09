var activepage = "#Page1";
var previouspage = "";
var issliding = false;

var codeToRunAfterwards = "";

//Load it up!
$(document).ready(function () {

    $(".Page").css("top", 46);
    $("#Page5").css("top", 0);

    updateWidths();

    //For the highlights
    if (navigator.appName.toLowerCase().indexOf("microsoft") != -1) {
        var extraCSS = '<style>.menuList ul li a:hover{background-color: #65AAD4/*#C5D4E2*/;color: #FCFEFC;}</style>';
        $('head').append(extraCSS);
    }

    loadPositions();

    $('#hdrButton').click(function (event) {
        event.preventDefault();
        $('#hdrButton').css('background-color', '#C5D4E2');
        slide(previouspage);
    });

}); function loadPositions() {
    //All pages except the root page should be directly off to the right of the screen
    $(".Page").css("left", width());

    $(activepage).css("left", 0);
    $(activepage).css("display", "block");
    $('#hdrButton').css("display", "none");
}

function unit(pageno) {
    var soFar = $(pageno).css("left").slice(0, -2);

    if (width() / 2 < soFar)
        return width() / 8;
    else
        return Math.pow(soFar, .85);// / 10;
}

function slide(pageno) {
    if (issliding) { return; }

    //If it's the game page
    //then we hide the header
    if (pageno == "#Page5") {
        $("#header").css('display', 'none');
    } else {
        $("#header").css('display', 'block');
    }

    window.scrollTo(0, 0);
    $(pageno).css("display", "block"); //display the page to the right.
    issliding = true;
    nextIncrement(pageno);
} function nextIncrement(pageno) {
    var current = $(activepage).css("left").slice(0, -2);
    var nextCurrent = current - unit(pageno);
    $(activepage).css("left", nextCurrent.toString() + "px");
    $(pageno).css("left", (nextCurrent + width()).toString() + "px");

    if (nextCurrent + width() < 0 || unit(pageno) < .1) {
        //We're done.
        $(activepage).css("display", "none");
        $(activepage).css("left", width());
        //Change the active page
        activepage = pageno;
        $(activepage).css("left", 0);

        //Page-specific actions
        if (activepage == "#Page1") {
            document.getElementById('hdrWplText').innerHTML = "OcularHues";
            $('#hdrButton').css("display", "none");
        }
        else {
            $('#hdrButton').css("display", "block");
        }

        if (activepage == "#Page2") {
            if (istimelimit)
                document.getElementById('hdrWplText').innerHTML = "Timelimit";
            else
                document.getElementById('hdrWplText').innerHTML = "Unlimited Time";
            previouspage = "#Page1";
        }

        if (activepage == "#Page3") {
            document.getElementById('hdrWplText').innerHTML = "Your Stats";
            previouspage = "#Page1";
        }

        if (activepage == "#Page4") {
            document.getElementById('hdrWplText').innerHTML = "About";
            previouspage = "#Page1";
        }

        if (activepage == "#Page5") {
            document.getElementById('hdrWplText').innerHTML = "Playing";
            previouspage = "#Page1";
        }

        document.getElementById('hdrButton').innerHTML = makeid();
        document.getElementById('hdrButton').innerHTML = "Back";
        $('#hdrButton').css('background-color', '#e6e6e6');

        if (navigator.userAgent.toLowerCase().indexOf("iphone") != -1)
            $('.menuList a').css('background-color', '#e6e6e6');

        issliding = false;

        if (codeToRunAfterwards != "") {
            var _store = codeToRunAfterwards;
            setTimeout(_store, 1);
            codeToRunAfterwards = "";
        }
    }
    else {
        setTimeout(function () { nextIncrement(pageno) }, 10);
    }
}

function makeid() {
    var text = "";
    var possible = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";

    for (var i = 0; i < 4; ++i)
        text += possible.charAt(Math.floor(Math.random() * possible.length));

    return text;
}

var la_fix = 0;
function updateWidths() {
    //All pages
    $(".Page").css("width", width());

    //Do this for all pages
    $(".Page").css("left", width());

    //And this will catch the active one
    $(activepage).css("left", 0);

    //Textboxes
    var txt_w = width() - 42;
    $('.txtBox').css("width", txt_w);

    if (la_fix < 10) {
        ++la_fix;
        setTimeout("updateWidths()", 30);
    }
    else {
        la_fix = 0;
    }
}