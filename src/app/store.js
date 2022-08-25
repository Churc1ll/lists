import { configureStore, createSlice } from '@reduxjs/toolkit';
import { directions, filter } from '../data/dataFromBackEnd';

const filterSlice = createSlice({
  name: 'filter',
  initialState: { directions, incomeDirections: filter[0].to, value: 'BTC' },

  reducers: {
    showAll(state) {
      state.directions = directions;
    },
    newValue(state, action) {
      state.value = action.payload;
    },
    filterOutcome(state, action) {
      state.directions = directions.filter((direction) => {
        return action.payload.includes(direction.code);
      });
    },
    filterIncome(state) {
      state.incomeDirections = filter.filter((direction) => {
        return direction.from.code === state.value;
      })[0].to;
    },
    secondaryFilterIncome(state, action) {
      state.incomeDirections = filter
        .filter((direction) => {
          return direction.from.code === state.value;
        })[0]
        .to.filter((direction) => {
          return action.payload.includes(direction.code);
        });
      if (state.incomeDirections.length === 0)
        state.incomeDirections = [
          {
            name: ' Нет предложений в данной категории',
          },
        ];
    },
  },
});

export const store = configureStore({
  reducer: filterSlice.reducer,
});
export const actions = filterSlice.actions;
