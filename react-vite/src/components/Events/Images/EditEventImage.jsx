import { Form, useActionData } from "react-router-dom";
import "./EventImage.css";

const EditEventImage = ({ eventDetails, onClose }) => {
	const event_image = useActionData();

	return (
		<div id="adding-group-image">
			<div id="image-close-confirm">
				<button id="image-close-button" onClick={onClose}>
					✖
				</button>
				<h1>Update the image to your event</h1>
			</div>

			<Form
				method="post"
				encType="multipart/form-data"
				type="file"
				action={`/events/${eventDetails.id}/images/${eventDetails.eventImage[0].id}/edit`}
				onSubmit={onClose}
			>
				<input name="event_image" type="file" accept="image/*" required />
				<button type="submit" name="intent" value="edit-event-image">
					Submit
				</button>
				<input type="hidden" name="eventId" value={eventDetails.id} />
				<input
					type="hidden"
					name="imageId"
					value={eventDetails.eventImage[0].id}
				/>
			</Form>
			{event_image && <img src={event_image?.name} alt="Event" />}
		</div>
	);
};

export default EditEventImage;
