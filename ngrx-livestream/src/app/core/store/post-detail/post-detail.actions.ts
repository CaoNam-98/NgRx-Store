import { createAction, props, ActionType } from '@ngrx/store';
import { Post } from '../../models/post.model';

export const GET_POST = '@Post/Get';
export const GET_POST_SUCCESS = '@Post/GetSuccess';
export const GET_POST_FAILED = '@Post/GetFailed';

export const getPost = createAction(GET_POST, props<{ id: string }>());
export const getPostSuccess = createAction(GET_POST_SUCCESS, props<{ item: Post }>());
export const getPostFailed = createAction(GET_POST_FAILED, props<{ error?: string }>());

export type PostDetailActions =
  | ActionType<typeof getPost>
  | ActionType<typeof getPostSuccess>
  | ActionType<typeof getPostFailed>
