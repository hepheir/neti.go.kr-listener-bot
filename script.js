javascript: (() => {
    function main() {
        let bot = new Bot(window);
        bot.startAutoListening();
    }

    class Bot {
        constructor(window) {
            this.window = window;
            this.document = this.getContentFrame().contentDocument;

            this.bindAutoPlay = this.bindAutoPlay.bind(this);
            this.bindAutoSkip = this.bindAutoSkip.bind(this);
            this.getContentFrame = this.getContentFrame.bind(this);
            this.getPlayButton = this.getPlayButton.bind(this);
            this.getSkipButton = this.getSkipButton.bind(this);
            this.getVideo = this.getVideo.bind(this);
            this.onVideoEnded = this.onVideoEnded.bind(this);
            this.onVideoPause = this.onVideoPause.bind(this);
            this.playVideo = this.playVideo.bind(this);
            this.skipVideo = this.skipVideo.bind(this);
            this.startAutoListening = this.startAutoListening.bind(this);
        }

        bindAutoSkip() {
            console.log('자동 스킵 작업을 등록합니다.');
            this.getVideo().onended = this.onVideoEnded;
            this.getVideo().onpause = this.onVideoPause;
        }

        bindAutoPlay() {
            console.log('자동 재생 작업을 등록합니다.');
            this.getContentFrame().onload = this.startAutoListening;
        }

        getContentFrame() {
            return this.window.document.getElementById('contentWrap_content');
        }

        getPlayButton() {
            return this.document.querySelector('#uPlayer > button');
        }

        getSkipButton() {
            return this.document.getElementById('next-btn');
        }

        getVideo() {
            return this.document.getElementById('uPlayer_html5_api');
        }

        onVideoEnded() {
            console.log('영상이 끝났습니다.');
            this.skipVideo();
        }

        onVideoPause() {
            console.log('영상이 일시정지되었습니다.');
            if (this.getVideo().ended)
                this.onVideoEnded();
        }

        playVideo() {
            console.log('영상을 재생합니다.');
            if (this.getVideo().paused)
                this.getPlayButton().click();
        }

        skipVideo() {
            console.log('다음 챕터로 이동합니다.');
            this.getSkipButton().click();
        }

        startAutoListening() {
            console.log('자동 수강을 시작합니다.');
            this.bindAutoSkip();
            this.bindAutoPlay();
            this.playVideo();
        }
    }

    main();
})();
