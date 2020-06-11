import React from 'react'
import LocaleContext from '../contexts/locale'
import { translate } from 'react-polyglot'

/* Language translation currently working on footer only. This can be done for all the components easily */
const Footer = ({t}) => {
  const { locale } = React.useContext(LocaleContext)
  const name = 'Bluestack world'
  return (
    <footer >
      <span style={{margin: '1rem'}}>{t('welcomeFooterMessage')}</span>
      <span  style={{margin: '1rem'}}>&copy; Bluestack{' '}</span>
    </footer>
  )
}

export default translate()(Footer)
