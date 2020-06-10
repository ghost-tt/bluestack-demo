import React from 'react'
import { translate } from 'react-polyglot'

const Message = ({ t, name, messageCount }) => (
  <section>
    <h1>{t('welcomeMessage', { name })}</h1>
    <p>{t('notification', messageCount)}</p>
  </section>
)

export default translate()(Message)
