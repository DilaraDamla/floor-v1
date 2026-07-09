// =============================
// FLOOR - SEPET SİSTEMİ
// =============================

const buttons = document.querySelectorAll(".add-cart");
const cartCount = document.getElementById("cart-count");

let cart = JSON.parse(localStorage.getItem("cart")) || [];


// eski ürünlere quantity ekle
cart.forEach(product => {

    if(!product.quantity){

        product.quantity = 1;

    }

});


updateCartCount();


// Ürün ekleme

buttons.forEach(button => {

    button.addEventListener("click", () => {


        const product = {

            id: button.dataset.id,

            name: button.dataset.name,

            price: Number(button.dataset.price),

            image: button.dataset.image,

            quantity:1

        };


        const existing = cart.find(item => item.id === product.id);


        if(existing){

            existing.quantity++;

        }else{

            cart.push(product);

        }


        localStorage.setItem("cart", JSON.stringify(cart));


        updateCartCount();


        showNotification(product.name + " sepete eklendi 🌸");


    });

});




// Sepet sayısı

function updateCartCount(){

    if(cartCount){

        let totalQuantity = 0;


        cart.forEach(product => {

            totalQuantity += product.quantity;

        });


        cartCount.textContent = totalQuantity;

    }

}





// Sepet sayfası

const cartItems = document.getElementById("cart-items");

const totalPrice = document.getElementById("total-price");



if(cartItems){


    let total = 0;


    cartItems.innerHTML = "";



    cart.forEach((product,index)=>{


        total += product.price * product.quantity;



        cartItems.innerHTML += `


        <div class="cart-item">


            <img src="../${product.image}" alt="${product.name}">


            <div class="cart-info">


                <h3>${product.name}</h3>


                <p>${product.price} ₺</p>


                <div class="quantity">


                    <button onclick="changeQuantity(${index},-1)">
                        -
                    </button>


                    <span>
                        ${product.quantity}
                    </span>


                    <button onclick="changeQuantity(${index},1)">
                        +
                    </button>


                </div>



                <button class="remove-btn" onclick="removeItem(${index})">

                    Kaldır

                </button>


            </div>


        </div>


        `;


    });



    totalPrice.textContent =
    "Toplam: " + total + " ₺";


}






// Adet değiştirme

function changeQuantity(index,amount){


    cart[index].quantity += amount;



    if(cart[index].quantity <= 0){


        cart.splice(index,1);


    }



    localStorage.setItem("cart",JSON.stringify(cart));


    location.reload();


}






// Ürün silme

function removeItem(index){


    cart.splice(index,1);


    localStorage.setItem("cart",JSON.stringify(cart));


    location.reload();


}







// Bildirim

function showNotification(message){


    const notification =
    document.createElement("div");


    notification.className="notification";


    notification.innerHTML=message;


    document.body.appendChild(notification);



    setTimeout(()=>{


        notification.remove();


    },2500);


}