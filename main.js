function validateForm() {

    var myField = document.getElementById("myNumber");
    var value = myField.value;

    if (value == "" || isNaN(value) || value < 0 || value > 10) {
        alert("Bạn vui lòng nhập lại mật khẩu");
        myField.focus();
        return false;
    }
}
function checkLoginEmail() {
    // event.preventDefault();
    let mess = getElementById("errors");
    let getEmail = document.getElementById("exampleInputEmail").value;
    let letter = /^([a-zA-Z0-9_\.\-])+\@(([a-zA-Z0-9\-])+\.)+([a-zA-Z0-9]{2,4})+$/;
    if (getEmail == "") {
        document.getElementById("exampleInputEmail").style.backgroundColor = "yellow";
        alert('lỗi');
    } else if (!getEmail.match(letter)) {
        document.getElementById("exampleInputEmail").style.backgroundColor = "yellow";
        mess += "Email sai định dạng vui lòng nhập lại email";
    } else {
        mess.innerHTML;
    }
}
function checkPhoneNumber() {
    var flag = false;

    var phone = $('#exampleInputPhone').val().trim(); // ID của trường Số điện thoại
    phone = phone.replace('(+84)', '0');
    phone = phone.replace('+84', '0');
    phone = phone.replace('0084', '0');
    phone = phone.replace(/ /g, '');
    if (phone != '') {
        var firstNumber = phone.substring(0, 2);
        if ((firstNumber == '09' || firstNumber == '08') && phone.length == 10) {
            if (phone.match(/^\d{10}/)) {
                flag = true;
            }
        } else if (firstNumber == '01' && phone.length == 11) {
            if (phone.match(/^\d{11}/)) {
                flag = true;
            }
        }
    }
    return flag;
}
$('#btn-order').submit(function (e) { // ID của Form
    debugger;
    if (!checkPhoneNumber()) {
        $('#exampleInputPhone').parents('div.form-group').addClass('has-error'); // ID của trường Số điện thoại
        $('#exampleInputPhone').focus(); // ID của trường Số điện thoại
        e.preventDefault();
    }
});

$('#exampleInputPhone').keypress(function () { // ID của trường Số điện thoại
    $(this).parents('div.form-group').removeClass('has-error');
});



// shopping cart 
let icon = document.querySelectorAll(".cart-list-icon ul .shopping-bag");
let getNumberShoppingCart = document.querySelector(".amm-shopping-cart-open .quantity-amm-shopping-cart-open");
console.log(getNumberShoppingCart);
let product = {};
let cart = new Array();
icon.forEach(function (value, index) {
    value.addEventListener("click", function (event) {
        debugger;
        let btnItem = event.target; // lấy đúng cái icon 
        let productMain = btnItem.parentElement.parentElement.parentElement.parentElement.parentElement.parentElement;
        // let productMain = $(this).parents(".single-shop-box");
        let productId = productMain.querySelector("#productId").value;
        console.log(productId);
        let imgProduct = productMain.querySelector("div>img").src;
        let productName = productMain.querySelector(".content a").innerText;
        let productPrice = productMain.querySelector(".content .discount-price").innerText;
        let priceRegular = productMain.querySelector(".content .regular-price").innerText;
        let quantity = 1;
        let product = {
            productId: productId,
            imgProduct: imgProduct,
            productName: productName,
            productPrice: productPrice,
            priceRegular: priceRegular,
            quantity: quantity
        };
        cart.push(product);
        console.log(product);
        sessionStorage.setItem("cart", JSON.stringify(cart));

        addElement(productId, priceRegular, productPrice, productName, imgProduct, quantity);
    })

});

function addElement(productId, priceRegular, productPrice, productName, imgProduct, quantity) {
    // if (cart.length > 0) {
    //     checkProductOnCart();
    // }
    let addElementLi = document.createElement("li");
    let addHtml = ` 
                    <div class="amm-single-shopping-cart media">
                        <div class="cart-image">
                            <img src="`+ imgProduct + `" alt="Cart">
                        </div>
                        <div class="cart-content media-body pl-15">
                            <input type="hidden" value="`+ productId + `" id="productId">
                            <h6><a href="#">`+ productName + `</a></h6>
                            <input id="productQuantity" type="number" onChange="changePriceProduct(this)" min="1" style="width: 25px;
                            height: 19px; 
                            font-size: 11px;" value="`+ quantity + `" ><br>
                            <span class="price-discount">`+ productPrice + `</span><sup>đ</sup>
                            <span class="price-close">`+ priceRegular + `</span><sup>đ</sup>
                            <span class="remove" id="`+ productId + `"><i class="fas fa-times"></i></span>
                        </div>
                    </div> 
                
                `;
    addElementLi.innerHTML = addHtml;
    let selectEle = document.querySelector(".amm-shopping_cart-list-items ul");
    selectEle.append(addElementLi);
    countProduct();
    cartTotal();
    deleteProduct();
}


function checkProductOnCart() {
    let productIdCompare = document.querySelector(".content a").innerHTML;
    console.log(productIdCompare);
    let changeQuantityPro = document.querySelector(".cart-content #productQuantity ")
    for (var item in cart) {
        if (cart[item].productId === productIdCompare) {
            cart[item].quantity += 1;
            changeQuantityPro.innerHTML = cart[item].quantity;
            // saveCart();
            return;
        }
    }
    break;
}
// shopping cart main 
let btnAddtoCart = document.querySelectorAll(".shop-product-details-content .shop-buttons a");
let duplication = 0;
btnAddtoCart.forEach(function (value, i) {
    value.addEventListener("click", function (event) {
        debugger;
        let btnAdd = event.target;
        let getInforProduct = btnAdd.parentElement.parentElement.parentElement.parentElement;
        duplication += 1;
        console.log(getInforProduct);
        let productId = getInforProduct.querySelector("#productId").value;
        let imgProduct = getInforProduct.querySelector(".shop-details-thumb-slider-active .item img").src;
        let productName = getInforProduct.querySelector(".shop-product-details-content h2").innerText;
        let productPrice = getInforProduct.querySelector(".shop-product-details-content .pricing .discount-price span").innerText;
        let priceRegular = getInforProduct.querySelector(".shop-product-details-content .pricing .regular-price span").innerHTML;
        let quantity = getInforProduct.querySelector(".product-quantity input").value;
        console.log(quantity);
        let products = {
            productId: productId,
            imgProduct: imgProduct,
            productName: productName,
            productPrice: productPrice,
            priceRegular: priceRegular,
            quantity: quantity
        };
        cart.push(products);
        countProduct();
        sessionStorage.setItem("cart", JSON.stringify(cart));
        addElement(productId, priceRegular, productPrice, productName, imgProduct, quantity);
    })

})
function cartTotal() {
    let getcart = sessionStorage.getItem("cart");
    let cartMain;
    if (getcart.length > 0) {
        cartMain = JSON.parse(getcart);
    }
    console.log(cartMain);
    let cartItem = document.querySelectorAll(".amm-shopping_cart-list-items ul li");
    let sumPay = 0;
    if (cartItem.length > 0) {

        for (let i = 0; i < cartItem.length; i++) {
            let getPrices = cartItem[i].querySelector(".cart-content .price-discount");
            let getPrice = getPrices.innerText;
            let quantityProduct = cartItem[i].querySelector("#productQuantity").value;
            totalB = getPrice * quantityProduct * 1000;
            sumPay += totalB;
            console.log(totalB);
        }
    }
    let appendSum = document.querySelector(".amm-shopping_cart-btn p span");
    console.log(appendSum);
    appendSum.innerHTML = sumPay.toLocaleString("de-DE");
}
// function shoppingCarts(){
//     let getIconShopping = document.getElementsByClassName("amm-shopping-cart-open");
//     console.log(getIconShopping);
//     let canvasShopping = document.getElementById("amm-shopping-cart-canvas");
//     let overlay = document.getElementById("overlay");
//     canvasShopping.classList.add("open");
//     overlay.classList.add("open");
// }
// function removeShoppingCart(){
//     let canvasShopping = document.getElementById("amm-shopping-cart-canvas");
//     let overlay = document.getElementById("overlay");
//     let getIconShoppingClose = document.getElementsByClassName("amm-shopping-cart-close");
//     canvasShopping.classList.remove("open");
//     overlay.classList.remove("open");
// }
// function openOverlay(){
//     let canvasShopping = document.getElementById("amm-shopping-cart-canvas");
//     let overlay = document.getElementById("overlay");
//     let getIconShoppingClose = document.getElementsByClassName("overlay");
//     canvasShopping.classList.remove("open");
//     overlay.classList.remove("open");
// }

function deleteProduct() {
    let cartItem = document.querySelectorAll(".amm-shopping_cart ul>li");
    console.log(cartItem);
    for (let i = 0; i < cartItem.length; i++) {

        let iconDele = document.querySelectorAll(".remove");
        console.log(iconDele);
        iconDele[i].addEventListener("click", function (event) {

            let getcart = sessionStorage.getItem("cart");
            let cartMain;
            if (getcart.length > 0) {
                cartMain = JSON.parse(getcart);
            }
            let cartDele = event.target;
            console.log("cartDele");
            let getProductId = this.id;
            let products = cartMain.filter(x => x.productId != getProductId);
            sessionStorage.setItem("cart", JSON.stringify(products));
            let cartItemPro = cartDele.parentElement.parentElement.parentElement.parentElement;
            console.log(cartItemPro);
            cartItemPro.remove();
            cartTotal();
            countProduct();
            // duplicateNumber = duplicateNumber-1;
        });

    }
}
function changePriceProduct(productItem) {
    let getcart = sessionStorage.getItem("cart");
    let cartMain = JSON.parse(getcart);
    let quantity = productItem.value;
    let sum = 0;
    let getParent = productItem.parentElement;
    let productId = getParent.querySelector("#productId").value;
    let products = cart.filter(x => x.productId === productId);
    if (products.length > 0) {
        let product = products[0];
        console.log(product);
        product.quantity = quantity; // cập nhật quantity vào carts 
    }
    //lấy tất cả các sản phẩm có trong carts và tính toán tổng giá trị đơn hàng

    cart.forEach(product => {
        let sumProduct = parseInt(product.quantity) * product.productPrice * 1000;
        sum += sumProduct;
    });
    let appendSum = document.querySelector(".amm-shopping_cart-btn p");
    console.log(appendSum);
    appendSum.innerHTML = sum.toLocaleString('de-DE');
    // luu trên sessions
    sessionStorage.setItem("cart", JSON.stringify(cart));
}

//show sp vào giỏ hàng 
function showProduct() {
    let getcart = sessionStorage.getItem("cart");
    let cartMain;
    if (getcart.length > 0) {
        cartMain = JSON.parse(getcart);
    }
    debugger;
    let payment = "";
    for (let i = 0; i < cartMain.length; i++) {
        payment += `  <li>
                        <div class="cover-product row">
                            <div class="img-product pl-5">
                                <img src="`+ cartMain[i].imgProduct + `" alt="">
                            </div>
                            <div class="infor-product pl-3">
                                <input type="hidden" value="`+ cartMain[i].productId + `" id="` + cartMain[i].productId + `">
                                <a href="./productdetail.html">
                                    <h3>`+ cartMain[i].productName + `</h3>
                                </a>
                                <p><strong>Kích thước:</strong> <span>1</span>kg</p>
                                <div class="discount-price"><span>`+ cartMain[i].productPrice + ` </span> </div>

                            </div>
                            <div class="change-pro">
                                <div class="buttons_added" >
                                <input class="inputQuantity" onChange="updateQuantity(this)"  id='`+ cartMain[i].productId + `' " min='1' name='quantity' type='number' value='` + cartMain[i].quantity + `' />
                                
                                <div class="icon-delete" id="`+ cartMain[i].productId + `">
                                    <i class="icon-delete1 fas fa-trash-alt"></i>
                                </div>
                                </div>
                            </div>
                            <div class="sumPro">
                                <span>`+ cartMain[i].productPrice + ` </span><sup>đ</sup>
                            </div>

                        </div>
                    </li>`;

    };

    var mainCart = $("#mainCart");
    if (mainCart && mainCart !== null) {
        $(mainCart)[0].innerHTML = payment;
    }

    deleteProductViewCart();
    deleteAllProductViewCart();
    countProduct();
}
function showProductMain() {
    let getcart = sessionStorage.getItem("cart");
    let cartMain = JSON.parse(getcart);
    // cartMain.filter( x => x.productId)
    let payment = "";
    for (let i = 0; i < cartMain.length; i++) {
        payment += `  <li>
                        <div class="cover-product row">
                            <div class="img-product pl-5">
                                <img src="`+ cartMain[i].imgProductMain + `" alt="">
                            </div>
                            <div class="infor-product pl-3">
                                <input type="hidden" value="`+ cartMain[i].productIdMain + `" id="` + cartMain[i].productIdMain + `">
                                <a href="./productdetail.html">
                                    <h3>`+ cartMain[i].productNameMain + `</h3>
                                </a>
                                <p><strong>Kích thước:</strong> <span>1</span>kg</p>
                                <div class="discount-price"><span>`+ cartMain[i].productPriceMain + ` </span> </div>

                            </div>
                            <div class="change-pro">
                                <div class="buttons_added" >
                                <input class="inputQuantity" onChange="updateQuantity(this)"  id='`+ cartMain[i].productIdMain + `' " min='1' name='quantity' type='number' value='` + cartMain[i].quantityMain + `' />
                                
                                <div class="icon-delete" id="`+ cartMain[i].productIdMain + `">
                                    <i class="icon-delete1 fas fa-trash-alt"></i>
                                </div>
                                </div>
                            </div>
                            <div class="sumPro">
                                <span>`+ cartMain[i].productPriceMain + ` </span><sup>đ</sup>
                            </div>

                        </div>
                    </li>`;

    };

    var mainCart = $("#mainCart");
    if (mainCart && mainCart !== null) {
        $(mainCart)[0].innerHTML = payment;
    }
    // changeQuantity();
    deleteProductViewCart();
    deleteAllProductViewCart();
}

function immidiateSum() {

    let getcart = sessionStorage.getItem("cart");
    let cartMain;
    if (getcart.length > 0) {

        cartMain = JSON.parse(getcart);
    }
    let getInforProduct = document.querySelectorAll(".displayProduct ul>li");
    let sumPay = 0;
    let sum = 0;
    if (getInforProduct.length > 0) {
        for (let i = 0; i < getInforProduct.length; i++) {
            let getPrice = getInforProduct[i].querySelector("div .discount-price span").innerText;
            let quantityProduct = getInforProduct[i].querySelector(".change-pro .buttons_added .inputQuantity").value;
            totalB = getPrice * quantityProduct * 1000;
            sumPay += totalB;
            console.log(totalB);
        }
    }
    let sumPrice = document.querySelector(".immidiate-fee span");
    sumPrice.innerHTML = sumPay.toLocaleString("de-DE");
    console.log(sumPrice);
    let sumPriceMain = document.querySelector(".sum-fee span");
    sumPriceMain.innerHTML = sumPay.toLocaleString("de-DE");
    debugger;
    sumShip();
}
function deleteProductViewCart() {
    let cartItem = document.querySelectorAll(".displayProduct ul>li");
    console.log(cartItem);
    for (let i = 0; i < cartItem.length; i++) {

        let iconDele = document.querySelectorAll(".icon-delete");
        console.log(iconDele);
        iconDele[i].addEventListener("click", function (event) {

            let getcart = sessionStorage.getItem("cart");
            let cartMain;
            if (getcart.length > 0) {
                cartMain = JSON.parse(getcart);
            }
            let cartDele = event.target;
            console.log("cartDele");
            let getProductId = this.id;
            let products = cartMain.filter(x => x.productId != getProductId);
            sessionStorage.setItem("cart", JSON.stringify(products));
            let cartItemPro = cartDele.parentElement.parentElement.parentElement.parentElement.parentElement;
            console.log(cartItemPro);
            cartItemPro.remove();
            immidiateSum();
            countProduct();
        });

    }


}
function deleteAllProductViewCart() {
    let cartItem = document.querySelectorAll(".displayProduct ul>li");
    console.log(cartItem);
    for (let i = 0; i < cartItem.length; i++) {
        let iconDele = document.querySelector(".delete");
        console.log(iconDele);
        iconDele.addEventListener("click", function (event) {
            let getcart = sessionStorage.getItem("cart");
            let cartMain;
            if (getcart.length > 0) {
                cartMain = JSON.parse(getcart);
            }
            let cartDele = event.target;
            console.log(cartDele);
            let getProductId = this.id;
            let products = cartMain.filter(x => x.productId != getProductId);
            sessionStorage.setItem("cart", JSON.stringify(products));
            let coverCart = cartDele.parentElement.parentElement;
            let cartItemPro = coverCart.querySelector("#mainCart");
            console.log(cartItemPro);
            cartItemPro.remove();
            immidiateSum();
        });

    }


}

function updateQuantity(productPayment) {
    let getcart = sessionStorage.getItem("cart");
    let cartMain;
    if (getcart.length > 0) {
        cartMain = JSON.parse(getcart);
    }
    let quantity = productPayment.value;
    let sum = 0;
    let getParent = productPayment.parentElement.parentElement.parentElement;
    let productId1 = getParent.querySelector(".infor-product input").value;
    console.log(productId1);
    let products = cartMain.filter(x => x.productId === productId1);
    let updateShipping = document.querySelector(".shipping-fee .prices").innerHTML;
    if (products.length > 0) {
        let product = products[0];
        console.log(product);
        product.quantity = quantity; // cập nhật quantity vào carts 
    }

    //lấy tất cả các sản phẩm có trong carts và tính toán tổng giá trị đơn hàng
    cartMain.forEach(product => {
        let sumProduct = parseInt(product.quantity) * product.productPrice * 1000;
        sum += sumProduct;
    });

    let sumPrice = document.querySelector(".immidiate-fee span");
    sumPrice.innerHTML = sum.toLocaleString("de-DE");
    console.log(sumPrice);
    debugger;
    sumShip();
    // let sumPriceMain = document.querySelector(".sum-fee span");
    // sumPriceMain.innerHTML = sum.toLocaleString("de-DE");
    // luu trên sessions
    sessionStorage.setItem("cart", JSON.stringify(products));


}
function sumShip() {
    let getcart = sessionStorage.getItem("cart");
    let cartMain = JSON.parse(getcart);
    let shipping = document.querySelector(".shipping-fee .prices")
    let ship = shipping.innerText;
    let priceShip = 20.000;
    console.log(typeof (priceShip));
    console.log(ship);
    let getInforProduct = document.querySelectorAll(".displayProduct ul>li");
    let temporarySum = document.querySelector(".immidiate-fee  .prices").innerText;
    console.log(temporarySum);
    if (temporarySum >= 49.999 || getInforProduct.length <= 0) {
        ship = 0;
        temporarySum = (parseInt(temporarySum) + parseInt(ship)) * 1000;

    }
    else {
        ship = priceShip;
        temporarySum = (parseInt(temporarySum) + parseInt(ship)) * 1000;

    }
    console.log(temporarySum);
    shipping.innerHTML = (ship * 1000).toLocaleString("de-DE");
    console.log(shipping);
    let sumPriceMain = document.querySelector(".sum-fee span");
    sumPriceMain.innerHTML = parseInt(temporarySum).toLocaleString("de-DE");

}
function sumShipPayment() {
    let getcart = sessionStorage.getItem("cart");
    let cartMain = JSON.parse(getcart);
    let shipping = document.querySelector(".sumPriceproduct .padding-price2")
    let ship = shipping.innerText;
    let priceShip = 20.000;
    console.log(typeof (priceShip));
    console.log(ship);
    let getInforProduct = document.querySelectorAll("#mainCartPayment li");
    let temporarySum = document.querySelector(".sumPriceproduct  .padding-price1").innerText;
    console.log(temporarySum);
    if (temporarySum >= 50.000 || getInforProduct.length <= 0) {
        ship = 0;
        temporarySum = (parseInt(temporarySum) + parseInt(ship)) * 1000;
    }
    else {
        ship = priceShip;
        temporarySum = (parseInt(temporarySum) + parseInt(ship)) * 1000;

    }
    console.log(temporarySum);
    shipping.innerHTML = ship * 1000;
    console.log(shipping);
    let sumPriceMain = document.querySelector(".sumarizePrice .padding-price");
    sumPriceMain.innerHTML = parseInt(temporarySum).toLocaleString("de-DE");

}
function countProduct() {
    let getcart = sessionStorage.getItem("cart");
    let cartMain;
    if (getcart.length > 0) {
        cartMain = JSON.parse(getcart);
    }
    let countPro = cartMain.length;
    console.log(countPro);
    getNumberShoppingCart.innerHTML = countPro;
}
//show sp vào thanh toán
function showProductToPayment() {

    let getcart = sessionStorage.getItem("cart");
    let cartMain = JSON.parse(getcart);
    let payment = "";

    //priceRegular,productPrice,productName,imgProduct
    for (let i = 0; i < cartMain.length; i++) {

        payment += `  <li>
        <div class="cover-product-pay row pb-3">
            <div class="img-product-payment pl-5 col-4 ">
                <img src="`+ cartMain[i].imgProduct + `" width="50px" height="50px" alt="">
                <span class="quantityPayment ">`+ cartMain[i].quantity + `</span>
            </div>
            <div class=" pl-3 col-4 ">
                <p href="./productdetail.html" >
                    <h5 style="font-size: 14px;">`+ cartMain[i].productName + `</h5>1kg 
                </p>
            </div>
            <div class="price-product-pay pl-3 col-4 pt-25">
            <span class="discount-price-pay">`+ cartMain[i].productPrice + ` </span><sup>đ</sup>
            </div>
        </div>
    </li>`;

    };

    var mainCart = $("#mainCartPayment");
    if (mainCart && mainCart !== null) {
        $(mainCart)[0].innerHTML = payment;
        // immidiateSum();
    }
    immidiateSum_Payment();
    sumShipPayment();
}
function immidiateSum_Payment() {

    let getcart = sessionStorage.getItem("cart");
    let cartMain = JSON.parse(getcart);
    console.log(cartMain);
    let getInforProduct = document.querySelectorAll(".showProduct ul>li");
    let sumPayment = 0;
    if (getInforProduct.length > 0) {
        for (let i = 0; i < getInforProduct.length; i++) {

            let getPrice = getInforProduct[i].querySelector(".price-product-pay .discount-price-pay").innerText;
            console.log(getPrice);
            let quantityProduct = getInforProduct[i].querySelector(".img-product-payment .quantityPayment").innerText;
            console.log(quantityProduct);
            totalB = getPrice * quantityProduct * 1000;
            sumPayment += totalB;
            console.log(totalB);

        }
    }

    let sumPrice = document.querySelector(".sumPriceproduct .padding-price1");
    sumPrice.innerHTML = sumPayment.toLocaleString("de-DE");
    console.log(sumPrice);
    let sumPriceMain = document.querySelector(".sumarizePrice .padding-price");
    sumPriceMain.innerHTML = sumPayment.toLocaleString("de-DE");
    // let btnPromotion = document.querySelector('.success-order button');

    // btnPromotion.addEventListener('click', function () {
    //     debugger;
    //     updateTotalMoney(products);
    // });

}
function changePriceProductMain(productItem) {
    let getcart = sessionStorage.getItem("cart");
    let cartMain = JSON.parse(getcart);
    let quantity = productItem.value;
    let sum = 0;
    let getParent = productItem.parentElement;
    let productId = getParent.querySelector("#productId").value;
    let products = cart.filter(x => x.productIdMain === productId);
    if (products.length > 0) {
        let product = products[0];
        console.log(product);
        product.quantityMain = quantity; // cập nhật quantity vào carts 
    }
    //lấy tất cả các sản phẩm có trong carts và tính toán tổng giá trị đơn hàng

    cart.forEach(product => {
        let sumProduct = parseInt(product.quantityMain) * product.productPriceMain * 1000;
        sum += sumProduct;
    });
    let appendSum = document.querySelector(".amm-shopping_cart-btn p");
    console.log(appendSum);
    appendSum.innerHTML = sum.toLocaleString('de-DE');
    // luu trên sessions
    sessionStorage.setItem("cart", JSON.stringify(products));
}
function checkProduct() {
    let getcart = sessionStorage.getItem("cart");
    let cartMain = JSON.parse(getcart);
    showProductToPayment();
    let checkPro = document.getElementById("mainCartPayment");
    let checkProLi = document.querySelector("#mainCartPayment li");
    console.log(checkPro);
    if (cartMain.length > 3) {
        checkPro.style.height = '400px';
    }
    else if (cartMain.length == 0) {
        checkPro.style.display = 'none';
    }
}
function is_phonenumber(phonenumber) {
    let phoneno = /^\+?([0-9]{2})\)?[-. ]?([0-9]{4})[-. ]?([0-9]{4})$/;
    if (phonenumber.match(phoneno)) {
        return true;
    }
    else {
        return false;
    }
}
// promotion discount
let promotionCode = {
    A: 10,
    B: 20,
    C: 30,
    D: 40,
};
let inputPromotion = document.querySelector('#promo-code');

function checkPromotion() {
    let value = inputPromotion.value;
    console.log(value);
    if (promotionCode[value]) {
        return promotionCode[value];
    }
    return 0;
}
let discount = document.querySelector('.discount');
let discountEle = document.querySelector('.sumPriceproduct .padding-price3');

// Cập nhật tổng tiền
function updateTotalMoney() {
    loadCart();
    // Tính tổng tiền cart
    let totalMoney = 0;
    let discountMoney = 0;
    let sumTemporary = document.querySelector(".sumPriceproduct .padding-price1")
    // Có mã giảm giá hay không?
    // Mã giảm giá có hợp lệ hay không?
    let data = checkPromotion();
    if (data) {
        discountMoney = (sumTemporary * data) / 100;
    }
    //discount.classList.remove('hide');
    // } else {
    //     discount.classList.add('hide');
    // }

    // Cập nhật tiền lên trên giao diện
    // subTotalEl.innerText = convertMoney(totalMoney);
    // vatEl.innerText = convertMoney(totalMoney * 0.05);
    discountEle.innerText = convertMoney(discountMoney);
    // totalEle.innerText = convertMoney(totalMoney * 1.05 - discountMoney);
}


// ///search
// $(document).ready(function() {
//     $('#searchInfor').on('keyup', function(event) {
//        event.preventDefault();
//        /* Act on the event */
//        var tukhoa = $(this).val().toLowerCase();
//        $('.blog-infor').filter(function() {
//           $(this).toggle($(this).text().toLowerCase().indexOf(tukhoa)>-1);
//        });
//     });
//  });
//  function searchData(){
//     let getcart = sessionStorage.getItem("cart");
//     let cartMain = JSON.parse(getcart);
//      let valueSearch = document.getElementById("searchInfor").value;
//      console.log(valueSearch);
//     let dataFilter = cartMain.filter(value => {
//         return value.productName.toUpperCase().includes(valueSearch);
//     });

//  }