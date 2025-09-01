document.addEventListener("DOMContentLoaded", () => {
  // Get order from sessionStorage
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
  html += `</ul> <strong>Total: ₹${total}</strong>`;
  summaryDiv.innerHTML = html;

  // Generate QR Code for payment
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

// Send order details to WhatsApp
function sendCompletedOrder() {
  const name = document.getElementById('Name').value;
  const mobile = document.getElementById('Mobile-No').value;
  const address = document.getElementById('Address').value;

  // Validate mobile number
  if (!/^[6-9]\d{9}$/.test(mobile)) {
    alert("Please enter valid 10-digit Indian mobile number");
    return;
  }

  const orderItems = JSON.parse(sessionStorage.getItem("orderItems"));
  const orderTotal = sessionStorage.getItem("orderTotal");
  const orderNumber = sessionStorage.getItem("orderNumber");
  const orderTime = sessionStorage.getItem("orderTime");

  // Prepare WhatsApp message
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
  message += `Order Time: ${new Date(orderTime).toLocaleString("en-IN", { timeZone: "Asia/Kolkata" })}`;

  const encodedMessage = encodeURIComponent(message);
  window.open(`https://wa.me/916369510851?text=${encodedMessage}`, '_blank');

  alert("Order details sent to WhatsApp successfully!");
}

// Make function available in HTML
window.sendCompletedOrder = sendCompletedOrder;
