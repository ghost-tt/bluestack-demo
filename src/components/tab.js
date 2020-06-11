import React from 'react'
import TabData from './tabdata';
import TitleTabs from './titletab';
import Modal from './modal';
import { G1, G2, G3, G4, G5, G6, G7, G8 } from './image';

class Tab extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            selectedOption: undefined,
            selectedPrice: undefined,
            campaigns: ['upcoming_events', 'live_events', 'past_events'],
            current_campaign: 'upcoming_events',
            tabData: {
                "data": [{
                    "name": "Test Whatsapp",
                    "region": "US",
                    "createdOn": 1559807714999,
                    "price": [60, 300, 500],
                    "csv": "Some CSV link for Whatsapp",
                    "report": "Some report link for Whatsapp",
                    "image_url": G1
                  },
                  {
                    "name": "Super Jewels Quest",
                    "region": "CA, FR",
                    "createdOn": 1559806715124,
                    "price": [80, 300, 800],
                    "csv": "Some CSV link for Super Jewels Quest",
                    "report": "Some report link for Super Jewels Ques",
                    "image_url": G2
                  },
                  {
                    "name": "Mole Slayer",
                    "region": "FR",
                    "createdOn": 1591782156000,
                    "price": [100, 500, 900],
                    "csv": "Some CSV link for Mole Slayer",
                    "report": "Some report link for Mole Slayer",
                    "image_url": G3
                  },
                  {
                    "name": "Mancala Mix",
                    "region": "JP",
                    "createdOn": 1559806680124,
                    "price": [90, 450, 800],
                    "csv": "Some CSV link for Mancala Mix",
                    "report": "Some report link for Mancala Mix",
                    "image_url": G4
                  }
                ]
              }
        }
        this.openTab = this.openTab.bind(this);
    }

    openTab(campaign) {
        this.setState({current_campaign: campaign});
    }

    handleClearSelectedOption = () => {
        this.setState(() => ({ selectedOption: undefined }));
    }

    handlePick = (tab) => {
        this.setState(() => ({ selectedOption: tab }));
    };

    /* The function updates the timestamp in the original object once the new timestamp is selected by the user from the calender*/
    handlePickCalender = (time, tab, handlerCal) => {
        let convert_to_timestamp = `${time.month}/${time.day}/${time.year}`
        let timestamp = new Date(convert_to_timestamp).getTime()
        var d1 = this.state.tabData.data;
        for (var i in d1) {
            if (d1[i].name == tab.name) {
                d1[i].createdOn = timestamp;
                break; 
            }
            
        }
        this.setState(() => ( { tabData: {"data": d1} }))
        handlerCal()
    }

    /*
    * The function parses the source object and divides them into live, past and upcoming campaigns
    * Here I have taken time interval from 00:00  to 23:59 as one day
    * ( time is not set by user only day can be set by user but it can be done easily. 
    *   Due to time constraint not implemented the functionality as for now. ) 

    */
    parseData({data}, currentTab){
        let today = new Date();
        let todayTimeStamp = today.setHours(0,0,0,0); 
        let tomorrowTimeStamp = today.getTime() + (24 * 60 * 60 * 1000);
        let upcoming_events_data = [];
        let past_events_data = [];
        let live_events_data = [];
        
        data.forEach((value, index) => {
            if(value.createdOn < todayTimeStamp) {
                past_events_data.push(value);
            } else if( value.createdOn >= todayTimeStamp && value.createdOn < tomorrowTimeStamp ) {
                live_events_data.push(value);
            } else {
                upcoming_events_data.push(value)
            }
        });

        if(currentTab == 'upcoming_events') {
            return upcoming_events_data;
        } else if(currentTab == 'live_events') {
            return live_events_data;
        } else {
            return past_events_data;
        }
     }

    render() {
        return (
            <div className="wrapper">
                <div className="tab_title">{(this.props.title).toUpperCase()}</div> 
                <TitleTabs cc={this.state.current_campaign}  ot={this.openTab}/>
                <TabData tabData={() => this.parseData(this.state.tabData, this.state.current_campaign)} handlePick={this.handlePick} handlePickCalender={this.handlePickCalender}/>
                <Modal selectedOption={this.state.selectedOption} handleClearSelectedOption={this.handleClearSelectedOption} />
            </div>
        );
    }
  
}

export default Tab;
