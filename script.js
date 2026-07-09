// =============================
// FLOOR - SEPET SİSTEMİ
// =============================

const buttons = document.querySelectorAll(".add-cart");
const cartCount = document.getElementById("cart-count");

// Sepetteki ürün sayısını al
let cart = JSON.parse(localStorage.getItem("cart")) || [];

// Sayıyı göster
updateCartCount();

// Tüm butonlara tıklama olayı ekle
buttons.forEach(button => {

    button.addEventListener("click", () => {

       const product = {

    id: button.dataset.id,
    name: button.dataset.name,
    price: Number(button.dataset.price),
    image: button.dataset.image

};

        cart.push(product);

        localStorage.setItem("cart", JSON.stringify(cart));

        updateCartCount();

        alert(product.name + " sepete eklendi 🌸");

    });

});

// Sepet sayısını güncelle
function updateCartCount(){

    if(cartCount){

        cartCount.textContent = cart.length;

    }

}
const cartItems = document.getElementById("cart-items");
const totalPrice = document.getElementById("total-price");

if (cartItems) {

    let total = 0;

    cartItems.innerHTML = "";

    cart.forEach((product, index) => {

    total += product.price;

    cartItems.innerHTML += `

        <div class="cart-item">

            <img src="${product.image}" alt="${product.name}">

            <div class="cart-info">

                <h3>${product.name}</h3>

                <p>${product.price} ₺</p>

                <button class="remove-btn" onclick="removeItem(${index})">
                    Kaldır
                </button>

            </div>

        </div>

    `;

});
    totalPrice.textContent = "Toplam: " + total + " ₺";

}
function removeItem(index){

    cart.splice(index, 1);

    localStorage.setItem("cart", JSON.stringify(cart));

    location.reload();

}