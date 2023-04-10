import { Injectable } from '@angular/core';
import { createEffect, ofType, Actions } from '@ngrx/effects';
import { mergeMap, map, catchError } from 'rxjs/operators';
import { of } from 'rxjs';
import { PostService } from '../../services/post.service';
import * as PostDetailActions from './post-detail.actions';

@Injectable()
export class PostEffects {

  loadPosts$ = createEffect(() => this.actions$.pipe(
    ofType(PostDetailActions.getPost),
    mergeMap((action) => {
      console.log('cao nam');
      console.log('action: ', action.id);
      return this.postService.getPostById('1')
    }),
    map(item => {
      return PostDetailActions.getPostSuccess({ item })
    }),
    catchError(error => {
      return of(PostDetailActions.getPostFailed({ error }))
    })
  ));

  constructor(
    private actions$: Actions,
    private postService: PostService,
  ) { }
}
