declare module "*.css" {
  const styles: readonly { [className: string]: string };
  export default styles;
}

declare module "*.scss" {
  const styles: readonly { [className: string]: string };
  export default styles;
}

declare module "*.sass" {
  const styles: readonly { [className: string]: string };
  export default styles;
}

declare const APPLICATION: string;
