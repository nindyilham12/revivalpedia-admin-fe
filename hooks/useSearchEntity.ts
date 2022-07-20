import { useCallback, useReducer } from 'react';

enum ActionTypes {
  LOADING,
  RESULTS,
  UPDATE_PARAMS,
}

/**
 * Generic Info:
 * T = Query
 * U = Results
 */

export type SearchAction<T, U> =
  | {
      type: ActionTypes.LOADING;
      value: boolean;
    }
  | {
      type: ActionTypes.RESULTS;
      value: U;
    }
  | {
      type: ActionTypes.UPDATE_PARAMS;
      value: Partial<T>;
    };

export type SearchState<T, U> = {
  params: T;
  results: U;
  isLoading: boolean;
};

const reducer = <T, U>(state: SearchState<T, U>, action: SearchAction<T, U>): SearchState<T, U> => {
  switch (action.type) {
    case ActionTypes.LOADING:
      return { ...state, isLoading: action.value };
    case ActionTypes.UPDATE_PARAMS:
      return { ...state, params: { ...state.params, ...action.value } };
    case ActionTypes.RESULTS:
      return { ...state, results: action.value };
    default:
      return state;
  }
};

interface ISearchEntity<T, U> {
  initialState: SearchState<T, U>;
  onQueryUpdate: (
    query: SearchState<T, U>['params'],
  ) => SearchState<T, U>['results'] | Promise<SearchState<T, U>['results']>;
}

export const useSearchEntity = <T, U>({ initialState, onQueryUpdate }: ISearchEntity<T, U>) => {
  const [state, dispatch] = useReducer<
    (state: SearchState<T, U>, action: SearchAction<T, U>) => SearchState<T, U>
  >(reducer, initialState);

  const onQueryUpdateCallback = useCallback(
    async (params: T) => {
      dispatch({ type: ActionTypes.LOADING, value: true });

      const results = await onQueryUpdate(params);

      dispatch({ type: ActionTypes.RESULTS, value: results });
      dispatch({ type: ActionTypes.LOADING, value: false });
    },
    [onQueryUpdate],
  );

  const updateQuery = (value: Partial<SearchState<T, U>['params']>) => {
    dispatch({ type: ActionTypes.UPDATE_PARAMS, value });
    onQueryUpdateCallback({ ...state.params, ...value });
  };

  const updateResults = (value: U) => {
    dispatch({ type: ActionTypes.RESULTS, value });
  };

  const resetResults = useCallback(() => {
    dispatch({ type: ActionTypes.RESULTS, value: initialState.results });
  }, [initialState.results]);

  return {
    state,
    resetResults,
    updateQuery,
    updateResults,
  };
};
