import Portal from "../portal/portal";
import {useRef, useEffect, useState, useContext} from "react";
import {AppointmentsContext} from "../../context/appointments/AppointmentsContext";
import { CSSTransition } from "react-transition-group";

import "./modal.scss";



interface IModalProps {
	handleClose: (state: boolean) => void,
	handleCancelItem: (id: number) => void,
	selectedId: number;
	isOpen: boolean;
}

function CancelModal({handleClose, selectedId, isOpen}: IModalProps) {
	const { cancelAppointment, getActiveAppointments } = useContext(AppointmentsContext)

	const nodeRef = useRef<HTMLDivElement>(null);

	const [btnDisabled, setBtnDisabled] = useState<boolean>(false);
	const [cancelStatus, setCancelStatus] = useState<boolean | null>(null);

	const handleCancelAppointment = (id: number) => {
		setBtnDisabled(true);
		cancelAppointment(id).then(() => {
			console.log('done');
			setCancelStatus(true);
		})
	}

	const escapeCallback = (e: KeyboardEvent): void => {
		if (e.code === 'Escape') {
			console.log('escape')
			handleClose(false);
		}
	}

	useEffect(() => {
		// console.log('on')
		// if (isOpen) {
			document.addEventListener('keydown', escapeCallback);
		// }
		// if (!isOpen) {
		// 	document.removeEventListener('keydown', escapeCallback);
		// }
		return () => {
			// console.log('off')
			document.removeEventListener('keydown', escapeCallback);
		}
	}, [handleClose]);


	return (
		<Portal>
			<CSSTransition
				in={isOpen}
				timeout={{enter: 500, exit: 500}}
				unmountOnExit
				classNames='modal'
				nodeRef={nodeRef}
			>
				<div className="modal" ref={nodeRef}>
					<div className="modal__body">
						<span className="modal__title">
							Are you sure you want to delete the appointment? ${selectedId}
						</span>
						<div className="modal__btns">
							<button className="modal__ok" onClick={() => handleCancelAppointment(selectedId)}>Ok</button>
							<button className="modal__close" onClick={() => handleClose(false)}>Close</button>
						</div>
						<div className="modal__status">Success</div>
					</div>
				</div>
			</CSSTransition>
		</Portal>
	);
}

export default CancelModal;