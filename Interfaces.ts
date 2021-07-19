import * as Decoder from "io-ts/Decoder";

export interface Repos {
  name: string
  url: string
}

export const Repos
  : Decoder.Decoder<unknown, Repos>
  = Decoder.lazy("Repos", () => Decoder.struct(
    { name: Decoder.string, url: Decoder.string }
  )
  );

export interface Contributor {
  login: string,
  contributions: number
}

export const Contributor: Decoder.Decoder<unknown, Contributor> = Decoder.lazy("Contributor", () => Decoder.struct({
  login: Decoder.string,
  contributions: Decoder.number,
}));

