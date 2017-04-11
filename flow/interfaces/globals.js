declare var window: {
  location: Object,
}

export type Url = {
  href: string,
  protocol?: string,
  slashes?: boolean,
  host?: string,
  auth?: string,
  hostname?: string,
  port?: string,
  pathname?: string,
  search?: string,
  path?: string,
  query?: Object,
  hash?: string,
}
