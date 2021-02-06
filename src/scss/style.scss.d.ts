declare namespace StyleScssNamespace {
  export interface IStyleScss {
    bold: string;
    element1: string;
    element2: string;
    element3: string;
    element4: string;
    element5: string;
    element6: string;
    large: string;
    small: string;
  }
}

declare const StyleScssModule: StyleScssNamespace.IStyleScss & {
  /** WARNING: Only available when `css-loader` is used without `style-loader` or `mini-css-extract-plugin` */
  locals: StyleScssNamespace.IStyleScss;
};

export = StyleScssModule;
