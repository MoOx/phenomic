/* eslint-disable max-len */
// https://github.com/flowtype/flow-typed/tree/master/definitions/npm/react-helmet_v5.x.x

declare module "react-helmet" {
  declare type Props = {
    htmlAttributes?: Object,
    title?: string,
    defaultTitle?: string,
    titleTemplate?: string,
    base?: Object,
    meta?: Array<Object>,
    link?: Array<Object>,
    script?: Array<Object>,
    noscript?: Array<Object>,
    style?: Array<Object>,
    onChangeClientState?: (
      newState: Object,
      addedTags: Object,
      removeTags: Object
    ) => void | mixed
  };
  declare interface HeadAttribute {
    toString(): string,
    toComponent(): React$Element<any>
  }
  declare interface Head {
    base: HeadAttribute,
    bodyAttributes: HeadAttribute,
    htmlAttributes: HeadAttribute,
    link: HeadAttribute,
    meta: HeadAttribute,
    noscript: HeadAttribute,
    script: HeadAttribute,
    style: HeadAttribute,
    title: HeadAttribute
  }

  declare class Helmet extends React$Component<Props> {
    static renderStatic(): Head,
    props: Props
  }
  declare var exports: typeof Helmet;
}
