# 关于video-slide



介绍

基于 Vue 3.0 的高仿抖音插件，其中包含两个插件

* Yslide

* Yvideo

Yvideo也可单独使用

# 安装依赖

```
npm i video-slide swiper

// 全局使用
import  videoSlide from 'video-slide'
createApp.use(videoSlide)

// 局部引入

import {Yslide,Yvideo} from 'video-slide'

 components: {
    Yslide,
    Yvideo,
  },
```

# 使用方式

```
 <Yslide
      :list="data"
      v-slot="{ item, index, activeIndex }"
      @refresh="refresh"
      @toBottom="toBottom"
      @load="load"
    >
      <Yvideo
        :src=""
        :poster=""
        :index="index"
        :activeIndex="activeIndex"
        autoplay
      >
        
      </Yvideo>
    </Yslide>
```
具体案例请[参考](https://github.com/yixinagqingyuan/video-slide/blob/master/src/App1.vue)