import { CancelToken, isCancel } from "axios";

import {
  SUPPLIERS_FETCH,
  SUPPLIERS_POPULATE,
  SUPPLIERS_SET_FETCH_ERROR,
  SUPPLIERS_PUSH,
  SUPPLIERS_REMOVE
} from "./types";
import api, { routes } from "@/api";

let cancelFetchSuppliersRequest;
export const fetchSuppliers = (force = false) => async (dispatch, getState) => {
  if (getState().suppliers.fetching && !force) {
    return;
  }
  cancelFetchSuppliersRequest && cancelFetchSuppliersRequest();
  dispatch({ type: SUPPLIERS_FETCH });
  try {
    const response = await api.get(routes.suppliers, {
      cancelToken: new CancelToken(c => (cancelFetchSuppliersRequest = c))
    });
    const { data: suppliers } = response.data;
    dispatch(populateSuppliers(suppliers));
    return Promise.resolve();
  } catch (error) {
    if (!isCancel(error)) {
      dispatch({
        type: SUPPLIERS_SET_FETCH_ERROR,
        error: error.response ? error.response.data : error
      });
    }
    return Promise.reject();
  }
};

export const populateSuppliers = suppliers => ({
  type: SUPPLIERS_POPULATE,
  suppliers
});

export const pushSupplier = supplier => ({
  type: SUPPLIERS_PUSH,
  supplier
});

export const removeSupplier = supplier => ({
  type: SUPPLIERS_REMOVE,
  supplier
});
