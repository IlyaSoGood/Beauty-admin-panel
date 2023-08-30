import Portal from "../portal/portal";
import {useRef, useEffect, useState, useContext} from "react";
import {AppointmentsContext} from "../../context/appointments/AppointmentsContext";
import useAppointmentService from "../../services/AppointmentService";
import { CSSTransition } from "react-transition-group";

import "./modal.scss";

interface IModalProps {
	handleClose: (state: boolean) => void,
	handleCancelItem: (id: number) => void,
	selectedId: number;
	isOpen: boolean;
}

function CancelModal({handleClose, selectedId, isOpen}: IModalProps) {
	const { getActiveAppointments } = useContext(AppointmentsContext);

	const { cancelOneAppointment } = useAppointmentService();

	const nodeRef = useRef<HTMLDivElement>(null);

	const [btnDisabled, setBtnDisabled] = useState<boolean>(false);
	const [cancelStatus, setCancelStatus] = useState<boolean | null>(null);

	const handleCancelAppointment = (id: number) => {
		setBtnDisabled(true);
		cancelOneAppointment(id)
			.then(() => {
				console.log('done');
				setCancelStatus(true);
			}).catch(() => {
				console.log('error');
				setCancelStatus(false);
				setBtnDisabled(false);
			})
	}

	const closeModal = () => {
		handleClose(false);
		if (cancelStatus) {
			getActiveAppointments();
		}
	}

	const escapeCallback = (e: KeyboardEvent): void => {
		if (e.code === 'Escape') {
			console.log('escape')
			closeModal();
		}
	}

	useEffect(() => {
		// console.log('on')
		// if (isOpen) {
			document.body.addEventListener('keydown', escapeCallback);
		// }
		// if (!isOpen) {
		// 	document.removeEventListener('keydown', escapeCallback);
		// }
		return () => {
			// console.log('off')
			document.body.removeEventListener('keydown', escapeCallback);
		}
	}, [handleClose, cancelStatus]);


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
							<button
								className="modal__ok"
								disabled={btnDisabled}
								onClick={() => handleCancelAppointment(selectedId)}
							>Ok</button>
							<button
								className="modal__close"
								onClick={() => closeModal()}
							>Close</button>
						</div>
						<div className="modal__status">
							{cancelStatus === null
								? ''
								: cancelStatus
									? 'Success'
									: 'Error, please try again'}
						</div>
					</div>
				</div>
			</CSSTransition>
		</Portal>
	);
}

export default CancelModal;