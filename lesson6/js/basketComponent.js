Vue.component("basket", {
    props: [`basketGoods`, `stubImg`, `showBasket`],
    template: `
            <div class="cart-block" v-show="showBasket">
                <h1 v-if="!basketGoods.length">Cart is empty</h1>
                <basket-item v-for="cart of basketGoods" :key="cart.id_product" :stub-img="stubImg" :cart="cart"></basket-item>
                <button class="basket__btn-clear btn-cart" type="button" v-if="basketGoods.length" @click="$root.clearBasket">Clear cart</button>
            </div>`
});

Vue.component("basket-item", {
    props: [`stubImg`, 'cart'],
    template: `
            <div class="basket__basket-item basket-item">
                <img class="basket-item__img" :src="cart.img" :alt="cart.product_name" height="100px" v-if="cart.img">
                <img class="basket-item__img" :src="stubImg" :alt="cart.product_name" height="100px" v-else>
                <div class="basket-item__wrp">
                    <h3 class="basket-item__title">{{cart.product_name}}</h3>
                    <p class="basket-item__price">Цена за шт.: {{cart.price}} $</p>
                    <p class="basket-item__volume">Количество: {{cart.quantity}} шт.</p>
                    <p class="basket-item__totalPrice">Общая цена: {{cart.price * cart.quantity}} $</p>
                </div>
                <button class="basket-item__btn btn-delete" type="button" @click="$root.deleteProduct(cart)">X</button>
            </div>`
});