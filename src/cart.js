import $ from 'jquery';

// addOrderCustomerToServer - is a function that is responsible
// for POST order with custumer's data to Db 
export function addOrderCustumerToServer(orderCustomer) {
  
  let Data_order = JSON.stringify(orderCustomer);

  // $.ajax({
  //   url: 'http://127.0.0.1:5000/add_orderCustomer',
  //   type: 'POST',
  //   headers: {
  //     'Content-Type': 'application/json', 'x-access-token': localStorage.getItem('x-access-token')
  //   },
  //   data: Data_order,
  //   success: function (data) {
  //     alert(data.status); 
  //   },
  //   error: function (error) {
  //     alert("error: " + JSON.stringify(error));
  //   }
  // });
  alert("order Customer is formed");
}

// addOrderProductsToServer - is a function that is responsible
// for POST order with custumer's products to Db 
export function addOrderProductsToServer(orderProducts) {
  
  let Data_order = JSON.stringify(orderProducts);

  // $.ajax({
  //   url: 'http://127.0.0.1:5000/add_orderProducts',
  //   type: 'POST',
  //   headers: {
  //     'Content-Type': 'application/json', 'x-access-token': localStorage.getItem('x-access-token')
  //   },
  //   data: Data_order,
  //   success: function (data) {
  //     alert(data.status); 
  //   },
  //   error: function (error) {
  //     alert("error: " + JSON.stringify(error));
  //   }
  // });
  alert("order Products is formed");
}

