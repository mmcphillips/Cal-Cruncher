import React from  'react';
import DatePicker from "react-datepicker";
import dateToday from '../helpers/dateHelper.js'
// console.log(typeof new Date().toDateInputValue())
import styled from 'styled-components';

const FormContainer = styled.div`
  display: inline-block;
  margin: 0 auto;
  margin-top: 35px;
  margin-bottom:35px;
  text-align:center;
  border:solid 1px black;
  width:30%;
  border-radius:20px;

`;
const StyledP = styled.p`
  text-align:left;
  color:#fff;
  text-align:center;
`;
const Submitter = styled.input`
  margin-bottom:10px;
  margin-top:20px;
`;
const Sh1 = styled.h1`
color:#000;
font-weight:340;
font-size:1.5em;
font-family:sarif;
margin-top:0;
padding-top:10px;
`;
const InForm = styled.form`
background-color: #00957A;
height:100%;
height:100%;
border-radius:20px;
`;

const getTotalIntake = function(array){
  let sum = 0;
  array.forEach(function(item){
    sum += item.totalcal;
  })
  return sum;
}
const IntakeForm = ({handleInputChange, handleSubmit}) => (
  <FormContainer>
  <InForm onChange={handleInputChange} onSubmit={handleSubmit}>
    <Sh1> Add an item </Sh1>
    <label>
      <StyledP>date</StyledP>
    <input type="dayte" name="date"
    value={new Date().toDateInputValue()}
    />
    </label>
    <label>
      <StyledP>Entry</StyledP>
    <input type="text" name="meal" required placeholder="Meal"/>
    </label>

    <label>
      <StyledP>calories per serving</StyledP>
    <input type="number" name="cal" required placeholder="calories"/>
    </label>

    <label>
      <StyledP>Servings</StyledP>
    <select name ="servings">
    <option default value="1">1</option>
    <option value="2">2</option>
    <option value="3">3</option>
    <option value="4">4</option>
    <option value="5">5</option>
    </select>
    </label>

  <br></br>
  <Submitter type="submit" value="Submit" />
  {/* <input type="submit" value="Submit" /> */}
  </InForm>

  </FormContainer>
);
export default IntakeForm;
