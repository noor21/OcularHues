$(document).ready(function () {

    //Events for all the links
    $('#a_unlimited').click(function (event) {
        event.preventDefault();
        istimelimit = false;
        RefreshScores();
        slide("#Page2");
    });
    $('#a_limited').click(function (event) {
        event.preventDefault();
        istimelimit = true;
        RefreshScores();
        slide("#Page2");
    });

    $('#a_userstats').click(function (event) {
        event.preventDefault();
        slide("#Page3");
        RefreshStats();
    });

    $('#a_about').click(function (event) {
        event.preventDefault();
        slide("#Page4");
    });

    $('#a_about').click(function (event) {
        event.preventDefault();
        slide("#Page4");
    });

    $('.level_link').click(function (event) {
        event.preventDefault();
        level = Number(event.target.id.split(/level/)[1]);
        codeToRunAfterwards = "StartGame()";
        slide("#Page5");
    });

    RefreshScores();
    RefreshStats();
});