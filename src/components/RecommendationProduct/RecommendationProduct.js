import React from 'react'
import './RecommendationProduct.scss'
import TextHeader from '../../components/TextHeader'
import RecommendationProductPlaceholder from './assets/recommendation-product-placeholder.png'

export const RecommendationProduct = () => (
  <div className='u-clearfix'>
    <TextHeader textType={2} injectClassName='recommendation-product__title'>
      Yang lagi Hot
    </TextHeader>
    <div className='recommendation-product-container'>
      <div className='recommendation-product__contents'>
        <div className='u-col u-col-6 recommendation-product__box'>
          <div className='recommendation-product__box-content'>
            <a href='#'>
              <img src={RecommendationProductPlaceholder} alt='' className='recommendation-product__img' />
              <div className='recommendation-product__content-desc'>
                <div className='recommendation-product__content-title u-truncate'>Modem Mi-Fi</div>
                <div className='recommendation-product__content-startto'>
                  Mulai dari <span className='recommendation-product__content-price'>Rp. 200rb</span>
                </div>
              </div>
            </a>
          </div>
        </div>
        <div className='u-col u-col-6 recommendation-product__box'>
          <div className='recommendation-product__box-content'>
            <a href='#'>
              <img src={RecommendationProductPlaceholder} alt='' className='recommendation-product__img' />
              <div className='recommendation-product__content-desc'>
                <div className='recommendation-product__content-title u-truncate'>Modem Mi-Fi</div>
                <div className='recommendation-product__content-startto'>
                  Mulai dari <span className='recommendation-product__content-price'>Rp. 200rb</span>
                </div>
              </div>
            </a>
          </div>
        </div>
        <div className='u-clearfix' />
        <div className='recommendation-product__see-all'>
          <a className='recommendation-product__see-all-link' href='https://www.tokopedia.com/toppicks/'>
            Lihat Semua <i className='promo-spacer__icon promo-spacer__icon--arrow' />
          </a>
        </div>
      </div>
    </div>
  </div>
)

export default RecommendationProduct
