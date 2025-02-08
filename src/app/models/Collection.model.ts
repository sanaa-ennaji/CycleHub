import {Status } from './Status.enum' ;
import { WasteType } from './WasteType.enum';
export interface Collection {
    id: string;
    userId?: string;  
    wasteType: WasteType;
    photos?: string[];
    estimatedWeight: number;
    Address: string;
    Date: string;
    TimeSlot: string;
    additionalNotes?: string;
    status: Status;  
  }
  