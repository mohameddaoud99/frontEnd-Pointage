export interface Block {
    idEtage: number,
    NomBlock: String,
    idBlock: number,
    nomEtage: String,
    salles: {
        Id: number,
        nom_salle: String,
    }
}