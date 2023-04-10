import { Post } from '../../models/post.model';

export interface PostDetailState {
  itemDetail: Post,
  status: string,
  error: string
}
