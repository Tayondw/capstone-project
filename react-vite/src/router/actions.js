import { redirect } from "react-router-dom";

export const groupActions = async ({ request }) => {
	const formData = await request.formData();
	const data = Object.fromEntries(formData);
	const intent = formData.get("intent");

	if (intent === "create-group" || intent === "edit-group") {
		const name = formData.get("name");
		const about = formData.get("about");
		const type = formData.get("type");
		const city = formData.get("city");
		const state = formData.get("state");
		const image = formData.get("image");
		const errors = {};

		if (!name.length || name.length < 3 || name.length > 50)
			errors.name = "Group name must be between 3 and 50 characters";
		if (!about.length || about.length < 20 || about.length > 150)
			errors.about =
				"Description must be at least 20 characters and no more than 150 characters";
		if (!type) errors.type = "Group Type is required";
		if (!city.length || city.length < 3 || city.length > 30)
			errors.city = "City name must be between 3 and 30 characters";
		if (!state.length || state.length < 2 || state.length > 2)
			errors.state = "Please enter the abbreviated form of the state";

		// Only require image if the group does not already have one
		if (intent === "create-group" && !image)
			errors.image = "Group image is required to create a group";

		if (Object.keys(errors).length) {
			return errors;
		}

		data.id = +data.id;
		data.organizer_id = +data.organizer_id;
		data.group_id = +data.group_id;
	}

	if (intent === "create-group") {
		await fetch(`/api/groups/new`, {
			method: "POST",
			body: formData,
		});
		return redirect("/groups");
	}

	if (intent === "edit-group") {
		await fetch(`/api/groups/${data.id}/edit`, {
			method: "POST",
			body: formData,
		});

		return redirect(`/groups/${data.id}`);
	}

	if (intent === "delete-group") {
		await fetch(`/api/groups/${data.id}/delete`, {
			method: "DELETE",
		});
		return redirect("/groups");
	}

	if (intent === "add-group-image" || intent === "edit-group-image") {
		data.id = +data.id;
		data.imageId = +data.imageId;
	}

	if (intent === "add-group-image") {
		await fetch(`/api/groups/${data.id}/images`, {
			method: "POST",
			body: formData,
		});

		return redirect(`/groups/${data.id}`);
	}

	if (intent === "edit-group-image") {
		await fetch(`/api/groups/${data.id}/images/${data.imageId}/edit`, {
			method: "POST",
			body: formData,
		});
		return redirect(`/groups/${data.id}`);
	}

	if (intent === "join-group") {
		data.id = +data.id;
		data.userId = +data.userId;
		data.memberId = +data.memberId;
		await fetch(`/api/groups/${data.id}/join-group`, {
			method: "POST",
			headers: {
				"Content-Type": "application/json",
			},
			body: formData,
		});
		return redirect(`/groups/${data.id}`);
	}

	if (intent === "leave-group") {
		data.id = +data.id;
		data.userId = +data.userId;
		data.memberId = +data.memberId;
		await fetch(`/api/groups/${data.id}/leave-group/${data.memberId}`, {
			method: "DELETE",
		});
		return redirect(`/groups`);
	}
};

export const eventActions = async ({ request }) => {
	const formData = await request.formData();
	const data = Object.fromEntries(formData);
	const intent = formData.get("intent");

	// Only validate fields for creation and editing
	if (intent === "create-event" || intent === "edit-event") {
		const name = formData.get("name");
		const description = formData.get("description");
		const type = formData.get("type");
		const capacity = formData.get("capacity");
		const image = formData.get("image");
		const startDate = formData.get("startDate");
		const endDate = formData.get("endDate");
		const today = new Date();
		const errors = {};

		if (!name || name.length < 5 || name.length > 50)
			errors.name = "Event name must be between 5 and 50 characters";
		if (!description || description.length < 50 || description.length > 150)
			errors.description =
				"Description must be at least 50 characters and no more than 150 characters";
		if (!type) errors.type = "Event Type is required";
		if (!capacity || capacity < 2 || capacity > 300)
			errors.capacity =
				"Event capacity must have at least two people attending and cannot exceed more than 300 people";
		// Only require image if the group does not already have one
		if (intent === "create-event" && !image)
			errors.image = "Group image is required to create a group";

		const start = new Date(startDate);
		const end = new Date(endDate);

		if (!startDate || isNaN(start.getTime())) {
			errors.startDate = "Invalid start date";
		} else if (start < today) {
			errors.startDate = "Start date must be after or on the current date";
		}

		if (!endDate || isNaN(end.getTime())) {
			errors.endDate = "Invalid end date";
		} else if (end < start) {
			errors.endDate = "End date must be after the start date";
		}

		if (Object.keys(errors).length) {
			return errors;
		}

		data.capacity = +data.capacity;
		data.group_id = +data.group_id;
	}

	// Execute action based on the intent
	if (intent === "create-event") {
		await fetch(`/api/groups/${data.group_id}/events/new`, {
			method: "POST",
			body: formData,
		});
		return redirect("/events");
	}

	if (intent === "edit-event") {
		await fetch(`/api/groups/${data.group_id}/events/${data.eventId}`, {
			method: "POST",
			body: formData,
		});
		return redirect(`/events/${data.eventId}`);
	}

	if (intent === "delete-event") {
		await fetch(`/api/events/${data.id}`, {
			method: "DELETE",
		});
		return redirect("/events");
	}

	if (intent === "add-event-image") {
		data.eventId = +data.eventId;
		data.imageId = +data.imageId;
		await fetch(`/api/events/${data.eventId}/images`, {
			method: "POST",
			body: formData,
		});
		return redirect(`/events/${data.eventId}`);
	}

	if (intent === "edit-event-image") {
		data.eventId = +data.eventId;
		data.imageId = +data.imageId;
		await fetch(`/api/events/${data.eventId}/images/${data.imageId}/edit`, {
			method: "POST",
			body: formData,
		});
		return redirect(`/events/${data.eventId}`);
	}

	// if (intent === "delete-event-image") {
	// 	data.eventId = +data.eventId;
	// 	data.imageId = +data.imageId;
	// 	return await fetch(`/api/event-images/${data.eventId}`, {
	// 		method: "DELETE",
	// 	});
	// }
};

export const venueActions = async ({ request }) => {
	let formData = await request.formData();
	let data = Object.fromEntries(formData);
	let intent = formData.get("intent");
	data.id = +data.id;

	if (intent === "create-venue") {
		return await fetch(`/api/groups/${data.id}/venues`, {
			method: "POST",
			body: formData,
		});
	}

	if (intent === "edit-venue") {
		return await fetch(`/api/venues/${data.id}/edit`, {
			method: "POST",
			body: formData,
		});
	}
};

// export const groupMemberActions = async ({ request }) => {
// 	let formData = await request.formData();
// 	let data = Object.fromEntries(formData);
// 	let intent = formData.get("intent");
// 	data.id = +data.id;
// 	data.userId = +data.userId;
// 	data.memberId = +data.memberId;

// 	if (intent === "join-group") {
// 		return await fetch(`/api/groups/${data.id}/join-group`, {
// 			method: "POST",
// 			headers: {
// 				"Content-Type": "application/json",
// 			},
// 			body: formData,
// 		});
// 	}

// 	if (intent === "leave-group") {
// 		return await fetch(`/api/groups/${data.id}/leave-group/${data.memberId}`, {
// 			method: "DELETE",
// 		});
// 	}
// };

export const eventAttendeeActions = async ({ request }) => {
	let formData = await request.formData();
	let data = Object.fromEntries(formData);
	let intent = formData.get("intent");
	data.id = +data.id;
	data.userId = +data.userId;
	data.attendeeId = +data.attendeeId;

	if (intent === "attend-event") {
		return await fetch(`/api/events/${data.id}/attend-event`, {
			method: "POST",
			body: formData,
		});
	}

	if (intent === "leave-event") {
		return await fetch(
			`/api/events/${data.id}/leave-event/${data.attendeeIdId}`,
			{
				method: "DELETE",
			},
		);
	}
};

export const profileActions = async ({ request }) => {
	const formData = await request.formData();
	const intent = formData.get("intent");
	const errors = {};

	// Handle profile deletion separately
	if (intent === "delete-profile") {
		const userId = formData.get("userId");
		await fetch(`/api/users/${userId}/profile/delete`, {
			method: "DELETE",
		});
		return redirect("/");
	}

	// For other actions like create or update profile
	const data = Object.fromEntries(formData);
	const firstName = formData.get("firstName");
	const lastName = formData.get("lastName");
	const bio = formData.get("bio");
	const profileImage = formData.get("profileImage");
	const userTags = formData.get("userTags");

	if (!firstName.length || firstName.length < 3 || firstName.length > 20)
		errors.firstName = "First name must be between 3 and 20 characters";
	if (!lastName.length || lastName.length < 3 || lastName.length > 20)
		errors.lastName = "Last name must be between 3 and 20 characters";
	if (!bio.length || bio.length < 50 || bio.length > 500)
		errors.bio = "Please enter at least 50 characters describing yourself";

	// Only require profileImage if the user does not already have one
	if (intent === "create-profile" && !profileImage)
		errors.profileImage = "Please add a profile image";
	if (!userTags)
		errors.userTags = "Please select 1 or more tags that fit your description";

	if (Object.keys(errors).length) {
		return errors;
	}

	data.userId = +data.userId;

	if (intent === "create-profile") {
		await fetch(`/api/users/${data.userId}/profile/create`, {
			method: "POST",
			body: formData,
		});
		return redirect("/");
	}

	if (intent === "update-profile") {
		await fetch(`/api/users/${data.userId}/profile/update`, {
			method: "POST",
			body: formData,
		});
		return redirect("/profile");
	}

	if (intent === "add-tags") {
		return await fetch(`/api/users/${data.userId}/add-tags`, {
			method: "POST",
			body: formData,
		});
	}
};

export const postActions = async ({ request }) => {
	let formData = await request.formData();
	let data = Object.fromEntries(formData);
	let intent = formData.get("intent");
	data.id = +data.id;
	data.commentId = +data.commentId;

	if (intent === "create-post") {
		return await fetch(`/api/posts/create`, {
			method: "POST",
			body: formData,
		});
	}

	if (intent === "add-comment") {
		return await fetch(`/api/posts/${data.id}/comments`, {
			method: "POST",
			body: formData,
		});
	}

	if (intent === "remove-comment") {
		return await fetch(`/api/posts/${data.id}/comments/${data.commentId}`, {
			method: "DELETE",
			body: formData,
		});
	}

	if (intent === "add-like") {
		return await fetch(`/api/posts/${data.id}/like`, {
			method: "POST",
			body: formData,
		});
	}

	if (intent === "remove-like") {
		return await fetch(`/api/posts/${data.id}/unlike`, {
			method: "POST",
			body: formData,
		});
	}

	if (intent === "edit-post") {
		return await fetch(`/api/posts/${data.id}/edit`, {
			method: "POST",
			body: formData,
		});
	}

	if (intent === "delete-post") {
		return await fetch(`/api/posts/${data.id}/delete`, {
			method: "DELETE",
		});
	}
};
