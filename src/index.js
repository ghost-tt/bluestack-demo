import React, { Fragment } from 'react'
import ReactDOM from 'react-dom'
import { I18n } from 'react-polyglot'
import axios from 'axios'

import 'normalize.css/normalize.css';
import './styles/styles.scss';

import LocaleContext from './contexts/locale'
import Message from './components/message'
import Header from './components/header'
import Footer from './components/footer'
import Campaign from './components/campaign'


const App = () => {
  const [locale, setLocale] = React.useState('en')
  const [messages, setMessages] = React.useState({})

  /* const [finalOut, setOut] = React.useState('')
  const [datavalue, setDatValue] = React.useState({}) */

  React.useEffect(
    () => {
      async function fetchData() {
        const result = await axios.get(`/translations/${locale}.json`)
        setMessages(result.data)
      }
      fetchData()
    },
    [locale]
  )


  /* 
    * Code for data.json file to get all the sample data used for parsing.
    * As for now I am handing data as state as i was having no other option to set in a db and get a value due to time contraint
  
  */
 /*  React.useEffect(
    () => {
      async function fetchData() {
        const data_result = await axios.get(`/data/data.json`)
        setDatValue(data_result.data)
      }
      fetchData()
    },
    [finalOut]
  ) */


  


  return (
    <LocaleContext.Provider value={{ locale, setLocale }}>
      <I18n locale={locale} messages={messages}>
        <Fragment>
          <Header />
          <Campaign />
          {/* <Message name="CodeSandbox" messageCount={1} /> */}
          <Footer />
        </Fragment>
      </I18n>
    </LocaleContext.Provider>
  )
}

const rootElement = document.getElementById('root')
ReactDOM.render(<App />, rootElement)
