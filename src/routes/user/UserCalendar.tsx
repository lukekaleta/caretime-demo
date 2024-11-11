import { Calendar } from '@/components/Calendar';
import { Paper } from '@/components/Paper';
import useUserStore from '@/stores/userStore';
import { FC } from 'react';

const UserCalendar: FC = () => {
    const { userData } = useUserStore()

    return (
        <Paper>
            <Calendar userId={userData?.id} />
        </Paper>
    );
};

export default UserCalendar;
