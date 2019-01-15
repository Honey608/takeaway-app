<template>
  <div>
    <div class="shopcart">
      <div class="content">
        <div class="content-left" @click="toggleList">
          <!-- logo -->
          <div class="logo-wrapper">
            <div class="logo" :class="{'highligth':totalCount>0}">
              <!-- <span class="icon-shopping_cart"></span> -->
              <img
                class="icon-shopping_cart"
                width="44px"
                height="44px"
                src="https://ss0.bdstatic.com/70cFvHSh_Q1YnxGkpoWK1HF6hhy/it/u=4229946137,4275521489&fm=15&gp=0.jpg"
                alt
              >
            </div>
            <div class="num" v-show="totalCount>0">{{totalCount}}</div>
          </div>
          <div class="price" :class="{'highligth':totalPrice>0}">¥{{totalPrice}}</div>
          <div class="desc">另需配送费¥{{this.seller.deliveryPrice}}元</div>
        </div>
        <div class="content-right" @click="pay">
          <div class="pay" :class="payClass">{{payDesc}}</div>
        </div>
      </div>
      <!-- 购物车小球动画 -->
      <div class="ball-container" v-for="(ball,index) in balls" :key="index">
        <transition
          name="drop"
          v-on:before-enter="beforeEnter"
          @enter="enter"
          @after-enter="afterEnter"
        >
          <div class="ball" v-show="ball.show">
            <div class="inner inner-hook"></div>
          </div>
        </transition>
      </div>
      <!-- 点开购物车列表 -->
      <div class="shopcart-list" v-show="listShow">
        <div class="list-header">
          <span class="title">购物车</span>
          <span @click="clearCart" class="empty">清空</span>
        </div>
        <div class="list-content" ref="listContent">
          <ul style="list-style-type: none">
            <li class="food" v-for="(food,index) in selectFoods" :key="index">
              <span class="name">{{food.name}}</span>
              <div class="price">
                <span>¥{{food.price*food.count}}</span>
              </div>
              <div class="cartcontrol-wrapper">
                <cartcontrol :food="food"></cartcontrol>
              </div>
            </li>
          </ul>
        </div>
      </div>
    </div>
    <transition name="fade">
     <div @click="listhid" class="list-mask" v-show="listShow"></div>
    </transition>
  </div>
</template>
<script>
import dataapp from '../../../data.json'
import cartcontrol from '../cartcontrol/cartcontrol'
import BScroll from 'better-scroll'

export default {
  data () {
    return {
      dropBalls: [],
      fold: true,
      seller: dataapp.seller,
      balls: [
        { show: false },
        { show: false },
        { show: false },
        { show: false },
        { show: false }
      ]
    }
  },
  components: {
    cartcontrol
  },
  props: {
    selectFoods: {
      type: Array,
      default () {
        return [
          {
            price: 10,
            count: 1
          }
        ]
      }
    }
  },
  methods: {
    listhid () {
      this.fold = true
    },
    clearCart () {
      this.fold = !this.fold
      this.selectFoods.forEach(food => {
        food.count = 0
      })
    },
    pay () {
      if (this.totalPrice < this.seller.minPrice) {
        return
      }
      alert('需支付' + this.totalPrice + '元')
    },
    toggleList () {
      if (!this.totalCount) {
        return
      }
      this.fold = !this.fold
    },
    drop (el) {
      for (let i = 0; i < this.balls.length; i++) {
        let ball = this.balls[i]
        if (!ball.show) {
          ball.show = true
          ball.el = el
          this.dropBalls.push(ball)
          return
        }
      }
    },
    beforeEnter: function (el) {
      let count = this.balls.length
      while (count--) {
        let ball = this.balls[count]
        if (ball.show) {
          /* 获取加号的位置(小球动画开始的位置) */
          let rect = ball.el.getBoundingClientRect()
          let x = rect.left - 32
          let y = -(window.innerHeight - rect.top - 22)
          /* 注释部分为动画为一层时代码 */
          /* el.style.display = ''; */
          /* el.style.webkitTransform=`translate3d(${x}px,${y}px,0)`; */
          /* el.style.transform = `translate3d(${x}px, ${y}px, 0)`; */

          el.style.display = ''
          el.style.webkitTransform = `translate3d(0, ${y}px, 0)`
          el.style.transform = `translate3d(0, ${y}px, 0)`
          /* 内层动画(这个动画在这里被分成两层，也可以一层) */
          let inner = el.getElementsByClassName('inner-hook')[0]
          inner.style.webkitTransform = `translate3d(${x}px, 0, 0)`
          inner.style.transform = `translate3d(${x}px, 0, 0)`
        }
      }
    },
    enter: function (el, done) {
      /* eslint-disable no-unused-vars */

      let rf = el.offsetHeight /* 触发浏览器重绘; */
      this.$nextTick(() => {
        el.style.webkitTransform = 'translate3d(0, 0, 0)'
        el.style.transform = 'translate3d(0, 0, 0)'
        let inner = el.getElementsByClassName('inner-hook')[0]
        inner.style.webkitTransform = 'translate3d(0, 0, 0)'
        inner.style.transform = 'translate3d(0, 0, 0)'
        el.addEventListener('transitionend', done)
      })
    },
    afterEnter: function (el) {
      let ball = this.dropBalls.shift()
      if (ball) {
        ball.show = false
        el.style.display = 'none'
      }
    }
  },
  computed: {
    // 总价格
    totalPrice () {
      let total = 0
      this.selectFoods.forEach(food => {
        total += food.price * food.count
      })
      return total
    },
    // 购买数量
    totalCount () {
      let count = 0
      this.selectFoods.forEach(food => {
        count += food.count
      })
      return count
    },
    // 控制是否折叠
    listShow () {
      if (!this.totalCount) {
        this.fold = true
        return false
      }
      let show = !this.fold
      if (show) {
        this.$nextTick(() => {
          if (!this.scroll) {
            let listWrapper = this.$refs.listContent
            this.scroll = new BScroll(listWrapper, {
              click: true
            })
          } else {
            this.scroll.refresh()
          }
        })
      }
      return show
    },
    payDesc () {
      if (this.totalPrice === 0) {
        return `¥ ${this.seller.minPrice}元起送`
      } else if (this.totalPrice < this.seller.minPrice) {
        let diff = this.seller.minPrice - this.totalPrice
        return `还差¥ ${diff}元起送`
      } else {
        return '去结算'
      }
    },
    payClass () {
      if (this.totalPrice >= this.seller.minPrice) {
        return 'enough'
      }
    }
  }
}
</script>
<style>
.shopcart {
  position: fixed;
  left: 0;
  bottom: 0;
  height: 56px;
  width: 100%;
  z-index: 50;
}
.shopcart > .content {
  display: flex;
  background: #141d27;
  color: rgba(225, 225, 225, 0.4);
}
.shopcart > .content > .content-left {
  flex: 1;
}
.shopcart > .content > .content-right {
  flex: 0 0 105px;
  width: 105px;
  background: #2b333b;
}
.shopcart > .content > .content-left > .logo-wrapper {
  display: inline-block;
  position: relative;
  top: -10px;
  margin: 0 12px;
  padding: 6px;
  width: 56px;
  height: 56px;
  box-sizing: border-box;
  vertical-align: top;
  border-radius: 50%;
  background: #141d27;
}
.shopcart > .content > .content-left > .logo-wrapper > .log {
  width: 100%;
  height: 100%;
  border-radius: 50%;
  background: #2b343c;
}
.shopcart > .content > .content-left > .price {
  display: inline-block;
  vertical-align: top;
  margin-top: 12px;
  line-height: 24px;
  padding-right: 12px;
  box-sizing: border-box;
  border-right: 1px solid rgba(225, 225, 225, 0.1);
  font-size: 16px;
  font-weight: 700;
}
.shopcart > .content > .content-left > .highligth {
  color: #fff;
}
.shopcart > .content > .content-left > .desc {
  display: inline-block;
  vertical-align: top;
  margin: 12px 0 0 12px;
  font-size: 13px;
  font-weight: 700;
  line-height: 24px;
}
.shopcart > .content > .content-right > .pay {
  height: 100%;
  line-height: 56px;
  font-size: 12px;
  font-weight: 700;
  text-align: center;
}
.logo-wrapper > .num {
  position: absolute;
  top: 0;
  right: 0;
  width: 24px;
  height: 16px;
  line-height: 16px;
  font-size: 16px;
  font-weight: 700;
  text-align: center;
  border-radius: 16px;
  color: rgb(255, 255, 255);
  background: rgb(240, 20, 20);
  box-shadow: 0 4px 8px 0 rgba(0, 0, 0, 0.4);
}
.logo-wrapper > .highligth {
  background: rgb(0, 160, 220);
  border-radius: 50%;
}
.icon-shopping_cart {
  border-radius: 50%;
  position: relative;
  top: 2px;
}
.enough {
  background: #00b43c;
  color: #fff;
}
.ball-container > .ball {
  position: fixed;
  left: 32px;
  bottom: 22px;
  z-index: 200;
  transition: all 0.4s cubic-bezier(0.49, -0.29, 0.75, 0.41);
}
.inner {
  width: 16px;
  height: 16px;
  border-radius: 50%;
  background: rgb(0, 160, 220);
  transition: all 0.4s linear;
}
.shopcart-list {
  position: fixed;
  bottom: 52px;
  left: 0;
  z-index: -1;
  width: 100%;
  background: darkgoldenrod;
}
.list-header {
  height: 40px;
  line-height: 40px;
  padding: 0 18px;
  background: #f3f5f7;
  border-bottom: 1px solid rgba(7, 17, 27, 0.1);
}
.list-header > .title {
  float: left;
  font-size: 14px;
  color: rgb(7, 17, 27);
}
.empty {
  float: right;
  font-size: 12px;
  color: rgb(0, 160, 220);
}
.list-content {
  overflow: hidden;
  max-height: 158px;
}
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.7s;
  background:rgba(7,17,27,0)
}
.fade-enter, .fade-leave-to {
  opacity: 0;
}
.list-mask{
  position: fixed;
  width: 100%;
  height: 100%;
  width:100%;
  top:0;
  left: 0;
  z-index: 40;
  background: rgba(7,17,27,0.6)
}
/* .name{
  position: absolute;
    top: 39px;
}
.price{
  position: absolute;
    left: 150px;
    top: 40px;
} */
</style>
