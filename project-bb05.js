document.addEventListener("DOMContentLoaded", () => {
  // Retrieve order data from sessionStorage
  const items = JSON.parse(sessionStorage.getItem("orderItems"));
  const total = sessionStorage.getItem("orderTotal");
  const orderNumber = sessionStorage.getItem("orderNumber");
  const orderTime = sessionStorage.getItem("orderTime");

  // Validate order data
  if (!items || !total || !orderNumber || !orderTime) {
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
  html += `</ul><strong>Total: ₹${total}</strong>`;
  summaryDiv.innerHTML = html;

  // Display order number
  document.getElementById("orderNumber").textContent = orderNumber;

  // Display formatted timestamp
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

  // Generate QR Code for total bill
  const upiId = "skannaiah1147@okicici";
  const name = "Beans and Bloom";
  const upiLink = `upi://pay?pa=${upiId}&pn=${encodeURIComponent(name)}&am=${total}&cu=INR`;
  const qrDiv = document.getElementById("qrcode");
  new QRCode(qrDiv, {
    text: upiLink,
    width: 200,
    height: 200
  });
});

// Function to send completed order to WhatsApp
async function sendCompletedOrder() {
  const name = document.getElementById("Name").value.trim();
  const mobile = document.getElementById("Mobile-No").value.trim();
  const address = document.getElementById("Address").value.trim();
  const screenshotFile = document.getElementById("Screenshot").files[0];

  // Validate inputs
  if (!name || !mobile || !address) {
    alert("Please fill all required fields.");
    return;
  }
  if (!/^[6-9]\d{9}$/.test(mobile)) {
    alert("Please enter a valid 10-digit Indian mobile number.");
    return;
  }

  try {
    // Upload image if provided (optional)
    let imageUrl = "Not provided";
    if (screenshotFile) {
      const formData = new FormData();
      formData.append("image", screenshotFile);

      const response = await fetch("https://api.imgbb.com/1/upload?key=823f671a24c88d043f616c9585391f62", {
        method: "POST",
        body: formData
      });

      if (!response.ok) throw new Error("Image upload failed");
      const data = await response.json();
      imageUrl = data.data.url;
    }

    // Get order info from sessionStorage
    const orderItems = JSON.parse(sessionStorage.getItem("orderItems"));
    const orderTotal = sessionStorage.getItem("orderTotal");
    const orderNumber = sessionStorage.getItem("orderNumber");
    const orderTime = sessionStorage.getItem("orderTime");

    // Compose WhatsApp message
    let message = `*NEW ORDER* (#${orderNumber})\n\n`;
    message += `*Customer Details*\n`;
    message += `Name: ${name}\n`;
    message += `Mobile: ${mobile}\n`;
    message += `Address: ${address}\n\n`;
    message += `Order Items:\n`;
    orderItems.forEach((item, index) => {
      message += `${index + 1}. ${item.name}\n   Qty: ${item.Qty} × ₹${item.price} = ₹${item.subtotal}\n`;
    });
    message += `\nTotal: ₹${orderTotal}\n`;
    message += `Payment Proof: ${imageUrl}`;

    const encodedMessage = encodeURIComponent(message);
    window.open(`https://wa.me/916369510851?text=${encodedMessage}`, "_blank");

    alert("Order placed successfully! Details sent to WhatsApp.");

  } catch (error) {
    console.error("Error:", error);
    alert(`Error: ${error.message}`);
  }
}

// Make function available globally
window.sendCompletedOrder = sendCompletedOrder;
