import {ActionsTypes, AppointmentAction} from "./actions";
import {ActiveAppointment, IAppointment} from "../../shared/interfaces/appointment.interface";
import { loadingStatusOptions } from "../../hooks/http.hook";

export interface IAppointmentState {
    allAppointments: IAppointment[] | [];
    activeAppointments: ActiveAppointment[] | [];
    appointmentLoadingStatus: loadingStatusOptions;
}

export default function reducer(
    state: IAppointmentState,
    action: AppointmentAction
): IAppointmentState {
    switch(action.type) {
        case ActionsTypes.SET_ALL_APPOINTMENTS:
            return {
                ...state,
                allAppointments: action.payload,
                appointmentLoadingStatus: 'idle'
            }
        case ActionsTypes.SET_ACTIVE_APPOINTMENTS:
            return {
                ...state,
                activeAppointments: action.payload,
                appointmentLoadingStatus: 'idle'
            }
        case ActionsTypes.FETCHING_APPOINTMENTS:
            return {
                ...state,
                appointmentLoadingStatus: 'loading'
            }
        case ActionsTypes.ERROR_FETCHING_APPOINTMENTS:
            return {
                ...state,
                appointmentLoadingStatus: 'error'
            }
        //Обновление любых полей Appointment
        case ActionsTypes.UPDATE_APPOINTMENT:
            return {
                ...state,
            }
        default:
            return state;
    }
}