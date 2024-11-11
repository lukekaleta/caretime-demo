import { Box, Paper, Tab } from '@mui/material';
import { ChangeEvent, FC, useState } from 'react';
import { styled } from '@mui/material/styles';
import { TabContext, TabList, TabPanel } from '@mui/lab';
import {
    AppGeneralSettings,
    AppNotificationsSettings,
    AppSecuritySettings,
    AppSuperAdminSettings,
} from '@/components/AppSettings';

const StyledTabPanel = styled(TabPanel)(() => ({
    paddingLeft: '0 !important',
    paddingRight: '0 !important',
}));

const AppSettings: FC = () => {
    const [value, setValue] = useState<string>('general');
    const handleChangeTab = (event: ChangeEvent<{}>, newValue: string) => {
        setValue(newValue);
    };

    const tabsList = [
        {
            label: 'Obecné',
            value: 'general',
        },
        {
            label: 'Zapezpečení',
            value: 'security',
        },
        {
            label: 'Notifikace',
            value: 'notifications',
        },
    ];

    const tabPanels = [
        {
            value: 'general',
            content: <AppGeneralSettings />,
        },
        {
            value: 'security',
            content: <AppSecuritySettings />,
        },
        {
            value: 'notifications',
            content: <AppNotificationsSettings />,
        },
        {
            value: 'super-admin',
            content: <AppSuperAdminSettings />,
        },
    ];

    return (
        <Paper sx={{ width: '100%', p: 4, boxShadow: 'none' }}>
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

export default AppSettings;
