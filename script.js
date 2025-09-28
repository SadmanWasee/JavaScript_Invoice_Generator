const productList = document.getElementById("product_list");
const invoiceNo = document.getElementById("invoice_no");
const customerName = document.getElementById("customer_name");
const phoneNo = document.getElementById("phone");
const address = document.getElementById("address");
const subTotal = document.getElementById("subtotal");
const tax = document.getElementById("tax");
const discount = document.getElementById("discount");
const total = document.getElementById("total");
const submitButtonBox = document.getElementById("submit_button_box")

const radioButtons = document.getElementsByName("payment-method");

let paymentMethod = "";



const addItem = () => {

  let li = document.createElement('li');
  let itemBox = document.getElementById("item");
  li.innerHTML = itemBox.innerHTML;

  productList.appendChild(li)

  const close_buttons = productList.querySelectorAll("#close_button");

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

      let name = item.querySelector("#product_name").value;
      let quantity = item.querySelector("#quantity").value;
      let rate = item.querySelector("#rate").value;
      let total = item.querySelector("#total").value;

      let productDetails = [name, quantity, rate, total]

      if (productDetails.includes("")) {
        product_details_given = false;
        break;
      }
    }
  }

  let formDetails = [invoiceNo.value,customerName.value,phoneNo.value,address.value,paymentMethod,subTotal.value,tax.value,discount.value]

  let form_filled = (!formDetails.includes(""))

  if (form_filled && product_details_given) {

    let data = {
      invoiceNumber: `${invoiceNo.value}`,
      name: `${customerName.value}`,
      phoneNumber: `${phoneNo.value}`,
      address: `${address.value}`,
      paymentMethod: paymentMethod,
      productList: [],
      subTotal: `${subTotal.value}`,
      tax: `${tax.value}`,
      discount: `${discount.value}`,
      total: `${total.value}`
    }

    if (listItems.length > 0) {
      listItems.forEach((item) => {
        let name = item.querySelector("#product_name").value;
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


    let invoicePrint = document.getElementById("invoice_print")

    let invoiceNumberPrint = document.getElementById("invoice_number_print");
    let customerNamePrint = document.getElementById("customer_name_print");
    let phoneNumberPrint = document.getElementById("phone_number_print");
    let addressPrint = document.getElementById("address_print");
    let paymentMethodPrint = document.getElementById("payment_method_print");
    let subTotalPrint = document.getElementById("sub_total_print");
    let taxPrint = document.getElementById("tax_print");
    let discountPrint = document.getElementById("discount_print");
    let totalPrint = document.getElementById("total_print");
    let productListPrint = document.getElementById("products_list_print")

    invoicePrint.style.display = "block";
    submitButtonBox.style.display = "none";


    invoiceNumberPrint.value = data.invoiceNumber;
    invoiceNumberPrint.value = data.invoiceNumber;
    customerNamePrint.value = data.name;
    phoneNumberPrint.value = data.phoneNumber;
    addressPrint.value = data.address;
    console.log(data.paymentMethod);
    paymentMethodPrint.value = data.paymentMethod;
    subTotalPrint.value = data.subTotal;
    taxPrint.value = data.tax;
    discountPrint.value = data.discount;
    totalPrint.value = data.total;

    for (let item of data.productList) {
      let li = document.createElement('li');
      let product = document.getElementById("item_print")
      li.innerHTML = product.innerHTML;
      productListPrint.appendChild(li);
      let entry = productListPrint.lastElementChild

      entry.querySelector("#product_name_print").value = item.name;
      entry.querySelector("#rate_print").value = item.rate;
      entry.querySelector("#quantity_print").value = item.quantity;
      entry.querySelector("#product_total_print").value = item.total;
    }

    console.log(data)
    let refreshButton = document.getElementById("refresh_button")

    refreshButton.addEventListener("click", () => {
      window.location.reload()
    })

  } else {
    alert("All fields must be filled")
  }

}






