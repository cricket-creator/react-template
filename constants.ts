import path from "path";

export enum EnvMode {
  PRODUCTION = "production",
  DEVELOPMENT = "development",
}

export const PUBLIC_PATH = path.join(__dirname, "public");
export const SRC_PATH = path.join(__dirname, "src");
export const OUTPUT_PATH = path.join(__dirname, "dist");

export const SHARED_STYLES = ["vars.scss", "mixins.scss"];
