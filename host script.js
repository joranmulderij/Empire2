// JavaScript source code

function check(entry) {
    var text = document.getElementById(entry + 'in').value;
    if (text.length == 0) {
        document.getElementById(entry + 'errortext').innerHTML = "This field is required!";
        document.getElementById(entry + 'error').hidden = '';
    }
    else if (text.length <= 2) {
        document.getElementById(entry + 'errortext').innerHTML = "This field has to contain at least 3 characters!";
        document.getElementById(entry + 'error').hidden = '';
    }
    else if (!RegExp('^[A-Za-z ]+$').test(text)) {
        document.getElementById(entry + 'errortext').innerHTML = "This field can only contain letters and spaces!";
        document.getElementById(entry + 'error').hidden = '';
    }
    /*else if (!RegExp('^[A-Za-z][A-Za-z ]+$').test(text)) {
        document.getElementById(entry + 'errortext').innerHTML = "Field cannot start with a space!";
        document.getElementById(entry + 'error').hidden = '';
    }*/
    else {
        document.getElementById(entry + 'error').hidden = 'hidden';
        return false;
    }
    return true;
}


function talkall(names) {
    if (names.length == 1) {
        alert(names[0]);
        return;
    }
    talk(names.concat(names));
}

function talk(names) {
    var x = document.getElementById("snackbar");
    x.innerHTML = names[0];
    x.className = "show";
    setTimeout(function () { x.className = x.className.replace("show", ""); }, 3000);
    if (names.length == 1) {
        var msg = new SpeechSynthesisUtterance(names[0]);
        window.speechSynthesis.speak(msg);
        return;
    }
    var msg = new SpeechSynthesisUtterance(names[0]);
    window.speechSynthesis.speak(msg)
    setTimeout(function () { talk(names.slice(1)) }, 4000, names);
}

function succes(data) {
    if (data != "succes!") {
        alert(data);
        return;
    }
    var x = document.getElementById("snackbar");
    x.innerHTML = 'Your Game has been succesfully started!';
    x.className = "show";
    setTimeout(function () { x.className = x.className.replace("show", ""); }, 3000);
}

function start() {
    var name = '';
    var icon = '';
    var game = document.getElementById('gamein').value.toString().trim();
    var mode = 'start';

    if (check('game')) {
        return;
    }

    fetch(`https://script.google.com/macros/s/AKfycbwFWA1dIUS5MNzViMYtNT97Z5l3PsiJgXpCXrw4GLauFBPH_V8/exec?mode=${mode}&name=${name}&icon=${icon}&game=${game}`)
        .then(response => response.text())
        .then(data => succes(data));
}

function end() {
    var name = '';
    var icon = '';
    var game = document.getElementById('gamein').value.toString().trim();
    var mode = 'stop';

    if (check('game')) {
        return;
    }

    fetch(`https://script.google.com/macros/s/AKfycbwFWA1dIUS5MNzViMYtNT97Z5l3PsiJgXpCXrw4GLauFBPH_V8/exec?mode=${mode}&name=${name}&icon=${icon}&game=${game}`)
        .then(response => response.text())
        .then(data => talkall(data.split('#')));
}