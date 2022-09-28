Vue.component('products', {
    data() {
        return {
            catalogUrl: '/catalogData.json',
            filtered: [],
            products: [],
        }
    },
    mounted() {
        this.$parent.getJson(`/api/products`)
            .then(data => {
                for (let item of data) {
                    this.$data.products.push(item);
                    this.$data.filtered.push(item);
                }
            });
    },
    methods: {
        filter(userSearch) {
            let regexp = new RegExp(userSearch, 'i');
            this.filtered = this.products.filter(el => regexp.test(el.product_name));
        }
    },
    template: `
            <section class="products">
                <div class="container">
                    <h2 class="products__title">Fetured Items</h2>
                    <p class="products__text">Shop for items based on what we featured in this week</p>
                    <ul class="products__list">
                        <h3 v-if="!filtered.length">Product not found</h3>
                        <product v-for="item of filtered" 
                        :key="item.id_product"
                        :product="item"
                        @add-product="$parent.$refs.cart.addProduct"></product>
                    </ul>
                    <a class="products__link" href="#">Browse All Product</a>
                </div>
            </section>
            `
});
Vue.component('product', {
    props: ['product'],
    template: `
                <li class="products__item">
                    <div class="products__overlay-wrp">
                        <img class="products__img" :src="product.img" alt="product img">
                        <div class="products__overlay"></div>
                        <button class="products__button button" type="button" @click="$emit('add-product', product)">Add to Cart</button>
                    </div>
                    <div class="products__wrp">
                        <h3 class="products__heading">{{product.product_name}}</h3>
                        <p class="products__text-item">{{product.text}}</p>
                        <p class="products__price">$ {{product.price}}</p>
                    </div>
                </li>
    `
})