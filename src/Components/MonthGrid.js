import React, {Component} from 'react';
import {connect} from 'react-redux';
import EventSquare from './CalendarComponents/EventSquare';
import {fetchEventList} from './helperFunctions/fetches';
import {updateEvents, updateDateObject} from '../actions';
import dayArray, {dateObject} from './helperFunctions/findDates';


let mapStateToProps = (state) => {
    return {events: state.events}
};

let mapDispatchToProps = (dispatch) => {
    return {dispatch: dispatch}
};

class MonthGrid extends Component {

    componentDidMount() {
        fetchEventList('may')
        .then(res => this.props.dispatch(updateEvents(res)));
        this.props.dispatch(updateDateObject(dateObject));
    }

    render() {
        let {events} = this.props;

        let GetSquares = () =>  {
            let monthEventArray = dayArray.map(day => day); 
            events.map((event1) => {
                return (monthEventArray[event1.day-1].event).push(event1);
            })
            return monthEventArray;
        };

        let AddBlankSquares = ({number}) => {
            let children = []
            for (var i=number; i > 0; i--) {
                children.push(<li></li>)
            } 
            return children;
        }

        let AddDateSquares = () => {
            return monthEventArray.map((day) => {
                return <EventSquare date={day} highlightedDate={dateObject.currentDate}/>
            })
        }
        
        let monthEventArray = GetSquares();

        return <div className="month-grid">
            <ul className="squares">
            <AddBlankSquares number={dateObject.firstDayOfMonth}/>
            <AddDateSquares />
            <AddBlankSquares number={6-dateObject.lastDayOfMonth} />
            </ul>
        </div>
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(MonthGrid);