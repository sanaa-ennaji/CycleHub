import {Status } from './Status.enum' ;
import { WasteType } from './WasteType.enum';
export interface Collection {
    id: string;
    userId: string;  
    wasteType: WasteType;
    photos?: string[];
    estimatedWeight: number;
    collectionAddress: string;
    collectionDate: string;
    collectionTimeSlot: string;
    additionalNotes?: string;
    status: Status;  
  }