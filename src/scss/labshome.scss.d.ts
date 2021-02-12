declare namespace LabshomeScssNamespace {
  export interface ILabshomeScss {
    banner: string;
    card: string;
    container: string;
    footer: string;
    "home-nav": string;
    next: string;
    popular: string;
    "popular-labs": string;
    "post-form": string;
    "search-bar": string;
    top: string;
  }
}

declare const LabshomeScssModule: LabshomeScssNamespace.ILabshomeScss & {
  /** WARNING: Only available when `css-loader` is used without `style-loader` or `mini-css-extract-plugin` */
  locals: LabshomeScssNamespace.ILabshomeScss;
};

export = LabshomeScssModule;
