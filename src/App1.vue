<template>
  <div class="example">
    <Yslide
      :list="data"
      v-slot="{ item, index, activeIndex }"
      @refresh="refresh"
      @toBottom="toBottom"
      @load="load"
    >
      <Yvideo
        :src="item.entStoreVO.video"
        :poster="item.entStoreVO.videoImg"
        :index="index"
        :activeIndex="activeIndex"
        autoplay
      >
        <div class="mantle">
          <div class="right" @click.stop="">
            <div class="right-btn fabulous" @click="fabulous">点赞</div>
            <div class="right-btn comment" @click="comment">评论</div>
            <div class="right-btn collection" @click="collection">收藏</div>
            <div class="right-btn share" @click="share">分享</div>
          </div>
        </div>
      </Yvideo>
    </Yslide>
  </div>
  <div class="bottom">这是底部</div>
</template>
<script lang="ts">
import { Yslide, Yvideo } from "@/components";
import { defineComponent, ref, computed } from "vue";
import dataJSON from "./data.json";
export default defineComponent({
  components: {
    Yslide,
    Yvideo,
  },
  setup() {
    function refresh() {
      console.log("表示上拉刷新");
    }
    function toBottom() {
      console.log("表示已到底部");
    }
    function load() {
      console.log("表示加载预加载下一个");
    }
    function fabulous() {
      console.log("这是点赞");
    }
    function comment() {
      console.log("这是评论");
    }
    function collection() {
      console.log("这是收藏");
    }
    function share() {
      console.log("这是分享");
    }
    return {
      data: dataJSON.data.enterprises,
      refresh,
      toBottom,
      load,
      fabulous,
      comment,
      collection,
      share,
    };
  },
});
</script>
<style lang="scss">
body {
  padding: 0;
  margin: 0;
  #app {
    height: 100vh;
    .example {
      height: calc(100% - 60px);
      .mantle {
        position: absolute;
        left: 0;
        top: 0;
        width: 100%;
        height: 100%;
        .right {
          position: absolute;
          right: 20px;
          top: 50%;
          transform: translateY(-50%);
          color: #fff;
        }
      }
    }
  }
}
</style>


