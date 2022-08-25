import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { actions } from '../app/store';
import {
  codesIncomeBanks,
  codesIncomeCash,
  codesIncomeCrypto,
  codesIncomePS,
} from '../data/codes';

const Income = () => {
  const dispatch = useDispatch();
  let incomeDirections = useSelector((state) => state.incomeDirections);

  const toggleActive = (e) => {
    document.querySelectorAll('.active')[1].classList.remove('active');
    e.target.classList.add('active');
  };

  return (
    <section className='income-container'>
      <h4 className='title'>Получаете</h4>
      <button
        className='category-button active default-active'
        onClick={(e) => {
          toggleActive(e);
          dispatch(actions.filterIncome());
        }}
      >
        Все
      </button>
      <button
        className='category-button'
        onClick={(e) => {
          toggleActive(e);
          dispatch(actions.secondaryFilterIncome(codesIncomeCrypto));
        }}
      >
        Криптовалюты
      </button>
      <button
        className='category-button'
        onClick={(e) => {
          toggleActive(e);
          dispatch(actions.secondaryFilterIncome(codesIncomeCash));
        }}
      >
        Наличные
      </button>
      <button
        className='category-button'
        onClick={(e) => {
          toggleActive(e);
          dispatch(actions.secondaryFilterIncome(codesIncomeBanks));
        }}
      >
        Банки
      </button>
      <button
        className='category-button'
        onClick={(e) => {
          toggleActive(e);
          dispatch(actions.secondaryFilterIncome(codesIncomePS));
        }}
      >
        Платежные системы
      </button>
      <div>
        <input
          type='text'
          placeholder='365446.37-17730493.62'
          className='input'
        />
        <select className='select'>
          {incomeDirections.map((filteredDirection, index) => {
            return (
              <option
                key={filteredDirection.code + index}
                value={filteredDirection.code}
              >
                {filteredDirection.name}
              </option>
            );
          })}
        </select>
      </div>
    </section>
  );
};

export default Income;
