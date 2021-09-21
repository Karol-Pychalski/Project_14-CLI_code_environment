//video 226

import produce from 'immer';
import { ActionType } from '../action-types';
import { Action } from '../actions';

//BundlesState receives object as a value
//undefined andded and explained in video 230
interface BundlesState {
  [key: string]:
    | {
        loading: boolean;
        code: string;
        err: string;
      }
    | undefined;
}

//defining initial state object (epmty as default)
const initialState: BundlesState = {};

//defining actual reducer
//produce allows to do some manipulations/mutations of state object
//we set type to the object after 'Action):' because we use immer and TS would not understand what type it is
const reducer = produce(
  (state: BundlesState = initialState, action: Action): BundlesState => {
    switch (action.type) {
      case ActionType.BUNDLE_START:
        state[action.payload.cellId] = {
          loading: true,
          code: '',
          err: '',
        };
        return state;
      case ActionType.BUNDLE_COMPLETE:
        state[action.payload.cellId] = {
          loading: false,
          code: action.payload.bundle.code,
          err: action.payload.bundle.err,
        };
        return state;
      default:
        return state;
    }
  },
  initialState //solution from community to a problem of undefined in code-cell
);

export default reducer;
