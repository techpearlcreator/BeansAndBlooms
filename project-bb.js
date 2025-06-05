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
}, 2500);

const images02 =['pc-banner01.png','pc-banner02.png','pc-banner03.png','pc-banner04.png'];
let go = 0;

setInterval( ()=> {
   go = (go + 1 ) % images02.length;
    document.getElementById('slider02').src = images02[go];
},2500);

function sendCompleteOrder() {
   console.log("Button Clicked");
   const items = [
      {name:"Iced Vanilla Latte",price: 219,qtyId:"qty-Iced-Vanilla-Latte"},
      {name:"Iced Peach Tea",price :129,qtyId:"qty-iced-peach-tea"},
      {name:"Biscoff Latte",price: 109,qtyId:"qty-Biscoff-latte"},
      {name:"choco caramel Swirl",price: 179,qtyId:"qty-choco-caramel-swirl"},
      {name:"Blueberry Cheese Cake",price: 159,qtyId:"qty-Blueberry-cheese-cake"}
   ];

let selectedItems = [];
let total = 0;

items . forEach(item => { 
   const qtyElement = document.getElementById(item.qtyId);
   if(!qtyElement){
      console.warn(`Element not found for ID: ${item.qtyId}`);
    return;
     }
     const Qty = parseInt(qtyElement.value);
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