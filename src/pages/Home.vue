<template lang="html">
  <div class="uk-container">
    <div class="uk-flex uk-flex-between uk-flex-middle">
      <h1>Homepage</h1>
      <search />
    </div>
    <movie-list :initialPage="page | toInt"/>
  </div>
</template>

<script>
import MoviesList from '@/components/MoviesList'
import Search from '@/components/Search'


export default {
  name: 'Home',
  components: {
    'movie-list': MoviesList,
    search: Search
  },
  data() {
    return {
      page: this.$route.query.page
    }
  },
  filters: {
    toInt: val => parseInt(val) || 0
  }
}
</script>

<style lang="less" scoped>
  .uk-container {
    padding-top: 20px;
    padding-bottom: 20px;
  }
</style>
