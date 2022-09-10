Vue.component("products", {
    props: [`filtered`, `stubImg`, `stubText`, `addProduct`],
    template: `
            <div class="products">
                <h1 v-if="!filtered.length">Товар не найден</h1>
                <product-item v-for="product of filtered" :key="product.id_product" :product="product" :stub-img="stubImg" :stub-text="stubText"></product-item>
            </div>`
});

Vue.component("product-item", {
    props: [`stubImg`, `stubText`, `product`],
    template: `
            <div class="product-item">
                <h3 class="product-item__title">{{product.product_name}}</h3>
                <img class="product-item__img" :src="product.img" :alt="product.product_name" height="300px" v-if="product.img">
                <img class="product-item__img" :src="stubImg" :alt="product.product_name" height="300px" v-else>
                <p class="product-item__text" v-if="product.text">{{product.text}}</p>
                <p class="product-item__text" v-else>{{stubText}}</p>
                <p class="product-item__price">{{product.price}} $</p>
                <button class="product-item__btn btn-cart" type="button" @click="$parent.$emit('add-product', product)">Купить</button>
            </div>`
});