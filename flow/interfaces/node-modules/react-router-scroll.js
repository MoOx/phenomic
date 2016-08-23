type useScroll =
  (shouldUpdateScroll?: () => boolean | Array<number>) => Function

declare module "react-router-scroll" {
  declare var exports: useScroll;
}

declare module "react-router-scroll/lib/useScroll" {
  declare var exports: useScroll
}
