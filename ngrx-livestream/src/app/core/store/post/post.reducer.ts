import { createReducer, on } from '@ngrx/store';
import { PostState } from './post.state';
import * as PostActions from './post.actions';
import { orderBy } from 'lodash-es';
import * as _ from 'lodash';

const initialState: PostState = {
  items: [],
  currentItem: null,
  status: 'idle',
  error: '',
  sort: null,
};

const _reducer = createReducer(
  // initial state:
  initialState,
  // TODO: update `addressField`:
  on(PostActions.getPosts, (state) => {
    return { ...state, status: 'loading' };
  }),
  on(PostActions.getPostsSuccess, (state, { posts }) => {
    const sortOrder = state.sort;
    console.log('sortOrder: ', sortOrder);
    if (sortOrder) {
      posts = orderBy([...posts], ['createdAt'], [sortOrder]);
    }
    return { ...state, status: 'idle', items: posts, error: '' };
  }),
  on(PostActions.getPostsFailed, (state, { error }) => {
    console.log('nam cao');
    return { ...state, status: 'error', items: [], error: error };
  }),
  on(PostActions.sortingPost, (state, { sort }) => {
    // state.items: get data into store
    let items = _.sortBy(state.items, ['id'], [sort])
    console.log('items: ', items);
    return { ...state, items };
  }),
  on(PostActions.getPostSuccess, (state, { item }) => {
    console.log('SUCCESS');
    return { ...state, status: 'idle', currentItem: item, error: '' };
  }),
  on(PostActions.getPostFailed, (state, { error }) => {
    return { ...state, status: 'error', currentItem: null, error: error };
  })
);

export function postReducer(state, action) {
  console.log('hiu hiu: ', state, action);
  return _reducer(state, action);
}

// export function postReducer(
//   state: PostState = initialState,
//   action: PostActions.PostActions
// ): PostState {
//   console.log('go go: ', action);
//   switch (action.type) {
//     case PostActions.GET_POSTS:
//       return { ...state, status: 'loading' };
//     case PostActions.GET_POSTS_SUCCESS: {
//       let items = action.posts;
//       console.log('items: ', items);
//       const sortOrder = state.sort;
//       console.log('sortOrder: ', sortOrder);
//       if (sortOrder) {
//         items = orderBy([...items], ['createdAt'], [sortOrder]);
//       }
//       console.log({ ...state, status: 'idle', items, error: '' });
//       return { ...state, status: 'idle', items, error: '' };
//     }
//     case PostActions.GET_POSTS_FAILED:
//       return { ...state, status: 'error', items: [], error: action.error };
//     case PostActions.GET_POST:
//       return { ...state, status: 'loading' };
//     case PostActions.GET_POST_SUCCESS:
//       return { ...state, status: 'idle', currentItem: action.item };
//     case PostActions.GET_POST_FAILED:
//       return {
//         ...state,
//         status: 'error',
//         currentItem: null,
//         error: action.error,
//       };
//     case PostActions.SORTING_POSTS: {
//       let items = state.items;
//       console.log('hiu hiu 1: ', items);
//       const sortOrder = !action.sort
//         ? null
//         : action.sort === 'asc'
//         ? 'asc'
//         : 'desc';
//       if (sortOrder) {
//         items = orderBy([...items], ['createdAt'], [sortOrder]);
//       }
//       return {
//         ...state,
//         items,
//         sort: action.sort,
//       };
//     }
//     default:
//       return state;
//   }
// }
