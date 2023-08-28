import { ReactNode, createContext, useReducer } from "react";
import reducer, { IAppointmentState } from "./reducer";
import useAppointmentService from "../../services/AppointmentService";

import { ActionsTypes } from "./actions";

const initialState: IAppointmentState = {
    allAppointments: [],
    activeAppointments: [],
    appointmentLoadingStatus: 'idle'
};

interface ProviderProps {
    children: ReactNode;
}

interface AppointmentContextValue extends IAppointmentState{
    getAppointments: () => void,
    getActiveAppointments: () => void,
    // updateAppointment: (id: number, body: Partial<IAppointment>) => void,
    cancelAppointment: (id: number) => Promise<any>
}

export const AppointmentsContext = createContext<AppointmentContextValue>({
    allAppointments: initialState.allAppointments,
    activeAppointments: initialState.activeAppointments,
    getAppointments: () => {},
    getActiveAppointments: () => {},
    // updateAppointment: () => {},
    cancelAppointment: (id: number) => {
        return new Promise(() => {})
    },
    appointmentLoadingStatus: initialState.appointmentLoadingStatus
})

const AppointmentsContextProvider = ({ children }: ProviderProps) => {
    const [state, dispatch] = useReducer(reducer, initialState);
    const {
        loadingStatus,
        getAllAppointments,
        getAllActiveAppointments,
        // updateAppointment
        cancelOneAppointment
    } = useAppointmentService();

    const value: AppointmentContextValue = {
        allAppointments: state.allAppointments,
        activeAppointments: state.activeAppointments,
        getAppointments: () => {
            getAllAppointments().then(data =>
                dispatch({ type: ActionsTypes.SET_ALL_APPOINTMENTS, payload: data }))
        },
        getActiveAppointments: () => {
            getAllActiveAppointments().then(data =>
                dispatch({ type: ActionsTypes.SET_ACTIVE_APPOINTMENTS, payload: data }))
        },
        // updateAppointment: (id, body) => {
        //     updateAppointment(id, body)
        //         .then(() => {
        //             dispatch({ type: ActionsTypes.UPDATE_APPOINTMENT, payload: {id, body} })
        //         })
        // },
        cancelAppointment: (id: number): Promise<any> => {
            return cancelOneAppointment(id)
        },
        appointmentLoadingStatus: loadingStatus
    };
    return (
        <AppointmentsContext.Provider value={value}>
            {children}
        </AppointmentsContext.Provider>
    )
};

export default AppointmentsContextProvider;