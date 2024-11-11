import { FC } from 'react';
import { Paper } from '@/components/Paper';
import { Calendar } from '@/components/Calendar';
import { useParams } from 'react-router-dom';

const DoctorCalendar: FC = () => {
    const { id } = useParams<{ id: string }>();

    console.log(id);

    return (
        <Paper>
            <Calendar events={[]} />
        </Paper>
    );
};

export default DoctorCalendar;
