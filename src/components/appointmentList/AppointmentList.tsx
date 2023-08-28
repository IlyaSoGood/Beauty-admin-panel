import { useContext, useEffect, useState, useCallback } from "react";

import AppointmentItem from "../appointmentItem/AppointmentItem";
import CancelModal from "../modal/CancelModal";
import Spinner from "../spinner/Spinner";
import Error from "../error/Error";

import { AppointmentsContext } from "../../context/appointments/AppointmentsContext";

function AppointmentList() {
	const {
		appointmentLoadingStatus,
		activeAppointments,
		getActiveAppointments,
		// updateAppointment
		cancelAppointment
	} = useContext(AppointmentsContext);

	useEffect(() => {
		getActiveAppointments();
	}, []);

	const handleOpenModal = useCallback(
	(id: number) => {
		setIsOpen(true);
		selectId(id)
	},[]);

	const handleCancelItem = useCallback(
		(id: number) => {
			// updateAppointment(id,{
			// 	canceled: true
			// })
			setIsOpen(false)
		},[]);


	const [isOpen, setIsOpen] = useState(false);
	const [selectedId, selectId] = useState(0);

	if (appointmentLoadingStatus === 'loading') {
		return <Spinner/>
	} else if (appointmentLoadingStatus === 'error') {
		return (
				<>
					<Error/>
					<button onClick={getActiveAppointments} className="schedule__reload">Перезагрузить</button>
				</>
			)
	}

	return (
		<>
			{activeAppointments.length > 0
				? activeAppointments.map(item => {
					return (
						<AppointmentItem
							{...item}
							key={item.id}
							openModal={handleOpenModal}
						/>
					)})
				: null
			}
			<CancelModal
				handleClose={setIsOpen}
				selectedId={selectedId}
				isOpen={isOpen}
				handleCancelItem={handleCancelItem}
			/>
		</>
	);
}

export default AppointmentList;