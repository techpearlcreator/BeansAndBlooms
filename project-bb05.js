// Upload image helper function
async function uploadImage(imageFile) {
  if (!imageFile) return "Not provided";

  const formData = new FormData();
  formData.append("image", imageFile);

  try {
    const response = await fetch("https://api.imgbb.com/1/upload?key=823f671a24c88d043f616c9585391f62", {
      method: "POST",
      body: formData
    });

    if (!response.ok) throw new Error('Image upload failed');
    const data = await response.json();
    return data.data.url;
  } catch (err) {
    console.error(err);
    return "Upload failed";
  }
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
    // Upload image (optional)
    const imageUrl = await uploadImage(imageFile);

    // Get order data from sessionStorage
    const orderItems = JSON.parse(sessionStorage.getItem("orderItems"));
    const orderTotal = sessionStorage.getItem("orderTotal");
    const orderNumber = sessionStorage.getItem("orderNumber");
    const orderTime = sessionStorage.getItem("orderTime");

    // Send to Render backend API (PostgreSQL)
    const backendURL = "https://beansandblooms-api.onrender.com/api/orders"; // Replace with your Render URL
    const res = await fetch(backendURL, {
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

    if (!res.ok) throw new Error("Failed to save order to backend");

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
