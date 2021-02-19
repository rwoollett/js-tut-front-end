declare namespace LabshomeScssNamespace {
  export interface ILabshomeScss {
    author: string;
    banner: string;
    card: string;
    container: string;
    footer: string;
    "home-nav": string;
    "navbar-minimal": string;
    next: string;
    popular: string;
    "popular-labs": string;
    post: string;
    "post-content": string;
    posts: string;
    "posts-content": string;
    "posts-list": string;
    "search-bar": string;
    top: string;
  }
}

declare const LabshomeScssModule: LabshomeScssNamespace.ILabshomeScss & {
  /** WARNING: Only available when `css-loader` is used without `style-loader` or `mini-css-extract-plugin` */
  locals: LabshomeScssNamespace.ILabshomeScss;
};

export = LabshomeScssModule;
