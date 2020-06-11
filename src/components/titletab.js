import React from 'react'


/* 
  This section renders the three tabs upcoming, past and live campaigns
*/
const TabTitle = (props) => {
  return (
    <div className="tab"  style={{overflowX: 'auto'}}>
        <div className="col-sm col-12" style={{padding:'0'}}>
            <button className={`tablinks ${props.cc == 'upcoming_events' ? 'active' : ''}`} onClick={() => props.ot('upcoming_events')}><i className="d-sm-none tab_icon_left">{"<"}</i>Upcoming Campaigns<i className="d-sm-none tab_icon_right">{">"}</i></button>
        </div>
        <div className="col-sm col-12" style={{padding:'0'}}>
            <button className={`tablinks ${props.cc == 'live_events' ? 'active' : ''}`} onClick={() => props.ot('live_events')}><i className="d-sm-none tab_icon_left">{"<"}</i>Live Campaigns<i className="d-sm-none tab_icon_right">{">"}</i></button>
        </div>
        <div className="col-sm col-12" style={{padding:'0'}}>
            <button className={`tablinks ${props.cc == 'past_events' ? 'active' : ''}`} onClick={() => props.ot('past_events')}><i className="d-sm-none tab_icon_left">{"<"}</i>Past Campaigns<i className="d-sm-none tab_icon_right">{">"}</i></button>
        </div>
    </div>
  )
}

export default TabTitle
