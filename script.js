function main() {
    let bot = new Bot(window);
    bot.startAutoListening();
}

class Bot {
    constructor(window) {
        this.window = window;
        this.document = window.document;

        // Properties
        this.frame = null
        this.video = null;

        // Instance methods
        this.bindAutoPlay = this.bindAutoPlay.bind(this);
        this.bindAutoSkip = this.bindAutoSkip.bind(this);
        this.getFrame = this.getFrame.bind(this);
        this.getPlayButton = this.getPlayButton.bind(this);
        this.getSkipButton = this.getSkipButton.bind(this);
        this.getVideo = this.getVideo.bind(this);
        this.onFrameLoad = this.onFrameLoad.bind(this);
        this.onVideoEnded = this.onVideoEnded.bind(this);
        this.playVideo = this.playVideo.bind(this);
        this.skipVideo = this.skipVideo.bind(this);
        this.startAutoListening = this.startAutoListening.bind(this);
        this.updateFrame = this.updateFrame.bind(this);
        this.updateProperties = this.updateProperties.bind(this);
        this.updateVideo = this.updateVideo.bind(this);

        this.updateProperties();
    }

    bindAutoPlay() {
        console.log('자동 재생 작업을 등록합니다.');
        this.getFrame().onload = this.onFrameLoad;
    }

    bindAutoSkip() {
        console.log('자동 스킵 작업을 등록합니다.');
        this.video.onended = this.onVideoEnded;
    }

    getFrame() {
        return this.document.getElementById('contentWrap_content');
    }

    getPlayButton() {
        return this.frame.contentDocument.querySelector('#uPlayer > button');
    }

    getSkipButton() {
        return this.frame.contentDocument.getElementById('next-btn');
    }

    getVideo() {
        return this.frame.contentDocument.getElementById('uPlayer_html5_api');
    }

    onFrameLoad() {
        console.log('페이지가 갱신되었습니다.');
        this.updateProperties();
        this.startAutoListening();
    }

    onVideoEnded() {
        console.log('영상이 끝났습니다.');
        this.skipVideo();
    }

    playVideo() {
        console.log('영상을 재생합니다.');
        if (this.video.paused)
            this.getPlayButton().click();
    }

    skipVideo() {
        console.log('다음 챕터로 이동합니다.');
        this.getSkipButton().click();
    }

    startAutoListening() {
        console.log('자동 수강을 시작합니다.');
        this.bindAutoPlay();
        this.bindAutoSkip();
        this.playVideo();
    }

    updateFrame() {
        this.frame = this.getFrame();
    }

    updateProperties() {
        this.updateFrame();
        this.updateVideo();
    }

    updateVideo() {
        this.video = this.getVideo();
    }
}

main();
