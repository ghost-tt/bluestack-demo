import React from 'react'
import LocaleContext from '../contexts/locale'
import TabData from './tabdata';
import OptionModal from './modal';
import randomNatural from 'random-natural';
import { G1, G2, G3, G4, G5, G6, G7, G8 } from './image';
import moment from 'moment'

class Tab extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            selectedOption: undefined,
            selectedPrice: undefined,
            campaigns: ['upcoming_events', 'live_events', 'past_events'],
            current_campaign: 'past_events',
            calender_show:  false,
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
    
    componentDidUpdate() {
        this.parseData(this.state.tabData, this.state.current_campaign)
    }

    openTab(campaign) {
        this.setState({current_campaign: campaign});
    }

    opentest = (tab, timestamp, handlerCal, diff) => {
        var d1 = this.state.tabData.data;
        for (var i in d1) {
            if (d1[i].name == tab.name) {
                d1[i].createdOn = timestamp;
                break; //Stop this loop, we found it!
            }
            
        }
            this.setState(() => ( { tabData: {"data": d1} }))
            handlerCal()
    }

    parseData({data}, currentTab){
        var today = new Date();
        const todayTimeStamp = today.setHours(0,0,0,0); 
        const tomorrowTimeStamp = today.getTime() + (24 * 60 * 60 * 1000);
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

    handleDeleteOptions = () => {
        this.setState(() => ({ options: [] }));
    };

    handleClearSelectedOption = () => {
        this.setState(() => ({ selectedOption: undefined }));
    }

    handlePick = (tab) => {
        this.setState(() => ({
            selectedOption: tab
        }));
    };


    handlePickCalender = (time, tab, handlerCal) => {
        console.log(" handlePickCalender -> ", time)
        var convert_to_timestamp = `${time.month}/${time.day}/${time.year}`
        var timestamp = new Date(convert_to_timestamp).getTime()
        
        this.opentest(tab, timestamp, handlerCal)
    }
    

    render() {
        return (
            <div className="wrapper">
                <div className="tab_title">{(this.props.title).toUpperCase()}</div> 
                <i className="fas fa-chevron-up"></i>
                {/* <div className="tab" style={{overflowX: 'auto'}}>
                    <button className={`tablinks ${this.state.current_campaign == 'upcoming_events' ? 'active' : ''}`} onClick={() => this.openTab('upcoming_events')} >Upcoming Campaigns</button>
                    <button className={`tablinks ${this.state.current_campaign == 'live_events' ? 'active' : ''}`} onClick={() => this.openTab('live_events')}>Live Campaigns</button>
                    <button className={`tablinks ${this.state.current_campaign == 'past_events' ? 'active' : ''}`} onClick={() => this.openTab('past_events')}>Past Campaigns</button>
                </div> */}
                <div >
                    <div className="tab"  style={{overflowX: 'auto'}}>
                        <div className="col-sm col-12">
                            <button className={`tablinks ${this.state.current_campaign == 'upcoming_events' ? 'active' : ''}`} onClick={() => this.openTab('upcoming_events')}>Upcoming Campaigns</button>
                        </div>
                        <div className="col-sm col-12">
                            <button className={`tablinks ${this.state.current_campaign == 'live_events' ? 'active' : ''}`} onClick={() => this.openTab('live_events')}>Live Campaigns</button>
                        </div>
                        <div className="col-sm col-12">
                            <button className={`tablinks ${this.state.current_campaign == 'past_events' ? 'active' : ''}`} onClick={() => this.openTab('past_events')}>Past Campaigns</button>
                        </div>
                    </div>
                </div>
                <TabData tabData={() => this.parseData(this.state.tabData, this.state.current_campaign)} handlePick={this.handlePick} handlePickCalender={this.handlePickCalender}/>
                <OptionModal selectedOption={this.state.selectedOption} handleClearSelectedOption={this.handleClearSelectedOption} />
            </div>
        );
    }
  
}

export default Tab;
