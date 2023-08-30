import {useEffect, useState, memo, useContext} from "react";
import "./appointmentItem.scss";
import dayjs from "dayjs";
import getZero from "../../utils/getZero";
import { Optional } from "utility-types";

import { IAppointment } from "../../shared/interfaces/appointment.interface";


type AppointmentProps = Optional<IAppointment, 'canceled'> & {
    openModal: (state: number) => void;
    getActiveAppointments?: () => void;
};

const AppointmentItem = memo(({
    id,
    name,
    service,
    phone,
    date,
    canceled,
    openModal,
    getActiveAppointments
}: AppointmentProps) => {
    const [timeLeft, changeTimeLeft] = useState<string | null>(null);

    useEffect(() => {
        changeTimeLeft((
            `${getZero(dayjs(date).diff(undefined, 'h'))}:${getZero(dayjs(date).diff(undefined, 'm') % 60)}`
        ))


        const intervalId = setInterval(() => {
            changeTimeLeft((
                `${getZero(dayjs(date).diff(undefined, 'h'))}:${getZero(dayjs(date).diff(undefined, 'm') % 60)}`
            ))

            if (dayjs(date).diff(undefined, 'm') % 60 === 0) {
                if (getActiveAppointments) {
                    getActiveAppointments();
                }
                clearInterval(intervalId);
                return;
            }
        }, 60000)

        return (() => {
            clearInterval(intervalId)
        })
    }, [date])

    const formatterDate = dayjs(date).format('DD/MM/YYYY HH:mm')

    return (
        <div className="appointment">
            <div className="appointment__info">
                <span className="appointment__date">
                    Date: {formatterDate}
                </span>
                <span className="appointment__name">{name}</span>
                <span className="appointment__service">Service: {service}</span>
                <span className="appointment__phone">
                    Phone: {phone}
                </span>
            </div>

            {!canceled
                ?   <>
                        <div className="appointment__time">
                            <span>Time left:</span>
                            <span className="appointment__timer">{timeLeft}</span>
                        </div>
                        <button
                            className="appointment__cancel"
                            onClick={() => {
                                openModal(id);
                            }}
                        >Cancel</button>
                    </>
                : null
            }

            {canceled
                ? <div className="appointment__canceled">Canceled</div>
                : null
            }
        </div>
    );
})

export default AppointmentItem;
