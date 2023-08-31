import { useHttp } from "../hooks/http.hook";
import dayjs from "dayjs";
import hasRequiredFields from "../utils/hasRequiredFields";

import { IAppointment, ActiveAppointment } from "../shared/interfaces/appointment.interface";

const requiredFields = ['id', 'date', 'name', 'service', 'phone', 'canceled'];

const useAppointmentService = () => {
    const { loadingStatus, request } = useHttp();

    const _apiBase = 'http://localhost:3001/appointments';

    const getAllAppointments = async(): Promise<IAppointment[]> => {
        const res = await request({url: _apiBase});
        if (res.every((item: IAppointment) => hasRequiredFields(item, requiredFields))) {
            return res;
        } else {
            throw new Error("Data doesn't have all the fields")
        }
    }

    const getAllActiveAppointments = async(): Promise<ActiveAppointment[]> => {
        const base = await getAllAppointments();
        const transformed: ActiveAppointment[] = base
            .filter((item) => !item.canceled && dayjs(item.date).diff(undefined, 'minute') > 0)
            .map((item) => {
                return {
                    id: item.id,
                    date: item.date,
                    name: item.name,
                    service: item.service,
                    phone: item.phone
                }
        })
        return transformed;
    }

    const cancelOneAppointment = async (id: number) => {
        return await request({
            url: _apiBase + "/" + id,
            method: "PATCH",
            body: JSON.stringify({canceled: true})
        })
    }

    const createNewAppointment =  async (body: IAppointment) => {
        const id = new Date().getTime();
        body['id'] = id;

        return await request({
            url: _apiBase,
            method: "POST",
            body: JSON.stringify(body)
        })
    }

    return {
        loadingStatus,
        getAllAppointments,
        getAllActiveAppointments,
        cancelOneAppointment,
        createNewAppointment
    }
}

export default useAppointmentService;