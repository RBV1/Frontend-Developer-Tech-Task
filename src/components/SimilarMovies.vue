<template lang="html">
  <div class="similar-movie uk-padding">
    <spinner :flag='similarIsLoaded' />
    <h4 class="uk-margin-remove-top">Similar</h4>
    <div class="list__similar">
      <router-link :to="{ name: 'Movie', params: { id }}" v-for="{ poster_path, title, id } in similarMovies" class="similar__item" :key="id">
        <img :src="`${imgBaseUrl}/${poster_path}`" alt="">
        {{ title }}
      </router-link>
      <div v-if="!similarMovies.length" class="uk-text-mute">
        No related projects yet
      </div>
    </div>
  </div>
</template>

<script>
import spinner from '@/components/Spinner'
import { mapActions, mapGetters } from 'vuex'

export default {
  name: 'SimilarMovies',
  props: ['id'],

  data() {
    return {
      similarIsLoaded: true,
      similarMovies: []
    }
  },
  created(){
    this.loadSimilar(this.id)
  },
  watch: {
    id(){
      this.loadSimilar(this.id)
    }
  },
  computed: {
    ...mapGetters({
      imgBaseUrl: 'movies/getBaseImageUrl'
    }),
  },

  methods: {
    ...mapActions({
      fetchSimilarMovies: 'movies/fetchSimilarMovies'
    }),

    async loadSimilar(id){
      this.similarIsLoaded = false;
      this.similarMovies = [];

      let response = await this.fetchSimilarMovies(id)
      this.similarMovies = response.results || []

      this.similarIsLoaded = true
    },
  },

  components: {
    spinner
  }
}
</script>

<style lang="less">
.list__similar {
  display: flex;
  overflow: auto;
}

.similar__item {
  display: flex;
  flex-direction: column;
  align-items: center;
  max-width: 200px;
  text-align: center;
  font-size: 14px;
  line-height: 1.2;
  min-width: 100px;
  margin: 0 3px;
  color: #666;

  &:hover,
  &:focus {
    text-decoration: none;
    opacity: .85;
  }

  img {
    max-height: 170px;
    margin-bottom: 6px;
  }
}
</style>
