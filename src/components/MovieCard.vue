<template lang="html">
  <router-link :to="{ name: 'Movie', params: { id }}" class="card-movie uk-card uk-card-default uk-padding-remove uk-child-width-expand uk-grid-collapse" uk-grid>
    <div class="uk-card-media-left card-movie__poster">
        <img :src="poster_path" alt="">
    </div>
    <div>
        <div class="uk-card-body">
          <h3 class="uk-card-title">{{ title }}</h3>
          <h4 class="title-original">{{ original_title  }}</h4>
          <span class="card-movie__date">{{ release_date | formatDate }}</span>
          <p class="card-movie__overview">{{ overview | less }}</p>
        </div>
    </div>
  </router-link>
</template>
<script>

export default {
  name: 'MovieCard',
  props: [
    'poster_path',
    'title',
    'original_title',
    'overview',
    'release_date',
    'id'
  ],

  data() {
    return {}
  },


  filters: {
    less(value) {
      return value.slice(0, 80) + '...'
    },
    formatDate(date) {
      return date.split(/-/).reverse().join('.')
    }
  }
}
</script>

<style lang="less" scoped>
@import '../assets/styles/theme.less';

.card-movie {
  max-height: 250px;
  overflow: hidden;
  position: relative;
  &:hover,
  &:focus {
    text-decoration: none;
    color: @global-color;
  }


  &:after {
    content: '';
    border: transparent 2px solid;
    transition: border-color .13s ease-in, height .13s ease-in;
    width: 0;
    position: absolute;
    top: 50%;
    right: 0;
    height: 0;
    border-left: none;
    transform: translateY(-50%);
  }

  &:hover:after,
  &:hover:focus {
    border-color: @global-primary-background;
    height: 100%;
  }
}

.card-movie__overview {
  font-size: 14px;
}

.card-movie__date {
  font-size: 12px;

}

.uk-card-title {
  font-size: 1.3rem;
  margin-bottom: 10px;
  max-height: 60px;
  overflow: hidden;
}

.title-original {
  font-size: 14px;
  margin-top: 0;
  margin-bottom: 0;
  color: @global-muted-color;
}

.uk-card-body {
  padding: 15px;
}

.card-movie__poster {
  height: 250px;
  width: auto;
  max-width: 167px;

  img {
    height: 250px;
    width: auto;
  }
}

@media (max-width: 450px) {
  .card-movie {
    flex-direction: column;
    max-height: initial;
    display: flex;
  }

  .card-movie__poster {
    margin: 10px auto 0;
  }
}

</style>
