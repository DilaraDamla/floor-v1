// ==============================
// FLOOR - SEPET SİSTEMİ
// ==============================

const buttons = document.querySelectorAll(".add-cart");
const cartCount = document.getElementById("cart-count");

let cart = JSON.parse(localStorage.getItem("cart")) || [];

// Eski ürünlere quantity ekle
cart.forEach(product => {
    if (!product.quantity) {
        product.quantity = 1;
    }
});

// Sepet sayısını güncelle
updateCartCount();

// ==============================
// ÜRÜN EKLE
// ==============================

buttons.forEach(button => {

    button.addEventListener("click", () => {

        const product = {

            id: button.dataset.id,
            name: button.dataset.name,
            price: Number(button.dataset.price),
            image: button.dataset.image,
            quantity: 1

        };

        const existing = cart.find(item => item.id === product.id);

        if (existing) {

            existing.quantity++;

        } else {

            cart.push(product);

        }

        localStorage.setItem("cart", JSON.stringify(cart));

        updateCartCount();

        showNotification("🌸 " + product.name + " sepete eklendi");

    });

});

// ==============================
// SEPET SAYISI
// ==============================

function updateCartCount() {

    if (!cartCount) return;

    let totalQuantity = 0;

    cart.forEach(product => {

        totalQuantity += product.quantity;

    });

    cartCount.textContent = totalQuantity;

}

// ==============================
// SEPET SAYFASI
// ==============================

const cartItems = document.getElementById("cart-items");
const totalPrice = document.getElementById("total-price");

if (cartItems) {

    cartItems.innerHTML = "";

    let total = 0;

    if (cart.length === 0) {

        cartItems.innerHTML = `

        <div class="empty-cart">

            <div class="empty-icon">🌸</div>

            <h3>Sepetiniz Henüz Boş</h3>

            <p>Favori çiçeklerinizi keşfetmeye başlayın.</p>

            <a href="flowers.html" class="btn">
                Alışverişe Başla
            </a>

        </div>

        `;

        if (totalPrice) {

            totalPrice.textContent = "Toplam: 0 ₺";

        }

    } else {

        cart.forEach((product, index) => {

            total += product.price * product.quantity;

            cartItems.innerHTML += `

            <div class="cart-item">

                <img src="../${product.image}" alt="${product.name}">

                <div class="cart-info">

                    <h3>${product.name}</h3>

                    <p>${product.price} ₺</p>

                    <div class="quantity">

                        <button onclick="changeQuantity(${index},-1)">−</button>

                        <span>${product.quantity}</span>

                        <button onclick="changeQuantity(${index},1)">+</button>

                    </div>

                    <button class="remove-btn" onclick="removeItem(${index})">

                        Kaldır

                    </button>

                </div>

            </div>

            `;

        });

        if (totalPrice) {

            totalPrice.textContent = "Toplam: " + total + " ₺";

        }

    }

}

// ==============================
// ADET DEĞİŞTİR
// ==============================

function changeQuantity(index, amount) {

    cart[index].quantity += amount;

    if (cart[index].quantity <= 0) {

        cart.splice(index, 1);

    }

    localStorage.setItem("cart", JSON.stringify(cart));

    location.reload();

}

// ==============================
// ÜRÜN SİL
// ==============================

function removeItem(index) {

    cart.splice(index, 1);

    localStorage.setItem("cart", JSON.stringify(cart));

    location.reload();

}

// ==============================
// BİLDİRİM
// ==============================

function showNotification(message) {

    const old = document.querySelector(".notification");

    if (old) {

        old.remove();

    }

    const notification = document.createElement("div");

    notification.className = "notification";

    notification.textContent = message;

    document.body.appendChild(notification);

    setTimeout(() => {

        notification.classList.add("show");

    }, 10);

    setTimeout(() => {

        notification.classList.remove("show");

        setTimeout(() => {

            notification.remove();

        }, 300);

    }, 2200);

}