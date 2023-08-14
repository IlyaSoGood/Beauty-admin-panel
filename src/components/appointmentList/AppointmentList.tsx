import { useContext, useEffect } from "react";
import AppointmentItem from "../appointmentItem/AppointmentItem";
import { AppointmentsContext } from "../../context/appointments/AppointmentsContext";
import Spinner from "../spinner/Spinner";
import Error from "../error/Error";

function AppointmentList() {
	const {
		appointmentLoadingStatus,
		activeAppointments,
		getActiveAppointments
	} = useContext(AppointmentsContext);
	useEffect(() => {
		getActiveAppointments();
	}, []);
	console.log(appointmentLoadingStatus)

	return (
		<>
			{appointmentLoadingStatus === 'loading'
				? <Spinner/>
				: appointmentLoadingStatus === 'error'
					?  <>
							<Error/>
							<button onClick={getActiveAppointments} className="schedule__reload">Перезагрузить</button>
						</>
					: activeAppointments.length > 0
						? activeAppointments.map(item => {
							return (
								<AppointmentItem {...item} key={item.id}/>
							)})
						: null
			}
		</>
	);
}

export default AppointmentList;