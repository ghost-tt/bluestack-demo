import React from 'react'
import 'react-dates/initialize';
import moment from 'moment'
import DatePickerTab from './datepicker';
import styled from 'styled-components';
import { CalenderImg, FileImg, PriceImg, ReportImg } from './image';

const FlexGrow = styled.div`
    flex-grow : ${props => props.fg && '1'};
    flex-basis : ${props => props.fb && props.fb};
`;


/* The function evaluates the time difference of the schedule date for the campaign from the current day  */
const diff_in_days = (selected_day_timestamp) => {
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

/* 
 * This function basically handles all the rendering the data title on the window tab list
*/
const renderTableHeader = (tableHeader) => {
    return tableHeader.map((titleTab, index) => {
    return <FlexGrow fb={Object.values(titleTab)} className="title_tabs" key={Object.keys(titleTab)}>{Object.keys(titleTab)}</FlexGrow>
    })
}


/* 
 * This function basically handles all the rendering the data inside the tab list
*/
const renderTableData = (data, handlePick, handlePickCalender) => {
    return data.map((tab, index) => {
        let { name, price, region, createdOn, image_url } = tab; 
        return (
            <div key={name+index} className="flex tab_column" style={{overflowX: 'auto'}}>
                <FlexGrow fb={'20%'} style={{padding: '0 0 0 1rem'}}>
                        <div>{moment.unix((createdOn/1000)).format("MMMM Do, YYYY")}</div>
                        <div className="d-none d-md-block">{diff_in_days(createdOn)}</div>
                </FlexGrow>
                <FlexGrow fb={'20%'} className="row_container d-block d-md-flex" style={{padding: '0 0 0 1rem'}}>
                        <img src={tab.image_url} className="row_img_tab"/>
                        <div className="tab_campaign" >
                        {name}
                        <p className="d-none d-md-block" style={{color: '#999'}}>{region}</p>
                    </div>
                </FlexGrow>
                <FlexGrow fb={'20%'} onClick={() => handlePick(tab)} >
                    <div className="flex row_img_tab_wrapper">
                        <img src={PriceImg} className="row_img_tab img-responsive-price"/>
                        <p className="d-none d-md-block" style={{margin: 'auto 1rem'}}>view pricing</p>
                    </div>
                </FlexGrow>
                <FlexGrow className="flex" fb={'40%'} style={{padding: '0 0 0 1rem'}}>
                
                    <div className="d-block d-md-flex center-img-action" >
                        <div className="flex"  style={{flexBasis: "33.3%"}}>
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


const TabData = (props) => {
        let header = [{'DATE': '20%'}, {'CAMPAIGN': '20%'}, {'VIEWS': '20%'}, {'ACTION': '40%'}];
        let data = props.tabData();
        let { handlePick, handlePickCalender } = props;
        return (
            <div className="tab_container">
                <div className="titlebar flex">{renderTableHeader(header)}</div>
                <div>{ data.length === 0 ? <div className="flex tab_column" style={{padding: '2rem 0 2rem 1rem', margin: 'auto 0'}}>No Records found</div> : renderTableData(data, handlePick, handlePickCalender) }</div>
            </div>
        )
}


export default TabData;
