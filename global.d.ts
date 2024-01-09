declare module "*.module.css" {
  const classes: readonly { [key: string]: string };
  export default classes as const;
}

declare module "*.module.scss" {
  const classes: readonly { [key: string]: string };
  export default classNames as const;
}

declare module "*.module.sass" {
  const classes: readonly { [key: string]: string };
  export default classNames as const;
}

declare const APPLICATION: string;
