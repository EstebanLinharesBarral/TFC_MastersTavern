// services/SheetService.js

class SheetService {
    calculateAttribute(atribute, prof = 0){
        atribute = Number.parseInt(atribute);
        prof = Number.parseInt(prof)
    
        atribute = isNaN(atribute) ? 0 : atribute;
        prof = isNaN(prof) ? 0 : prof;
        return Math.trunc((atribute - 10)/2) + prof;
    }
}

export const sheetService = new SheetService();