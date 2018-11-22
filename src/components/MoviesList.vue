<template lang="html">
  <div class="">
    <spinner
        :flag="dataIsLoaded"
        :class="{'uk-text-left': hasContent}"
        :ratio="hasContent ? .5 : 1"
      />
      <div class="uk-child-width-1-2@m uk-margin-bottom" uk-grid>
        <div v-for="movie in listOfMovies" :key="movie.id">
          <movie-card v-bind="movie" />
        </div>
      </div>
      <div v-if="dataIsLoaded && !listOfMovies.length" class="uk-text-center uk-text-muted">
        No results yet
      </div>
      <pagination
        v-if="hasContent"
        :page-count="totalPages"
        v-model="page"
        :page-range="3"
        :click-handler="changePage"
        :prev-text="'Prev'"
        :next-text="'Next'"
        :container-class="'uk-pagination'"
        :initial-page="initialPage"
        active-class='uk-active'
      />
  </div>
</template>

<script>
import { mapActions,  mapGetters, mapMutations } from 'vuex'
import MovieCard from '@/components/MovieCard'
import Spinner from '@/components/Spinner'
import Pagination from 'vuejs-paginate';


export default {
  name: 'MoviesList',
  props: ['initialPage'],
  data() {
    return {
      dataIsLoaded: true,
      page: this.initialPage || 1
    }
  },

  async created() {
    this.loadMovies()
  },

  computed: {
    ...mapGetters({
      listOfMovies: 'movies/getList',
      totalPages: 'movies/getTotalPages'
    }),
    hasContent() {
      return !!this.listOfMovies.length
    }
  },

  methods: {
    ...mapActions({
      fetchMovies: 'movies/fetchMovies'
    }),
    ...mapMutations({
      clearMovie: 'movies/clearMovie'
    }),
    async loadMovies() {
      this.dataIsLoaded = false;
      await this.fetchMovies(this.page)
      this.dataIsLoaded = true;
    },
    changePage(page) {
      this.page = page
      this.$router.replace({ query: { page }})
      this.clearMovie()
      this.loadMovies()
    }
  },

  components: {
    'movie-card': MovieCard,
    spinner: Spinner,
    pagination: Pagination
  }
}
</script>

<style lang="less"></style>
