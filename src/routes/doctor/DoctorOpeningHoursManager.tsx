import { Button } from '@/components/Button';
import { Card } from '@/components/Card';
import { Paper } from '@/components/Paper';
import useDoctorStore from '@/stores/doctorStore';
import { convertToTimestamp } from '@/utils/_deprecated/time';
import ClearIcon from '@mui/icons-material/Clear';
import {
	Box,
	Divider,
	Grid,
	IconButton,
	Typography
} from '@mui/material';
import { LocalizationProvider, TimePicker } from '@mui/x-date-pickers';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import dayjs, { Dayjs } from 'dayjs';
import { Timestamp } from 'firebase/firestore';
import React, { useEffect } from 'react';
import { Controller, FieldValues, useForm } from 'react-hook-form';
import { useTranslation } from 'react-i18next';
import { useParams } from 'react-router-dom';

interface IWorkingHours {
	[key: number]: {
		startTime: Dayjs | null;
		endTime: Dayjs | null;
	};
}

interface IFormData extends FieldValues {
	workingHours: IWorkingHours;
}

const DoctorOpeningHoursManager: React.FC = () => {
	const { t: tCommon } = useTranslation('common');
	const { id: doctorId } = useParams<{ id: string }>();
	const { updateDoctorDetail, isUpdatingDoctorDetail, doctorDetail, fetchDoctorDetail } = useDoctorStore();

	const { control, handleSubmit, setValue } = useForm<IFormData>({
		defaultValues: {
			workingHours: {
				1: { startTime: null, endTime: null },
				2: { startTime: null, endTime: null },
				3: { startTime: null, endTime: null },
				4: { startTime: null, endTime: null },
				5: { startTime: null, endTime: null },
				6: { startTime: null, endTime: null },
				0: { startTime: null, endTime: null },
			},
		},
	});

	const workingDays = [
		{ id: 1, label: tCommon('Monday') },
		{ id: 2, label: tCommon('Tuesday') },
		{ id: 3, label: tCommon('Wednesday') },
		{ id: 4, label: tCommon('Thursday') },
		{ id: 5, label: tCommon('Friday') },
	];

	useEffect(() => {
		if (doctorId) {
			fetchDoctorDetail(doctorId)
		}
	}, [doctorId, fetchDoctorDetail])

	useEffect(() => {
		if (doctorDetail?.workingHours) {
			Object.entries(doctorDetail.workingHours).forEach(([day, hours]) => {
				setValue(
					`workingHours.${day}.startTime`,
					hours?.startTime ? dayjs(hours.startTime.toDate()) : null as Dayjs | null
				);
				setValue(
					`workingHours.${day}.endTime`,
					hours?.endTime ? dayjs(hours.endTime.toDate()) : null as Dayjs | null
				);
			});
		}
	}, [doctorDetail, setValue]);

	const onSubmit = async (data: IFormData) => {
		const convertedWorkingHours: {
			[key: number]: {
				startTime: Timestamp | null;
				endTime: Timestamp | null;
			};
		} = Object.keys(data.workingHours).reduce((acc: any, day: string) => {
			const dayNumber = parseInt(day, 10);
			const dayData = data.workingHours[dayNumber];
			if (dayData) {
				acc[dayNumber] = {
					startTime: convertToTimestamp(dayData.startTime),
					endTime: convertToTimestamp(dayData.endTime),
				};
			}
			return acc;
		}, {});

		const updatedDoctor = {
			...doctorDetail,
			workingHours: convertedWorkingHours,
		};

		doctorId && await updateDoctorDetail(doctorId, updatedDoctor);
	};

	const handleClear = (day: number, field: 'startTime' | 'endTime') => {
		setValue(`workingHours.${day}.${field}`, null as never);
	};

	return (
		<Paper sx={{ p: 4 }}>
			<LocalizationProvider dateAdapter={AdapterDayjs}>
				<Grid container spacing={4}>
					{workingDays.map((day) => (
						<Grid item xs={12} sm={6} md={4} lg={3} key={day.id}>
							<Card>
								<Grid container spacing={2}>

									<Grid item xs={12}>
										<Typography variant="subtitle1" gutterBottom>
											{day.label}
										</Typography>
									</Grid>

									<Grid item xs={12}>
										<Controller
											name={`workingHours.${day.id}.startTime`}
											control={control}
											render={({ field, fieldState }) => (
												<TimePicker
													value={field.value}
													label="Čas začátku"
													ampm={false}
													minutesStep={5}
													onChange={(newValue) => field.onChange(newValue)}
													slotProps={{
														textField: {
															variant: 'outlined',
															error: !!fieldState.error,
															fullWidth: true,
															helperText: fieldState.error ? fieldState.error.message : null,
															InputProps: {
																endAdornment: (
																	<IconButton
																		onClick={() => handleClear(day.id, 'startTime')}
																		edge="end"
																	>
																		<ClearIcon />
																	</IconButton>
																),
															},
														},
													}}
												/>
											)}
										/>
									</Grid>

									<Grid item xs={12}>
										<Controller
											name={`workingHours.${day.id}.endTime`}
											control={control}
											render={({ field, fieldState }) => (
												<TimePicker
													value={field.value}
													label="Čas konce"
													ampm={false}
													minutesStep={5}
													onChange={(newValue) => field.onChange(newValue)}
													slotProps={{
														textField: {
															variant: 'outlined',
															error: !!fieldState.error,
															fullWidth: true,
															helperText: fieldState.error ? fieldState.error.message : null,
															InputProps: {
																endAdornment: (
																	<IconButton
																		onClick={() => handleClear(day.id, 'endTime')}
																		edge="end"
																	>
																		<ClearIcon />
																	</IconButton>
																),
															},
														},
													}}
												/>
											)}
										/>
									</Grid>
								</Grid>
							</Card>
						</Grid>
					))}
				</Grid>
			</LocalizationProvider>

			<Divider sx={{ my: 4 }} />

			<Box display="flex" justifyContent="end">
				<Button
					type="submit"
					variant="contained"
					color="primary"
					disabled={isUpdatingDoctorDetail}
					onClick={handleSubmit(onSubmit)}
				>
					Uložit otevírací dobu
				</Button>
			</Box>
		</Paper>
	);
};

export default DoctorOpeningHoursManager;