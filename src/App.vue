<template>
  <div class="example">
    <Yvideo :src="src" :poster="poster">
      <div class="mantle">
        <div class="right" @click.stop="">
          <div class="right-btn fabulous" @click="fabulous">点赞</div>
          <div class="right-btn comment" @click="comment">评论</div>
          <div class="right-btn collection" @click="collection">收藏</div>
          <div class="right-btn share" @click="share">分享</div>
        </div>
      </div>
    </Yvideo>
  </div>
  <div class="bottom">这是底部</div>
</template>
<script lang="ts">
import { Yvideo } from "@/components";
import { defineComponent, ref, computed } from "vue";
export default defineComponent({
  components: {
    Yvideo,
  },
  setup() {
    const src = ref(
      "https://wos2.58cdn.com.cn/DeFazYxWvDti/frsupload/d49662adaebeda888972bb3703e8a375.mp4"
    );
    const poster = ref(
      "https://pic3.58cdn.com.cn/nowater/frs/n_v22f8aefa579b5450997ae6b867b145d08.jpg"
    );
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
      src,
      poster,
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


