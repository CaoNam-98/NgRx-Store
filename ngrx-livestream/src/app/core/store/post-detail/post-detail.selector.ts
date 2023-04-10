import { createFeatureSelector, createSelector } from '@ngrx/store';
import { PostDetailState } from './post-detail.state';

const featurePostDetail = createFeatureSelector<PostDetailState>('feature_postDetail');

export const postDetailSelector = createSelector(featurePostDetail, state => state.itemDetail);
export const postStatusSelector = createSelector(featurePostDetail, state => state.status);
