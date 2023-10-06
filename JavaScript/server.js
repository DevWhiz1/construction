function addProduct() {
    const productSelect = document.getElementById("productSelect");
    const quantity = document.getElementById("quantity").value;
    const amount = document.getElementById("amount").value;
    const total = quantity * amount;

    const productName = productSelect.options[productSelect.selectedIndex].text;

    const listItem = document.createElement("li");
    listItem.textContent = `Product: ${productName}, Quantity: ${quantity}, Amount: ${amount}, Total: ${total}`;
    
    document.getElementById("productList").appendChild(listItem);

    // Reset the form fields
    document.getElementById("quantity").value = "";
    document.getElementById("amount").value = "";
    document.getElementById("total").value = "";
}
function generateExcel() {
// Get form data
const productList = document.getElementById("productList");
const productItems = productList.getElementsByTagName("li");

// Create a workbook with a worksheet
const workbook = XLSX.utils.book_new();
const worksheet = XLSX.utils.json_to_sheet([]);

// Add headers to the worksheet
XLSX.utils.sheet_add_aoa(worksheet, [["Product", "Quantity", "Amount", "Total"]], { origin: -1 });

// Loop through the product list and add data to the worksheet
for (const item of productItems) {
const data = item.textContent.split(", ");
const rowData = data.map(item => item.split(": ")[1]);
XLSX.utils.sheet_add_aoa(worksheet, [rowData], { origin: -1 });
}

// Add the worksheet to the workbook
XLSX.utils.book_append_sheet(workbook, worksheet, "Product Data");

// Save the workbook as an Excel file
XLSX.writeFile(workbook, "product_data.xlsx");
}
