function load() {
    request();
}

function process(obj) {
    console.log(obj);
}

function request() {
    var request = new XMLHttpRequest();
    request.open("GET", "https://script.google.com/macros/s/AKfycbxlnSbYs0jokS6KXF_OPSvcsngIxHObD6Iowy_N0ow9qfwTDDY/exec");
    request.timeout = 30000;
    request.ontimeout = function() {
        document.getElementById("wrapper").innerHTML = "<p>Error connecting to server</p>";
    };
    request.onreadystatechange = function() {
        if (request.readyState == 4 && request.status == 200) {
            process(JSON.parse(request.responseText));
        }
    };
    request.send();
}