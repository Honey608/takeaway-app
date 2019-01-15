<template>
  <div v-show="showFlag" class="foods" ref="food">
    <div class="food-content">
      <div class="image-header">
        <img style="width:100%;height:384px" :src="food.image" alt>
        <div class="back" @click="hide">
          <img class="icon-arrow_lift" src="../../assets/fonts/_ionicons_svg_md-close.svg" alt>
        </div>
      </div>
      <div class="contentfood">
        <span class="foodtitle">{{food.name}}</span>
        <span style="color:rgb(147,153,159)">{{food.description}}</span>
        <div class="extra">
          <span>月售{{food.sellCount}}份</span>
          <span>好评率{{food.rating}}%</span>
        </div>
        <div class="price">
          <span style="color:red;font-size:15px;position:relative;top:13px;">¥{{food.price}}</span>
          <span
            style="text-decoration:line-through;padding:6px;color: rgb(147, 153, 159);"
            v-show="food.oldPrice"
          >¥{{food.oldPrice}}</span>
        </div>
      </div>
      <!-- 加入购物车按钮 -->
      <div class="cartcontrol-wrapper">
        <cartcontrol :food="food"></cartcontrol>
      </div>
      <transition name="fade">
        <div class="buy" @click="buyclick" v-show="!food.count||food.count===0">加入购物车</div>
      </transition>
      <split></split>
      <div class="info">
        <h3 class="title" >商品信息</h3>
        <span class="foodinfo">{{food.info}}</span>
      </div>
      <split></split>
      <div class="rating">
        <h3 class="title" style=" padding-left: 18px">商品评价</h3>
      </div>
      <ratingslect :slectType="selectType" @type-onlyContent="onlyContentstate" @type-state="typestate" :onlyContent.sync="onlyContent" :ratings="food.ratings" :desc="desc"></ratingslect>
      <div class="rating-wrapper">
        <ul v-show="food.ratings && food.ratings.length" style="list-style:none;padding:0;padding-bottom:20px;">
          <li v-show="needShow(rating.rateType,rating.text)" v-for="(rating,index) in food.ratings" class="rating-item" :key="index">
            <div class="user">
              <span class="name">{{rating.username}}</span>
              <img class="avatar" width="12" height="12" :src="rating.avatar">
            </div>
            <div class="time">{{rating.rateTime | formaDate}}</div>
            <p class="text">
              <span :class="{'icon-thumb_up':rating.rateType===0}">{{rating.text}}</span>
            </p>
          </li>
        </ul>
        <div class="no-rating" v-show="!food.ratings || !food.ratings.length">暂无评价</div>
      </div>
    </div>
  </div>
</template>

<script>
import Vue from 'vue'
import split from '../split/split'
import BScroll from 'better-scroll'
import cartcontrol from '../cartcontrol/cartcontrol'
import ratingslect from '../ratingslect/ratingslect'
import { formaDate } from '../../assets/js/date'

// const POSITYVE = 0
// const NEGATIVE = 1
const ALL = 2
export default {
  data () {
    return {
      showFlag: false,
      selectType: ALL,
      onlyContent: true,
      desc: {
        all: '全部',
        positive: '推荐',
        negative: '吐槽'
      }
    }
  },
  props: {
    food: {
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
    typestate (type) {
      this.selectType = type
    },
    buyclick (event) {
      if (!event._constructed) {
        return
      }
      Vue.set(this.food, 'count', 1)
    },
    hide () {
      this.showFlag = false
    },
    show () {
      this.showFlag = false
      this.selectType = ALL
      this.onlyContent = true
      this.showFlag = true
      if (!this.scroll) {
        this.$nextTick(() => {
          this.scroll = new BScroll(this.$refs.food, {
            click: true
          })
        })
      } else {
        this.scroll.refresh()
      }
    }
  },
  filters: {
    formaDate (time) {
      let data = new Date(time)
      return formaDate(data, 'yyyy-MM-dd hh:mm')
    }
  },
  watch: {
    onlyContentstate (state) {
      this.$nextTick(() => {
        this.onlyContent = state
      })
    },
    typestate (type) {
      this.$nextTick(() => {
        this.selectType = type
      })
    }
  },
  components: {
    cartcontrol,
    split,
    ratingslect
  }
}
</script>

<style lang="stylus">
.foods {
  position: fixed;
  top: 0;
  left: 0;
  bottom: 48px;
  z-index: 30;
  width: 100%;
  background: #fff;
}
.back {
  position: absolute;
  top: 10px;
  left: 0;
}
.icon-arrow_lift {
  display: block;
  padding: 10px;
  font-size: 20px;
  color: #fff;
}
.contentfood {
  padding: 18px;
}
.content > .foodtitle {
  line-height: 14px;
  margin-bottom: 8px;
  font-size: 14px;
  font-weight: 800;
  color: rgb(7, 17, 27);
}
.buy {
  position: absolute;
  right: 15px;
  top: 464px;
  padding: 3px;
  font-size: 10px;
  line-height: 24px;
  color: white;
  height: 24px;
  border-radius: 12px;
  background: rgb(0, 160, 220);
}
.fade-enter-active,
.fade-leave-active {
  transition: all 0.5s;
}
.fade-enter, .fade-leave-to{
  opacity: 0;
}
.info
  padding:18px;
  .title
    line-height :14px;
    font-size :14px;
    color :rgb(7,17,27)

  .foodinfo
    line-height :24px;
    padding :0 8px;
    font-size :12px;
    color :rgb(77,85,93)
.rating
  padding-top:18px;
  .title
    line-height :14px;
    font-size:14px;
    color :rgb(7,17,27)
     padding-left: 18px
.rating-wrapper
  padding :0 18px
  .rating-item
    position:relative
    margin-top :12px
    margin-bottom 22px
    color :rgb(147,153,159)
    .user
      position: absolute;
      right: 0;
    .text
      color: black
  .no-rating
    padding:16px 0
    font-size :12px
    color:rgb(147,153,159)
</style>
