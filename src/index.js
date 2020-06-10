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
  // In a real app, you should consider preloading default country
  // or load it from the server.
  const [messages, setMessages] = React.useState({})

  React.useEffect(
    () => {
      async function fetchData() {
        const result = await axios.get(`/translations/${locale}.json`)
        // In a real app, you should consider caching the results in an object.
        // To prevent requests for same locale again.
        setMessages(result.data)
      }
      fetchData()
    },
    [locale]
  )

  return (
    <LocaleContext.Provider value={{ locale, setLocale }}>
      <I18n locale={locale} messages={messages}>
        <Fragment>
          <Header />
          <Campaign />
          {/* <Message name="CodeSandbox" messageCount={1} /> */}
          {/* <Footer /> */}
        </Fragment>
      </I18n>
    </LocaleContext.Provider>
  )
}

const rootElement = document.getElementById('root')
ReactDOM.render(<App />, rootElement)
