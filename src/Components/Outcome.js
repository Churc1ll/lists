import React, { useEffect, useRef } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { actions } from '../app/store';
import {
  codesOutcomeBanks,
  codesOutcomeCash,
  codesOutcomeCrypto,
} from '../data/codes';

const Outcome = () => {
  const dispatch = useDispatch();
  let currentState = useSelector((state) => state.directions);
  let value = useRef(null);
  useEffect(() => {
    value.current = document.querySelector('#outcome');
    document.querySelectorAll('select').forEach((tag) => {
      tag.selectedIndex = 0;
    });
  });
  const toggleActive = (e) => {
    document.querySelectorAll('.active').forEach((el) => {
      el.classList.remove('active');
    });
    e.target.classList.add('active');
    document.querySelector('.default-active').classList.add('active');
  };
  const toggleDefaultActive = () => {
    document.querySelectorAll('.active')[1].classList.remove('active');
    document.querySelector('.default-active').classList.add('active');
  };

  return (
    <section className='outcome-container'>
      <h4 className='title'>Отдаете</h4>
      <button
        className='category-button active'
        onClick={(e) => {
          toggleActive(e);
          dispatch(actions.showAll());
          dispatch(actions.newValue('BTC'));
          dispatch(actions.filterIncome());
        }}
      >
        Все
      </button>
      <button
        className='category-button'
        onClick={(e) => {
          toggleActive(e);
          dispatch(actions.filterOutcome(codesOutcomeCrypto));
          dispatch(actions.newValue('BTC'));
          dispatch(actions.filterIncome());
        }}
      >
        Криптовалюты
      </button>
      <button
        className='category-button'
        onClick={(e) => {
          toggleActive(e);
          dispatch(actions.filterOutcome(codesOutcomeCash));
          dispatch(actions.newValue('CASHUSD'));
          dispatch(actions.filterIncome());
        }}
      >
        Наличные
      </button>
      <button
        className='category-button'
        onClick={(e) => {
          toggleActive(e);
          dispatch(actions.filterOutcome(codesOutcomeBanks));
          dispatch(actions.newValue('ACRUB'));
          dispatch(actions.filterIncome());
        }}
      >
        Банки
      </button>
      <div>
        <input type='text' placeholder='0.24891-12.061' className='input' />
        <select
          id='outcome'
          className='select'
          onChange={() => {
            toggleDefaultActive();
            dispatch(actions.newValue(value.current.value));
            dispatch(actions.filterIncome());
          }}
        >
          {currentState.map((direction, index) => {
            return (
              <option key={direction.code + index} value={direction.code}>
                {direction.name}
              </option>
            );
          })}
        </select>
      </div>
    </section>
  );
};

export default Outcome;
