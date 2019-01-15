<template>
  <div class="header">
    <div class="content-wrapper">
      <div class="imgheader">
        <img
          style="widht:64px;height:72px;border-radius: 3px"
          src="https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1546164650401&di=c8dd1ceea6ef64f3e4816c7e18dd7084&imgtype=0&src=http%3A%2F%2Fimgsrc.baidu.com%2Fimgad%2Fpic%2Fitem%2Faa64034f78f0f736da120e380155b319ebc4131e.jpg"
          alt
        >
      </div>
      <div class="content">
        <div class="title">
          <span>
            <img style="widht:27px;height:22px;" src="./brand@2x.png" alt>
          </span>
          <span style="margin-left:12px;font-size:14px"
          >{{dataapp.seller.name}}</span>
        </div>
        <div class="description" style="margin-bottom:7px">
          <span>{{dataapp.seller.description}}/{{dataapp.seller.deliveryTime}}</span>
        </div>
        <div class="support">
          <span>
            <img style="widht:27px;height:15px" src="./decrease_1@2x.png" alt>
          </span>
          <span
            style="display:inline-block;vertical-align:top;line-height:16px;margin-left:10px;font-size:14px"
          >{{dataapp.seller.supports[0].description}}</span>
        </div>
      </div>
      <div class="bulletin-wrapper">
        <span>
          <img style="width:22px;height:15px" src="./bulletin@2x.png" alt>
        </span>
        <span
          @click="dateilshow"
          style="display:inline-block;vertical-align:top;line-height:21px;font-size:10px;margin-left:10px"
        >{{dataapp.seller.bulletin}}</span>
      </div>
    </div>
    <!-- 悬浮层 -->
    <transition name="fade">
      <div class="datail" v-show="datashow">
        <div class="detail-wrapper clearfix">
          <div class="detail-main">
            <div>
              <h2 class="name">{{dataapp.seller.name}}</h2>
              <span v-for="i in allStar" :key="i">
                <img style="width:20px;height:20px;text-aglin:center" src="./star48_on@3x.png" alt>
              </span>
              <span>
                <img
                  style="width:20px;height:20px;text-aglin:center"
                  v-if="isstar"
                  src="./star48_half@3x.png"
                  alt
                >
              </span>
            </div>
            <div class="title">
              <div class="aline"></div>
              <div class="text">优惠信息</div>
              <div class="aline"></div>
            </div>
            <div style="width:100%">
              <ul>
                <li class="support-item" v-for="(item,value) in dataapp.seller.supports" :key="value">
                  <span class="icon">
                    <img style="widht:15px;height:15px" src="./decrease_1@2x.png" alt>
                    {{item.description}}
                  </span>
                </li>
              </ul>
            </div>
            <div class="title">
              <div class="aline"></div>
              <div class="text">商家公告</div>
              <div class="aline"></div>
            </div>
            <div style="margin: 0 28px;widht:80%">
              <p class="content" style="font-size:10px;text-align:left;">{{dataapp.seller.bulletin}}</p>
            </div>
          </div>
        </div>
        <div class="detail-close">
          <span @click="isshow" style="display:block;text-align:center; margin-bottom: 64px;">关闭</span>
        </div>
      </div>
    </transition>
  </div>
</template>
<script>
export default {
  data () {
    return {
      datashow: false,
      allStar: [],
      linStar: [],
      notStar: [],
      score: 4.5,
      isstar: false,
      picture: './discount_3@3x.png'
    }
  },
  props: {
    dataapp: {
      type: Object
    }
  },
  methods: {
    dateilshow () {
      this.datashow = true
    },
    isshow () {
      this.datashow = false
    }
  },
  mounted () {
    let scores = Math.floor(this.score * 2) / 2
    this.allStar = Math.floor(scores)
    let fractional = scores % 1
    if (fractional) {
      this.isstar = true
    }
  }
}
</script>
<style lang="less">
.header {
  background: rgba(7, 17, 27, 0.5);
  color: white;
  margin: auto;
}
.header > .content-wrapper {
  padding: 24px 12px 18px 24px;
  font-size: 14px;
}
.header > .content-wrapper > .imgheader {
  display: inline-block;
}
.header > .content-wrapper > .content {
  display: inline-block;
  margin-left:3%;
}
.bulletin-wrapper {
  background: rgba(7, 17, 27, 0.1);
  white-space: nowrap;
  padding: 8px 22px 0 12px;
  line-height: 28px;
  overflow: hidden;
  text-overflow: ellipsis;
}
.datail {
  width: 100%;
  height: 100%;
  position: fixed;
  z-index: 100;
  background: rgba(7, 17, 27, 0.8);
  top: 0;
  left: 0;
  overflow: auto;
}
.clearfix {
  display: inline-block;
}
.clearfix::after {
  content: ".";
  display: block;
  height: 0;
  line-height: 0;
  clear: both;
  visibility: hidden;
}
.detail-wrapper {
  min-height: 100%;
  width: 100%;
}
.detail-wrapper > .detail-main {
  margin-top: 64px;
  margin-bottom: 64px;
  width: 4000px;
  display: table-cell;
  vertical-align: middle;
  text-align: center;
}
.detail-wrapper > .detail-close {
  position: relative;
  widows: 32px;
  height: 32px;
  margin: -64px auto 0 auto;
  clear: both;
  font-size: 32em;
}
.title {
  display: flex;
}
.title > .aline {
  flex: 1;
  position: relative;
  top: -6px;
  border-bottom: 1px solid rgba(255, 255, 255, 0.2);
}
.title > .text {
  padding: 0 12px;
  font-size: 12px;
}
.support-item {
  list-style-type: none;
  font-size: 12px;
  margin-bottom: 6px;
}
.support-item > .icon {
  display: block;
  width: 100%;
  text-align: left;
}
.fade-enter-active, .fade-leave-active {
  transition: opacity 0.6s;
}
.fade-enter, .fade-leave-to /* .fade-leave-active below version 2.1.8 */ {
  opacity: 0;
}
</style>
