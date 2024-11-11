import { IDoctor } from '@/interfaces/Doctor';

export interface IDoctorsState {
    isFetchingDoctors: boolean;

    doctors: IDoctor[];
    fetchDoctors: () => Promise<void>;
}
