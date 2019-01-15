<template>
  <div class="cartcontrol">
    <div class="cart-add" @click.stop.prevent="addCart">
      <img width="22px" height="22px" src="../../assets/fonts/_ionicons_svg_md-add-circle.svg" alt="">
    </div>
    <div class="cart-count" v-show="food.count>0">{{food.count}}</div>
    <transition name="fade">
     <div class="cart-decrease" @click.stop.prevent="decreaseCart" v-show="food.count>0">
      <img class="cart-decrease-inner" src="../../assets/fonts/_ionicons_svg_md-remove-circle-outline.svg" alt="">
     </div>
    </transition>
  </div>
</template>

<script>
import Vue from 'vue'
export default {
  data () {
    return {
      // show:true
    }
  },
  props: {
    food: {
      type: Object
    }
  },
  methods: {
    addCart (event) {
      if (!event._constructed) {
        return
      }
      if (!this.food.count) {
        Vue.set(this.food, 'count', 1)
      } else {
        this.food.count++
      }
      this.$emit('cartadd', event.target)
    },
    decreaseCart (event) {
      if (!event._constructed) {
        return
      }
      if (this.food.count > 0) {
        this.food.count--
      }
    }
  }
}
</script>
<style>
.cartcontrol {
  display: flex;
  height: 0;
  flex-direction:row-reverse;
  position: relative;
  left: -6%;
  top: -18px;
  transform: rotate(0);
}
.cart-count{
    line-height: 22px;
    font-size: 16px;
    color: rgb(147, 153, 159);
}
.fade-enter-active, .fade-leave-active {
  transition: all .5s;

}
.fade-enter, .fade-leave-to {
  opacity: 0;
  transform: translate3d(24px, 0, 0);
  /* transform: rotate(180deg); */
}
.cart-decrease-inner{
  width: 22px;
  height: 22px;
}
</style>
