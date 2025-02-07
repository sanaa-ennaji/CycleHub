export interface Collection {
    id: string; 
    wasteType: 'plastique' | 'verre' | 'papier' | 'metal';
    photos?: string[];
    estimatedWeight: number;
    collectionAddress: string;
    collectionDate: string; 
    collectionTimeSlot: string; 
    additionalNotes?: string; 
    status: 'en attente' | 'confirmée' | 'annulée'; 
  }