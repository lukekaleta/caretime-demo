import { IDoctor } from '@/interfaces/Doctor';

export interface IDoctorState {
    isFetchingDoctorDetail: boolean;
    isUpdatingDoctorDetail: boolean;

    doctorDetail: IDoctor | null;

    fetchDoctorDetail: (doctorId: string) => Promise<void>;
    updateDoctorDetail: (
        doctorId: string,
        updatedDoctor: Partial<IDoctor>
    ) => Promise<void>;
}
