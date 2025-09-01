document.addEventListener("DOMContentLoaded", () => {
  // Check if order exists
  const items = JSON.parse(sessionStorage.getItem("orderItems"));
  const total = sessionStorage.getItem("orderTotal");

  if (!items || !total) {
    alert("No order found! Please start your order again.");
    window.location.href = "project-bb02.html";
    return;
  }

  // Display order summary
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

  // Display timestamp
  const orderTime = sessionStorage.getItem("orderTime");
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
  const formattedTime = new Intl.DateTimeFormat("en-IN", options).format(new Date(orderTime));
  document.getElementById("orderTimestamp").textContent = formattedTime;

  // Display order number
  const orderNumber = sessionStorage.getItem("orderNumber");
  if (!orderNumber) {
    alert("Invalid order!");
    window.location.href = "project-bb02.html";
    return;
  }
  document.getElementById("orderNumber").textContent = orderNumber;
});

// Upload image helper function
async function uploadImage(imageFile) {
  const formData = new FormData();
  formData.append("image", imageFile);

  const response = await fetch("https://api.imgbb.com/1/upload?key=823f671a24c88d043f616c9585391f62", {
    method: "POST",
    body: formData
  });

  if (!response.ok) throw new Error('Image upload failed');
  const data = await response.json();
  return data.data.url;
}

// Send completed order to backend & WhatsApp
async function sendCompletedOrder() {
  const name = document.getElementById('Name').value;
  const mobile = document.getElementById('Mobile-No').value;
  const address = document.getElementById('Address').value;
  const imageFile = document.getElementById('Screenshot').files[0];

  // Validate mobile number
  if (!/^[6-9]\d{9}$/.test(mobile)) {
    alert("Please enter valid 10-digit Indian mobile number");
    return;
  }

  try {
    const imageUrl = imageFile ? await uploadImage(imageFile) : "Not provided";

    const orderItems = JSON.parse(sessionStorage.getItem("orderItems"));
    const orderTotal = sessionStorage.getItem("orderTotal");
    const orderNumber = sessionStorage.getItem("orderNumber");
    const orderTime = sessionStorage.getItem("orderTime");

    // Send to backend API (PostgreSQL)
    await fetch('http://localhost:3000/api/orders', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        customerName: name,
        mobile,
        address,
        orderItems,
        orderTotal,
        orderNumber,
        orderTime,
        screenshotUrl: imageUrl
      })
    });

    // WhatsApp message
    let message = `*NEW ORDER* (#${orderNumber})\n\n`;
    message += `*Customer Details*\n`;
    message += `Name: ${name}\n`;
    message += `Mobile: ${mobile}\n`;
    message += `Address: ${address}\n\n`;
    message += `Order Items:\n`;
    orderItems.forEach((item, index) => {
      message += `${index + 1}. ${item.name}\n`;
      message += `   Qty: ${item.Qty} × ₹${item.price} = ₹${item.subtotal}\n\n`;
    });
    message += `Total: ₹${orderTotal}\n\n`;
    message += `Payment Proof: ${imageUrl}`;

    const encodedMessage = encodeURIComponent(message);
    window.open(`https://wa.me/916369510851?text=${encodedMessage}`, '_blank');

    alert("Order placed successfully! Data saved to database.");

  } catch (error) {
    console.error('Error:', error);
    alert(`Error: ${error.message}`);
  }
}

// Make function available in HTML
window.sendCompletedOrder = sendCompletedOrder;




  

