export interface AnneeUniv {
    idAnneeUnvi: number,
    title: String,
    start: Date,
    end: Date,
    startSemstre1: Date,
    endSemestre1: Date,
    startSemstre2: Date,
    endSemestre2: Date,
    events: [{
        id: number,
        title: String,
        start:Date,
        end:Date
    }]
}