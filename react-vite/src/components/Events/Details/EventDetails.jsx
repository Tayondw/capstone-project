import { Link } from "react-router-dom";
import { useLoaderData, useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { FaRegClock } from "react-icons/fa";
import { GrLocationPin } from "react-icons/gr";
import OpenModalButton from "../../OpenModalButton";
import { useModal } from "../../../context/Modal";
import EventImage from "../Images";
import EditEventImage from "../Images/EditEventImage";
import DeleteEvent from "../CRUD/Delete/DeleteEvent";
import "./EventDetails.css";

const EventDetails = () => {
	let eventDetails = useLoaderData();
	const sessionUser = useSelector((state) => state.session.user);
	const navigate = useNavigate();
	const { closeModal } = useModal();

	console.log("event details", eventDetails);

	if (!eventDetails) {
		return <div>Event not found</div>;
	}

	const formatDate = (startDate) => {
		const date = new Date(startDate);

		const year = date.getFullYear();
		const month = String(date.getMonth() + 1).padStart(2, "0");
		const day = String(date.getDate()).padStart(2, "0");
		const hours = String(date.getHours()).padStart(2, "0");
		const minutes = String(date.getMinutes()).padStart(2, "0");

		return `${year}-${month}-${day} • ${hours}:${minutes}`;
	};

	const formatEventDate = {
		...eventDetails,
		startDate: formatDate(eventDetails.startDate),
		endDate: formatDate(eventDetails.endDate),
	};

	return (
		<div id="events-details">
			<div id="events-link-holder">
				{"< "}
				<Link to="/events" id="event-link">
					Events
				</Link>
			</div>
			<div id="event-header">
				<h1 id="events-details-name">{eventDetails.name}</h1>
				{!eventDetails.organizer ? (
					<h4 className="events-details-organizer">
						Currently there is no organizer to this event!
					</h4>
				) : (
					<h4 className="events-details-organizer">
						Organized By {eventDetails.organizer.firstName}{" "}
						{eventDetails.organizer.lastName}
					</h4>
				)}
			</div>
			<div id="events-body-details">
				<div id="event-section-1">
					<div id="events-details-image">
						<img src={eventDetails.image} alt={eventDetails?.name || "Event"} />
					</div>
					<div id="mix-event-group">
						<div id="group-events">
							<div id="events-group-image">
								<img
									src={eventDetails.groupInfo.image}
									alt={eventDetails?.groupInfo?.name || "Group"}
								/>
							</div>
							<div id="events-group-info">
								{!eventDetails?.groupInfo ? (
									<>
										<h3>Group information not available</h3>
									</>
								) : (
									<Link to={`/groups/${eventDetails.groupInfo.id}`} style={{textDecoration: `none`}}>
										<h3>{eventDetails?.groupInfo?.name}</h3>
										<p>
											Base Location: {eventDetails?.groupInfo?.city},{" "}
											{eventDetails?.groupInfo?.state}
										</p>
										<p>Type: {eventDetails?.groupInfo?.type}</p>
									</Link>
								)}
							</div>
						</div>

						<div id="event-event">
							<div id="events-details-date">
								<FaRegClock className="events-details-clock" />
								<div>
									<p>
										START{" "}
										<p style={{ color: "teal" }}>
											{" "}
											{formatEventDate.startDate}
										</p>
									</p>
									<p>
										END{" "}
										<p style={{ color: "teal" }}>{formatEventDate.endDate}</p>
									</p>
								</div>
							</div>
							<div id="events-details-location">
								<GrLocationPin className="events-details-location" />
								<div>
									<p>{eventDetails.type}</p>
								</div>
							</div>
						</div>
						<div id="events-update-delete">
							{sessionUser &&
							eventDetails.organizer &&
							sessionUser.id === eventDetails.organizer.id ? (
								<>
									<div id="events-update-button">
										<button
											onClick={() => {
												navigate(
													`/groups/${eventDetails.groupId}/events/${eventDetails.id}`,
												);
											}}
											id="update-event-button"
											style={{
												backgroundColor: `gray`,
												color: `#FAF5E4`,
												cursor: `pointer`,
											}}
										>
											Update
										</button>
									</div>
									<div id="crud-buttons-update-image">
										{!eventDetails?.eventImage.length ? (
											<div id="crud-buttons-delete">
												<OpenModalButton
													eventDetails={eventDetails}
													className="event-image-button"
													id="add-group-image"
													buttonText="Add Event Image"
													onClose={closeModal}
													style={{
														backgroundColor: "gray",
														color: `#FAF5E4`,
														cursor: `pointer`,
													}}
													modalComponent={
														<EventImage
															eventDetails={eventDetails}
															onClose={closeModal}
														/>
													}
												/>
											</div>
										) : (
											eventDetails.eventImage.map((eventImage) => (
												<div id="crud-buttons-delete" key={eventImage.id}>
													<OpenModalButton
														eventDetails={eventDetails}
														className="event-image-button"
														id="add-group-image"
														buttonText="Update Event Image"
														onClose={closeModal}
														style={{
															backgroundColor: "gray",
															color: `#FAF5E4`,
															cursor: `pointer`,
														}}
														modalComponent={
															<EditEventImage
																eventDetails={eventDetails}
																onClose={closeModal}
															/>
														}
													/>
												</div>
											))
										)}
									</div>
									<div id="events-delete-button">
										<OpenModalButton
											eventDetails={eventDetails}
											className="event-delete-button"
											id="delete-event"
											buttonText="Delete"
											style={{
												backgroundColor: `gray`,
												color: `#FAF5E4`,
												cursor: `pointer`,
											}}
											modalComponent={
												<DeleteEvent eventDetails={eventDetails} />
											}
										/>
									</div>
								</>
							) : null}
						</div>
					</div>
				</div>
				<div id="event-section-2">
					<h2>Details</h2>
					<p>{eventDetails.description}</p>
				</div>
			</div>
		</div>
	);
};

export default EventDetails;
