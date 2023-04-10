import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';
import { Post } from '../../core/models/post.model';
import { PostService } from '../../core/services/post.service';
import { Observable } from 'rxjs';
import { vmFromLatest } from '../../core/utils/operators.util';
import { Store, select } from '@ngrx/store';
import { getPosts, sortingPost } from '../../core/store/post/post.actions';
import {
  postsSelector,
  postStatusSelector,
  postSortingSelector,
} from '../../core/store/post/post.selector';
import { AppState } from '../../core/store/app.state';
import { map, first } from 'rxjs/operators';
import { FormControl } from '@angular/forms';
import { RouterModule, Routes, ActivatedRoute, Router } from '@angular/router';

interface PostListVm {
  posts: Post[];
  isLoading: boolean;
  sort?: 'asc' | 'desc';
}

@Component({
  selector: 'app-post-list',
  templateUrl: './post-list.component.html',
  styles: [
    `
      .sorting {
        min-width: 250px;
      }
    `,
  ],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class PostListComponent implements OnInit {
  vm$: Observable<PostListVm>;

  sortCtrl = new FormControl(null);

  // params = this.router.snapshot.params['id'];

  constructor(
    private store: Store<AppState>,
    private router: Router
  ) {}

  ngOnInit(): void {
    // console.log('params: ', this.params);
    // TODO: selector and dispatch
    this.store.dispatch(getPosts());

    this.vm$ = vmFromLatest<PostListVm>({
      posts: this.store.pipe(select(postsSelector)),
      sort: this.store.pipe(select(postSortingSelector)),
      isLoading: this.store.pipe(
        select(postStatusSelector),
        map((status) => {
          console.log('status: ', status);
          return status === 'loading'
        })
      ),
    });

    console.log('posts: ', this.vm$);

    this.vm$.subscribe((vm) => {
      console.log('vm: ', vm);
      this.sortCtrl.setValue(vm.sort, { emitEvent: false });
    });
    // valueChanges sẽ chạy mỗi khi dropdown có sự thay đổi giá trị nhưng phần phía trên chỉ chạy khi state có sự thay đổi
    this.sortCtrl.valueChanges.subscribe((value) => {
      console.log('value: ', value);
      this.setSorting(value)
    });
  }

  setSorting(order: 'asc' | 'desc') {
    console.log('order: ', order);
    this.store.dispatch(sortingPost({ sort: order }));
  }

  move(id: any) {
    console.log('id NAM CAO: ', id);
    this.router.navigateByUrl(`/post/${id}`);
  }
}
