var latestObj = {};
function load() {
    request();
}

function process(obj) {
    latestObj = obj;
    var html = "";
    for (var i in obj.prayer) {
        html = html.concat("<div class=\"prayercontainer\"><span class=\"prayer\">" + obj.prayer[i] + "</span></div>");
        html = html.concat("<span id=\"n" + String(i) + "\" class=\"name\">By " + obj.name[i] + " - " + obj.likes[i] + " people prayed for this</span><br>");
        html = html.concat("<button id=\"b" + String(i) + "\" class=\"pray\" onclick=\"like(" + String(i) + ");\">I prayed for this</button><hr>");
    }
    if (obj.prayer.length == 0) {
        html = html.concat("<span>No prayers have been submitted yet</span>");
    }
    document.getElementById("prayers").innerHTML = html;
}

function request() {
    var request = new XMLHttpRequest();
    request.open("GET", "https://script.google.com/macros/s/AKfycbxlnSbYs0jokS6KXF_OPSvcsngIxHObD6Iowy_N0ow9qfwTDDY/exec?cmd=get");
    request.timeout = 30000;
    request.ontimeout = function() {
        document.getElementById("wrapper").innerHTML = "<p>Error connecting to server</p>";
    };
    request.onreadystatechange = function() {
        if (request.readyState == 4 && request.status == 200) {
            var obj = JSON.parse(request.responseText);
            obj.name.reverse();
            obj.prayer.reverse();
            obj.likes.reverse();
            process(obj);
        }
    };
    request.send();
}

function like(index) {
    document.getElementById("b" + String(index)).onclick = null;
    document.getElementById("n" + String(index)).innerHTML = "By " + latestObj.name[index] + " - " + String(Number(latestObj.likes[index]) + 1) + " people prayed for this";
    index = (latestObj.prayer.length - 1) - index;
    var request = new XMLHttpRequest();
    request.open("POST", "https://script.google.com/macros/s/AKfycbxlnSbYs0jokS6KXF_OPSvcsngIxHObD6Iowy_N0ow9qfwTDDY/exec?cmd=like");
    request.timeout = 30000;
    request.ontimeout = function() {
        document.getElementById("wrapper").innerHTML = "<p>Error connecting to server</p>";
    };
    request.onreadystatechange = function() {
        if (request.readyState == 4 && request.status == 200) {
        }
    };
    request.send(JSON.stringify({
        index: index
    }));
}