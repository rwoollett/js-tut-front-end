export interface ReactionEmoji {
  [key: string] : string;
}
export interface ReactionEmojiCount {
  [key: string] : number;
}

//export enum ReactEmojis { "thumbsUp", "hooray", "heart", "rocket", "eyes"};
export interface ReactionCount {
  thumbsUp: number;
  hooray: number;
  heart: number;
  rocket: number;
  eyes: number;
}