const products = [
    { id: 1, title: 'Notebook', price: 2000, img: "./img/product1.jpg" },
    { id: 2, title: 'Mouse', price: 20, img: "./img/product2.jpg" },
    { id: 3, title: 'Keyboard', price: 200, img: "./img/product3.jpg" },
    { id: 4, title: 'Gamepad', price: 50, img: "./img/product4.jpg" },
];

//Функция для формирования верстки каждого тьовара
const renderProduct = (obj) => {
    return `<div class="product-item">
            <h3 class="product-item__title">${obj.title}</h3>
            <img src="${obj.img}">
            <p class="product-item__price">$ ${obj.price}</p>
            <button class="product-item__btn buy-btn">Купить</button>
            </div>`
};
const renderPage = list => {
    const productsList = list.map(item => renderProduct(item));
    console.log(productsList);
    document.querySelector('.products').innerHTML = productsList.join('');
};

renderPage(products);