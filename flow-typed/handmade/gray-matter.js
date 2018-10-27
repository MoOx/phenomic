type GrayMatterResult = {
  orig: string,
  data: Object,
  content: string,
};

declare module "gray-matter" {
  declare module.exports: (string: string) => GrayMatterResult;
}
