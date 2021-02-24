declare namespace LabshomeScssNamespace {
  export interface ILabshomeScss {
    author: string;
    badge: string;
    banner: string;
    "button-container": string;
    card: string;
    container: string;
    footer: string;
    "home-nav": string;
    "is-new": string;
    load3: string;
    loader: string;
    "navbar-minimal": string;
    next: string;
    notification: string;
    "notifications-list": string;
    popular: string;
    "popular-labs": string;
    post: string;
    "post-content": string;
    posts: string;
    "posts-content": string;
    "posts-list": string;
    reaction: string;
    "reaction-button": string;
    "search-bar": string;
    timestamp: string;
    top: string;
    "user-card": string;
    users: string;
  }
}

declare const LabshomeScssModule: LabshomeScssNamespace.ILabshomeScss & {
  /** WARNING: Only available when `css-loader` is used without `style-loader` or `mini-css-extract-plugin` */
  locals: LabshomeScssNamespace.ILabshomeScss;
};

export = LabshomeScssModule;
