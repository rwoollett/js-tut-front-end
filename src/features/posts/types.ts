import { ReactionEmojiCount } from '../types';
import '../types';

export interface Post {
  id: string;
  date: string;
  title: string;
  content: string;
  user: string;
  reactions: ReactionEmojiCount;
}

export interface ReactPost {
  postId: string;
  reaction: string;
}

export interface PostsState {
  entries: Post[];
  status: 'idle'|'loading'|'succeeded'|'failed';
  error: string | undefined;
}
