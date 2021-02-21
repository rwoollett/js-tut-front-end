import { ReactionEmojiCount } from '../types';

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

export interface PostState {
  posts: Post[]
}
