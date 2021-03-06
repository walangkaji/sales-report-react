/* global window */

import React, { Component } from 'react'
import './Carousel.scss'
import './slick.scss'
import './slick-theme.scss'
import Slider from 'react-slick'
import CarouselPlaceholder from './assets/carousel-placeholder.jpg'

import GTM from '../../lib/utils/GTM'

const settings = {
  autoplay: true,
  autoplaySpeed: 5000,
  pauseOnFocus: true,
  pauseOnHover: true,
  dots: true,
  arrows: false,
  infinite: true,
  speed: 500,
  slidesToShow: 1,
  slidesToScroll: 1,
  draggable: true,
  swipeToSlide: true,
  centerMode: true,
  variableWidth: false,
  responsive: [
    {
      breakpoint: 430,
      settings: {
        centerPadding: '10px'
      }
    },
    {
      breakpoint: 480,
      settings: {
        centerPadding: '30px'
      }
    },
    {
      breakpoint: 530,
      settings: {
        centerPadding: '60px'
      }
    },
    {
      breakpoint: 728,
      settings: {
        centerPadding: '100px'
      }
    }
  ]
}

class Carousel extends Component {
  static propTypes = {
    images: React.PropTypes.arrayOf(React.PropTypes.object)
  }

  state = {
    carouselSettings: settings,
    slickStop: 0
  }

  constructor (props) {
    super(props)

    this._createCarouselItems = this._createCarouselItems.bind(this)
    this._gtmNotifySlideClick = this._gtmNotifySlideClick.bind(this)
    this._gtmNotifySlideChange = this._gtmNotifySlideChange.bind(this)
    this._startCarousel = this._startCarousel.bind(this)
    this._stopCarousel = this._stopCarousel.bind(this)
  }

  _createCarouselItems (image, index) {
    return (
      <div className='carousel__item' key={`car-${index}`}>
        <a href={image.redirect_url}
          className='u-text-decoration-none'
          onClick={this._gtmNotifySlideClick(index)}
          target='_blank'>
          <div className='carousel__item-container u-mx-auto u-block'>
            <div className='carousel__img u-fit u-mx-auto' alt={image.title}>
              <source srcSet={image.image_url} />
              <img className='carousel__img u-fit u-mx-auto'
                src={image.image_url}
                alt={image.title} />
            </div>
          </div>
        </a>
      </div>
    )
  }

  _gtmNotifySlideClick (index) {
    return (event) => {
      if (this.props.images.length > 0) {
        GTM.pushEvent(
          'slideBanner',
          'Slider',
          'Click',
          this.props.images[index].title
       )
      }
    }
  }

  _gtmNotifySlideChange (index) {
    if (this.props.images.length > 0) {
      GTM.pushEvent(
        'sliderBanner',
        'Slider',
        'Impression',
        this.props.images[index].title
      )

      let link = this.props.images[index]['redirect_url']
      let baseURL = link.split('?')[0]
      let parts = baseURL.split('/')
      let title = parts[parts.length - 1] || parts[parts.length - 2]

      if (title.length) {
        GTM.pushObject({
          'banner_impression_id': title,
          'ecommerce': {
            'promoView': {
              'promotions': [
                {
                  'id': title,
                  'name': title,
                  'position': 'slider_banner'
                }]
            }
          }
        })
      }
    }
  }

  _stopCarousel () {
    if (this.state.slickStop === 0) {
      this.setState({
        carouselSettings: Object.assign(this.state.carouselSettings, { autoplay: false }),
        slickStop: 1
      })
    }
  }

  _startCarousel () {
    this.setState({
      carouselSettings: Object.assign(this.state.carouselSettings, { autoplay: true })
    })
  }

  render () {
    let placeholder = {
      'image_url': CarouselPlaceholder,
      'redirect_url': '#',
      'title': 'Placeholder Image'
    }
    let sliders = (this.props.images.length === 0)
      ? this._createCarouselItems(placeholder, 0)
      : this.props.images.map(this._createCarouselItems)

    return (
      <div className='carousel u-clearfix'
        onTouchEnd={this._stopCarousel}
        onMouseOver={this._stopCarousel}
        onMouseLeave={this._startCarousel}>
        <Slider {...this.state.carouselSettings} afterChange={this._gtmNotifySlideChange}>
          { sliders }
        </Slider>
      </div>
    )
  }
}

export default Carousel
