const productList = document.getElementById("product-list");
const invoiceNo = document.getElementById("invoice-no");
const customerName = document.getElementById("customer-name");
const phoneNo = document.getElementById("phone");
const address = document.getElementById("address");
const subTotal = document.getElementById("subtotal");
const tax = document.getElementById("tax");
const discount = document.getElementById("discount");
const total = document.getElementById("total");

const radioButtons = document.getElementsByName("payment-method");

let paymentMethod = null;



const addItem = () => {

  let li = document.createElement('li');
  let itemBox = document.getElementById("item");
  li.innerHTML = itemBox.innerHTML;

  productList.appendChild(li)

  const close_buttons = productList.querySelectorAll("#close-button");

  close_buttons.forEach((close_button) => {
    close_button.addEventListener("click", () => {
      let clearfixDiv = close_button.parentElement
      let containerDiv = clearfixDiv.parentElement
      let li = containerDiv.parentElement
      li.remove()
      updateTotalPrice()
    })
  })

  const listItems = productList.querySelectorAll("li")
  listItems.forEach((item) => {
    let quantity = item.querySelector("#quantity");
    let rate = item.querySelector("#rate");
    quantity.addEventListener("input", updateTotalPrice)
    rate.addEventListener("input", updateTotalPrice)
  })

  updateTotalPrice()
}

const updateGrandTotal = () => {
  total.value = parseFloat(subTotal.value) + parseFloat(tax.value) - parseFloat(discount.value)
}

const updateTotalPrice = () => {
  let totalAmount = 0

  const listItems = productList.querySelectorAll("li")
  listItems.forEach((item) => {
    let quantity = parseFloat(item.querySelector("#quantity").value ?? 1);
    let rate = parseFloat(item.querySelector("#rate").value ?? 1);
    let price = ((quantity * rate).toFixed(2)) ?? 1
    item.querySelector("#total").value = price
    totalAmount += parseFloat(price)
  })
  subTotal.value = parseFloat(totalAmount)
  updateGrandTotal()
}


updateGrandTotal()

subTotal.addEventListener("input", updateGrandTotal)
tax.addEventListener("input", updateGrandTotal)
discount.addEventListener("input", updateGrandTotal)

const handleSubmit = () => {
  for (let i = 0; i < radioButtons.length; i++) {

    if (radioButtons[i].checked) {
      paymentMethod = radioButtons[i].value;
      break;
    }
  }

  let product_details_given = true;

  const listItems = productList.querySelectorAll("li")
  if (listItems.length > 0) {
    for (let item of listItems) {

      let name = item.querySelector("#product-name").value;
      let quantity = item.querySelector("#quantity").value;
      let rate = item.querySelector("#rate").value;
      let total = item.querySelector("#total").value;

      if ((name == "")|| (quantity == "") || (rate == "") || (total == "")) {
        product_details_given = false;
        break;
      }
    }
  }

  let form_filled = ((invoiceNo.value!= "") &&
    (customerName.value!= "") &&
    (phoneNo.value!= "") &&
    (address.value!= "") &&
    (paymentMethod!= "") &&
    (subTotal.value!= "") &&
    (tax.value!= "") &&
    (discount.value!= ""))

  if (form_filled && product_details_given) {

    let data = {
      invoiceNumber: `${invoiceNo.value}`,
      name: `${customerName.value}`,
      phoneNumber: `${phoneNo.value}`,
      address: `${address.value}`,
      paymentMethod: `${paymentMethod}`,
      productList: [],
      subTotal: `${subTotal.value}`,
      tax: `${tax.value}`,
      discount: `${discount.value}`,
      total: `${total.value}`
    }


    if (listItems.length > 0) {
      listItems.forEach((item) => {
        let name = item.querySelector("#product-name").value;
        let quantity = item.querySelector("#quantity").value;
        let rate = item.querySelector("#rate").value;
        let total = item.querySelector("#total").value;
        let obj = {
          name: name,
          quantity: quantity,
          rate: rate,
          total: total
        }
        data.productList.push(obj);
      })
    }

    console.log(data)

  }
  else {
    alert("All fields must be filled")
  }

}






