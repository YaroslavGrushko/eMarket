import $ from 'jquery';

// addOrderCustomerToServer - is a function that is responsible
// for POST order with custumer's data to Db 
export function addСheckoutCustumerToServer(checkoutCustomer) {
  
  let Data_Сheckout = JSON.stringify(checkoutCustomer);

  $.ajax({
    url: 'http://127.0.0.1:5000/add_сheckout_customer',
    type: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    data: Data_Сheckout,
    success: function (data) {
      alert("Customer "+data.status+" is registered."); 
    },
    error: function (error) {
      alert("error: " + JSON.stringify(error));
    }
  });
  
}

// addOrderProductsToServer - is a function that is responsible
// for POST order with custumer's products to Db 
export function addСheckoutProductsToServer(checkoutProducts) {
  
  let Data_order = JSON.stringify(checkoutProducts);
  
  $.ajax({
    url: 'http://127.0.0.1:5000/add_product_customer',
    type: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    data: Data_order,
    success: function (data) {
      alert("Products "+data.status+" is registered."); 
    },
    error: function (error) {
      alert("error: " + JSON.stringify(error));
    }
  });
  
}

