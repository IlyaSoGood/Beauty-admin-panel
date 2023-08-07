import { useContext, useEffect } from "react";
import AppointmentItem from "../appointmentItem/AppointmentItem";
import { AppointmentsContext } from "../../context/appointments/AppointmentsContext";

function AppointmentList() {
	const {activeAppointments, getActiveAppointments} = useContext(AppointmentsContext);
	useEffect(() => {
		getActiveAppointments();
	}, []);

	return (
		<>
			{activeAppointments.length > 0
				? activeAppointments.map(item => {
					return (
						<AppointmentItem {...item} key={item.id}/>
					)
				})
				: null
			}
		</>
	);
}

export default AppointmentList;