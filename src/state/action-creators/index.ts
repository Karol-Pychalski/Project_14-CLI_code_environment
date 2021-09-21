import { Dispatch } from 'redux'; //video 228
import { ActionType } from '../action-types';
import {
  UpdateCellAction,
  DeleteCellAction,
  MoveCellAction,
  InsertCellAfterAction,
  BundleStartAction,
  BundleCompleteAction,
  Direction,
  Action,
} from '../actions';
import { CellTypes } from '../cell'; //necessary to set type in insertCellBefore - video 189
import bundle from '../../bundler'; //video 228

//adding types here is not obligatory but will help TS to understand what kind of value will be returned
//this is updateCell action creator implementation (video 189):
export const updateCell = (id: string, content: string): UpdateCellAction => {
  return {
    type: ActionType.UPDATE_CELL,
    payload: {
      id,
      content,
    },
  };
};

export const deleteCell = (id: string): DeleteCellAction => {
  return {
    type: ActionType.DELETE_CELL,
    payload: id,
  };
};

export const moveCell = (id: string, direction: Direction): MoveCellAction => {
  return {
    type: ActionType.MOVE_CELL,
    payload: {
      id,
      direction,
    },
  };
};

export const insertCellAfter = (
  id: string | null,
  cellType: CellTypes
): InsertCellAfterAction => {
  return {
    type: ActionType.INSERT_CELL_AFTER,
    payload: {
      id,
      type: cellType,
    },
  };
};

//createBundle is an action creator
//input (argument) is a code typed by user to code editor - this is what we want to feed into bundle function
//from first function we return another function called dispatch
//here is as well redux thunk covered
export const createBundle = (cellId: string, input: string) => {
  return async (dispatch: Dispatch<Action>) => {
    dispatch({
      type: ActionType.BUNDLE_START,
      payload: {
        cellId,
      },
    });

    //kicking off bundling process
    const result = await bundle(input);

    //once we get the result (above) we can dispatch second action (bundle_complete):
    dispatch({
      type: ActionType.BUNDLE_COMPLETE,
      payload: {
        cellId,
        bundle: result,
      },
    });
  };
};
