const images =['mobile-banner-01.png','mobile-banner-02.png','mobile-banner-03.png','mobile-banner-04.png'];
let index = 0;

setInterval(() => {
 index = (index + 1 ) % images.length;   
 document.getElementById('slider').src = images[index];
}, 2500);

const images01 = ['offer-b1.png','offer-b2.png','offer-b3.png','offer-b4.png'];
let start = 0;

setInterval(() => {
   start = (start + 1) % images01.length;
   document.getElementById('slider01').src = images01[start]; 
}, 2000);

const images02 =['pc-banner01.png', 'pc-banner02.png','pc-banner03.png','pc-banner04.png'];
let  go = 0;
 setInterval (()  => {
 go = ( go + 1 ) % images02.length;
 document.getElementById('slider02').src = images02[go];
 }, 2500); 

function order() {
   const items = [
      {name: "Espresso Solo",price : 119, qtyId:"qty-espresso-solo"},
      {name: "Espresso Double",price: 149, qtyId:"qty-espresso-double"},
      {name: "Americano",price :149, qtyId:"qty-americano"},
      {name:"Cappuccino",price: 179, qtyId:"qty-cappuccino"},
      {name:"Caffe Latte",price: 179,qtyId:"qty-caffe-latte"},
      {name:"Vanilla Latte",price: 199,qtyId:"qty-vanilla-latte"},
      {name:"Caramel macchiato",price: 219,qtyId:"qty-Caramel-Macchiato"},
      {name:"Mocha",price: 219,qtyId:"qty-Mocha"},
      {name:"White Mocha",price: 219,qtyId:"qty-White-Mocha"},
      {name:"Cold Brew",price: 219,qtyId:"qty-Cold-Brew"},
      {name:"Iced Americano",price: 219,qtyId:"qty-iced-americano"},
      {name:"Iced Vanilla Latte",price: 219,qtyId:"qty-Iced-Vanilla-Latte"},
      {name:"Chai Tea",price: 119,qtyId:"qty-chai-tea"},
      {name:"Green Tea Hot",price: 99,qtyId:"qty-green-tea-hot"},
      {name:"Green Tea Iced",price: 99,qtyId:"qty-green-tea-iced"},
      {name:"Matcha latte",price: 179,qtyId:"qty-matcha-latte"},
      {name:"Breakfast Tea",price: 109,qtyId:"qty-breakfast-tea"},
      {name:"Herbal Mint Tea",price: 119,qtyId:"qty-herbal-mint-tea"},
      {name:"Herbal Lemon Tea",price: 119,qtyId:"qty-herbal-lemon-tea"},
      {name:"Iced Peach Tea",price :129,qtyId:"qty-iced-peach-tea"},
      {name:"Iced Lemon Tea",price: 129,qtyId:"qty-iced-lemon-tea"},
      {name:"Tulsi Ginger Tea",price: 89,qtyId:"qty-tulsi-ginger-tea"},
      {name:"Classic Hot Milk",price: 119,qtyId:"qty-Classic-hot-milk"},
      {name:"Tumeric Latte",price: 89,qtyId:"qty-tumeric-latte"},
      {name:"Rose Milk",price: 129,qtyId:"qty-rose-milk"},
      {name:"Strawberry Milk",price: 129,qtyId:"qty-strawberry-milk"},
      {name:"Biscoff Latte",price: 109,qtyId:"qty-Biscoff-latte"},
      {name:"Bournvita Blend",price: 159,qtyId:"qty-bournvita-blend"},
      {name:"Signature Hot Chocolate",price: 179,qtyId:"qty-signature-hot-chocolate"},
      {name:"Iced Chocolate",price: 189,qtyId:"qty-iced-chocolate"},
      {name:"Chocolate Frapper",price: 199,qtyId:"qty-chocolate-frapper"},
      {name:"Dark Mocha Frapper",price: 189,qtyId:"qty-dark-mocha-frapper"},
      {name:"Choco Chip Frapppuccino",price: 179,qtyId:"qty-choco-chip-frappuccino"},
      {name:"Nutella Latte",price: 219,qtyId:"qty-nutella-latte"},
      {name:"choco caramel Swirl",price: 179,qtyId:"qty-choco-caramel-swirl"},
      {name:"Dark chocolate Truffles",price: 119,qtyId:"qty-dark-chocolate-truffle"},
      {name:"NewYork Cheese Cake",price: 169,qtyId:"qty-newyork-cheese-cake"},
      {name:"Choco Fudge Cake",price: 149,qtyId:"qty-choco-fudge-cake"},
      {name:"Red Velvet Cake",price: 189,qtyId:"qty-red-velcet-slice"},
      {name:"BlueBerry Muffin",price: 99,qtyId:"qty-blueberry-muffin"},
      {name:"Banana Walnut Bread",price: 119,qtyId:"qty-banana-walnut-bread"},
      {name:"Tiramisu Cup",price: 199,qtyId:"qty-Tiramisu-Cup"},
      {name:"Chocolate Brownie",price: 99,qtyId:"qty-chocolate-brownie"},
      {name:"Blueberry Cheese Cake",price: 159,qtyId:"qty-Blueberry-cheese-cake"}
   ];

let selectedItems = [];
let total = 0;

items.forEach(item => {
   const Qty = parseInt(document.getElementById(item.qtyId).value);
   if(Qty > 0){
      const subtotal = item.price * Qty;
      selectedItems.push({name: item.name,Qty,price: item.price, subtotal});
      total += subtotal;
   }
});

if(total === 0) {
   alert("Please select at least one food item.");
   return;
}
 sessionStorage.setItem("orderItems",JSON.stringify(selectedItems));
 sessionStorage.setItem("orderTotal", total);



 const orderTime = new Date().toISOString(); // Capture exact order time
 sessionStorage.setItem("orderTime", orderTime); 

   // Generate unique order number (timestamp + random string)
   const orderNumber = Date.now() + '-' + Math.random().toString(36).substr(2, 4).toUpperCase();
  
   // Store in session
   sessionStorage.setItem("orderNumber", orderNumber);

 window.location.href = "bill.html"

}