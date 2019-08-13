import React from 'react';
import Flex, { FlexItem } from 'styled-flex-component';
import styled from 'styled-components';
import $ from 'jquery';
import dateToday from '../helpers/dateHelper.js';
import IntakeForm from './IntakeForm.jsx';
import AlltimeList from './AllTimeList.jsx';
import DailyList from './DailyList.jsx';
import ModifyForm from './ModifyForm.jsx';


const BackButton = styled.button`
  border-radius:25px;
  color:red;
  background-color:red;
`;
const MainWrapper = styled.div`
  margin:0 auto;
  text-align:center;
  width:100%;
`;
const HeaderContent = styled.div`
  margin:0 auto;
  font-weight: 3em;
  height:175px;
`;
const LeftPane = styled.div`
  display:inline-flex;
  right:0%;

`;
const RightPane = styled.div`
  display:inline-flex;
  flex-direction:column;
  width:45%;
  width: 60%;
  margin-right:5%;
  padding-top: 50px;
`;
const ViewContainer = styled.div`
  display:inline-flex;
  flex-direction: column;
  right:0%;
`;
const DailyContainer = styled.div`
  background-color: #01c4b0;
  display: flex;
  height: 200px;
  width: 200px;
  margin:0 auto;
  position: relative;
  Justify-content:center;
  line-height:200px;
  font-size:2em
  border-radius:20px;
  margin:10px;
`;
const WeekleyContainer = styled.div`
  background-color: #00957A;
  display: flex;
  height: 200px;
  width: 200px;
  margin:0 auto;
  position: relative;
  Justify-content:center;
  line-height:200px;
  font-size:2em
  border-radius:20px;
  margin:10px;

  `;
const MonthlyContainer = styled.div`
  background-color: #959595;
  display: flex;
  height: 200px;
  width: 200px;
  margin:0 auto;
  Justify-content:center;
  position: relative;
  line-height:200px;
  font-size:2em;
  border-radius:20px;
  margin:10px;

`;
const getTotalIntake = function (array) {
  let sum = 0;
  array.forEach((item) => {
    sum += item.totalcal;
  });
  return sum;
};
class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      loading: false,
      view: 'main',
      dayte: new Date().toDateInputValue(),
      meal: '',
      cal: 0,
      servings: 1,
      allIntake: [],
      todayIntake: [],
      recommended: 2000,
      selectedId: 0,
      mmeal: '',
      mid: 0,
      mcal: 0,
      mservings: 0,
      mtotalcal: 0,
      mdayte: '',
      todayTotal: 0,
      allTimeTotal: 0
    };
    this.handleInputChange = this.handleInputChange.bind(this);
    this.handleFormSubmission = this.handleFormSubmission.bind(this);
    this.getItems = this.getItems.bind(this);
    this.updateResource = this.updateResource.bind(this);
    this.selectView = this.selectView.bind(this);
    this.removeItem = this.removeItem.bind(this);
    this.handleModify = this.handleModify.bind(this);
  }

  componentDidMount() {
    this.getItems();
  }

  handleInputChange(e) {
    const { name } = e.target;
    const { value } = e.target;
    this.setState({
      [name]: value,
    });
  }

  removeItem(e) {
    const id = Number(e.target.id);
    const that = this;
    const delObj = { id };
    const currentTotal = this.state.allIntake.slice();
    const currentDaily = this.state.todayIntake.slice();
    const modifiedTotal = currentTotal.filter((item) => item.id !== id);
    const modifiedDaily = currentDaily.filter((item) => item.id !== id);
    const total = getTotalIntake(modifiedDaily);
    const allTotal = getTotalIntake(modifiedTotal)
    $.ajax({
      url: 'http://localhost:3010/api/cal',
      method: 'DELETE',
      contentType: 'application/json',
      data: JSON.stringify(delObj),
      success(result) {
        that.setState({
          allIntake: modifiedTotal,
          todayIntake: modifiedDaily,
          todayTotal: total,
          allTimeTotal: allTotal,
        });
      },
    });
  }

  getItems() {
    const that = this;
    const shallowCopy = this.state.allIntake.slice();
    const getTotalIntake = function (array) {
      let sum = 0;
      array.forEach((item) => {
        sum += item.totalcal;
      });
      return sum;
    };
    $.ajax({
      url: 'http://localhost:3010/api/cal',
      method: 'GET',
      success(result) {
        const newTotal = shallowCopy.concat(result);
        const todayDate = new Date().toDateInputValue();
        const todayTotal = result.filter((item) => item.dayte === todayDate);
        const total = getTotalIntake(todayTotal);
        const allTotal = getTotalIntake(newTotal);
        that.setState({
          allIntake: newTotal,
          todayIntake: todayTotal,
          todayTotal: total,
          allTimeTotal: allTotal
        });
      },
    });
  }

  handleFormSubmission(e) {
    e.preventDefault();
    const {
      dayte,
      meal,
      cal,
      servings,
    } = this.state;
    const calObj = {
      dayte,
      meal,
      cal,
      servings,
    };
    calObj.cal = Number(calObj.cal);
    calObj.servings = Number(calObj.servings);
    calObj.totalcal = (calObj.cal * calObj.servings);
    const that = this;
    const currentDate = new Date().toDateInputValue();
    const totalCopy = this.state.allIntake.slice();
    const todaysCopy = this.state.todayIntake.slice();
    $.ajax({
      url: 'http://localhost:3010/api/cal',
      method: 'POST',
      data: JSON.stringify(calObj),
      contentType: 'application/json',
      success(result) {
        console.log('ressssult', result);
        calObj.id = result[0].id;
        if (calObj.dayte === currentDate) {
          todaysCopy.push(calObj);
          const total = getTotalIntake(todaysCopy);
          that.setState({
            todayIntake: todaysCopy,
            view: 'today',
            todayTotal: total,
          });
        } else {
          calObj.id = result.id;
          console.log('heeere',calObj)
          totalCopy.push(calObj);
          const total = getTotalIntake(totalCopy);
          that.setState({
            allIntake: totalCopy,
            view: 'today',
            allTimeTotal: total,
          });
        }
      },
    });
  }

  selectView(e) {
    const { name } = e.target.dataset;
    this.setState({
      view: name,
    });
  }

  updateResource(e) {
    e.preventDefault();
    const {
      mdayte,
      mmeal,
      mcal,
      mservings,
      mid,
    } = this.state;
    const calObj = {
      dayte: mdayte,
      meal: mmeal,
      cal: mcal,
      servings: mservings,
      id: mid,
    };
    const id = this.state.mid;
    calObj.cal = Number(calObj.cal);
    calObj.totalcal = (calObj.cal * calObj.servings);
    const that = this;
    const currentDate = new Date().toDateInputValue();
    const totalCopy = this.state.allIntake.slice();
    const todaysCopy = this.state.todayIntake.slice();
    const filteredTotal = totalCopy.filter((item) => item.id !== id);
    const filteredToday = todaysCopy.filter((item) => item.id !== id);
    filteredToday.push(calObj);
    filteredTotal.push(calObj);
    $.ajax({
      url: 'http://localhost:3010/api/cal',
      method: 'PUT',
      data: JSON.stringify(calObj),
      contentType: 'application/json',
      success(result) {
        if (calObj.dayte === currentDate) {
          that.setState({
            todayIntake: filteredToday,
            view: 'today',
          });
        } else {
          that.setState({
            allIntake: filteredTotal,
            view: 'today',
          });
        }
      },
    });
  }

  handleModify(e) {
    const { meal } = e.target.dataset;
    const id = Number(e.target.dataset.id);
    const cal = Number(e.target.dataset.cal);
    const servings = Number(e.target.dataset.servings);
    const totalcal = Number(e.target.dataset.totalcal);
    const { dayte } = e.target.dataset;
    this.setState({
      view: 'put',
      mmeal: meal,
      mid: id,
      mcal: cal,
      mservings: servings,
      mtotalcal: totalcal,
      mdayte: dayte,
    });
  }

  render() {
    if (this.state.loading === true) {
      return;
      (
        <MainWrapper>
          Loading
        </MainWrapper>
      );
    }
    else if (this.state.view === 'month'){
      return (
        <MainWrapper>
          <div />
          <LeftPane>
            <ViewContainer>
              <h2>View Select</h2>
              <DailyContainer data-name="today" onClick={this.selectView}>
              Day
              </DailyContainer>
              <WeekleyContainer data-name="week" onClick={this.selectView}>
              Week
              </WeekleyContainer>
              <MonthlyContainer data-name="month" onClick={this.selectView}>
              Month
              </MonthlyContainer>
            </ViewContainer>
          </LeftPane>
          <RightPane>
            <HeaderContent>
              <h1>Cal Tracker</h1>
              <h1>Monthly</h1>
              <h2></h2>
            </HeaderContent>

            <AlltimeList
            allIntake={this.state.allIntake}
            rec={this.state.recommended}
            remove={this.removeItem}
            modify={this.handleModify}
            state={this.state} />
            <IntakeForm
            handleSubmit={this.handleFormSubmission}
            handleInputChange={this.handleInputChange} />
          </RightPane>
        </MainWrapper>)
    }
    else if (this.state.view === 'week'){
      return (
        <MainWrapper>
          <div />
          <LeftPane>
            <ViewContainer>
              <h2>View Select</h2>
              <DailyContainer data-name="today" onClick={this.selectView}>
              Day
              </DailyContainer>
              <WeekleyContainer data-name="week" onClick={this.selectView}>
              Week
              </WeekleyContainer>
              <MonthlyContainer data-name="month" onClick={this.selectView}>
              Month
              </MonthlyContainer>
            </ViewContainer>
          </LeftPane>
          <RightPane>
            <HeaderContent>
              <h1>Cal Tracker</h1>
              <h1>Weekly</h1>
              <h2></h2>
            </HeaderContent>
           <AlltimeList
            allIntake={this.state.allIntake}
            rec={this.state.recommended}
            remove={this.removeItem}
            modify={this.handleModify}
            state={this.state} />
            <IntakeForm handleSubmit={this.handleFormSubmission} handleInputChange={this.handleInputChange} />
          </RightPane>
        </MainWrapper>)
    }
    else if (this.state.view === 'today') {
      return (
        <MainWrapper>
          <div />
          <LeftPane>
            <ViewContainer>
              <h2>View Select</h2>
              <DailyContainer data-name="today" onClick={this.selectView}>
              Day
              </DailyContainer>
              <WeekleyContainer data-name="week" onClick={this.selectView}>
              Week
              </WeekleyContainer>
              <MonthlyContainer data-name="month" onClick={this.selectView}>
              Month
              </MonthlyContainer>
            </ViewContainer>
          </LeftPane>
          <RightPane>
            <HeaderContent>
              <h1>Cal Tracker</h1>
              <h2>TODAY {this.state.dayte} </h2>

            </HeaderContent>
            <DailyList todayIntake={this.state.todayIntake} rec={this.state.recommended} remove={this.removeItem} modify={this.handleModify} state={this.state} />
            <IntakeForm handleSubmit={this.handleFormSubmission} handleInputChange={this.handleInputChange} />
          </RightPane>
        </MainWrapper>);
    }


    if (this.state.view === 'put') {
      return (
        <MainWrapper>
          <div />
          <ModifyForm handleInputChange={this.handleInputChange} updateResource={this.updateResource} state={this.state} />
          <LeftPane>
            <ViewContainer>
              <h2>View Select</h2>
              <DailyContainer data-name="today" onClick={this.selectView}>
              Day
              </DailyContainer>
              <WeekleyContainer data-name="week" onClick={this.selectView}>
              Week
              </WeekleyContainer>
              <MonthlyContainer data-name="month" onClick={this.selectView}>
              Month
              </MonthlyContainer>
            </ViewContainer>
          </LeftPane>
          <RightPane>
            <HeaderContent>
              <h1>Cal Tracker</h1>
              <h1>TODAY</h1>
              <h2>{this.state.dayte}</h2>
            </HeaderContent>
            <DailyList todayIntake={this.state.todayIntake} rec={this.state.recommended} remove={this.removeItem} modify={this.handleModify} state={this.state} />
            <IntakeForm handleSubmit={this.handleFormSubmission} handleInputChange={this.handleInputChange} />
          </RightPane>
        </MainWrapper>
      );
    }
    if (this.state.view === 'main') {
      return (
        <MainWrapper>
          <h1 />
          <HeaderContent>
            <h1>Cal Tracker</h1>
          </HeaderContent>
          <LeftPane>
            <ViewContainer>
              <h2>View Select</h2>
              <DailyContainer data-name="today" onClick={this.selectView}>
              Day
              </DailyContainer>
              <WeekleyContainer data-name="week" onClick={this.selectView}>
              Week
              </WeekleyContainer>
              <MonthlyContainer data-name="month" onClick={this.selectView}>
              Month
              </MonthlyContainer>
            </ViewContainer>
          </LeftPane>
          <RightPane />
        </MainWrapper>
      );
    }
  }
}
export default App;
