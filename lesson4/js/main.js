const API = 'https://raw.githubusercontent.com/GeekBrainsTutorial/online-store-api/master/responses';
const catalogData = 'catalogData.json'
const getBasket = 'getBasket.json'

class ProductList {
    constructor(container = '.products') {
        this.container = container;
        this.goods = [];
        this._getProducts()
            .then(data => {
                this.goods = data;//запишем полученные данные в массив
                this.render();//вывод товаров на страницу
                this.сalcuAllPriceGoods(); //общая цена товара на странице
                this._init();
                //this.getButton();
                //this._fetchProducts();//рекомендация, чтобы метод был вызван в текущем классе
                //this.render();//вывод товаров на страницу
                //this.сalcuAllPriceGoods();
            });
    }

    _getProducts() {
        return fetch(`${API}/${catalogData}`)
            .then(result => result.json())
            .catch(error => {
                console.log(error);
            });
    }

    сalcuAllPriceGoods() {
        let sumPrice = 0;
        this.goods.forEach(item => {
            sumPrice += item.price;
        });
        alert(`Общая цена товаров на странице = ${sumPrice}.`);
    }

    render() {
        const block = document.querySelector(this.container);
        for (let product of this.goods) {
            const item = new ProductItem(product);
            block.insertAdjacentHTML("beforeend", item.render());
        }
    }
    /*getButton() {
        document.querySelectorAll(".product-item__btn").forEach(button => {
            button.addEventListener('click', function (event) {
                basketList.addProduct(event.target.dataset.id)
            });
        });
        document.querySelector('.search-form').addEventListener('submit', elem => {
            elem.preventDefault();
            this.filterProducts(document.querySelector('.search-field').value)
        })
    }*/

    _init() {
        document.querySelector(this.container).addEventListener("click", event => {
            if (event.target.classList.contains('product-item__btn')) {
                basketList.addProduct(event.target.dataset.id)
            }
        });
        document.querySelector('.search-form').addEventListener('submit', elem => {
            elem.preventDefault();
            this.filterProducts(document.querySelector('.search-field').value)
        })
    }

    filterProducts(value) {
        const regexp = new RegExp(value, 'i');
        this.filtered = this.goods.filter(product => regexp.test(product.product_name));
        this.goods.forEach(el => {
            console.log(el);
            const block = document.querySelector(`.product-item[data-id="${el.id_product}"]`);
            if (!this.filtered.includes(el)) {
                block.classList.add('hidden');
            } else {
                block.classList.remove('hidden');
            }
        })
    }
}

class ProductItem {
    constructor(product, img = 'https://via.placeholder.com/200x150') {
        this.title = product.product_name;
        this.id = product.id_product;
        this.price = product.price;
        this.img = img;

    }
    render() {
        return `<div data-id="${this.id}" class="product-item">
                    <img src="${this.img}">
                    <h3>${this.title}</h3>
                    <p>${this.price}</p>
                    <button data-id="${this.id}" class="product-item__btn buy-btn">Купить</button>
                </div>`
    }
}

class BasketList {
    constructor(container = '.cart-block') {
        this.container = container;
        this.goods = [];
        this.totalPrice = 0;
        this._getBasketItem()
            .then(data => {
                this.goods = data.contents;
                this.render();
                this._init();
                //this.getButton();
            });
        this._clickBasket();
    }

    _getBasketItem() {
        return fetch(`${API}/${getBasket}`)
            .then(result => result.json())
            .catch(error => {
                console.log(error);
            })
    }

    render() {
        const block = document.querySelector(this.container);
        for (let product of this.goods) {
            const item = new BasketItem(product);
            block.insertAdjacentHTML('beforeend', item.render());
        }
    }

    _clickBasket() {
        let buttonBasket = document.querySelector(".btn-cart");
        buttonBasket.addEventListener('click', () => {
            document.querySelector(this.container).classList.toggle('invisible');
        });
    }

    addProduct(id) {
        let product = document.querySelector(`[data-id="${id}"]`);
        let element = product.querySelector('.basket-item__volume').querySelector('span');
        element.innerText = +element.innerText + 1;
        this.changesProduct(product);
    }

    deleteProduct(id) {
        let product = document.querySelector(`[data-id="${id}"]`);
        let element = product.querySelector('.basket-item__volume').querySelector('span');
        if (+element.innerText > 0) {
            element.innerText = +element.innerText - 1;
            this.changesProduct(product);
        }
    }

    /*getButton() {
        document.querySelectorAll(".btn-delete").forEach(button => {
            button.addEventListener('click', function (event) {
                basketList.deleteProduct(event.target.dataset.id);
            });
        });
    }*/

    _init() {
        document.querySelector(this.container).addEventListener('click', event => {
            if (event.target.classList.contains('btn-delete')) {
                basketList.deleteProduct(event.target.dataset.id);
            }
        });
    }

    changesProduct(product) {
        let volume = product.querySelector('.basket-item__volume').querySelector('span');
        let totalPrice = product.querySelector('.basket-item__totalPrice').querySelector('span');
        let price = product.querySelector('.basket-item__price').querySelector('span');
        totalPrice.innerText = +price.innerText * +volume.innerText;
    }


    clearBasket() { }
    calcuTotalPrice() { }
}

class BasketItem {
    constructor(product, img = 'https://via.placeholder.com/200x150') {
        this.id = product.id_product;
        this.title = product.product_name;
        this.price = product.price;
        this.volume = product.quantity;
        this.totalPrice = this.price * this.volume;
        if (!product.img) {
            this.img = img;
        } else {
            this.img = product.img;
        };
    }
    render() {
        return `<div data-id="${this.id}" class="basket__basket-item basket-item">
                    <img class="basket-item__img" src="${this.img}" alt="${this.title}" height="100px">
                    <div class="basket-item__wrp">
                        <h3 class="basket-item__title">${this.title}</h3>
                        <p class="basket-item__price">Цена за шт.: <span>${this.price}</span> $</p>
                        <p class="basket-item__volume">Количество: <span>${this.volume}</span> шт.</p>
                        <p class="basket-item__totalPrice">Общая цена: <span>${this.totalPrice}</span> $</p>
                    </div>
                    <button data-id="${this.id}" class="basket-item__btn btn-delete" type="button">X</button>
                </div>`
    }
}

let list = new ProductList();

let basketList = new BasketList();