<template>
  <div id="app">
    <v-header :dataapp="seller" ></v-header>
    <div class="tab">
      <router-link class="tab-item" :class="{'active':frist}" to="/commodity">商品</router-link>
      <router-link class="tab-item" to="/comment" @click.native="toggle()">评论</router-link>
      <router-link class="tab-item" to="/business" @click.native="toggle1()">商家</router-link>
    </div>
    <keep-alive>
      <router-view :seller="seller"></router-view>
    </keep-alive>

  </div>
</template>
<script>
import header from './components/header/header.vue'
import dataapp from '../data.json'
import { urlParse } from './assets/js/util'

export default {
  data () {
    return {
      frist: true,
      seller: dataapp,
      id: (() => {
        let queryParam = urlParse()
        return queryParam.id
      })()
    }
  },
  components: {
    'v-header': header
  },
  methods: {
    toggle () {
      this.frist = false
    },
    toggle1 () {
      this.frist = false
    }
  },
  created () {
    this.seller = Object.assign({}, this.seller, { id: this.id })
  }
  // mounted() {
  //   $.ajax({
  //     type:"GET",
  //     url: "../data.json",
  //     dataType: 'jsonp',
  //     success: function (res) {
  //       console.log(res)
  //     }
  //   })
  // }
  // created() {
  //   this.$http.get('/api/commodity').then(response => {
  //    this.someData = response.body
  //   })
  // }
}
</script>

<style lang="less">
#app > .tab {
  display: flex;
  width: 100%;
  height: 40px;
  line-height: 40px;
  // position: absolute;
  border-bottom: 1px solid rgba(7,17,27,0.1);
}
#app > .tab > .tab-item {
  text-align: center;
  flex: 1;
  text-decoration: none;
  display: block;
  font-size: 14px;
  color: rgb(77, 85, 93);
}
#app > .tab > .router-link-active {
  color: rgb(240, 20, 20);
}
#app > .tab > .active {
  color: rgb(240, 20, 20);
}
</style>
