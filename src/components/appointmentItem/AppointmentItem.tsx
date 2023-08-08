import { useEffect, useState } from "react";
import "./appointmentItem.scss";
import dayjs from "dayjs";

import { ActiveAppointment } from "../../shared/interfaces/appointment.interface";

function AppointmentItem({ id, name, service, phone, date }: ActiveAppointment) {
    const [timeLeft, changeTimeLeft] = useState<string | null>(null);
    useEffect(() => {
        console.log(dayjs(date).diff(undefined, 'h'))
        console.log(dayjs(date).diff(undefined, 'm') % 60)
    }, [date])


    const formattefDate = dayjs(date).format('DD/MM/YYYY HH:mm')
    return (
        <div className="appointment">
            <div className="appointment__info">
                <span className="appointment__date">
                    Date: {formattefDate}
                </span>
                <span className="appointment__name">{name}</span>
                <span className="appointment__service">Service: {service}</span>
                <span className="appointment__phone">
                    Phone: {phone}
                </span>
            </div>
            <div className="appointment__time">
                <span>Time left:</span>
                <span className="appointment__timer">HH:mm</span>
            </div>
            <button className="appointment__cancel">Cancel</button>
            {/* <div className="appointment__canceled">Canceled</div> */}
        </div>
    );
}

export default AppointmentItem;
