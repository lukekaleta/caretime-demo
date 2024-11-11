import { FC } from 'react';
import { Breadcrumbs as MuiBreadcrumbs, Link, Typography } from '@mui/material';
import { useTheme } from '@mui/material/styles';
import { useLocation, useNavigate } from 'react-router-dom';
import { RouteNames } from '@/enums/RouteNames';
import { capitalizeFirstLetter } from '../../utils';
import Icon from '@mdi/react';
import { mdiHome } from '@mdi/js';
import { useTranslation } from 'react-i18next';
import { REGEX } from '@/utils/regex';

const Breadcrumbs: FC = () => {
    const { t } = useTranslation('common');
    const theme = useTheme();
    const location = useLocation();
    const navigate = useNavigate();
    const pathNames = location.pathname.split('/').filter((x) => x);

    const isDynamicSegment = (segment: string) => {
        return REGEX.ALPHANUMERIC_NO_SPACES.test(segment) && segment.length > 8;
    };

    return (
        <MuiBreadcrumbs aria-label="breadcrumb">
            <Link
                sx={{
                    textDecoration: 'none',
                }}
                color={theme.palette.primary.light}
                href="/"
                onClick={(e) => {
                    e.preventDefault();
                    navigate(RouteNames.Home);
                }}
            >
                <Icon path={mdiHome} size={1} />
            </Link>
            {pathNames
                .filter((value) => !isDynamicSegment(value))
                .map((value, index) => {
                    const pathTo = `/${pathNames.slice(0, index + 1).join('/')}`;

                    const isLast = index === pathNames.length - 1;
                    const isSecondSegment = index === 1;

                    return (
                        <Typography
                            variant="body1"
                            key={pathTo}
                            sx={{
                                fontWeight:
                                    isLast || isSecondSegment
                                        ? theme.typography.fontWeightBold
                                        : theme.typography.fontWeightRegular,
                                color: isLast
                                    ? theme.palette.text.primary
                                    : theme.palette.text.secondary,
                            }}
                        >
                            <>{t(capitalizeFirstLetter(value))}</>
                        </Typography>
                    );
                })}
        </MuiBreadcrumbs>
    );
};

export default Breadcrumbs;
