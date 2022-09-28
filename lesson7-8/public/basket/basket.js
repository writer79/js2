'use strict';

const productName = document.querySelectorAll('.catalog__item-title');
const productPrice = document.querySelectorAll('.catalog__price span');
const basketOpen = document.querySelector('.catalog__basket');
const basketEl = document.querySelector('.basket');
const basketQuantity = document.querySelector('.catalog__basket span');
const basketTotalEl = document.querySelector('.basketTotal');
const basketTotalValueEl = document.querySelector('.basketTotalValue');


basketOpen.addEventListener('click', function () {
    basketEl.classList.toggle('hidden');
});

let basket = {};

function addProductToObject(productId) {
    if (!(productId in basket)) {
        basket[productId] = 1;
    } else {
        basket[productId]++;
    }
}

function addProductInBasket(productId) {
    let productExist = document.querySelector(`.productCount[data-productID="${productId}"]`);
    if (productExist) {
        productCountIncrease(productId);
        productSum(productId);
    } else {
        addNewProductInBasket(productId);
    }
}

function addNewProductInBasket(productId) {
    let productRow = `
        <div class="basketRow">
            <div>${productName[productId].innerText}</div>
            <div>
                <span class="productCount" data-productId="${productId}">1</span> шт.
            </div>
            <div>$${productPrice[productId].innerText}</div>
            <div>
                $<span class="productTotalRow" data-productId="${productId}">${productPrice[productId].innerText}</span>
            </div>
        </div>
    `;
    basketTotalEl.insertAdjacentHTML("beforebegin", productRow);
}

function basketQuantityIncrease() {
    basketQuantity.textContent++;
}

function productCountIncrease(productId) {
    const productCountEl = document.querySelector(`.productCount[data-ProductId="${productId}"]`);
    productCountEl.textContent++;
}

function productSum(productId) {
    const productTotalRowEl = document.querySelector(`.productTotalRow[data-productId="${productId}"]`);
    let totalPriceForRow = (basket[productId] * productPrice[productId].innerText).toFixed(2);
    productTotalRowEl.textContent = totalPriceForRow;
}

function calculateAndAddTotalSum() {
    let totalSum = 0;
    for (let productId in basket) {
        totalSum += basket[productId] * productPrice[productId].innerText;
    }
    basketTotalValueEl.textContent = totalSum.toFixed(2);
}


function addProductIntoBasket(productId) {
    basketQuantityIncrease();
    addProductToObject(productId);
    addProductInBasket(productId);
    calculateAndAddTotalSum();
}

function addToCartListner() {
    const addToCartButtons = document.querySelectorAll('button[dataProductId]')
    addToCartButtons.forEach(function (button) {
        button.addEventListener('click', addedProductHandler);
    });
}

function addedProductHandler(event) {
    const productId = event.currentTarget.getAttribute('dataProductId');
    addProductIntoBasket(productId);
}

addToCartListner();