import React, { Component } from 'react';
import 'bootstrap/dist/css/bootstrap.css';
import httpClient from 'axios'
import {
    Button,ButtonGroup,
    Form,FormGroup,ControlLabel,
    FormControl,Checkbox,Radio,
    Grid,Row,Col,Table, Modal
} from 'react-bootstrap';


class App extends Component {



    state = {
        idnum: "",
        course: "",
        instructor: "",
        numchecked: [],
        rate_1: "",
        rate_2: "",
        rate_3: "",
        rate_4: "",
        comment: "",
        records:[],


        show: false,
        eidnum: "",
        ecourse: "",
        einstructor: "",
        enumchecked: "",
        erate_1: "",
        erate_2: "",
        erate_3: "",
        erate_4: "",
        ecomment: ""
    };

    componentDidMount(){

        this.refreshData();
    }



     refreshData=()=>{

         httpClient.get('http://localhost:3004/surveys')
             .then((response)=> {
                 var data =response.data;
                 this.setState({
                     records:data
                 })

             }).catch((error)=> {

             });

     };

    onChange = (fieldName)=> {
        return (event)=> {

            console.log(event.target.value);
            var state = this.state;
            state[fieldName] = event.target.value;
            this.setState(state);
        }
    };

    checkboxChange = (fieldName)=> {
        return (event)=> {
            var targetArray = this.state[fieldName];
            if (targetArray.indexOf(event.target.value) >= 0)
                targetArray.splice(
                    targetArray.indexOf(event.target.value),
                    1
                );
            else
                targetArray.push(event.target.value);

            var state = this.state;
            state[fieldName] = targetArray;
            this.setState(state);
        }
    };


    saveSurvey = ()=> {
        var data = this.state;
         delete data.records;

        httpClient.post('http://localhost:3004/surveys',
         data)
            .then((response)=> {
                this.refreshData();
                location.reload();
                alert("Feedback Has been Saved!");
            }).catch((error)=> {
              
            });
    };

    deleteItem = (id)=>{

        return ()=>{

            httpClient.delete('http://localhost:3004/surveys/'+ id )
                .then((response)=> {

                    this.refreshData();
                }).catch((error)=> {

                });

        };
    };


/*...................modal code .....................*/
modalonChange = (fieldName)=> {
        return (event)=> {

            console.log(event.target.value);
            var state = this.state;
            state[fieldName] = event.target.value;
            this.setState(state);
        }
    };
/*...................modal code .....................*/


    checkboxChange = (fieldName)=> {
        return (event)=> {
            var targetArray = this.state[fieldName];
            if (targetArray.indexOf(event.target.value) >= 0)
                targetArray.splice(
                    targetArray.indexOf(event.target.value),
                    1
                );
            else
                targetArray.push(event.target.value);

            var state = this.state;
            state[fieldName] = targetArray;
            this.setState(state);
        }
    };


/*...................modal code .....................*/
modalcheckboxChange = (fieldName)=> {
        return (event)=> {
            var targetArray = this.state[fieldName];
            if (targetArray.indexOf(event.target.value) >= 0)
                targetArray.splice(
                    targetArray.indexOf(event.target.value),
                    1
                );
            else
                targetArray.push(event.target.value);

            var state = this.state.einstructor;
            state[fieldName] = targetArray;
            this.setState(state.einstructor);
        }
    };
/*...................modal code .....................*/

/*...................edit code .....................*/
editItem = (id) =>{
        return ()=> {
            
            httpClient.get('http://localhost:3004/surveys/'+id)
                .then((response)=> {
                    console.log('edit');
                    var data = response.data
                    console.log(response.data);
                    this.setState({
                        idnum: data.idnum,
                        instructor: data.instructor,
                    })
                }).catch((error)=>{
                    
                });
        };
    };
/*...................edit code .....................*/

/*...................modal code .....................*/
openModal = (id)=>{

            return ()=>{
                this.setState({
                    show: true
                })

                 httpClient.get('http://localhost:3004/surveys/'+id)
                .then((response)=> {
                    var data = response.data
                    this.setState({
                        eidnum: data.idnum,
                        ecourse: data.course,
                        einstructor: data.instructor,
                        enumchecked: data.numchecked,
                        erate_1: data.rate_1,
                        erate_2: data.rate_2,
                        erate_3: data.rate_3,
                        erate_4: data.rate_4,
                        ecomment: data.comment,
                        selectedId: data.id
                    })
                    console.log(this.state.selectedData.idnum);
                }).catch((error)=>{
                    
                });

            };
        };



        openModal1 = (id)=>{

            return ()=>{
                this.setState({
                    show: true
                })

                 httpClient.get('http://localhost:3004/surveys/'+id)
                .then((response)=> {
                    var data = response.data
                    this.setState({
                        editthoughts: data.thoughts,
                        selectedId: data.id
                    })
                    console.log(this.state.selectedData.comment);
                }).catch((error)=>{
                    
                });

            };
        };
/*...................modal code .....................*/


/*...................save edit code .....................*/
 saveEdit = (id) =>{


        return () => {
            console.log(data);
            var data = {idnum: this.state.eidnum,
                        course: this.state.ecourse,
                        instructor: this.state.einstructor,
                        numchecked: this.state.enumchecked,
                        rate_1: this.state.erate_1,
                        rate_2: this.state.erate_2,
                        rate_3: this.state.erate_3,
                        rate_4: this.state.erate_4,
                        comment: this.state.ecomment};
            delete data.records;

            httpClient.patch('http://localhost:3004/surveys/'+id,
            data)
                .then((response)=> {
                    this.refreshData();
                }).catch((error)=> {

                });

            this.setState({
                show: false,
                eidnum: "",
                ecourse: "",
                einstructor: "",
                enumchecked: "",
                erate_1: "",
                erate_2: "",
                erate_3: "",
                erate_4: "",
                ecomment: "",
                
            });
        }
    };
/*...................save edit code .....................*/







    render() {

        var rows  = this.state.records.map((item,i)=>{

            return (
                <tr key={i}>
                     <td><Button bsSize="xsmall" bsStyle="danger" onClick={this.deleteItem(item.id)}>Delete</Button><p/>
                     <Button bsSize="xsmall" bsStyle="primary" onClick={this.openModal(item.id)}>Edit</Button>
                     </td>
                     <td>{item.id}</td>
                     <td>{item.idnum}</td>
                     <td>{item.course}</td>
                     <td>{item.instructor}</td>
                     <td>{
                         item.numchecked.map((numc, mi)=> {
                             return <div key={mi}>
                                   <span className="label label-info">{numc}</span>
                                 </div>
                         })

                      }
                     </td>
                     <td>{item.rate_1}</td>
                     <td>{item.rate_2}</td>
                     <td>{item.rate_3}</td>
                     <td>{item.rate_4}</td>
                     <td>{item.comment}</td>
                </tr>
            );
        });

let close = () => this.setState({ show: false })

        return (
            <div className="container">
                <div className="page-header">
                    <h2>Course Instructor Feedback</h2>
                </div>
                <div className="jumbotron">
               Please fill out the form with honesty.
                    <Grid>
                        <Row>
                            <Col>
                            <div className="bform"><br/>
                                <Form>
                                <hr></hr>
                                {/* Student ID Number */}
                                    <FormGroup> 
                                        <ControlLabel>ID Number</ControlLabel>
                                        <FormControl id="idNo" type="text" placeholder="Student ID: 0549-0608I2..." value={this.state.idnum} onChange={this.onChange('idnum')}/>
                                    </FormGroup>
                                    {/* Course */}
                                    <FormGroup> 
                                        <ControlLabel>Course</ControlLabel>
                                        <FormControl id="idNo" type="text" placeholder="BSIT" value={this.state.course} onChange={this.onChange('course')}/>
                                    </FormGroup>
                                    {/* Instructor */}
                                    <FormGroup> 
                                        <ControlLabel>Select Instructor</ControlLabel>
                                        <FormControl id="idNo" componentClass="select"                                                     
                                                     value={this.state.instructor}
                                                     onChange={this.onChange('instructor')}
                                            >
                                            <option value="Mr. John M. Mayol">Mr. John M. Mayol</option>
                                            <option value="Mr. Geof Y. Go">Mr. Geof Y. Go</option>
                                            <option value="Mr. Allan J. Caprio">Mr. Allan J. Caprio</option>
                                            <option value="Mrs. Jeanne B. Sy">Mrs. Jeanne B. Sy</option>
                                            <option value="Mrs. Rio G. Degamo">Mrs. Rio G. Degamo</option>
                                            <option value="Engr. Marilo S. Alfaro">Engr. Marilo S. Alfaro</option>
                                            <option value="Engr. Jay F. Corneo">Engr. Jay F. Corneo</option>
                                        </FormControl>
                                    </FormGroup>
                                    <hr></hr>
                                    {/* Check Criteria */}
                                    <FormGroup>
                                        <ControlLabel>Please check the box if he/she meets the following standards. The Instructor, </ControlLabel>
                                        <Checkbox value="1" checked={this.state.numchecked.indexOf('1')>=0 ? true:false} onChange={this.checkboxChange('numchecked')}>
                                           Set and followed clearly defined grading criteria.
                                        </Checkbox>
                                        <Checkbox value="2" checked={this.state.numchecked.indexOf('2')>=0 ? true:false} onChange={this.checkboxChange('numchecked')}>
                                          Utilized the entire allotted lecture time.
                                        </Checkbox>
                                        <Checkbox value="3" checked={this.state.numchecked.indexOf('3')>=0 ? true:false} onChange={this.checkboxChange('numchecked')}>
                                            Completed the objectives outlined in the course description.
                                        </Checkbox>
                                        <Checkbox value="4" checked={this.state.numchecked.indexOf('4')>=0 ? true:false} onChange={this.checkboxChange('numchecked')}>
                                            Was enthusiastic about teaching the course.
                                        </Checkbox>
                                        <Checkbox value="5" checked={this.state.numchecked.indexOf('5')>=0 ? true:false} onChange={this.checkboxChange('numchecked')}>
                                             Was capable of answering questions.
                                        </Checkbox>
                                    </FormGroup>
                                    <hr></hr>
                                      {/* Rate Instructor */}
                                    <FormGroup>
                                        <ControlLabel>Please rate honestly. The Instructor, </ControlLabel>
                                        <Table className="jTable">
                                          <tr>
                                            <th>  </th>
                                            <th>Agree</th>
                                            <th>Neutral</th>
                                            <th>Disagree</th>
                                          </tr>
                                          <tr>
                                            <td>&emsp;1. Treated students with respect.</td>
                                            <td className="t1"><Radio name="c1" value="Agree" onChange={this.onChange('rate_1')}></Radio></td>
                                            <td className="t1"><Radio name="c1" value="Neutral" onChange={this.onChange('rate_1')}></Radio></td>
                                            <td className="t1"><Radio name="c1" value="Disagree" onChange={this.onChange('rate_1')}></Radio></td>
                                          </tr>
                                          <tr>
                                            <td>&emsp;2. Made students feel free to ask questions.</td>
                                            <td className="t1"><Radio name="c2" value="Agree" onChange={this.onChange('rate_2')}></Radio></td>
                                            <td className="t1"><Radio name="c2" value="Neutral" onChange={this.onChange('rate_2')}></Radio></td>
                                            <td className="t1"><Radio name="c2" value="Disagree" onChange={this.onChange('rate_2')}></Radio></td>
                                          </tr>
                                          <tr>
                                            <td>&emsp;3. Communicated clearly.</td>
                                            <td className="t1"><Radio name="c3" value="Agree" onChange={this.onChange('rate_3')}></Radio></td>
                                            <td className="t1"><Radio name="c3" value="Neutral" onChange={this.onChange('rate_3')}></Radio></td>
                                            <td className="t1"><Radio name="c3" value="Disagree" onChange={this.onChange('rate_3')}></Radio></td>
                                          </tr>
                                          <tr>
                                            <td>&emsp;4. Provided constructive feedback on graded material.</td>
                                            <td className="t1"><Radio name="c4" value="Agree" onChange={this.onChange('rate_4')}></Radio></td>
                                            <td className="t1"><Radio name="c4" value="Neutral" onChange={this.onChange('rate_4')}></Radio></td>
                                            <td className="t1"><Radio name="c4" value="Disagree" onChange={this.onChange('rate_4')}></Radio></td>
                                          </tr>
                                        </Table>
                                        </FormGroup>
                                        {/* Rate Instructor */}
                                        <ControlLabel>Comments:</ControlLabel>
                                    <FormGroup>
                                      <textarea name="comment" value={this.state.comment} onChange={this.onChange('comment')} placeholder="Type your comment here..." className="textarea"/>
                                    </FormGroup>
                                    

                                    <ButtonGroup>

                                        <Button bsStyle="success" onClick={this.saveSurvey}>Save Feedback</Button>
                                        
                                    </ButtonGroup>
                                </Form>
                              </div>{/*End of bform div*/}
                            </Col>



{/* Start Modal Here---------------------------------------------------------------------*/}
<div className="modal-container">
                    <Modal
                    show={this.state.show}
                    onHide={close}
                    container={this}
                    aria-labelledby="contained-modal-title"
                    >
                    <Modal.Header closeButton>
                        <Modal.Title id="contained-modal-title">Edit Feedback</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                    <Form>
                         {/* Student ID Number */}
                                    <FormGroup> 
                                        <ControlLabel>ID Number</ControlLabel>
                                        <FormControl id="idNo" type="text" placeholder="Student ID: 0549-0608I2..." value={this.state.eidnum} onChange={this.onChange('eidnum')}/>
                                    </FormGroup>
                                    

                            {/* Course */}
                                    <FormGroup> 
                                        <ControlLabel>Course</ControlLabel>
                                        <FormControl id="idNo" type="text" placeholder="BSIT" value={this.state.ecourse} onChange={this.onChange('ecourse')}/>
                                    </FormGroup>

                                    {/* Instructor */}
                                    <FormGroup> 
                                        <ControlLabel>Select Instructor</ControlLabel>
                                        <FormControl id="idNo" componentClass="select"                                                     
                                                     value={this.state.einstructor}
                                                     onChange={this.onChange('einstructor')}
                                            >
                                            <option value="Mr. John M. Mayol">Mr. John M. Mayol</option>
                                            <option value="Mr. Geof Y. Go">Mr. Geof Y. Go</option>
                                            <option value="Mr. Allan J. Caprio">Mr. Allan J. Caprio</option>
                                            <option value="Mrs. Jeanne B. Sy">Mrs. Jeanne B. Sy</option>
                                            <option value="Mrs. Rio G. Degamo">Mrs. Rio G. Degamo</option>
                                            <option value="Engr. Marilo S. Alfaro">Engr. Marilo S. Alfaro</option>
                                            <option value="Engr. Jay F. Corneo">Engr. Jay F. Corneo</option>
                                        </FormControl>
                                    </FormGroup>
                                    <hr></hr>
                                    {/* Check Criteria */}
                                    <FormGroup>
                                        <ControlLabel>Please check the box if he/she meets the following standards. The Instructor, </ControlLabel>
                                        <Checkbox value="1" checked={this.state.enumchecked.indexOf('1')>=0 ? true:false} onChange={this.checkboxChange('enumchecked')}>
                                           Set and followed clearly defined grading criteria.
                                        </Checkbox>
                                        <Checkbox value="2" checked={this.state.enumchecked.indexOf('2')>=0 ? true:false} onChange={this.checkboxChange('enumchecked')}>
                                          Utilized the entire allotted lecture time.
                                        </Checkbox>
                                        <Checkbox value="3" checked={this.state.enumchecked.indexOf('3')>=0 ? true:false} onChange={this.checkboxChange('enumchecked')}>
                                            Completed the objectives outlined in the course description.
                                        </Checkbox>
                                        <Checkbox value="4" checked={this.state.enumchecked.indexOf('4')>=0 ? true:false} onChange={this.checkboxChange('enumchecked')}>
                                            Was enthusiastic about teaching the course.
                                        </Checkbox>
                                        <Checkbox value="5" checked={this.state.enumchecked.indexOf('5')>=0 ? true:false} onChange={this.checkboxChange('enumchecked')}>
                                             Was capable of answering questions.
                                        </Checkbox>
                                    </FormGroup>

                                    <hr></hr>
                                      {/* Rate Instructor */}
                                    <FormGroup>
                                        <ControlLabel>Please rate honestly. The Instructor, </ControlLabel>
                                        <Table className="jTable">
                                          <tr>
                                            <th>  </th>
                                            <th>Agree</th>
                                            <th>Neutral</th>
                                            <th>Disagree</th>
                                          </tr>
                                          <tr>
                                            <td>&emsp;1. Treated students with respect.</td>
                                            <td className="t1"><Radio name="c1" value="Agree" checked={this.state.erate_1 == "Agree" ? true : false} onChange={this.onChange('erate_1')}></Radio></td>
                                            <td className="t1"><Radio name="c1" value="Neutral" checked={this.state.erate_1 == "Neutral" ? true : false} onChange={this.onChange('erate_1')}></Radio></td>
                                            <td className="t1"><Radio name="c1" value="Disagree" checked={this.state.erate_1 == "Disagree" ? true : false} onChange={this.onChange('erate_1')}></Radio></td>
                                          </tr>
                                          <tr>
                                            <td>&emsp;2. Made students feel free to ask questions.</td>
                                            <td className="t1"><Radio name="c2" value="Agree" checked={this.state.erate_2 == "Agree" ? true : false} onChange={this.onChange('erate_2')}></Radio></td>
                                            <td className="t1"><Radio name="c2" value="Neutral" checked={this.state.erate_2 == "Neutral" ? true : false} onChange={this.onChange('erate_2')}></Radio></td>
                                            <td className="t1"><Radio name="c2" value="Disagree" checked={this.state.erate_2 == "Disagree" ? true : false} onChange={this.onChange('erate_2')}></Radio></td>
                                          </tr>
                                          <tr>
                                            <td>&emsp;3. Communicated clearly.</td>
                                            <td className="t1"><Radio name="c3" value="Agree" checked={this.state.erate_3 == "Agree" ? true : false} onChange={this.onChange('erate_3')}></Radio></td>
                                            <td className="t1"><Radio name="c3" value="Neutral" checked={this.state.erate_3 == "Neutral" ? true : false} onChange={this.onChange('erate_3')}></Radio></td>
                                            <td className="t1"><Radio name="c3" value="Disagree" checked={this.state.erate_3 == "Disagree" ? true : false} onChange={this.onChange('erate_3')}></Radio></td>
                                          </tr>
                                          <tr>
                                            <td>&emsp;4. Provided constructive feedback on graded material.</td>
                                            <td className="t1"><Radio name="c4" value="Agree" checked={this.state.erate_4 == "Agree" ? true : false} onChange={this.onChange('erate_4')}></Radio></td>
                                            <td className="t1"><Radio name="c4" value="Neutral" checked={this.state.erate_4 == "Neutral" ? true : false} onChange={this.onChange('erate_4')}></Radio></td>
                                            <td className="t1"><Radio name="c4" value="Disagree" checked={this.state.erate_4 == "Disagree" ? true : false} onChange={this.onChange('erate_4')}></Radio></td>
                                          </tr>
                                        </Table>
                                        </FormGroup>

                                        <FormGroup>
                                      <textarea name="comment" value={this.state.ecomment} onChange={this.onChange('ecomment')} placeholder="Type your comment here..." className="textarea"/>
                                    </FormGroup>

                                    <ButtonGroup>
                                    
                                        <Button  bsStyle="success" onClick={this.saveEdit(this.state.selectedId)}>Save Changes</Button>

                                    </ButtonGroup>
                                    
                                </Form>
</Modal.Body>
                        </Modal>
                        </div>




{/* ..............................................................................M O D A L..............................................................................*/}











                            <hr className="thr"></hr>
                            <h3>Feedback List</h3>
                                <Table condensed striped bordered hover className="survey_list">
                                    <thead>
                                    <tr>
                                        <th>Action</th>
                                        <th>Survey ID</th>
                                        <th>ID No.</th>
                                        <th>Course</th>
                                        <th>Instructor</th>
                                        <th>Item Checked</th>
                                        <th>Rate No. 1</th>
                                        <th>Rate No. 2</th>
                                        <th>Rate No. 3</th>
                                        <th>Rate No. 4</th>
                                        <th>Comments</th>
                                    </tr>
                                    </thead>
                                    <tbody>
                                    {rows}
                                    </tbody>
                                </Table>
                            
                        </Row>
                    </Grid>

                </div>
            </div>
        );
    }
}

export default App;
