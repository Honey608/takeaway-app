<template>
<div>
   <div class="goods">
    <div class="menu-wrapper" ref="menuWrapper">
      <ul>
        <li
          style="list-style-type:none"
          v-for="(item,value) in goods"
          class="menu-item"
          :key="value"
          :class="{'current':currentIndex===value}"
          @click="slectMenu(value)"
         >
          <span class="text">
            <span>
              <img
                style="width:15px;height: 13px"
                v-show="item.type==2"
                src="./special_3@2x.png"
                alt
              >
            </span>
            {{item.name}}
          </span>
        </li>
      </ul>
    </div>
    <div class="foods-wrapper" ref="foodsWrapper">
      <ul style="padding-left:0;font-size:0">
        <li
          style="list-style-type: none;position: relative;"
          v-for="(item,value) in goods"
          class="food-list food-list-hook"
          :key="value"
        >
          <span class="title">
            <h1 style="margin-left: 29px;">{{item.name}}</h1>
          </span>
          <ul>
            <li
              style="list-style-type: none;"
              v-for="(food,value) in item.foods"
              class="food-item"
              :key="value"
              @click="selectFoodclick(food,$event)"
              >
              <div class="icon">
                <img widht="57" height="57" :src="food.icon" alt>
              </div>
              <div class="content">
                <span class="name">{{food.name}}</span>
                <br>
                <span style="color:rgb(147,153,159)">{{food.description}}</span>
                <div class="extra">
                  <span>月售{{food.sellCount}}份</span>
                  <span>好评率{{food.rating}}%</span>
                </div>
                <div class="price">
                  <span style="color:red;font-size:15px">¥{{food.price}}</span>
                  <span style="text-decoration:line-through;padding:6px;color: rgb(147, 153, 159);" v-show="food.oldPrice">¥{{food.oldPrice}}</span>
                </div>
                <!-- 加减按钮 -->
                <div class="cartcontrol-wrapper">
                  <cartcontrol @cartadd="cartAdd" :food="food"></cartcontrol>
                </div>
              </div>
            </li>
          </ul>
        </li>
      </ul>
    </div>
    <shopcart ref="shopcart" :selectFoods="selectFoods"></shopcart>
  </div>
  <food :food="selectsFoods" ref="foodshow"></food>
</div>

</template>
<script>
import dataapp from '../../../data.json'
import BScroll from 'better-scroll'
import shopcart from '../shopcart/shopcart'
import cartcontrol from '../cartcontrol/cartcontrol'
import food from '../food/food'

export default {
  data () {
    return {
      goods: dataapp.goods,
      listHeight: [],
      scrollY: 0,
      onle: '',
      selectsFoods: {}
    }
  },
  computed: {
    currentIndex () {
      for (let i = 0; i < this.listHeight.length; i++) {
        let height1 = this.listHeight[i]
        let height2 = this.listHeight[i + 1]
        if (!height2 || (this.scrollY >= height1 && this.scrollY < height2)) {
          return i
        }
      }
      return 0
    },
    selectFoods () {
      let foods = []
      this.goods.forEach((good) => {
        good.foods.forEach((food) => {
          if (food.count) {
            foods.push(food)
          }
        })
      })
      return foods
    }

  },
  mounted () {
    this.$nextTick(() => {
      this._initScroll()
      this._calculateHeight()
    })
  },
  methods: {
    selectFoodclick (food, event) {
      if (!event._constructed) {
        return
      }
      this.selectsFoods = food
      this.$refs.foodshow.show()
    },
    cartAdd (el) {
      this.$refs.shopcart.drop(el)
    },
    _initScroll () {
      let bscrollDom = this.$refs.foodsWrapper
      let menuWrapper = this.$refs.menuWrapper
      this.foodsScroll = new BScroll(bscrollDom, {
        probeType: 3,
        click: true
      })
      this.foodsScroll.on('scroll', (pos) => {
        this.scrollY = Math.abs(Math.round(pos.y))
      })
      this.menuScroll = new BScroll(menuWrapper, {
        click: true
      })
    },
    _calculateHeight () {
      let foodList = this.$refs.foodsWrapper.getElementsByClassName('food-list-hook')
      let height = 0
      this.listHeight.push(height)
      for (let i = 0; i < foodList.length; i++) {
        let item = foodList[i]
        height += item.clientHeight
        this.listHeight.push(height)
      }
    },
    slectMenu (index) {
      let foodList = this.$refs.foodsWrapper.getElementsByClassName('food-list-hook')
      let el = foodList[index]
      this.foodsScroll.scrollToElement(el, 300)
    }

  },
  components: {
    shopcart,
    cartcontrol,
    food
  }
}
</script>
<style>
.goods {
  display: flex;
  top: 205px;
  bottom: 64px;
  position: absolute;
  width: 100%;
  overflow: hidden;
  /* position: relative;
  top:50px; */
}
.goods > .menu-wrapper {
  width: 80px;
  background: #f3f5f7;
  flex: 0 0 80px;
}
.goods > .foods-wrapper {
  flex: 1;
}
.menu-item {
  display: table;
  height: 54px;
  width: 80px;
  margin-left: -100%;
}
.text {
  display: table-cell;
  vertical-align: middle;
  text-align: center;
  font-size: 14px;
}
.food-list > .title {
  background: #f3f5f7;
  font-size: 8px;
  border-left: 2px solid rgba(7, 17, 27, 0.2);
  color: rgb(147, 153, 159);
}
.food-item {
  display: flex;
  margin: 18px;
  margin-left: -25px;
}
.food-item:after {
  display: block;
  position: absolute;
  left: 0;
  width: 100%;
  border-top: 1px solid rgba(7, 17, 27, 0.2);
  content: "";
  margin-top: -12px;
}
.food-item:first-child:after {
  display: none;
}
.icon {
  flex: 0 0 57px;
  margin-right: 10px;
}
.content {
  flex: 1;
  font-size: 13px;
}
.content > .name {
  margin: 2px 0 8px 0;
  height: 14px;
  line-height: 14px;
  font-size: 14px;
  color: rgb(7, 17, 27);
}
.extra > span {
  font-size: 12px;
  color: rgb(147, 153, 159);
  padding: 2px
}
.current{
  position: relative;
  z-index: 10;
  margin-top: -1px;
  background: #fff;
  font-weight: 700;
}
/* .cartcontrol-wrapper{
  position: relative;
  left: 53%;
  top: -25%;
} */
</style>
