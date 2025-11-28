export interface GeneralErrorResponse {
    errorCode: string;
    errorMessages: Array<{
        field: string;
        message: string;
    }>;
}

export interface Activity {
    id: string;
    title: string;
    personName: string; //
    currentAttendees: number;
    maxAttendees: number;
    date: Date; 
    createdAt: Date;
    description: string;
    location: string;
    
}


export interface person {
    name: string;
}