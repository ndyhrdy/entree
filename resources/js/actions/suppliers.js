import { CancelToken, isCancel } from "axios";
import moment from "moment";

import {
  SUPPLIERS_FETCH,
  SUPPLIERS_POPULATE,
  SUPPLIERS_SET_FETCH_ERROR,
  SUPPLIERS_PUSH,
  SUPPLIERS_REMOVE,
  SUPPLIERS_SEARCH,
  SUPPLIERS_REPLACE
} from "./types";
import api, { routes } from "@/api";

let cancelFetchSuppliersRequest;
export const fetchSuppliers = (force = false) => async (dispatch, getState) => {
  if (
    getState().suppliers.fetching &&
    moment(getState().suppliers.lastLoadTimestamp).isAfter(
      moment().subtract(1, "hours")
    ) &&
    !force
  ) {
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

export const replaceSupplier = supplier => ({
  type: SUPPLIERS_REPLACE,
  supplier
});

export const searchSuppliers = term => ({
  type: SUPPLIERS_SEARCH,
  term
});
