import React from 'react';
import styled from 'styled-components';

const Item = styled.tr`
`;

const Paine = styled.td`
  justify-content: space-between;
  padding:2px;
  font-size:1.1em
`;

const STR = styled.tr`
width:100%;
border: 1px solid black;
`;

const Spacer = styled.div`
padding-bottom:2em;
`;

const ConsumptionItem = ({item, remove, modify}) => (
  <STR style={{bottom:'1pt solid black'}}>
    {/* {console.log('tests', item.id)} */}
    <Paine>{item.meal}</Paine>
    <Paine>{item.cal}</Paine>
    <Paine>{item.servings}</Paine>
    <Paine>{item.totalcal}</Paine>
    <Paine>{item.dayte}</Paine>
    <button id={item.id} style={{color:'red'}} onClick={remove}>&#x20E0;</button>

    <button data-id={item.id} data-cal={item.cal} data-servings={item.servings} data-totalcal={item.totalcal} data-dayte={item.dayte} data-meal={item.meal}style={{color:'green'}} onClick={modify}>&#9998;</button>

  </STR>
);

export default ConsumptionItem;
