import React from 'react';
import ConsumptionItem from './ConsumptionItem.jsx';

const AllTimeList = ({ allIntake }) => (
  <div>
    {allIntake.map((item) => <ConsumptionItem item={item} />)}
  </div>
);

export default AllTimeList;
