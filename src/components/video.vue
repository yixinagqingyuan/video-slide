<template>
  <div class="item-box" @click="pause">
    <video
      v-if="index === activeIndex"
      id="td-video"
      ref="video"
      class="item-box--video"
      playsinline="true"
      webkit-playsinline="true"
      mediatype="video"
      :poster="poster"
      @progress="progress"
      @durationchange="durationchange"
      @loadeddata="loadeddata"
      @playing="playing"
      @waiting="waiting"
      @timeupdate="timeupdate"
      @canplay="playing"
      @ended="ended"
    >
      <source :src="src" type="video/mp4" />
    </video>
    <img
      :src="poster"
      alt=""
      class="item-box--video"
      v-if="index === activeIndex + 1 || index === activeIndex - 1 || showImg"
    />
    <slot></slot>
    <div class="item-box--play" v-if="paused" @click.stop="play">
      <img src="../assets/icon_4.png" alt="" />
    </div>
    <div class="template-loading" v-if="loading"></div>
    <div class="item-box__progress" @click.stop="">
      <div class="progress-time" v-if="isPress">
        <span class="start">{{ startTime }}</span
        >/<span class="end">{{ endTime }}</span>
      </div>
      <div class="progress" @click="handleProgress">
        <div
          class="progress-buffer"
          :style="`width:${percentageBuffer}%`"
        ></div>
        <div
          ref="progressSpeed"
          class="progress-speed"
          @touchstart="touchstart"
          @touchend="touchend"
          @touchmove="touchmove"
          :style="`left:${percentage}%`"
          @click.stop=""
        >
          <div class="progress-speed--btn"></div>
        </div>
      </div>
    </div>
  </div>
</template>


<script lang="ts">
import { ref, defineComponent, onMounted } from "vue";
import { second } from "@/utils";
export default defineComponent({
  props: {
    poster: {
      type: String,
      default: "",
    },
    src: {
      type: String,
      default: "",
    },
    index: {
      type: Number,
      default: 0,
    },
    activeIndex: {
      type: Number,
      default: 0,
    },
    autoplay: {
      type: Boolean,
      default: false, // 浏览器在没有交互的情况下无法播放
    },
  },
  setup({ autoplay }) {
    // 是否是暂停状态
    const paused = ref(true);
    // 视频总时间
    const endTime = ref(second(0));
    //播放的时间
    const startTime = ref(second(0));
    // 是否是按下状态
    const isPress = ref(false);
    //缓冲进度
    const percentageBuffer = ref(0);
    // 播放进度
    const percentage = ref(0);
    // 保存计算后的播放时间
    const calculationTime = ref(0);
    // 拿到video 实例
    const video = ref(null);
    // 是否展示封面图
    const showImg = ref(true);
    // 是否处于缓冲中
    const loading = ref(false);
    // 播放
    function play() {
      video.value.play();
      paused.value = false;
    }
    // 暂停
    function pause() {
      if (paused.value) return;
      video.value.pause();
      paused.value = true;
      loading.value = false;
    }
    // 获取缓冲进度
    function progress() {
      if (!video.value) return;
      percentageBuffer.value = Math.floor(
        (video.value.buffered.length
          ? video.value.buffered.end(video.value.buffered.length - 1) /
            video.value.duration
          : 0) * 100
      );
    }
    // 时间改变
    function durationchange() {
      endTime.value = second(video.value.duration);
      console.log("时间改变触发");
    }
    // 首帧加载触发,为了获取视频时长
    function loadeddata() {
      console.log("首帧渲染触发");
      showImg.value = false;
      autoplay && play();
    }
    //当播放准备开始时(之前被暂停或者由于数据缺乏被暂缓)被触发
    function playing() {
      console.log("缓冲结束");
      loading.value = false;
    }
    //缓冲的时候触发
    function waiting() {
      console.log("处于缓冲中");
      loading.value = true;
    }
    // 时间改变触发
    function timeupdate() {
      // 如果是按下状态不能走进度，表示需要执行拖动
      if (isPress.value || !video.value) return;
      startTime.value = second(Math.floor(video.value.currentTime));
      percentage.value = Math.floor(
        (video.value.currentTime / video.value.duration) * 100
      );
    }
    // 按下开始触发
    function touchstart() {
      isPress.value = true;
    }
    //松开按钮触发
    function touchend() {
      isPress.value = false;
      video.value.currentTime = calculationTime.value;
    }
    // 拖动的时候触发
    function touchmove(e) {
      const width = window.screen.width;
      const tx = e.clientX || e.changedTouches[0].clientX;
      if (tx < 0 || tx > width) {
        return;
      }
      calculationTime.value = video.value.duration * (tx / width);
      startTime.value = second(Math.floor(calculationTime.value));
      percentage.value = Math.floor((tx / width) * 100);
    }
    //点击进度条触发
    function handleProgress(e) {
      touchmove(e);
      touchend();
    }
    // 播放结束时触发
    function ended() {
      play();
    }
    onMounted(() => {});
    return {
      video,
      paused,
      pause,
      play,
      progress,
      durationchange,
      loadeddata,
      endTime,
      startTime,
      playing,
      percentage,
      waiting,
      timeupdate,
      percentageBuffer,
      touchstart,
      touchend,
      touchmove,
      isPress,
      ended,
      handleProgress,
      loading,
      showImg,
    };
  },
});
</script>
<style lang="scss">
.item-box {
  height: 100%;
  width: 100%;
  position: relative;
  background-color: #3e3a3a;
  z-index: 1;
  &--video {
    width: 100%;
    object-fit: cover;
    cursor: pointer;
    position: absolute;
    left: 0;
    top: 50%;
    transform: translateY(-50%);
  }
  &--play {
    position: absolute;
    width: 53px;
    height: 53px;
    left: 50%;
    top: 50%;
    margin-left: -26.25px;
    margin-top: -26.25px;
    img {
      width: 100%;
    }
  }
  .template-loading {
    position: absolute;
    left: 50%;
    margin-left: -36px;
    width: 10px;
    height: 10px;
    border-radius: 50%;
    box-shadow: 28px 0 0 #ff552e, 50px 0 0 #3e80f8, 72px 0 0 #53e7ae,
      94px 0 0 #ffce5a;
    animation: spinner-dot 1.2s infinite linear;
    transform: translateX(-28px);
    top: 50%;
    margin-top: -5;
  }
  &__progress {
    position: absolute;
    bottom: 0;
    left: 0;
    width: 100%;
    height: 115px;
    background: linear-gradient(
      180deg,
      rgba(0, 0, 0, 0) 0%,
      rgba(0, 0, 0, 0.4) 100%
    );
    .progress-time {
      padding: 5px 20px;
      background-color: rgba(0, 0, 0, 0.7);
      border-radius: 18.5px;
      position: absolute;
      left: 50%;
      bottom: 67px;
      transform: translateX(-50%);
      color: rgba(255, 255, 255, 1);
      .start {
        font-size: 13px;
        font-weight: 700;
        line-height: 18.5px;
        display: inline-block;
        padding-right: 3px;
      }
      .end {
        font-size: 13px;
        font-weight: 700;
        line-height: 18.5px;
        color: rgba(255, 255, 255, 0.6);
        display: inline-block;
        padding-left: 3px;
      }
    }
    .progress {
      position: absolute;
      width: 100%;
      height: 2px;
      background: rgba(255, 255, 255, 0.5);
      bottom: 3px;
      left: 0;
      &-buffer {
        position: absolute;
        left: 0;
        top: 0;
        height: 2px;
        background: rgba(255, 255, 255, 0.5);
        transition: width 1s;
      }
      &-speed {
        position: absolute;
        left: 0;
        top: 0;
        width: 30px;
        height: 30px;
        margin-left: -15px;
        margin-top: -15px;

        &--btn {
          position: absolute;
          left: 50%;
          top: 50%;
          width: 6px;
          height: 6px;
          margin-left: -3px;
          margin-top: -2px;
          background: rgba(255, 255, 255, 1);
          border-radius: 50%;
        }
      }
    }
    &::before {
      position: absolute;
      bottom: 0;
      left: 0;
      width: 100%;
      height: 3px;
      background: #000;
      content: "";
    }
  }
}

@keyframes spinner-dot {
  20% {
    box-shadow: 28px -10px 0 #ff552e, 50px 0 0 #3e80f8, 72px 0 0 #53e7ae,
      94px 0 0 #ffce5a;
  }

  40% {
    box-shadow: 28px 0 0 #ff552e, 50px -10px 0 #3e80f8, 72px 0 0 #53e7ae,
      94px 0 0 #ffce5a;
  }

  60% {
    box-shadow: 28px 0 0 #ff552e, 50px 0 0 #3e80f8, 72px -10px 0 #53e7ae,
      94px 0 0 #ffce5a;
  }

  80% {
    box-shadow: 28px 0 0 #ff552e, 50px 0 0 #3e80f8, 72px 0 0 #53e7ae,
      94px -10px 0 #ffce5a;
  }
}
</style>
