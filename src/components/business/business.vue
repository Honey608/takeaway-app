<template>
    <div class="seller">
        <div class="seller-content">
            <div class="overview">
                <span class="title">{{seller.seller.name}}</span>
                <div class="desc">
                    <img width="16px" v-for="a in 4" :key="a.index" src="../../assets/img/star36_on@2x.png" alt="">
                    <img width="16px" src="../../assets/img/star36_off@2x.png" alt="">
                    <span>（{{seller.seller.ratingCount}}）</span>
                    <span>月销量{{seller.seller.sellCount}}单</span>
                     <!-- 收藏 -->
                    <div @click="toggleFavorite" class="collectstate" style="float: right;margin: -36px 16px 0">
                        <img width="22px" :class="{'active':favorite}"    src="../../assets/fonts/_ionicons_svg_md-heart-empty.svg" style="padding-right: 9px;">
                        <span style="position: absolute;right: 12px;padding: 23px 0px">{{favoriteText}}</span>
                    </div>
                </div>
                <ul class="remark">
                    <li class="block">
                        <span>起送价</span>
                        <div class="contents">
                            <span class="stress">{{seller.seller.minPrice}}元</span>
                        </div>
                    </li>
                    <li class="block">
                        <span>商家配送</span>
                        <div class="contents">
                            <span class="stress">{{seller.seller.deliveryPrice}}元</span>
                        </div>
                    </li>
                    <li class="block" style="border-right:0">
                        <span>平均配送时间</span>
                        <div class="contents">
                            <span class="stress">{{seller.seller.deliveryTime}}分钟</span>
                        </div>
                    </li>
                </ul>
            </div>
            <split></split>
            <div>
                <span style="display:block;padding: 7px 0 0 15px;font-size: 18px">公告与活动</span>
                <div style="padding:7px 31px;color: rgb(240,20,20);"><span>{{seller.seller.bulletin}}</span></div>
            </div>
            <split></split>
            <div class="pics">
                <span style="display: block;padding: 7px 0px 0px 15px;font-size: 18px;">商家实景</span>
                <div class="pic-wrapper" ref="picWrapper">
                    <ul class="pic-list" ref="piclist" >
                        <li class="pic-item" v-for="pic in seller.seller.pics" :key="pic.index">
                            <img width="120" height="90" :src="pic" alt="">
                        </li>
                    </ul>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import split from '../split/split'
import BScroll from 'better-scroll'
import { saveToLocal, loadFromLocal } from '../../assets/js/store'

export default {
  data () {
    return {
      favorite: (() => {
        return loadFromLocal(this.seller.id, 'favorite', false)
      })()
    }
  },
  props: {
    seller: {
      type: Object
    }
  },
  components: {
    split
  },
  computed: {
    favoriteText: function () {
      return this.favorite ? '已收藏' : '未收藏'
    }
  },
  methods: {
    toggleFavorite () {
      this.favorite = !this.favorite
      saveToLocal(this.seller.id, 'favorite', this.favorite)
    }
  },
  mounted () {
    if (this.seller.seller.pics) {
      let picWidth = 120
      let margin = 6
      let width = (picWidth + margin) * (this.seller.seller.pics.length) - margin
      this.$refs.piclist.style.width = width + 'px'
      this.picScorll = new BScroll(this.$refs.picWrapper, {
        scrollX: true
      })
    }
  }
}
</script>

<style lang="stylus">
.overview
    .title
        font-size :18px
        line-height :28px
        padding: 15px 0 0 15px;
    .desc
        border-bottom: 1px solid rgba(7,17,27,.2);
        padding: 12px 0 27px 15px;
        .active
             background: red;
    .remark
        display :flex
        list-style:none
        .block
            border-right:1px solid rgba(7,17,27,.2)
            padding:0 25px
            span
                color :rgb(7,17,27)
                font-size :10px
                font-weight:200
            .contents
                text-align :center
.pic-wrapper
    width :100%
    overflow: hidden
    .pic-list
        list-style: none
        display: inline
        list-style: none
        padding: 0;
        display: flex
        .pic-item
            display: block
            float: left
            white-space: nowrap
            margin-left:6px

</style>
