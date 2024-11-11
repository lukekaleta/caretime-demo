export interface Clients {
    id: string;
    firstName: string;
    lastName: string;
    dateOfBirth: string; // remove
    birthNumber: number;
    gender: 'M' | 'F' | 'O';
    email: string;
    phone: string;
    address: {
        street: string;
        city: string;
        zip: string;
    };
    insuranceCompany: string; // remove
    insuranceNumber: number; // remove
    maritalStatus: string; // remove
    registrationDate: Date;
    emergencyContact: {
        // remove
        name: string;
        relationship: string;
        phone: string;
    };
    allergies: string[]; // remove
    bloodType: string; // remove
    chronicDiseases: string[]; // remove
    weight: number; // remove
    height: number; // remove
    visitHistory: {
        date: Date;
        reason: string;
        doctor: string;
    }[];
    notes: string; // upravit
    children: number; // remove
    status: 'active' | 'inactive' | 'deceased';
    profilePicture: string;
}
