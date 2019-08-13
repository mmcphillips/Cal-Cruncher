import React from 'react';
import ConsumptionItem from './ConsumptionItem.jsx';
import styled from 'styled-components';
import Flex, { FlexItem } from 'styled-flex-component';

const DailyListContainer = styled.div`
  width:100%;
  border:solid 1px #00957A;;
  display:block;
`;
const Header = styled.div`
  width:100%;
  border:solid 1px #00957A;;
  display:flex;
  justify-content:space-around;
`;
const Title = styled.div`
  display: flex;
  border: solid 2px red;
  font-size:20px;
  padding-bottom:0;
`;
const Tb = styled.table`
  border: solid 1px #00957A;
  width:100%;
`;

const Tr = styled.tr`
border:solid 1px #00957A;;

`;
const Th = styled.th`
  padding:5px;
`;
const RedDiv = styled.span`
background-color:red;
color:white;
margin-left:5px;
border-radius:2px;
margin-right:5px;

`;
const GreenDiv = styled.span`
background-color:green;
color:white;
height:50px;
margin-left:5px;
border-radius:2px;
margin-right:5px;

`;
const SP = styled.p`
  font-size:1.2em;
`
const SB = styled.table`
background-color:green;
`
const Spacer = styled.div`
height:30px;`
const DailyList = ({todayIntake, remove, modify, state}) => {

  if (state.todayTotal < state.recommended) {
    return(
    <DailyListContainer>
      <Header>
        <div>
          <SP>Current Daily Total: {state.todayTotal} cal</SP>
        </div>
        <div>
         <SP> Daily Recommended:{state.recommended}</SP>
        </div>
           <SP>
             Net:
             <GreenDiv>-{Math.abs(state.recommended- state.todayTotal)}
          </GreenDiv>
              cal
          </SP>
      </Header>
    <Tb>
      <Tr>
        <Th>Entry</Th>
        <Th>Cal per Serving</Th>
        <Th>Servings</Th>
        <Th>Total</Th>
        <Th>Date</Th>
        <Th></Th>
      </Tr>

    {todayIntake.map((item) => <ConsumptionItem item={item} remove={remove} modify={modify}/>)}
      <Spacer></Spacer>
    </Tb>
  </DailyListContainer>
  )}

  else {
    return (<DailyListContainer>
      <Header>
        <div>
         <SP> Current Daily Total: {state.todayTotal} cal</SP>
        </div>

        <SP> Daily Recommended:{state.recommended}</SP>
           <SP>
           Net:
              <RedDiv>+{Math.abs(state.recommended- state.todayTotal)}
              </RedDiv>
                  cal
          </SP>
      </Header>
    <Tb>
      <Tr>
        <Th>Entry</Th>
        <Th>Cal per Serving</Th>
        <Th>Servings</Th>
        <Th>Total</Th>
        <Th>Date</Th>
        <Th></Th>
      </Tr>
    {todayIntake.map((item) => <ConsumptionItem item={item} remove={remove} modify={modify}/>)}
    <Spacer></Spacer>
    </Tb>
  </DailyListContainer>)
  }

}



export default DailyList;