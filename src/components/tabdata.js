import React from 'react'
import 'react-dates/initialize';
import { DateRangePicker, SingleDatePicker, DayPickerRangeController } from 'react-dates';
import 'react-dates/lib/css/_datepicker.css';
import moment from 'moment'
import DatePickerTab from './datepicker';
import styled from 'styled-components';
import { CalenderImg, FileImg, PriceImg, ReportImg } from './image';

const FlexGrow = styled.div`
    flex-grow : ${props => props.fg && '1'};
    flex-basis : ${props => props.fb && props.fb};
`;

class TabData extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            header: [{'DATE': '15%'}, {'CAMPAIGN': '30%'}, {'VIEWS': '15%'}, {'ACTION': '40%'}],
            createdAt: moment(),
            calenderFocused: false,
            showCalender: false
        }
        this.renderTableData = this.renderTableData.bind(this);
        this.renderTableHeader = this.renderTableHeader.bind(this);
    }


    renderTableHeader(tableHeader) {
        return tableHeader.map((titleTab, index) => {
           return <FlexGrow fb={Object.values(titleTab)} className="title_tabs" key={Object.keys(titleTab)}>{Object.keys(titleTab)}</FlexGrow>
        })
    }

    onDateChange = (createdAt) => {
        this.setState(() => ({ createdAt }))
    }

    onFocusChange = ({focused}) => {
        this.setState(() => ({ calenderFocused : focused }))
    }

    createDate = () => {
        this.setState(() => ({ showCalender : true })) 
    }

    diff_in_days = (selected_day_timestamp) => {
        var format_today_date = Math.floor((new Date().getTime())/1000);
        var format_selected_date = Math.floor(selected_day_timestamp/1000);
        var format_utc_today = moment.unix(format_today_date).format();
        var format_utc_selected_date = moment.unix(format_selected_date).format();
        var ago = moment.duration(moment(format_utc_selected_date).diff(format_utc_today)).humanize();
        if(format_today_date > format_selected_date) {
            return `${ago} ago`;
        } else {
            return `${ago} ahead`;
        }
    }

    renderTableData(data, handlePick, handlePickCalender) {
        return data.map((tab, index) => {
            let { name, price, region, createdOn, image_url } = tab; //destructuring
            const monthNames = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
            return (
                <div key={name+index} className="flex tab_column" style={{overflowX: 'auto'}}>
                    <FlexGrow fb={'15%'} style={{padding: '0 0 0 1rem'}}>
                        {/* { monthNames[new Date(createdOn).getMonth()] } {new Date(createdOn).getFullYear()}, {new Date(createdOn).getDate()}  */}
                            <div>{moment.unix((createdOn/1000)).format("MMMM Do, YYYY")}</div>
                            <div className="d-none d-md-block">{this.diff_in_days(createdOn)}</div>
                    </FlexGrow>
                    <FlexGrow fb={'30%'} className="row_container d-block d-md-flex" style={{padding: '0 0 0 1rem'}}>
                            <img src={tab.image_url} className="row_img_tab"/>
                            <div className="d-block d-md-flex" style={{justifyContent: 'center'}} >
                            {name}
                            <p className="d-none d-md-block" style={{color: '#999'}}>{region}</p>
                        </div>
                    </FlexGrow>
                    <FlexGrow fb={'15%'} onClick={() => handlePick(tab)} >
                        <div className="flex" >
                            <img src={PriceImg} className="row_img_tab img-responsive-price"/>
                            <p className="d-none d-md-block" style={{margin: 'auto 1rem'}}>view pricing</p>
                        </div>
                    </FlexGrow>
                    <FlexGrow className="flex" fb={'40%'} style={{padding: '0 0 0 1rem'}}>
                    {/* <div class="container">
                        <div class="row flex row_container">
                            <div class="col-sm">
                                <div className="flex" style={{flexBasis: "33.3%"}}>
                                    <img src={FileImg} className="row_img_tab_action" />
                                    <p style={{margin: 'auto 1rem'}}>csv</p>
                                </div>
                            </div>
                            <div class="col-sm">
                                <div className="flex" style={{flexBasis: "33.3%"}}>
                                    <img src={ReportImg} className="row_img_tab_action" />
                                    <p style={{margin: 'auto 1rem'}}>report</p>
                                </div>
                            </div>
                            <div class="col-sm">
                                <DatePickerTab data={tab} Image={CalenderImg} handlePickCalender={handlePickCalender}/>
                            </div>
                        </div>
                    </div> */}
                        <div className="d-block d-md-flex center-img-action" >
                            <div className="flex" style={{flexBasis: "33.3%"}}>
                                <img src={FileImg} className="row_img_tab_action img-responsive" />
                                <p className="d-none d-md-block" style={{margin: 'auto 1rem'}}>csv</p>
                            </div>
                            <div className="flex" style={{flexBasis: "33.3%"}}>
                                <img src={ReportImg} className="row_img_tab_action img-responsive" />
                                <p className="d-none d-md-block" style={{margin: 'auto 1rem'}}>report</p>
                            </div>
                            <DatePickerTab data={tab} Image={CalenderImg} handlePickCalender={handlePickCalender}/>
                        </div>
                    </FlexGrow>
                </div>
            )
        })
     }

    
    render() {
        let data = this.props.tabData();
        let handlePick = this.props.handlePick;
        let handlePickCalender = this.props.handlePickCalender;
        return (
                <div className="tab_container">
                    <div className="titlebar flex">
                        {this.renderTableHeader(this.state.header)}</div>
                    <div>
                        {
                            data.length === 0 ? <div className="flex tab_column" style={{padding: '2rem 0 2rem 1rem', margin: 'auto 0'}}>No Records found</div> : this.renderTableData(data, handlePick, handlePickCalender)
                        }
                    </div>
                </div>
        )
    }
}

export default TabData;
