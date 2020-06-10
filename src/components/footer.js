import React from 'react'
import LocaleContext from '../contexts/locale'

const Footer = () => {
  const { locale } = React.useContext(LocaleContext)

  return (
    <footer>
      &copy; Whenever.{' '}
      <img
        src={`/flags/${locale}.svg`}
        alt={`Flag of ${locale}`}
        width="15px"
      />
    </footer>
  )
}

export default Footer
