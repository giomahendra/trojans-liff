window.onload = function() {
    const useNodeJS = false; 
    const defaultLiffId = "1638870522-PnjreV13";
    let myLiffId = "1638870522-PnjreV13";

    if (useNodeJS) {
        fetch('/liff/send-id', {
            headers: {
                "referer": "https://apitrojans.xyz/"
            }
        })
        .then(function(reqResponse) {
            return reqResponse.json();
        })
        .then(function(jsonResponse) {
            myLiffId = jsonResponse.id;
            initializeLiff(myLiffId);
        })
        .catch(function(error) {
            console.log(error.message, error.code);
        });
    } else {
        myLiffId = defaultLiffId;
        initializeLiff(myLiffId);
    }
    $('button').hover(function(){
    $('.glitch-wrapper').toggleClass('paused');
    $('body').toggleClass('paused');
    });
};

function initializeLiff(myLiffId) {
    liff
        .init({
            liffId: myLiffId
        })
        .then(() => {
            sendLiff();
        })
        .catch((err) => {
            console.log(err);
        });
}

function sendLiff(){
    var tipe = getParameterByName('type');
    if (tipe === 'text') {
        liff.sendMessages([{
            type: 'text',
            text: getParameterByName('text'),
            sentBy: {
                label: "Trojans Liff",
                iconUrl: "https://apitrojans.xyz/static/bs5/assets/img/icon/favicon.png",
                linkUrl: "https://apitrojans.xyz/"
            }
        }]).then(function () {
            liff.closeWindow();
        });
    } else if (tipe === 'image') {
        liff.sendMessages([{
            type: 'image',
            originalContentUrl: getParameterByName('img'),
            previewImageUrl: getParameterByName('img'),
            sentBy: {
                label: "Trojans Liff",
                iconUrl: "https://apitrojans.xyz/static/bs5/assets/img/icon/favicon.png",
                linkUrl: "https://apitrojans.xyz/"
            }
        }]).then(function () {
            liff.closeWindow();
        });
    } else if (tipe === 'video') {
        prev = getParameterByName('piu');
        if(prev !== null && prev !== '') {
            dura = prev;
        } else {
            dura = "https://apitrojans.xyz/static/bs5/assets/img/icon/favicon.png";
        }
        liff.sendMessages([{
            type: 'video',
            originalContentUrl: getParameterByName('ocu'),
            previewImageUrl: dura
        }]).then(function () {
            liff.closeWindow();
        });
    } else if (tipe === 'audio') {
        duration = getParameterByName('duration');
        if(duration !== null && duration !== '') {
            dura = parseInt(duration);
        } else {
            dura = 60000;
        }
        liff.sendMessages([{
            type: 'audio',
            originalContentUrl: getParameterByName('link'),
            duration: dura
        }]).then(function () {
            liff.closeWindow();
        });
    }
}

function getParameterByName(name, url = window.location.href) {
    name = name.replace(/[\[\]]/g, '\\$&');
    var regex = new RegExp('[?&]' + name + '(=([^&#]*)|&|#|$)'),
        results = regex.exec(url);
    if (!results) return null;
    if (!results[2]) return '';
    return decodeURIComponent(results[2].replace(/\+/g, ' '));
}
