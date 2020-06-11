import React from 'react'
import LocaleContext from '../contexts/locale'

const Header = (props) => {
  const { setLocale } = React.useContext(LocaleContext)

  return (
    <header>
      <div className="header">
        <div className="container flex">
          <div className="left">
            <a href="https://www.bluestacks.com/" target="_blank">
             <img src="https://cdn-www.bluestacks.com/bs-images/bs-logo-new.png" className="bs_logo"/>
            </a>
          </div>
          <div className="right">
            <select onChange={e => setLocale(e.target.value)} className="alignRight">
              <option value="en">English</option>
              <option value="de">German</option>
            </select>
          </div>
        </div>
      </div>
      
    </header>
  )
}

export default Header
