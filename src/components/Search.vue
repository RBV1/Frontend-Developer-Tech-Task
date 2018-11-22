<template lang="html">
  <div class="search">
    <form class="uk-search uk-search-default">
        <span uk-search-icon></span>
        <input :uk-toogle="`target:${$refs['results-search']}` " v-model="query" @input="changeQuery"  class="uk-search-input" type="search" placeholder="">
    </form>
    <div @scroll.stop.prevent="scrollResult" uk-drop="mode: click" class="results" ref="results-search">
      <router-link :to="{ name: 'Movie', params: { id }}" v-for="{ title, id } in results" class="results__item" :key="id">
        {{ title }}
      </router-link>
      <div v-if="!results.length" class="results-empty-text uk-text-muted">
        No results
      </div>
    </div>
  </div>
</template>

<script>
import { mapActions } from 'vuex'

export default {
  name: 'Search',
  data(){
    return {
      query: '',
      results: []
    }
  },
  methods: {
    ...mapActions({
        search: 'movies/searchMovie'
    }),

    scrollResult(){
      // TODO: add load more data on scroll
    },

    async getSearchElements() {
      let response = await this.search(this.query)
      this.results = response.results || []
    },

    changeQuery() {
      debounce(this.getSearchElements, 250)()
    }
  }
}


function debounce(func, wait, immediate) {
	let timeout;
	return function() {
		let context = this,
        args = arguments;

		let later = function() {
			timeout = null;
			if (!immediate) func.apply(context, args);
		};

		let callNow = immediate && !timeout;
		clearTimeout(timeout);
		timeout = setTimeout(later, wait);
		if (callNow) func.apply(context, args);
	}
}

</script>

<style lang="less" scoped>
@import '../assets/styles/theme.less';


.search {
  position: relative;

  .uk-search-input:focus + .results {
    display: block;
  }

  .results {
    background-color: #fff;
    margin-top: 0;
    max-height: 400px;
    overflow: auto;
    width: 100%;
    box-shadow: @global-medium-box-shadow;

  }

  .results__item {
    padding: 3px 10px;
    font-size: 14px;
    display: block;
    text-decoration: none;
    color: @global-color;
    transition: background-color .15s ease-in;

    &:hover,
    &:focus {
      background-color: lighten(@global-primary-background, 30%);
    }
  }

  .results-empty-text {
    text-align: center;
    font-size: 14px;
    padding: 5px;
  }
}

.uk-search-default .uk-search-input {
  background-color: #fff;

  &:focus {
    background-color: #fff;
  }
}

.uk-search-default {
  width: 250px;
}
</style>
