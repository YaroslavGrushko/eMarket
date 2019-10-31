import React, { Component } from 'react';


// component for adding product:
class DevVladimir extends Component {
  render(){
    return(
      <div id = "dashboard_content">
        
        <br></br>
          <div class="d-flex justify-content-center">
          <div class="card" style={{width:400+'px'}}>
              <h4 class="card-title text-center">Заліковий період</h4>
              <div class="card-body d-flex justify-content-center">
                  <div class="card text-center" style={{width:50+'%'}}>2019</div>
                  <div class="ml-1">р.</div>
              </div>
              <div class="card-footer">виберіть проміжок часу</div>
          </div>
       </div>
      </div>
    );
  }
}

export default DevVladimir;
  