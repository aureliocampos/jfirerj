export interface Client {
  name: string;
  /** arquivo em public/clientes/ */
  file: string;
}

export const clients: Client[] = [
  { name: "Vianense Supermercados", file: "logo_vianense.webp" },
  { name: "Bluefit", file: "logo_bluefit.webp" },
  { name: "Paineiras Corcovado", file: "logo_paineiras_corcovado.webp" },
  { name: "Drogarias Tamoio", file: "logo_drogarias_tamoio.webp" },
  { name: "Mr. Cat", file: "logo_mr_cat.webp" },
  { name: "Ibis", file: "logo_ibis.webp" },
  { name: "Localiza", file: "logo_localiza.webp" },
  { name: "Rio Pax", file: "logo_riopax.webp" },
  { name: "Famac Motobombas", file: "logo_famac.webp" },
  { name: "Skop", file: "logo_skop.webp" },
  { name: "Tupy", file: "logo_tupy.webp" },
];
