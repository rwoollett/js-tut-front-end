//export type Emoji = "thumbsUp"|"hooray"|"heart"|"rocket"|"eyes";

export interface ReactionEmoji {
  [key: string]: string;
}
export interface ReactionEmojiCount {
  [key: string]: number;
}
interface ReactEnv {
  [key: string]: string;
}
declare global {
  interface Window {
    ENV?: ReactEnv;
  }
}
// export interface Window {
//   ENV?: ReactEnv;
// }

