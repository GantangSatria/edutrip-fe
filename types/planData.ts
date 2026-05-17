import { FasilitasIbadah } from "./fasilitasIbadah";
import { Hotel } from "./hotel";
import { RestoranHalal } from "./restoranHalal";
import { TokoOlehOleh } from "./tokoOlehOleh";
import { Wisata } from "./wisata";

export type PlanData = {
  wisata: Wisata[];
  hotel: Hotel[];
  restoran: RestoranHalal[];
  fasilitas_ibadah: FasilitasIbadah[];
  toko_oleh_oleh: TokoOlehOleh[];
};