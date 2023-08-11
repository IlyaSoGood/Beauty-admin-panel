import {useEffect, useState, useRef, useCallback} from "react";
import "./appointmentItem.scss";
import dayjs from "dayjs";
import getZero from "../../utils/getZero";

import { ActiveAppointment } from "../../shared/interfaces/appointment.interface";
type Timer = ReturnType<typeof setInterval>;


function AppointmentItem({ id, name, service, phone, date }: ActiveAppointment) {
    const [timeLeft, changeTimeLeft] = useState<string | null>(null);

    const timerId = useRef<undefined | Timer>(undefined);

    const timerCreator = useCallback(() => {
        return () => {
            let hoursLeft = dayjs(date).diff(undefined, 'h');
            let minLeft = dayjs(date).diff(undefined, 'm') % 60;
            changeTimeLeft(`${getZero(hoursLeft)}:${getZero(minLeft)}`)

            let seconds = 60;
            timerId.current = setInterval(() => {
                console.log(seconds)
                if (seconds === 0 && minLeft !== 0) {
                    minLeft--;
                    changeTimeLeft(`${getZero(hoursLeft)}:${getZero(minLeft)}`)
                }
                if (seconds === 0 && minLeft === 0 && hoursLeft !== 0) {
                    minLeft = 60;
                    hoursLeft--;
                    changeTimeLeft(`${getZero(hoursLeft)}:${getZero(minLeft)}`)
                }
                if (seconds === 0 && minLeft === 0 && hoursLeft === 0) {
                    clearInterval(timerId.current);
                    console.log('stopped')
                    return
                }
                seconds--;

            }, 1000)
        }
    }, [])

    useEffect(() => {
        timerCreator()();

        return (() => {
            if (timerId.current) {
                clearInterval(timerId.current)
            };
            console.log('unmounted')
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
            <div className="appointment__time">
                <span>Time left:</span>
                <span className="appointment__timer">{timeLeft}</span>
            </div>
            <button className="appointment__cancel">Cancel</button>
            {/* <div className="appointment__canceled">Canceled</div> */}
        </div>
    );
}

export default AppointmentItem;
