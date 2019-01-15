<template>
  <div class="ratings">
    <div class="ratings-content">
      <div class="overview">
        <div class="overview-left">
          <div class="score">{{seller.score}}</div>
          <div class="titles">综合评价</div>
          <div class="rank">高于周围商家{{seller.rankRate}}%</div>
        </div>
        <div class="overview-right">
          <div class="score-wrapper">
            <span class="serve-title">服务态度</span>
            <span class="star" v-for="(serve,index) in onserviceScore" :key="index">
              <img src="../../assets/img/star36_on@2x.png">
            </span>
            <span v-show="halfserviceScore">
              <img src="../../assets/img/star36_half@2x.png">
            </span>
            <span class="star" v-for="(serve,index) in offserviceScore" :key="index">
              <img src="../../assets/img/star36_off@2x.png">
            </span>
            <span>{{seller.serviceScore}}</span>
          </div>
          <div class="score-wrapper">
            <span class="serve-title">商品评分</span>
            <span class="star" v-for="(serve,index) in onfood" :key="index">
              <img src="../../assets/img/star36_on@2x.png">
            </span>
            <span v-show="offfood">
              <img src="../../assets/img/star36_half@2x.png">
            </span>
            <span class="star" v-for="(serve,index) in offfood" :key="index">
              <img src="../../assets/img/star36_off@2x.png">
            </span>
            <span>{{seller.foodScore}}</span>
          </div>
          <div class="score-wrapper">
            <span style="color:rgba(7,17,27,.4)">送达时间{{seller.deliveryTime}}</span>
          </div>
        </div>
      </div>
      <split></split>
      <ratingslect :slectType="selectType" @type-onlyContent="onlyContentstate" @type-state="typestates" :onlyContent.sync="onlyContent" :ratings="ratings" :desc="desc"></ratingslect>
      <div class="rating-wrapper">
          <ul style="list-style: none;">
              <li v-show="needShow(rating.rateType,rating.text)" v-for="rating in ratings" :key="rating.index" style="margin-bottom: 0px;" class="rating-item">
                  <div class="avatar">
                    <div style="margin-bottom: 12px;">{{rating.rateTime | formaDate}}</div>
                    <div style="position: absolute;top: 0px;right: 13px;">
                        <img width="12" height="12" :src="rating.avatar" alt="">
                        <span class="name">{{rating.username}}</span>
                    </div>
                  </div>
                <div class="content">
                    <div style="margin-bottom: 16px;">
                        <span style="color: black;">{{rating.text}}</span>
                    </div>
                    <span style="color:rgba(147,153,159);background:rgba(7,17,27,.1);border-radius:2%;margin-right: 9px;padding: 2px;padding-top:2px;" v-for="recommend in rating.recommend" :key="recommend.index">{{recommend}}</span>
                </div>
              </li>
          </ul>
      </div>
    </div>
  </div>
</template>

<script>
import split from '../split/split'
import data from '../../../data.json'
import { formaDate } from '../../assets/js/date'
import ratingslect from '../ratingslect/ratingslect'
// const POSITYVE = 0
// const NEGATIVE = 1
const ALL = 2

export default {
  data () {
    return {
      ratings: data.ratings,
      onfood: '',
      halffood: false,
      offfood: '',
      onserviceScore: '',
      halfserviceScore: false,
      offserviceScore: '',
      showFlag: false,
      selectType: ALL,
      onlyContent: true,
      desc: {
        all: '全部',
        positive: '满意',
        negative: '不满意'
      }
    }
  },
  props: {
    seller: {
      type: Object
    }
  },
  methods: {
    needShow (type, text) {
      if (this.onlyContent && !text) {
        return false
      }
      if (this.selectType === ALL) {
        return true
      } else {
        return type === this.selectType
      }
    },
    onlyContentstate (state) {
      this.onlyContent = !state
    },
    typestates (type) {
      this.selectType = type
    }
  },
  filters: {
    formaDate (time) {
      let data = new Date(time)
      return formaDate(data, 'yyyy-MM-dd hh:mm')
    }
  },
  mounted () {
    this.onserviceScore = Math.floor((this.seller.serviceScore * 2) / 2)
    let serviceScore = this.seller.serviceScore % 1
    if (serviceScore >= 0.5) {
      this.halfserviceScore = true
      // this.offserviceScore = 4 - this.onserviceScore;
    } else {
      // this.offserviceScore = 5 - this.onserviceScore;
    }
    this.onfood = Math.floor((this.seller.foodScore * 2) / 2)
    let serviceScores = this.seller.foodScore % 1
    if (serviceScores >= 0.5) {
      this.halffood = true
      // this.offfood = 4 - this.onserviceScore;
    } else {
      // this.offfood = 5 - this.onserviceScore;
    }
  },
  components: {
    split,
    ratingslect
  }
}
</script>

<style lang="stylus">
.ratings
  top: 17px;
  bottom: 0;
  left: 0;
  width: 100%;
  overflow: hidden;
  .overview
    display: flex;
    padding: 15px 0;
    .overview-left
      flex: 0 0 137px;
      width: 137px;
      border-right: 1px solid rgba(7, 17, 27, 0.3);
      text-align: center;
    .overview-left
      padding: 0 13px;
      .score
        font-size: 48px;
        color: rgb(255, 153, 0);
        line-height: 56px;
      .titles
        margin-top: 6px;
        font-size: 22px;
        color: rgb(7, 17, 27);
        line-height: 24px;
      .rank
        font-size: 14px;
        color: rgba(7, 17, 27, 0.4);
        line-height: 20px;
        margin: 9px 0 14px 0;
    .overview-right
      width: 100%;
      text-align: center;
      padding: 0 10px;
      .score-wrapper
        margin-top: 16px;
      .serve-title
        font-size: 14px;
        vertical-align: top;
      .star
        img
          width: 15px;
          height: 15px;
</style>
