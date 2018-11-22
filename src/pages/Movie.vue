<template lang="html">
  <div class="uk-container">
    <div class="uk-flex uk-flex-between">
      <button
        class="uk-button uk-button-default uk-margin-top uk-margin-bottom"
        @click="$router.go(-1)"
        >
        <span uk-icon="arrow-left"></span>
        Back
      </button>
      <button
        class="uk-button uk-button-primary uk-margin-top uk-margin-bottom uk-margin-auto-left "
        @click="$router.push({ name: 'Home' })"
        >
        <span uk-icon="home"></span>
        Home
      </button>
    </div>
    <div class="movie uk-background-default">
      <spinner :flag="contentIsLoaded">
        <div class="movie__wrapper">
          <img class="movie__poster" v-if="poster_path" :src="`${imgBaseUrl}/${poster_path}`" alt="">
          <div v-else class="movie__poster--default">
            <span uk-icon="icon: tv; ratio: 3"></span>
            Poster
          </div>
          <div class="movie__info">
            <div class="uk-flex uk-flex-wrap uk-flex-bottom">
              <h1 class="movie__title">{{ title }}</h1>
              <h4 class="movie__title__original">{{ original_title }}</h4>
            </div>
            <div v-if="tagline" class="uk-tile uk-tile-muted">{{ tagline }}</div>
            <div class="movie__detail__info">
              <div class="row">
                <p>Date:</p>
                <p>{{ release_date | formatDate }}</p>
              </div>
              <div class="row">
                <p>Budget:</p>
                <p>{{ budget | formatPrice }}</p>
              </div>
              <div class="row">
                <p>Language:</p>
                <p>{{ language }}</p>
              </div>
              <div class="row">
                <p>Genres:</p>
                <p>{{ genresNames }}</p>
              </div>
              <div class="row">
                <p>Countries:</p>
                <p>{{ countries }}</p>
              </div>
            </div>
            <div class="movie__overview">
              {{ overview }}
            </div>
          </div>
        </div>
      </spinner>
      <similar-projects :id="id" />
    </div>
  </div>
</template>

<script>
import { mapActions, mapGetters } from 'vuex'
import SimilarMovies from '@/components/SimilarMovies'
import spinner from '@/components/Spinner'


export default {
  name: 'Movie',
  props: ['id'],
  data() {
    return {
      contentIsLoaded: true,
      poster_path: '',
      title: '',
      original_title: '',
      release_date: '',
      spoken_languages: [],
      tagline: '',
      overview: '',
      genres: [],
      budget: 0,
      production_countries: []
    }
  },

  created() {
    this.loadContent(this.id)
  },

  beforeRouteUpdate(to, from, next) {
    this.loadContent(to.params.id)
    next()
  },

  computed: {
    ...mapGetters({
      imgBaseUrl: 'movies/getBaseImageUrl'
    }),
    language() {
      return this.spoken_languages.map(lang => lang.name).join(', ')
    },
    genresNames() {
      return this.genres.map(el => el.name).join(', ')
    },
    countries() {
      return this.production_countries.map(el => el.name).join(', ')
    }
  },

  methods: {
    ...mapActions({
      fetchDetailMovie: 'movies/fetchDetailMovie'
    }),

    async loadContent(id) {
      this.contentIsLoaded = false;
      let detail = await this.fetchDetailMovie(id)

      Object.keys(this).forEach(field => {
        if (detail[field]) {
          this[field] = detail[field]
        }
      })

      this.contentIsLoaded = true;
    }
  },

  filters: {
    formatPrice(price) {
      // For more options
      // https://developer.mozilla.org/ru/docs/Web/JavaScript/Reference/Global_Objects/Number/toLocaleString
      return price.toLocaleString('en', {
        style: 'currency',
        currency: 'USD',
        maximumFractionDigits: 0,
        minimumFractionDigits: 0
      })
    },
    formatDate(date) {
      return date.split(/-/).reverse().join('.')
    }
  },

  components: {
    'similar-projects': SimilarMovies,
    spinner
  }
}
</script>

<style lang="less">
@import '../assets/styles/theme.less';

.movie__wrapper {
  display: flex;
  align-items: flex-start;
}

.movie__info {
  padding: 15px 30px 15px;
  width: 100%;
}

.movie__date {
  font-size: 14px;
  margin-top: 0;
  color: @global-secondary-background;

}

.movie {
  box-shadow: @global-medium-box-shadow;
  &:after {
    content: '';
    display: block;
    margin-top: 30px;
  }
}


.movie__title {
  font-size: 1.7rem;
  margin-bottom: 0;
  margin-right: 10px;
}

.movie__detail__info {
  margin-top: 20px;
  max-width: 400px;
  font-size: 14px;

  p {
    margin-bottom: 0;
    margin-top: 0;
  }


  .row {
    display: flex;
    align-items: center;
    margin-bottom: 5px;

    & > * {
      flex: 1;
    }
  }
}

.movie__poster--default {
  min-width: 342px;
  height: 513px;
  background-color: lighten(@global-secondary-background, 40%);
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  font-size: 1.5rem;
}

.movie__overview {
  font-size: 15px;
  margin-top: 20px;
}

.uk-tile-muted {
  padding: 10px;
  border-radius: 4px;
  margin: 10px 0;
  font-style: italic;
}

.movie__title__original {
  font-size: 1rem;
  margin-top: 0;
  margin-bottom: 10px;
  font-style: italic;
  margin-bottom: 0;
  color: @global-secondary-background;
}

@media (max-width: 991px) {

  .movie__info {
    width: initial;
  }

  .movie__poster {
    margin: 0 auto;
    max-height: 260px;
  }

  .movie__wrapper {
    flex-direction: column;
    justify-content: center;
  }

}

</style>
