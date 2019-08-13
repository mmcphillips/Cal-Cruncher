import React from  'react';
import DatePicker from "react-datepicker";
import dateToday from '../helpers/dateHelper.js'
// console.log(typeof new Date().toDateInputValue())
import styled from 'styled-components';

const ModifyFormContainer = styled.div`
  position:fixed;
  text-align:center;
  border:solid 1px black;
  width:30%;
  right: 0;
  left: 0;
  top:25%;
  margin-right: auto;
  margin-left: auto;
  z-index:333;
  background-color: #01c4b0;

`;
const MstyledP = styled.p`
  text-align:left;
  color:#fff;
  text-align:center;
`;
const MSubmitter = styled.input`
  margin-bottom:10px;
  margin-top:20px;
`;
const MSh1 = styled.h1`
`;
const ModForm = styled.form`
`;

const ModifyForm = ({handleInputChange, updateResource, state}) => (
  <ModifyFormContainer>

  <ModForm onChange={handleInputChange} onSubmit={updateResource} >

    <h1> Update '{state.mmeal}'</h1>
    <label>
      <MstyledP>date</MstyledP>
    <input type="date" name="mdayte"
    value={new Date().toDateInputValue()}
    />
    </label>
    <label>
      <MstyledP>Entry</MstyledP>
    <input type="text" name="mmeal" required placeholder={state.mmeal}/>
    </label>

    <label>
      <MstyledP>calories per serving</MstyledP>
    <input type="number" name="mcal" required placeholder={state.mservings}/>
    </label>


    <label>
      <MstyledP>Servings</MstyledP>
    <select name ="mservings">
    <option default value="1">1</option>
    <option value="2">2</option>
    <option value="3">3</option>
    <option value="4">4</option>
    <option value="5">5</option>
    </select>
    </label>

  <br></br>
  <MSubmitter type="submit" value="Submit" />
  </ModForm>
  </ModifyFormContainer>
);
export default ModifyForm;
