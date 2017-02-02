import React, { Component, PropTypes } from 'react'

import InputGroup from '../parts/InputGroup'
import BuyButtonGroup from '../parts/BuyButtonGroup'

class Air extends Component {
  static propTypes = {
    products: PropTypes.array
  }

  render () {
    return (
      <div>
        <InputGroup
          useAutoSuggest
          label='Wilayah'
          placeholder='Pilih Wilayah'
          value='AETRA JAKARTA'
          tooltip='Isi wilayah Anda'
          items={this.props.products} />
        <InputGroup
          label='Nomor Pelanggan'
          placeholder='Contoh 123456789'
          tooltip='Nomor pelanggan atau Nomor sambungan Anda' />
        <BuyButtonGroup buttonText='Bayar' />
      </div>
    )
  }
}

export default Air