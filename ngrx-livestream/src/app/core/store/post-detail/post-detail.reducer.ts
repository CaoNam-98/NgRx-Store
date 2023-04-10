import { createReducer, on } from '@ngrx/store';
import { PostDetailState } from './post-detail.state';
import * as PostDetailActions from './post-detail.actions';
import * as _ from 'lodash';

const initialState: PostDetailState = {
  itemDetail: null,
  status: 'idle',
  error: '',
};

const _reducer = createReducer(
  // initial state:
  initialState,
  // TODO: update `addressField`:
  on(PostDetailActions.getPost, (state) => {
    return { ...state, status: 'loading' };
  }),
  on(PostDetailActions.getPostSuccess, (state, { item }) => {
    return { ...state, status: 'idle', itemDetail: item, error: '' };
  }),
  on(PostDetailActions.getPostFailed, (state, { error }) => {
    console.log('nam cao');
    return { ...state, status: 'error', itemDetail: {}, error: error };
  }),
);

export function postDetailReducer(state, action) {
  return _reducer(state, action);
}
