import { Paper } from '@/components/Paper';
import {
    GeneralSettings,
    NotificationsSettings
} from '@/components/User/Settings@parts';
import { TabContext, TabList, TabPanel } from '@mui/lab';
import { Box, Tab } from '@mui/material';
import { ChangeEvent, useState } from 'react';
import { useTranslation } from 'react-i18next';

const UserSettings = () => {
    const [value, setValue] = useState<string>('general');

    const handleChangeTab = (event: ChangeEvent<{}>, newValue: string) => {
        setValue(newValue);
    };

    const { t } = useTranslation('user');

    const tabsList = [
        {
            label: t('General'),
            value: 'general',
        },
        {
            label: t('Notifications'),
            value: 'notifications',
        },
    ];

    const tabPanels = [
        {
            value: 'general',
            content: <GeneralSettings />,
        },
        {
            value: 'notifications',
            content: <NotificationsSettings />,
        },
    ];

    return (
        <Paper>
            <Box>
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
                        <TabPanel
                            key={index}
                            value={tabPanel.value}
                            sx={{ p: 3 }}
                        >
                            {tabPanel.content}
                        </TabPanel>
                    ))}
                </TabContext>
            </Box>
        </Paper>
    );
};

export default UserSettings;
