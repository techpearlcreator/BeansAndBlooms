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