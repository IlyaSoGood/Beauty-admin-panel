import { ActiveAppointment, IAppointment } from "../../shared/interfaces/appointment.interface";

export enum ActionsTypes {
    SET_ACTIVE_APPOINTMENTS = "SET_ACTIVE_APPOINTMENTS",
    SET_ALL_APPOINTMENTS = "SET_ALL_APPOINTMENTS",
    FETCHING_APPOINTMENTS = "FETCHING_APPOINTMENTS",
    ERROR_FETCHING_APPOINTMENTS = "ERROR_FETCHING_APPOINTMENTS",
    UPDATE_APPOINTMENT = 'UPDATE_APPOINTMENT',
    ERROR_UPDATE_APPOINTMENT = 'ERROR_UPDATE_APPOINTMENT'
}

export type AppointmentAction =
{
    type: ActionsTypes.SET_ACTIVE_APPOINTMENTS;
    payload: ActiveAppointment[];
} | {
    type: ActionsTypes.SET_ALL_APPOINTMENTS;
    payload: IAppointment[];
} | {
    type: ActionsTypes.FETCHING_APPOINTMENTS;
} | {
    type: ActionsTypes.ERROR_FETCHING_APPOINTMENTS;
}
//Обновление любых полей Appointment
| {
    type: ActionsTypes.UPDATE_APPOINTMENT;
    payload: {
        id: number,
        body: Partial<IAppointment>
    }
}