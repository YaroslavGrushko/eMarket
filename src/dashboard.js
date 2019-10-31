import React, { Component } from 'react';
import DevVladimir from './dev_Vladimir';


// main component for DashBoard:
class TotalIncome extends Component {
  render(){
    return(
      <div>
        <br></br>
          <div className="d-flex justify-content-center">
          <div className="card" style={{width:400+'px'}}>
              <h4 className="card-title text-center">Загальний прибуток</h4>
              <div className="card-body d-flex justify-content-center">
                  <div className="card text-center" style={{width:50+'%'}}>1000</div>
                  <div className="ml-1">грн</div>
              </div>
              <div className="card-footer">за вибраний проміжок часу</div>
          </div>
       </div>
       
      </div>
    );
  }
}


// main component for DashBoard:
class DashBoard extends Component {
  render(){
    return(
      <div id = "dashboard_content">
        <h4 className="text-center">
          <b>ДОШКА АНАЛІТИКИ</b>
        </h4>
        <br></br>
        <DevVladimir/>
        <TotalIncome/>
      </div>
    );
  }
}

export default DashBoard;
  