<template>
  <div class="retingselect">
    <div class="rating-type">
      <span @click="select(2,$event)" :class="{'active':slectType===2}" class="block positive">{{desc.all}}<span class="count">{{ratings.length}}</span></span>
      <span @click="select(0,$event)" :class="{'active':slectType===0}" class="block positive">{{desc.positive}}<span class="count">{{positives.length}}</span></span>
      <span @click="select(1,$event)" :class="{'active':slectType===1}" class="block negative">{{desc.negative}}<span class="count">{{negatives.length}}</span></span>
    </div>
    <div class="splitlines"></div>
    <div @click="selectstate" class="switch" :class="{'on':onlyContent}">
      <span class="icon-check_circe"><img style="height:24px;float:left"  src="../../assets/fonts/_ionicons_svg_md-checkmark-circle-outline.svg" alt=""></span>
      <span class="test">只看有内容的评价</span>
    </div>
  </div>
</template>

<script>
const POSITYVE = 0
const NEGATIVE = 1
const ALL = 2

export default {
  data () {
    return {
      textmsg: ''
    }
  },
  props: {
    ratings: {
      type: Array,
      default () {
        return []
      }
    },
    slectType: {
      type: Number,
      default: ALL
    },
    onlyContent: {
      type: Boolean,
      default: false
    },
    desc: {
      type: Object,
      default () {
        return {
          all: '全部',
          positive: '满意',
          negative: '不满意'
        }
      }
    }
  },
  computed: {
    positives () {
      return this.ratings.filter((rating) => {
        return rating.rateType === POSITYVE
      })
    },
    negatives () {
      return this.ratings.filter((rating) => {
        return rating.rateType === NEGATIVE
      })
    }
  },
  methods: {
    selectstate () {
      this.$emit('type-onlyContent', this.onlyContent)
    },
    select (type, event) {
      this.$emit('type-state', type)
      if (!event._constructed) {

      }
      // this.slectType=type
    }
  }
}
</script>

<style lang="stylus">
  .retingselect
    .splitlines
      position: relative;
      left: 5%;
      width: 90%
      margin :auto 0
      border:0.7px solid rgba(7,17,27,.1)
      margin :12px 0
    .switch
      padding :12px 18px
      line-height :24px
      border-bottom :1px solid rgba(7,17,27,.1)
      color :rgb(147,153,159)
      &.on
        .icon-check_circe
          background  :#00c850
          display: inline-block;
          width: 24px;
          height: 24px;
          border-radius: 50%;
      .test
        font-size :12px
        display :inline-block
        vertical-align :top
    .rating-type
      padding:18px 0
      margin:0 18px
      .block
        display :inline-block
        padding:12px
        margin-right :8px
        line-height 16px
        border-radius:1px
        font-size:12px
        color :rgb(77,85,93)
        background :rgb(0,160,220)
        &.active
          color :#fff
        .count
          margin-left:2px
          font-size :8px
          line-height :10px
        &.negative
          background :rgba(77,85,93,.2)
          &.active
            background :rgba(77,85,93,.4)
        &.positive
          background :rgba(0,160,220,.2)
          &.active
            background :rgb(0,160,220)

</style>
