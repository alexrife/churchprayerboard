function load() {
    
}

function process(obj) {
    document.getElementById("error").innerHTML = "<p>Sent!</p><hr>";
    if (obj.result == "error") {
        document.getElementById("error").innerHTML = "<p>An Error has occured: " + obj.error.message + "</p><hr>";
    }
}

function request(name, prayer) {
    var request = new XMLHttpRequest();
    request.open("POST", "https://script.google.com/macros/s/AKfycbxlnSbYs0jokS6KXF_OPSvcsngIxHObD6Iowy_N0ow9qfwTDDY/exec?cmd=new");
    request.timeout = 30000;
    request.ontimeout = function() {
        document.getElementById("error").innerHTML = "<p>Couldn't Connect to Server</p><hr>";
    };
    request.onreadystatechange = function() {
        if (request.readyState == 4 && request.status == 200) {
            process(JSON.parse(this.responseText));
            document.getElementById("submit").onclick = submitHandler;
        }
    };
    request.send(JSON.stringify({
        name:name,
        prayer:prayer
    }));
};
function submitHandler() {
    document.getElementById("error").innerHTML = "";
    document.getElementById("submit").onclick = function(){};
    var name = document.getElementById("name").value;
    var prayer = document.getElementById("prayer").value;
    if (!(/^\w.*\w$/.test(name)) && !(/^\w$/.test(name)) && name != "") return;
    if (!(/^.+$/.test(prayer))) return;
    if (name == "" || name == null) name = "Anonymous";
    request(name, prayer);
    document.getElementById("name").value = "";
    document.getElementById("prayer").value = "";
}