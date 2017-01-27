import React, { Component } from 'react'
import classNames from 'classnames'
import BodyClassName from 'react-body-classname'
import './SelectDrawer.scss'

class SelectDrawer extends Component {
  constructor (props) {
    super(props)

    this.state = {
      open: false
    }

    this.handleCloseButton = this.handleCloseButton.bind(this)
  }

  handleCloseButton (e) {
    this.setState({ open: false })
  }

  render () {
    return (
      <div className={classNames('dp-drawer--select', { 'active': this.state.open })}>
        <div className='drawer__content'>
          <div className='drawer__header'>
            Nominal
            <span className='drawer__close' onClick={this.handleCloseButton}>×</span>
          </div>
          <div className='drawer__options'>
            <table className='drawer__table'>
              <tbody>
                <tr>
                  <td className='table__product'>
                    <label htmlFor='donation-25'>
                      <div className='product__name'>Rp 25.000</div>
                      <p className='product__desc'>Lorem ipsum dolor sit amet, consectetur adipisicing elit.</p>
                      <div className='product__price'>
                        <div className='price u-mr1'>Rp 25.000</div>
                      </div>
                    </label>
                  </td>
                  <td className='table__radio'>
                    <input name='donation-nominal' id='donation-25' type='radio' className='drawer__radio u-hide' />
                    <label htmlFor='donation-25' className='drawer__icon--radio' />
                  </td>
                </tr>
                <tr>
                  <td className='table__product'>
                    <label htmlFor='donation-50'>
                      <div className='product__name'>Rp 50.000</div>
                      <p className='product__desc'>Lorem ipsum dolor sit amet, consectetur adipisicing elit.</p>
                      <div className='product__price'>
                        <div className='price--discount u-mr1'>Rp 49.000</div>
                        <div className='price--strikethrough'>Rp 51.000</div>
                      </div>
                    </label>
                  </td>
                  <td className='table__radio'>
                    <input name='donation-nominal' id='donation-50' type='radio' className='drawer__radio u-hide' />
                    <label htmlFor='donation-50' className='drawer__icon--radio' />
                  </td>
                </tr>
                <tr>
                  <td className='table__product'>
                    <label htmlFor='donation-100'>
                      <div className='product__name'>Rp 100.000</div>
                      <p className='product__desc'>Lorem ipsum dolor sit amet, consectetur adipisicing elit.</p>
                      <div className='product__price'>
                        <div className='price u-mr1'>Rp 100.000</div>
                      </div>
                    </label>
                  </td>
                  <td className='table__radio'>
                    <input name='donation-nominal' id='donation-100' type='radio' className='drawer__radio u-hide' />
                    <label htmlFor='donation-100' className='drawer__icon--radio' />
                  </td>
                </tr>
                <tr>
                  <td className='table__product'>
                    <label htmlFor='donation-200'>
                      <div className='product__name'>Rp 200.000</div>
                      <p className='product__desc'>Lorem ipsum dolor sit amet, consectetur adipisicing elit.</p>
                      <div className='product__price'>
                        <div className='price u-mr1'>Rp 200.000</div>
                      </div>
                    </label>
                  </td>
                  <td className='table__radio'>
                    <input name='donation-nominal' id='donation-200' type='radio' className='drawer__radio u-hide' />
                    <label htmlFor='donation-200' className='drawer__icon--radio' />
                  </td>
                </tr>
                <tr>
                  <td className='table__product'>
                    <label htmlFor='donation-300'>
                      <div className='product__name'>Rp 300.000</div>
                      <p className='product__desc'>Lorem ipsum dolor sit amet, consectetur adipisicing elit.</p>
                      <div className='product__price'>
                        <div className='price u-mr1'>Rp 300.000</div>
                      </div>
                    </label>
                  </td>
                  <td className='table__radio'>
                    <input name='donation-nominal' id='donation-300' type='radio' className='drawer__radio u-hide' />
                    <label htmlFor='donation-300' className='drawer__icon--radio' />
                  </td>
                </tr>
                <tr>
                  <td className='table__product'>
                    <label htmlFor='donation-500'>
                      <div className='product__name'>Rp 500.000</div>
                      <p className='product__desc'>Lorem ipsum dolor sit amet, consectetur adipisicing elit.</p>
                      <div className='product__price'>
                        <div className='price u-mr1'>Rp 500.000</div>
                      </div>
                    </label>
                  </td>
                  <td className='table__radio'>
                    <input name='donation-nominal' id='donation-500' type='radio' className='drawer__radio u-hide' />
                    <label htmlFor='donation-500' className='drawer__icon--radio' />
                  </td>
                </tr>
                <tr>
                  <td className='table__product'>
                    <label htmlFor='donation-1000'>
                      <div className='product__name'>Rp 1000.000</div>
                      <p className='product__desc'>Lorem ipsum dolor sit amet, consectetur adipisicing elit.</p>
                      <div className='product__price'>
                        <div className='price u-mr1'>Rp 1000.000</div>
                      </div>
                    </label>
                  </td>
                  <td className='table__radio'>
                    <input name='donation-nominal' id='donation-1000' type='radio' className='drawer__radio u-hide' />
                    <label htmlFor='donation-1000' className='drawer__icon--radio' />
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
        <div className='drawer__overlay' />

        { this.state.open && <BodyClassName className='u-body-overflow-no-scroll' /> }
      </div>
    )
  }
}

export default SelectDrawer
