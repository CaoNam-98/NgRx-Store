import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';
import { Post } from '../../core/models/post.model';
import { PostService } from '../../core/services/post.service';
import { Observable } from 'rxjs';
import { vmFromLatest } from '../../core/utils/operators.util';
import { Store, select } from '@ngrx/store';
import { getPosts, sortingPost } from '../../core/store/post/post.actions';
import { getPost } from '../../core/store/post-detail/post-detail.actions';
import {
  postsSelector,
  postStatusSelector,
  postSortingSelector,
  currentPostSelector
} from '../../core/store/post/post.selector';
import { AppState } from '../../core/store/app.state';
import { map, first } from 'rxjs/operators';
import { FormControl } from '@angular/forms';
import { RouterModule, Routes, ActivatedRoute, Router } from '@angular/router';

interface PostVm {
  post: Post;
  isLoading: boolean
}
@Component({
  selector: 'app-post-detail',
  templateUrl: './post-detail.component.html',
  styles: [
  ],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class PostDetailComponent implements OnInit {
  vm$: Observable<PostVm>;
  // id = this.activatedRoute.snapshot.params['id'];
  id: String = '';

  constructor(
    private store: Store<AppState>, 
    private router: Router,
    private activatedRoute: ActivatedRoute
  ) { }

  ngOnInit(): void {
    // TODO: selector and dispatch
    // console.log('huhu 1111: ', this.id);
    this.activatedRoute.params.subscribe((param) => {
      this.id = param.id;
      this.store.dispatch(getPost({id: String(this.id)}));

      this.vm$ = vmFromLatest<PostVm>({
        post: this.store.pipe(select(currentPostSelector)),
        isLoading: this.store.pipe(
          select(postStatusSelector),
          map((status) => {
            console.log('status: ', status);
            return status === 'loading'
          })
        )
      });
    }, (error) => {
      console.log(error);
    })
    
  }

}
