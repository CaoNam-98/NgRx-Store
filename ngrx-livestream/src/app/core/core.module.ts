import { NgModule } from '@angular/core';
import { StoreModule } from '@ngrx/store';
import { postReducer } from './store/post/post.reducer';
import { postDetailReducer } from './store/post-detail/post-detail.reducer';
import { EffectsModule } from '@ngrx/effects';
import { PostEffects } from './store/post/post.effects';

@NgModule({
  imports: [
    StoreModule.forFeature('feature_post', postReducer),
    StoreModule.forFeature('feature_postDetail', postDetailReducer),
    EffectsModule.forFeature([PostEffects])
  ]
})
export class CoreModule {}
