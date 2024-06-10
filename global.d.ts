declare module "*.module.css" {
  const styles: { [className: string]: string };
  export default styles;
}

declare module "*.module.scss" {
  const styles: { [className: string]: string };
  export default styles;
}

declare module "*.module.sass" {
  const styles: { [className: string]: string };
  export default styles;
}

declare const APPLICATION: string;
