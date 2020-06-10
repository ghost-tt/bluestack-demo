import React from 'react'
import Tab from './tab'
import { translate } from 'react-polyglot'

const Campaign = ({ t }) => {
  return (
    <section className="container">
         {/* <p>{t('title')}</p> */}
        <Tab title="Manage Campaigns"/>
    </section>
  )
}

export default translate()(Campaign)
