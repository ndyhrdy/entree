import { CancelToken, isCancel } from "axios";
import {
  PURCHASES_FETCH,
  PURCHASES_SET_FETCH_ERROR,
  PURCHASES_POPULATE,
  PURCHASES_PUSH
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

export const pushPurchase = purchase => ({
  type: PURCHASES_PUSH,
  purchase
});
