import React, { Component } from 'react';
import {InputGroup} from 'react-bootstrap';
import {FormControl} from 'react-bootstrap';

// component for adding product:
class DevVladimir extends Component {
  render(){
    return(
      <div>
        <br></br>
        <div className="d-flex justify-content-center">
          <div className="card" style={{width:400+'px'}}>
            <h4 className="card-title text-center">Заліковий період</h4>
            <div className="card-body d-flex justify-content-center">
              <div className="d-flex flex-column">
                <div>З:</div>
                <div className="d-flex flex-row">
                  <InputGroup className="mb-3" style={{width:30+'%'}}>
                    <InputGroup.Prepend>
                      <InputGroup.Text id="basic-addon1">Рік</InputGroup.Text>
                    </InputGroup.Prepend>
                    <FormControl
                      placeholder="2019"
                      aria-label="Username"
                      aria-describedby="basic-addon1"
                    />
                  </InputGroup>

                  <InputGroup className="mb-3 ml-2" style={{width:32+'%'}}>
                    <InputGroup.Prepend>
                      <InputGroup.Text id="basic-addon1">Місяць</InputGroup.Text>
                    </InputGroup.Prepend>
                    <FormControl
                      placeholder="01"
                      aria-label="Username"
                      aria-describedby="basic-addon1"
                    />
                  </InputGroup>

                  <InputGroup className="mb-3 ml-2" style={{width:30+'%'}}>
                    <InputGroup.Prepend>
                      <InputGroup.Text id="basic-addon1">День</InputGroup.Text>
                    </InputGroup.Prepend>
                    <FormControl
                      placeholder="01"
                      aria-label="Username"
                      aria-describedby="basic-addon1"
                    />
                  </InputGroup>
                </div>
                <br></br>
                <div>До:</div>
                <div className="d-flex flex-row">
                  <InputGroup className="mb-3" style={{width:30+'%'}}>
                    <InputGroup.Prepend>
                      <InputGroup.Text id="basic-addon1">Рік</InputGroup.Text>
                    </InputGroup.Prepend>
                    <FormControl
                      placeholder="2019"
                      aria-label="Username"
                      aria-describedby="basic-addon1"
                    />
                  </InputGroup>

                  <InputGroup className="mb-3 ml-2" style={{width:32+'%'}}>
                    <InputGroup.Prepend>
                      <InputGroup.Text id="basic-addon1">Місяць</InputGroup.Text>
                    </InputGroup.Prepend>
                    <FormControl
                      placeholder="01"
                      aria-label="Username"
                      aria-describedby="basic-addon1"
                    />
                  </InputGroup>

                  <InputGroup className="mb-3 ml-2" style={{width:30+'%'}}>
                    <InputGroup.Prepend>
                      <InputGroup.Text id="basic-addon1">День</InputGroup.Text>
                    </InputGroup.Prepend>
                    <FormControl
                      placeholder="01"
                      aria-label="Username"
                      aria-describedby="basic-addon1"
                    />
                  </InputGroup>
                </div>

              </div>
            </div>
          <div className="card-footer">виберіть проміжок часу</div>
        </div>
       </div>
      </div>
    );
  }
}

export default DevVladimir;
  