// JavaScript source code

function check(entry) {
    console.log(entry);
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

function succes(data) {
    if (data != "succes!") {
        alert(data);
        return;
    }
    var x = document.getElementById("snackbar");
    x.className = "show";
    setTimeout(function () { x.className = x.className.replace("show", ""); }, 3000);
}


function add(e) {
    var name = document.getElementById('namein').value.toString().trim();
    var icon = document.getElementById('iconin').value.toString().trim();
    var game = document.getElementById('gamein').value.toString().trim();
    var mode = 'add';

    if (check('name') || check('icon') || check('game')) {
        return;
    }

    document.getElementById('iconin').value = '';
    document.getElementById('namein').value = '';

    fetch(`https://script.google.com/macros/s/AKfycbwFWA1dIUS5MNzViMYtNT97Z5l3PsiJgXpCXrw4GLauFBPH_V8/exec?mode=${mode}&name=${name}&icon=${icon}&game=${game}`)
        .then(response => response.text())
        .then(data => succes(data));

}

