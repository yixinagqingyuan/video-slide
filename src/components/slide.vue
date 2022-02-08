<template>
  <swiper
    class="my-swiper"
    direction="vertical"
    @transitionStart="transitionStart"
  >
    <swiper-slide class="slide-box" v-for="(item, index) in list" :key="index">
      <slot
        :item="item"
        :index="index"
        :activeIndex="activeIndex"
        v-if="activeIndex >= index - 1 && activeIndex <= index + 1"
      ></slot>
    </swiper-slide>
  </swiper>
</template>
<script>
import { defineComponent, ref } from "vue";
import Yvideo from "./video.vue";
import { Swiper, SwiperSlide } from "swiper/vue";
export default defineComponent({
  props: {
    list: {
      type: Array,
      default: () => [],
    },
  },
  components: {
    Yvideo,
    Swiper,
    SwiperSlide,
  },
  setup({ list }, { emit }) {
    const activeIndex = ref(0);
    function transitionStart(swiper) {
      //表示没有滑动,不做处理
      if (activeIndex.value === swiper.activeIndex) {
        // 表示是第一个轮播图
        if (swiper.swipeDirection === "prev" && swiper.activeIndex === 0) {
          emit("refresh");
        } else if (
          swiper.swipeDirection === "next" &&
          swiper.activeIndex === list.length - 1
        ) {
          emit("toBottom");
        }
      } else {
        activeIndex.value = swiper.activeIndex;
        // 为了预加载视频，提前load 数据
        if (swiper.activeIndex === list.length - 1) {
          emit("load");
        }
      }
    }
    return {
      transitionStart,
      activeIndex,
    };
  },
});
</script>
<style lang="scss" scoped>
.my-swiper {
  height: 100%;
  position: relative;
  .slide-box {
    width: 100%;
    height: 100%;
  }
}
</style>