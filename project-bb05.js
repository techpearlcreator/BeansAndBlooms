document.addEventListener("DOMContentLoaded", () => {
    // First check if order exists
    const items = JSON.parse(sessionStorage.getItem("orderItems"));
    const total = sessionStorage.getItem("orderTotal");

    if (!items || !total) {
        alert("No order found! Please start your order again.");
        window.location.href = "project-bb02.html";
        return; // Exit early
    }

    // Proceed only if order exists
    const summaryDiv = document.getElementById("orderSummary");
    let html = "<ul>";
    
    items.forEach((item, i) => {
        html += `<li>${i + 1}. ${item.name} – ₹${item.price} × ${item.Qty} = ₹${item.subtotal}</li>`;
    });
    
    html += `</ul> <strong> Total: ₹${total}</strong> `;
    summaryDiv.innerHTML = html;

    // Generate QR Code
    const upiId = "skannaiah1147@okicici";
    const name = "Beans and Bloom";
    const upiLink = `upi://pay?pa=${upiId}&pn=${encodeURIComponent(name)}&am=${total}&cu=INR`;

    new QRCode(document.getElementById("qrcode"), {
        text: upiLink,
        width: 200,
        height: 200
    });
    const orderTime = sessionStorage.getItem("orderTime");

    // Format for Indian time
    const options = {
      timeZone: "Asia/Kolkata",
      weekday: "short",
      year: "numeric",
      month: "short",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit",
      hour12: true
    };
  
    const formattedTime = new Intl.DateTimeFormat("en-IN", options)
      .format(new Date(orderTime));
  
    // Display timestamp
    document.getElementById("orderTimestamp").textContent = formattedTime;

    const orderNumber = sessionStorage.getItem("orderNumber");
  if (!orderNumber) {
    alert("Invalid order!");
    window.location.href = "project-bb02.html";
    return;
  }
  document.getElementById("orderNumber").textContent = orderNumber;
});
async function sendCompletedOrder() {
  // Get elements with PROPER ID CASE
  const name = document.getElementById('Name').value;
  const mobile = document.getElementById('Mobile-No').value;
  const address = document.getElementById('Address').value;
  const imageFile = document.getElementById('Screenshot').files[0]; // Fixed ID case

  // Validate mobile number format
  if (!/^[6-9]\d{9}$/.test(mobile)) {
    alert("Please enter valid 10-digit Indian mobile number");
    return;
  }

  try {
    let imageUrl = "Not provided";
    if (imageFile) {
      const formData = new FormData();
      formData.append("image", imageFile);
      
      const response = await fetch("https://api.imgbb.com/1/upload?key=823f671a24c88d043f616c9585391f62", {
        method: "POST",
        body: formData
      });
      
      if (!response.ok) throw new Error('Image upload failed');
      const data = await response.json();
      imageUrl = data.data.url;
    }

    const orderItems = JSON.parse(sessionStorage.getItem("orderItems"));
    const orderTotal = sessionStorage.getItem("orderTotal");
    const orderNumber = sessionStorage.getItem("orderNumber");

    // Format WhatsApp message
    let message = `*NEW ORDER* (#${orderNumber})\n\n`;
    message += `*Customer Details*\n`;
    message += `Name: ${name}\n`;
    message += `Mobile: ${mobile}\n`;
    message += `Address: ${address}\n\n`;
    message += `Order Items \n`;
    
    orderItems.forEach((item, index) => {
      message += `${index + 1}. ${item.name}\n`;
      message += `   Qty: ${item.Qty} × ₹${item.price} = ₹${item.subtotal}\n\n`;
    });

    message += `Total: ₹${orderTotal}\n\n`;
    message += `Payment Proof: ${imageUrl}`;

    // Encode and send
    const encodedMessage = encodeURIComponent(message);
    window.open(`https://wa.me/916369510851?text=${encodedMessage}`, '_blank');
    
  } catch (error) {
    console.error('Error:', error);
    alert(`Error: ${error.message}`);
  }
}

// Make available in HTML
window.sendCompleteOrder = sendCompleteOrder;



  
