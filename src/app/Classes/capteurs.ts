import {Region} from './region';

export class Capteurs {
  public idcapt: bigint;
  public libelle: string;
  public etat: string;
  public dateinstall: Date;
  public marque: string;
  public region: Region;
}
