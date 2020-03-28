function load() {
    
}

function process(obj) {
    console.log(obj);
}

function request(name, prayer) {
    var request = new XMLHttpRequest();
    request.open("POST", "https://script.google.com/macros/s/AKfycbxlnSbYs0jokS6KXF_OPSvcsngIxHObD6Iowy_N0ow9qfwTDDY/exec");
    request.timeout = 30000;
    request.ontimeout = function() {
        document.getElementById("").innerHTML = "<p>Couldn't Connect to Server</p><hr>";
    };
    request.onreadystatechange = function() {
        if (request.readyState == 4 && request.status == 200) {
            process(JSON.parse(this.responseText));
        }
    };
    request.send();
}