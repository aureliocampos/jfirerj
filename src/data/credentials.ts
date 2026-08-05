import cbmerj from "../assets/credentials/cbmerj.jpg";
import caubr from "../assets/credentials/caubr.jpg";
import crearj from "../assets/credentials/crearj.jpg";

export interface Credential {
  name: string;
  image: ImageMetadata;
}

export const credentials: Credential[] = [
  { name: "CBMERJ", image: cbmerj },
  { name: "CAU/BR", image: caubr },
  { name: "CREA-RJ", image: crearj },
];
