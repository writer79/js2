Vue.component('cart', {
    data() {
        return {
            cartUrl: '/getBasket.json',
            cartItems: [],
            showCart: false
        }
    },
    mounted() {
        this.$parent.getJson(`/api/cart`)
            .then(data => {
                for (let item of data.contents) {
                    this.$data.cartItems.push(item);
                }
            });
    },
    methods: {
        addProduct(item) {
            let find = this.cartItems.find(el => el.id_product === item.id_product);
            if (find) {
                this.$parent.putJson(`/api/cart/${find.id_product}`, { quantity: 1 })
                    .then(data => {
                        if (data.result === 1) {
                            find.quantity++
                        }
                    })
            } else {
                const prod = Object.assign({ quantity: 1 }, item);
                this.$parent.postJson(`/api/cart`, prod)
                    .then(data => {
                        if (data.result === 1) {
                            this.cartItems.push(prod)
                        }
                    })
            }
        },
        remove(product) {
            if (product.quantity > 1) {
                this.$parent.putJson(`/api/cart/${ product.id_product }`, { quantity: -1 })
                    .then(data => {
                        if (data.result) {
                            product.quantity--;
                        }
                    })
            } else {
                this.$parent.delJson(`/api/cart/${ product.id_product }/${ product.product_name }`, product)
                    .then(data => {
                        if (data.result) {
                            this.cartItems.splice(this.cartItems.indexOf(product), 1);
                        } else {
                            console.log('error');
                        }
                    })
            }
        },
    },
    template: `
                <li class="header__flex">
                    <a class="header__link button" href="#"><img src="./img/ic/basket-ic.svg" alt="basket-icon" @click="showCart = !showCart"></a>
                    <div class="basket" v-show="showCart">
                    <h2 v-if="!cartItems.length">Корзина пуста</h2>
                        <cart-item v-for="item of cartItems" :key="item.id_product"  :cart-item="item" @remove="remove">
                        </cart-item>
                    </div>
                </li>
    `
});

Vue.component('cart-item', {
    props: ['cartItem'],
    template: `
            <div class="basket__basket-item basket-item">
                <img class="basket-item__img" :src="cartItem.img" :alt="cartItem.product_name" height="100px" v-if="cartItem.img">
                <img class="basket-item__img" :src="stubImg" :alt="cartItem.product_name" height="100px" v-else>
                <div class="basket-item__wrp">
                    <h3 class="basket-item__title">{{cartItem.product_name}}</h3>
                    <p class="basket-item__price">Цена за шт.: {{cartItem.price}} $</p>
                    <p class="basket-item__volume">Количество: {{cartItem.quantity}} шт.</p>
                    <p class="basket-item__totalPrice">Общая цена: {{cartItem.price * cartItem.quantity}} $</p>
                </div>
                <button class="basket-item__btn btn-delete" type="button" @click="$emit('remove', cartItem)">X</button>
            </div>`
})