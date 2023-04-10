import { Injectable } from '@angular/core';
import { createEffect, ofType, Actions } from '@ngrx/effects';
import { mergeMap, map, catchError } from 'rxjs/operators';
import { of } from 'rxjs';
import { PostService } from '../../services/post.service';
import * as postActions from './post.actions';
import { mapTimeStamp } from '../../utils/operators.util';

@Injectable()
export class PostEffects {

  loadPosts$ = createEffect(() => this.actions$.pipe(
    ofType(postActions.getPosts),
    mergeMap(() => {
      console.log('huhu');
      return this.postService.getPosts()
    }),
    // mapTimeStamp(),
    map(posts => {
      console.log('posts: ', posts);
      return postActions.getPostsSuccess({ posts })
    }),
    catchError(error => {
      console.log('error: ', error);
      return of(postActions.getPostsFailed({ error }))
    })
  ));

  loadPost$ = createEffect(() => this.actions$.pipe(
    ofType(postActions.getPost),
    mergeMap((action) => {
      console.log('cao nam');
      console.log('action: ', action.id);
      return this.postService.getPostById(action.id);
    }),
    map(item => {
      return postActions.getPostSuccess({ item })
    }),
    catchError(error => {
      return of(postActions.getPostFailed({ error }))
    })
  ));

  constructor(
    private actions$: Actions,
    private postService: PostService,
  ) { }
}
