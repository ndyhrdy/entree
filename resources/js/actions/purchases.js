import { CancelToken, isCancel } from "axios";
import {
  PURCHASES_FETCH,
  PURCHASES_SET_FETCH_ERROR,
  PURCHASES_POPULATE,
  PURCHASES_PUSH,
  PURCHASES_SEARCH,
  PURCHASES_SELECT,
  PURCHASES_FILL_SELECTION
} from "./types";
import api, { routes } from "@/api";

let cancelFetchRequest;
export const fetchPurchases = (force = false) => async (dispatch, getState) => {
  if (getState().purchases.fetching && !force) {
    return;
  }
  cancelFetchRequest && cancelFetchRequest();
  dispatch({ type: PURCHASES_FETCH });
  try {
    const response = await api.get(routes.purchases, {
      cancelToken: new CancelToken(c => (cancelFetchRequest = c))
    });
    const { data: purchases } = response.data;
    return dispatch(populatePurchases(purchases));
  } catch (error) {
    if (!isCancel(error)) {
      return dispatch({ type: PURCHASES_SET_FETCH_ERROR, error });
    }
  }
};

export const populatePurchases = purchases => ({
  type: PURCHASES_POPULATE,
  purchases
});

export const searchPurchases = term => ({
  type: PURCHASES_SEARCH,
  term
});

export const pushPurchase = purchase => ({
  type: PURCHASES_PUSH,
  purchase
});

export const selectPurchase = purchase => async (dispatch, getState) => {
  dispatch({ type: PURCHASES_SELECT, purchase });
  try {
    const response = await api.get(routes.purchases + "/" + purchase.id);
    const { data: completePurchase } = response.data;
    return dispatch(fillPurchaseSelection(completePurchase));
  } catch (error) {
    console.log(error);
  }
};

export const fillPurchaseSelection = purchase => ({
  type: PURCHASES_FILL_SELECTION,
  purchase
});
