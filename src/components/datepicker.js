import React, { useState } from 'react'
import 'react-modern-calendar-datepicker/lib/DatePicker.css'
import { Calendar, utils } from 'react-modern-calendar-datepicker'
import Popup from './popup';

class DatePickerTab extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      selectedDay: null,
      showCal: false,
      showPopup: false
    }
  }

  setSelectedDay = (date) => {
    this.setState(() => ({ selectedDay: date , showPopup: !this.state.showPopup}))
  }

  createPopup = (response) => {
      if(response) {
        this.props.handlePickCalender(this.state.selectedDay, this.props.data, this.handlerCal)
        this.setState(() => ( { showPopup: !this.state.showPopup, showCal: !this.state.showCal } ))
      } else {
        this.setState(() => ( { showPopup: !this.state.showPopup } ))
      }
  }

  handlerCal = () => {
    this.setState(() => ({ showCal: !this.state.showCal }))
  }

  render() {
    return (
      <div>
        <div className="flex" onClick={this.handlerCal} style={{flexBasis: "33.3%"}}>
            <img src={this.props.Image} style={{width: '15%'}} className="row_img_tab_action img-responsive"/>
            <p className="d-none d-md-block" style={{margin: 'auto 1rem'}}>schedule again</p>
        </div>
        {this.state.showCal && (
          <Calendar
            value={this.state.selectedDay}
            onChange={this.setSelectedDay}
            minimumDate={utils().getToday()}
            calendarClassName="responsive-calendar" // added this
            shouldHighlightWeekends
          />
        )}

        {
            this.state.showPopup && (
                <Popup 
                    value={this.state.showPopup} pop={this.createPopup} selectedDay={this.state.selectedDay}
                />
            )
        }


      </div>
    )
  }
}

export default DatePickerTab
