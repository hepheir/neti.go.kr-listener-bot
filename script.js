javascript: (() => {
    function getContentFrame() {
        return document.getElementById('contentWrap_content');
    }

    function getPlayButton() {
        _document = getContentFrame().contentDocument;
        return _document.querySelector('#uPlayer > button');
    }

    function getSkipButton() {
        _document = getContentFrame().contentDocument;
        return _document.getElementById('next-btn');
    }

    function getVideo() {
        _document = getContentFrame().contentDocument;
        return _document.getElementById('uPlayer_html5_api');
    }

    function playVideo() {
        button = getPlayButton();
        button.click();
    }

    function skipVideo() {
        button = getSkipButton();
        button.click();
    }

    function bindAutoSkip() {
        video = getVideo();
        video.onpause = skipVideo;
        getContentFrame().onload = (event) => {
            bindAutoSkip();
            playVideo();
        };
    }

    bindAutoSkip();
})();
