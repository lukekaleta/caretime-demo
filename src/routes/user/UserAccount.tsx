import { Paper } from '@/components/Paper';
import UserAccountNotifications from '@/components/User/UserAccountNotifications';
import UserAccountProfile from '@/components/User/UserAccountProfile';
import UserAccountSecurity from '@/components/User/UserAccountSecurity';
import { TabContext, TabList, TabPanel } from '@mui/lab';
import { Box, Tab } from '@mui/material';
import { styled } from '@mui/material/styles';
import { ChangeEvent, FC, useState } from 'react';
import { useTranslation } from 'react-i18next';

const StyledTabPanel = styled(TabPanel)(() => ({
    paddingLeft: '0 !important',
    paddingRight: '0 !important',
}));

const UserAccount: FC = () => {
    const [value, setValue] = useState<string>('profile');

    const handleChangeTab = (_: ChangeEvent<{}>, newValue: string) => {
        setValue(newValue);
    };

    const { t } = useTranslation('user');

    const tabsList = [
        {
            label: t('Profile'),
            value: 'profile',
        },
        {
            label: t('Security'),
            value: 'security',
        },
        {
            label: t('Notifications'),
            value: 'notifications',
        },
    ];

    const tabPanels = [
        {
            value: 'profile',
            content: <UserAccountProfile />,
        },
        {
            value: 'security',
            content: <UserAccountSecurity />,
        },
        {
            value: 'notifications',
            content: <UserAccountNotifications />,
        },
    ];

    return (
        <Paper>
            <Box sx={{ width: '100%' }}>
                <TabContext value={value}>
                    <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
                        <TabList
                            onChange={handleChangeTab}
                            textColor="primary"
                            indicatorColor="primary"
                            aria-label="settings tabs"
                        >
                            {tabsList.map((tab, index) => (
                                <Tab
                                    key={index}
                                    label={tab.label}
                                    value={tab.value}
                                />
                            ))}
                        </TabList>
                    </Box>

                    {tabPanels.map((tabPanel, index) => (
                        <StyledTabPanel
                            key={index}
                            value={tabPanel.value}
                            sx={{ p: 3 }}
                        >
                            {tabPanel.content}
                        </StyledTabPanel>
                    ))}
                </TabContext>
            </Box>
        </Paper>
    );
};

export default UserAccount;
