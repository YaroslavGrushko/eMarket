import React, { Component } from 'react';
import DevVladimir from './dev_Vladimir';




// main component for DashBoard:
class DashBoard extends Component {
  render(){
    return(
      <div id = "dashboard_content">
        <h4 class="text-center">
          <b>ДОШКА АНАЛІТИКИ</b>
        </h4>
        <br></br>
        <DevVladimir/>
        <br></br>
          <div class="d-flex justify-content-center">
          <div class="card" style={{width:400+'px'}}>
              <h4 class="card-title text-center">Загальний прибуток</h4>
              <div class="card-body d-flex justify-content-center">
                  <div class="card text-center" style={{width:50+'%'}}>1000</div>
                  <div class="ml-1">грн</div>
              </div>
              <div class="card-footer">за вибраний проміжок часу</div>
          </div>
       </div>
       
      </div>
    );
  }
}

export default DashBoard;
  