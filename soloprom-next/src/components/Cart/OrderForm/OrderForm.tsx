'use client'
import React from 'react'

import './OrderForm.scss'

export const OrderForm: React.FC = () => {
  return (
    <form className="cart-result-form">
      <div className="cart-result-form__wrapper">
        <div className="cart-result-form__fields modal-callback__fields">
          <div className="modal-callback__field form-field-control">
            <input
              id="modal-callback-family-name"
              type="text"
              name="family-name"
              className="modal-callback__input"
              placeholder="Фамилия"
              autoComplete="family-name"
            />
            <label
              htmlFor="modal-callback-family-name"
              className="modal-callback__label"
            >
              <small>Error Message</small>
            </label>
          </div>
          <div className="modal-callback__field form-field-control">
            <input
              data-form-username
              id="modal-callback-given-name"
              type="text"
              name="given-name"
              className="modal-callback__input"
              placeholder="Имя"
              autoComplete="given-name"
            />
            <label
              htmlFor="modal-callback-given-name"
              className="modal-callback__label"
            >
              <small>Error Message</small>
            </label>
            <img
              src="/img/icons/st.svg"
              alt=""
              className="form-field-control__star"
            />
          </div>
          <div className="modal-callback__field form-field-control">
            <input
              id="modal-callback-additional-name"
              type="text"
              name="patronymic"
              className="modal-callback__input"
              placeholder="Отчество"
              autoComplete="additional-name"
            />
            <label
              htmlFor="modal-callback-additional-name"
              className="modal-callback__label"
            >
              <small>Error Message</small>
            </label>
          </div>
          <div className="modal-callback__field form-field-control">
            <input
              data-form-phone
              id="modal-callback-phone"
              type="tel"
              name="phone"
              className="modal-callback__input"
              placeholder="+7 (999) 999-99-99"
              autoComplete="tel"
            />
            <label
              htmlFor="modal-callback-phone"
              className="modal-callback__label"
            >
              <small>Error Message</small>
            </label>
            <img
              src="/img/icons/st.svg"
              alt=""
              className="form-field-control__star"
            />
          </div>
          <div className="modal-callback__field form-field-control">
            <input
              id="modal-callback-email"
              type="email"
              name="email"
              className="modal-callback__input"
              placeholder="Почта"
            />
            <label
              htmlFor="modal-callback-email"
              className="modal-callback__label"
            ></label>
          </div>
          <div className="modal-callback__field form-field-control">
            <input
              id="modal-callback-city"
              className="modal-callback__input"
              type="text"
              name="address"
              placeholder="Адрес доставки"
              autoComplete="shipping address"
            />
            <label
              htmlFor="modal-callback-city"
              className="modal-callback__label"
            ></label>
          </div>
        </div>

        <div className="cart-result-form__options">
          <div className="cart-result-form__person">
            <label className="cart-result-form__radio radio">
              <input
                type="radio"
                value="Фил.лицо"
                name="person-type"
                defaultChecked
              />
              <div className="radio__checkmark"></div>
              <div className="radio__body">Фил.лицо</div>
            </label>
            <label className="cart-result-form__radio radio">
              <input type="radio" value="Юр.лицо" name="person-type" />
              <div className="radio__checkmark"></div>
              <div className="radio__body">Юр.лицо</div>
            </label>
          </div>

          <div className="cart-result-form__delivery">
            <div className="cart-result-form__subtitle">
              Транспортные компании:
            </div>
            <ul className="cart-result-form__delivery-list">
              <li className="cart-result-form__delivery-item">
                <label className="cart-result-form__checkbox">
                  <input type="checkbox" value="СДЭК" name="delivery-methods" />
                  <div className="cart-result-form__checkbox-checkmark"></div>
                  <div className="cart-result-form__checkbox-body">
                    <img src="/img/icons/company/cdek.png" alt="" />
                  </div>
                </label>
              </li>
              <li className="cart-result-form__delivery-item">
                <label className="cart-result-form__checkbox">
                  <input
                    type="checkbox"
                    value="Деловые линии"
                    name="delivery-methods"
                  />
                  <div className="cart-result-form__checkbox-checkmark"></div>
                  <div className="cart-result-form__checkbox-body">
                    <img src="/img/icons/company/delovie-linii.png" alt="" />
                  </div>
                </label>
              </li>
              <li className="cart-result-form__delivery-item">
                <label className="cart-result-form__checkbox">
                  <input type="checkbox" value="ПЭК" name="delivery-methods" />
                  <div className="cart-result-form__checkbox-checkmark"></div>
                  <div className="cart-result-form__checkbox-body">
                    <img src="/img/icons/company/pek.png" alt="" />
                  </div>
                </label>
              </li>
              <li className="cart-result-form__delivery-item">
                <label className="cart-result-form__checkbox">
                  <input
                    type="checkbox"
                    value="Энергия"
                    name="delivery-methods"
                  />
                  <div className="cart-result-form__checkbox-checkmark"></div>
                  <div className="cart-result-form__checkbox-body">
                    <img src="/img/icons/company/energiya.png" alt="" />
                  </div>
                </label>
              </li>
              <li className="cart-result-form__delivery-item">
                <label className="cart-result-form__checkbox">
                  <input
                    type="checkbox"
                    value="Другая"
                    name="delivery-methods"
                  />
                  <div className="cart-result-form__checkbox-checkmark"></div>
                  <div className="cart-result-form__checkbox-body">
                    <img src="/img/icons/company/other.png" alt="" />
                  </div>
                </label>
              </li>
            </ul>
          </div>
        </div>
      </div>

      <button type="submit" className="button cart-result-form__button">
        <img src="/img/icons/buy.svg" alt="" />
        Отправить
      </button>
    </form>
  )
}
