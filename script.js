new Vue({
    el: "#app",
    data() {
      return {
        audio: null,
        circleLeft: null,
        barWidth: null,
        duration: null,
        currentTime: null,
        isTimerPlaying: false,
        tracks: [
          {
            name: "Ms Jackson",
            artist: "Outkast",
            cover: "https://raw.githubusercontent.com/vmavis/playlist/main/cover/msjackson.jpeg",
            source: "https://raw.githubusercontent.com/vmavis/playlist/main/track/msjackson.mp3",
            url: "https://youtu.be/MYxAiK6VnXw?si=7TJsz6U-Hr-pyaEB",
            favorited: false
          },
          {
            name: "Heart Shaped Box",
            artist: "Nirvana",
            cover: "https://raw.githubusercontent.com/vmavis/playlist/main/cover/heartshapedbox.jpg",
            source: "https://raw.githubusercontent.com/vmavis/playlist/main/track/heartshapedbox.mp3",
            url: "https://youtu.be/n6P0SitRwy8?si=VFZb_d_J7CUXvpxW",
            favorited: false
          },
          {
            name: "Something",
            artist: "The Beatles",
            cover: "https://raw.githubusercontent.com/vmavis/playlist/main/cover/something.jpeg",
            source: "https://raw.githubusercontent.com/vmavis/playlist/main/track/something.mp3",
            url: "https://youtu.be/UelDrZ1aFeY?si=DZF20NWvemy8dU9Z",
            favorited: false
          },
          {
            name: "Travelin' Band",
            artist: "Creedence Clearwater Revival",
            cover: "https://raw.githubusercontent.com/vmavis/playlist/main/cover/travelinband.jpeg",
            source: "https://raw.githubusercontent.com/vmavis/playlist/main/track/travelinband.mp3",
            url: "https://youtu.be/ZXLqECpHW2o?si=gtT9JsaFXL4HVXd4",
            favorited: false
          },
          {
            name: "Chamber Of Reflection",
            artist: "Mac DeMarco",
            cover: "https://raw.githubusercontent.com/vmavis/playlist/main/cover/chamberofreflection.jpg",
            source: "https://raw.githubusercontent.com/vmavis/playlist/main/track/chamberofreflection.mp3",
            url: "https://youtu.be/kz9jhG963no?si=EezhwUTc0eD-u6qk",
            favorited: false
          },
          {
            name: "Karolina",
            artist: "Sore",
            cover: "https://raw.githubusercontent.com/vmavis/playlist/main/cover/karolina.jpg",
            source: "https://raw.githubusercontent.com/vmavis/playlist/main/track/karolina.mp3",
            url: "https://youtu.be/4E3YtHna3ZI",
            favorited: true
          },
          {
            name: "The Shade",
            artist: "Rex Orange County",
            cover: "https://raw.githubusercontent.com/vmavis/playlist/main/cover/theshade.png",
            source: "https://raw.githubusercontent.com/vmavis/playlist/main/track/theshade.mp3",
            url: "https://youtu.be/3C9kt11ib6Y?si=AeECiE8i5TP1_BSe",
            favorited: true
          },
          {
            name: "Armistice",
            artist: "Phoenix",
            cover: "https://raw.githubusercontent.com/vmavis/playlist/main/cover/armistice.jpg",
            source: "https://raw.githubusercontent.com/vmavis/playlist/main/track/armistice.mp3",
            url: "https://youtu.be/KMckocKROPc?si=38zhst2y8UbVEhsQ",
            favorited: false
          },
          {
            name: "Dia",
            artist: "Sheila Majid",
            cover: "https://raw.githubusercontent.com/vmavis/playlist/main/cover/dia.jpg",
            source: "https://raw.githubusercontent.com/vmavis/playlist/main/track/dia.mp3",
            url: "https://youtu.be/Odfpb-ZEVdM?si=t5RHSl5kP74jINWW",
            favorited: false
          },
          {
            name: "Juxtapozed with U",
            artist: "Super Furry Animals",
            cover: "https://raw.githubusercontent.com/vmavis/playlist/main/cover/juxtapozedwithu.png",
            source: "https://raw.githubusercontent.com/vmavis/playlist/main/track/juxtapozedwithu.mp3",
            url: "https://youtu.be/auk4LABID2U?si=amiz5I2kv8v-dFSH",
            favorited: false
          },
          {
            name: "The Lady in My Life",
            artist: "Michael Jackson",
            cover: "https://raw.githubusercontent.com/vmavis/playlist/main/cover/theladyinmylife.jpeg",
            source: "https://raw.githubusercontent.com/vmavis/playlist/main/track/theladyinmylife.mp3",
            url: "https://youtu.be/LXY_HIU9CwQ?si=gkKzfqS0WiGweUIB",
            favorited: false
          }
          ,
          {
            name: "Paris",
            artist: "The Chainsmokers",
            cover: "https://raw.githubusercontent.com/vmavis/playlist/main/cover/paris.jpg",
            source: "https://raw.githubusercontent.com/vmavis/playlist/main/track/paris.mp3",
            url: "https://youtu.be/fRNkQH4DVg8?si=LXee3rPtAjuToNrC",
            favorited: false
          }
        ],
        currentTrack: null,
        currentTrackIndex: 0,
        transitionName: null
      };
    },
    methods: {
      play() {
        if (this.audio.paused) {
          this.audio.play();
          this.isTimerPlaying = true;
        } else {
          this.audio.pause();
          this.isTimerPlaying = false;
        }
      },
      generateTime() {
        let width = (100 / this.audio.duration) * this.audio.currentTime;
        this.barWidth = width + "%";
        this.circleLeft = width + "%";
        let durmin = Math.floor(this.audio.duration / 60);
        let dursec = Math.floor(this.audio.duration - durmin * 60);
        let curmin = Math.floor(this.audio.currentTime / 60);
        let cursec = Math.floor(this.audio.currentTime - curmin * 60);
        if (durmin < 10) {
          durmin = "0" + durmin;
        }
        if (dursec < 10) {
          dursec = "0" + dursec;
        }
        if (curmin < 10) {
          curmin = "0" + curmin;
        }
        if (cursec < 10) {
          cursec = "0" + cursec;
        }
        this.duration = durmin + ":" + dursec;
        this.currentTime = curmin + ":" + cursec;
      },
      updateBar(x) {
        let progress = this.$refs.progress;
        let maxduration = this.audio.duration;
        let position = x - progress.offsetLeft;
        let percentage = (100 * position) / progress.offsetWidth;
        if (percentage > 100) {
          percentage = 100;
        }
        if (percentage < 0) {
          percentage = 0;
        }
        this.barWidth = percentage + "%";
        this.circleLeft = percentage + "%";
        this.audio.currentTime = (maxduration * percentage) / 100;
        this.audio.play();
      },
      clickProgress(e) {
        this.isTimerPlaying = true;
        this.audio.pause();
        this.updateBar(e.pageX);
      },
      prevTrack() {
        this.transitionName = "scale-in";
        this.isShowCover = false;
        if (this.currentTrackIndex > 0) {
          this.currentTrackIndex--;
        } else {
          this.currentTrackIndex = this.tracks.length - 1;
        }
        this.currentTrack = this.tracks[this.currentTrackIndex];
        this.resetPlayer();
      },
      nextTrack() {
        this.transitionName = "scale-out";
        this.isShowCover = false;
        if (this.currentTrackIndex < this.tracks.length - 1) {
          this.currentTrackIndex++;
        } else {
          this.currentTrackIndex = 0;
        }
        this.currentTrack = this.tracks[this.currentTrackIndex];
        this.resetPlayer();
      },
      resetPlayer() {
        this.barWidth = 0;
        this.circleLeft = 0;
        this.audio.currentTime = 0;
        this.audio.src = this.currentTrack.source;
        setTimeout(() => {
          if(this.isTimerPlaying) {
            this.audio.play();
          } else {
            this.audio.pause();
          }
        }, 300);
      },
      favorite() {
        this.tracks[this.currentTrackIndex].favorited = !this.tracks[
          this.currentTrackIndex
        ].favorited;
      }
    },
    created() {
      let vm = this;
      this.currentTrack = this.tracks[0];
      this.audio = new Audio();
      this.audio.src = this.currentTrack.source;
      this.audio.ontimeupdate = function() {
        vm.generateTime();
      };
      this.audio.onloadedmetadata = function() {
        vm.generateTime();
      };
      this.audio.onended = function() {
        vm.nextTrack();
        this.isTimerPlaying = true;
      };
  
      // this is optional (for preload covers)
      for (let index = 0; index < this.tracks.length; index++) {
        const element = this.tracks[index];
        let link = document.createElement('link');
        link.rel = "prefetch";
        link.href = element.cover;
        link.as = "image"
        document.head.appendChild(link)
      }
    }
  });