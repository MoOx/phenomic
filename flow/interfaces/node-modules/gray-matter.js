type GrayMatterResult = {
  orig: string,
  data: Object,
  content: string
};

declare module "gray-matter" {
  declare var exports: (string: string) => GrayMatterResult;
}
