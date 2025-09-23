const product_list = document.getElementById("product-list");
const invoiceNo = document.getElementById("invoiceNo");
const customerName = document.getElementById("customerName");
const phoneNo = document.getElementById("phone");
const address = document.getElementById("address");
const subTotal = document.getElementById("subtotal");
const tax = document.getElementById("tax");
const discount = document.getElementById("discount");
const total = document.getElementById("total");

const radioButtons = document.getElementsByName("payment_method");

let payment_method = null;



const addItem = () => {

  let li = document.createElement('li');
  li.innerHTML = `<div class="bg-white border border-dark border-2 pt-3 ps-2 pb-3 pe-2 m-2">
            <div class="clearfix">
              <button id="close-button" class="btn btn-danger p-0 float-end "><i class="fa-solid fa-xmark"></i></button>
            </div>
            <form action="">
              <div class="row pb-2">
                <label class="col-3" for="productName">Name: </label>
                <input class="col-8" type="text" name="productName" id="productName">
              </div>
              <div class="row pb-2">
                <label class="col-3" for="rate">Rate:</label>
                <input class="col-8" type="number" name="rate" id="rate" value="1" min="1">
              </div>
              <div class="row pb-2">
                <label class="col-3" for="quantity">Quantity:</label>
                <input class="col-8" type="number" name="quantity" id="quantity" value="1" min="1">
              </div>
              <div class="row pb-2">
                <label class="col-3" for="total">Total:</label>
                <input class="col-8" type="number" name="total" id="total" value="1" min="1" readonly>
              </div>
            </form>
          </div>`;

  product_list.appendChild(li)

  const close_buttons = product_list.querySelectorAll("#close-button");

  close_buttons.forEach((close_button) => {
    close_button.addEventListener("click", () => {
      let clearfixDiv = close_button.parentElement
      let containerDiv = clearfixDiv.parentElement
      let li = containerDiv.parentElement
      li.remove()
      updateTotalPrice()
    })
  })

  const listItems = product_list.querySelectorAll("li")
  listItems.forEach((item) => {
    let quantity = item.querySelector("#quantity");
    let rate = item.querySelector("#rate");
    quantity.addEventListener("input", updateTotalPrice)
    rate.addEventListener("input", updateTotalPrice)
  })

  updateTotalPrice()
}

const updateTotalPrice = () => {
  let totalAmount = 0

  const listItems = product_list.querySelectorAll("li")
  listItems.forEach((item) => {
    let quantity = parseFloat(item.querySelector("#quantity").value ?? 1);
    let rate = parseFloat(item.querySelector("#rate").value ?? 1);
    let price = ((quantity * rate).toFixed(2)) ?? 1
    item.querySelector("#total").value = price
    totalAmount += parseFloat(price)
  })
  subTotal.value = parseFloat(totalAmount)
}

const updateGrandTotal = () => {
  total.value = parseFloat(subTotal.value) + parseFloat(tax.value) - parseFloat(discount.value)
}

updateGrandTotal()

subTotal.addEventListener("input", updateGrandTotal)
tax.addEventListener("input", updateGrandTotal)
discount.addEventListener("input", updateGrandTotal)

const handleSubmit = () => {
  for (let i = 0; i < radioButtons.length; i++) {

    if (radioButtons[i].checked) {
      payment_method = radioButtons[i].value;
      break;
    }
  }

  let product_details_given = true;

  const listItems = product_list.querySelectorAll("li")
  if (listItems.length > 0) {
    for (let item of listItems) {

      let name = item.querySelector("#productName").value;
      let quantity = item.querySelector("#quantity").value;
      let rate = item.querySelector("#rate").value;
      let total = item.querySelector("#total").value;

      if ((name && quantity && rate && total) == "") {
        product_details_given = false;
        break;
      }
    }
  }

  let form_filled = (invoiceNo.value &&
    customerName.value &&
    phoneNo.value &&
    address.value &&
    payment_method &&
    subTotal.value &&
    tax.value &&
    discount.value) != ""

  if (form_filled && product_details_given) {

    let data = {
      invoiceNumber: `${invoiceNo.value}`,
      name: `${customerName.value}`,
      phoneNumber: `${phoneNo.value}`,
      address: `${address.value}`,
      paymentMethod: `${payment_method}`,
      product_list: [],
      subTotal: `${subTotal.value}`,
      tax: `${tax.value}`,
      discount: `${discount.value}`,
      total: `${total.value}`
    }


    if (listItems.length > 0) {
      listItems.forEach((item) => {
        let name = item.querySelector("#productName").value;
        let quantity = item.querySelector("#quantity").value;
        let rate = item.querySelector("#rate").value;
        let total = item.querySelector("#total").value;
        let obj = {
          name: name,
          quantity: quantity,
          rate: rate,
          total: total
        }
        data.product_list.push(obj);
      })
    }

    let output = JSON.stringify(data)
    console.log(output)

  }
  else {
    alert("All fields must be filled")
  }

}






