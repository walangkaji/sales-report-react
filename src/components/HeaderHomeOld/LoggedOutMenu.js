import React, { Component } from 'react'
import { connect } from 'react-redux'

import bannerDrawer from './assets/banner-drawer.png'
import homeIcon from './assets/nav-home-icon.png'
import loginIcon from './assets/nav-user-icon.png'
import registerIcon from './assets/nav-register-icon.png'

import { updateSidebarStatus } from '../../store/app'
import Cookies from '../../lib/utils/Cookies'
import langEn from '../../lib/utils/lang_en-min.js'
import langId from '../../lib/utils/lang_id-min.js'

var lang = {
  'id':langId,
  'en':langEn
}

class LoggedOutMenu extends Component {
  static propTypes = {
    updateSidebarStatus: React.PropTypes.func
  }

  constructor (props) {
    super(props)

    this.closeSidebar = this.closeSidebar.bind(this)
  }

  closeSidebar () {
    this.props.updateSidebarStatus(false)
  }

  render () {
    let l = Cookies.getItem('lang')

    return (
      <div className='drawer active'>
        <div className='drawer__container u-clearfix'>
          <div className='drawer__title u-clearfix u-relative'>
            <div className='u-left'>MENU</div>
            <div className='nav-close' onClick={this.closeSidebar}>
              <div className='nav-close__child'>
                <span />
                <span />
                <span />
              </div>
            </div>
          </div>
          <div className='drawer__banner'>
            <img className='drawer__banner-img' src={bannerDrawer} alt='tokopedia' />
          </div>
          <div className='drawer__menu'>
            <a href='/'>
              <img className='drawer__menu-icon' src={homeIcon} alt='tokopedia' />
              <span className='drawer__menu-title u-inline-block'>{
                lang[l]['Home']
              }</span>
            </a>
          </div>
          <div className='drawer__menu'>
            <a href='/login'>
              <img className='drawer__menu-icon' src={loginIcon} alt='tokopedia' />
              <span className='drawer__menu-title u-inline-block'>{
                lang[l]['Login']
              }</span>
            </a>
          </div>
          <div className='drawer__menu'>
            <a href='https://accounts.tokopedia.com/register?theme=mobile'>
              <img className='drawer__menu-icon' src={registerIcon} alt='tokopedia' />
              <span className='drawer__menu-title u-inline-block'>{
                lang[l]['NOTE_REGISTER_TITLE']
              }</span>
            </a>
          </div>
        </div>
      </div>
    )
  }
}

const mapDispatchToProps = { updateSidebarStatus }
export default connect(undefined, mapDispatchToProps)(LoggedOutMenu)
