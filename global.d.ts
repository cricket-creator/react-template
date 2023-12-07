declare module "*.module.css" {
  const classes: { [key: string]: string };
  export default classes as const;
}

declare module "*.module.scss" {
  const classes: { [key: string]: string };
  export default classNames as const;
}

declare const APPLICATION: string;
