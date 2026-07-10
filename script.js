// ==============================
// FLOOR v2.1 SCRIPT
// ==============================


// ==============================
// SEPET VERİSİ
// ==============================

let cart = JSON.parse(localStorage.getItem("cart")) || [];


// eski verileri düzelt

cart = cart.map(product => {

    return {

        ...product,

        quantity: Number(product.quantity) || 1

    };

});


// güncel sepeti kaydet

localStorage.setItem(
    "cart",
    JSON.stringify(cart)
);




// ==============================
// SEPET SAYACI
// ==============================


function updateCartCount(){


    const cartCount =
    document.getElementById("cart-count");


    if(!cartCount) return;



    let total = 0;



    cart.forEach(item=>{


        total += Number(item.quantity);


    });



    cartCount.textContent = total;


}



updateCartCount();





// ==============================
// SEPETE EKLE
// ==============================


document.addEventListener("click", function(e){



    const button =
    e.target.closest(".add-cart");



    if(!button) return;
    console.log("ANASAYFA BUTONU ÇALIŞTI", button.dataset.name);




    const quantityElement =
    document.getElementById("quantity");



    const selectedQuantity =
    quantityElement
    ? Number(quantityElement.textContent)
    : 1;




    const product = {


        id: button.dataset.id,


        name: button.dataset.name,


        price: Number(button.dataset.price),


        image: button.dataset.image,


        quantity: selectedQuantity


    };





    const existing =
    cart.find(item => item.id == product.id);




    if(existing){


        existing.quantity =
        Number(existing.quantity) + selectedQuantity;


    }
    else{


        cart.push(product);


    }





    localStorage.setItem(
        "cart",
        JSON.stringify(cart)
    );




    updateCartCount();



    showNotification(
        "🌸 " + product.name + " sepete eklendi"
    );



});
// ==============================
// CHECKOUT TOPLAM
// ==============================


const checkoutTotal =
document.getElementById("total-price");


if(checkoutTotal){


    let checkoutSum = 0;


    cart.forEach(item=>{


        checkoutSum +=
        Number(item.price) *
        Number(item.quantity);


    });



    checkoutTotal.textContent =
    checkoutSum + " ₺";


}




// ==============================
// BİLDİRİM
// ==============================


function showNotification(message){



    const old =
    document.querySelector(".notification");



    if(old){

        old.remove();

    }



    const box =
    document.createElement("div");



    box.className="notification";


    box.innerHTML = message;



    document.body.appendChild(box);




    setTimeout(()=>{


        box.classList.add("show");


    },50);




    setTimeout(()=>{


        box.classList.remove("show");



        setTimeout(()=>{


            box.remove();


        },400);



    },2500);



}

// ==============================
// ÜRÜN DETAY SAYFASI
// ==============================


const productTitle =
document.getElementById("product-title");



if(productTitle){


    const params =
    new URLSearchParams(window.location.search);



    const id =
    Number(params.get("id"));



    if(typeof products !== "undefined"){


        const product =
        products.find(item=>item.id === id);



        if(product){



            const image =
            document.getElementById("product-image");

            const title =
            document.getElementById("product-title");

            const price =
            document.getElementById("product-price");

            const description =
            document.getElementById("product-description");



            if(image)
            image.src = product.image;



            if(title)
            title.textContent = product.name;



            if(price)
            price.textContent = product.price + " ₺";



            if(description)
            description.textContent = product.description;




            const button =
            document.getElementById("add-cart-btn");



            if(button){


                button.dataset.id =
                product.id;


                button.dataset.name =
                product.name;


                button.dataset.price =
                product.price;


                button.dataset.image =
                product.image;


            }


        }


    }


}






// ==============================
// ÜRÜN DETAY ADET
// ==============================


let quantity = 1;



const quantityText =
document.getElementById("quantity");


const plusBtn =
document.getElementById("plus-btn");


const minusBtn =
document.getElementById("minus-btn");



if(plusBtn && minusBtn && quantityText){



    plusBtn.onclick=function(){


        quantity++;


        quantityText.textContent =
        quantity;


    };



    minusBtn.onclick=function(){


        if(quantity > 1){


            quantity--;


        }



        quantityText.textContent =
        quantity;


    };


}







// ==============================
// SEPET SAYFASI
// ==============================


const cartItems =
document.getElementById("cart-items");


const totalPrice =
document.getElementById("total-price");




if(cartItems){



    cartItems.innerHTML="";



    let total = 0;




    if(cart.length === 0){



        cartItems.innerHTML = `

        <div class="empty-cart">

        <div class="empty-icon">🌸</div>

        <h3>Sepetiniz Boş</h3>

        <p>Çiçeklerinizi keşfetmeye başlayın.</p>

        </div>

        `;



    } else {



        cart.forEach((item,index)=>{



            total +=
            Number(item.price) *
            Number(item.quantity);




            cartItems.innerHTML += `


            <div class="cart-item">


            <img src="${item.image}">



            <div class="cart-info">


            <h3>${item.name}</h3>


            <p>${item.price} ₺</p>




            <div class="quantity">


            <button onclick="changeQuantity(${index},-1)">
            -
            </button>



            <span>
            ${item.quantity}
            </span>



            <button onclick="changeQuantity(${index},1)">
            +
            </button>



            </div>




            <button class="remove-btn"
            onclick="removeItem(${index})">

            Kaldır

            </button>



            </div>


            </div>


            `;



        });



    }




    if(totalPrice){


        totalPrice.textContent =
        total + " ₺";


    }





    const subtotal =
    document.getElementById("subtotal-price");



    if(subtotal){


        subtotal.textContent =
        total + " ₺";


    }



}






// ==============================
// ADET DEĞİŞTİRME
// ==============================


function changeQuantity(index,value){



    if(!cart[index])
    return;



    cart[index].quantity =
    Number(cart[index].quantity) + value;



    if(cart[index].quantity <= 0){


        cart.splice(index,1);


    }




    localStorage.setItem(
        "cart",
        JSON.stringify(cart)
    );



    updateCartCount();



    location.reload();



}






// ==============================
// ÜRÜN SİL
// ==============================


function removeItem(index){



    cart.splice(index,1);



    localStorage.setItem(
        "cart",
        JSON.stringify(cart)
    );



    updateCartCount();



    location.reload();



}






// ==============================
// ARAMA
// ==============================


const search =
document.getElementById("search");



if(search){



    search.addEventListener("keyup",()=>{



        const value =
        search.value.toLowerCase();



        document.querySelectorAll(".card")
        .forEach(card=>{



            card.style.display =

            card.innerText
            .toLowerCase()
            .includes(value)

            ?

            "block"

            :

            "none";



        });



    });


}