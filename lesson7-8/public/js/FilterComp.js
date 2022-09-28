Vue.component('filter-el', {
    data() {
        return {
            userSearch: ''
        }
    },
    template: `<form class="header__form" action="#" @submit.prevent="$parent.$refs.products.filter(userSearch)">
                    <label class="visually-hidden" for="search">Search</label>
                    <input class="header__search input" type="search" id="search" placeholder="Search" v-model="userSearch" @input="$parent.$refs.products.filter(userSearch)">
                </form>`
})