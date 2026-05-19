// services/SheetService.js

class SheetService {
    calculateAttribute(atribute, prof = 0){
        atribute = Number.parseInt(atribute);
        prof = Number.parseInt(prof)
        return Math.trunc((atribute - 10)/2) + prof;
    }
}

export const sheetService = new SheetService();