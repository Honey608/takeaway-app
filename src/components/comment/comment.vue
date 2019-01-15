<template>
    <div>
        <ratings :seller="seller.seller"></ratings>
    </div>
</template>

<script>
import ratings from '../ratings/ratings'

export default {
  components: {
    ratings
  },
  props: {
    seller: {
      type: Object
    }
  }
}
</script>

<style lang="stylus">

</style>
