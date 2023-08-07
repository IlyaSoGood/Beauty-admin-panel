import Header from "../header/Header";
import SchedulePage from "../../pages/schedule/SchedulePage";
import AppointmentsContextProvider from "../../context/appointments/AppointmentsContext";

// import HistoryPage from "../../pages/history/HistoryPage";
// import CancelModal from "../modal/CancelModal";

import "./app.scss";


function App() {
	return (
		<main className="board">
			<Header />
			<AppointmentsContextProvider>
				<SchedulePage />
			</AppointmentsContextProvider>
			{/* <HistoryPage /> */}
			{/* <CancelModal /> */}
		</main>
	);
}

export default App;
