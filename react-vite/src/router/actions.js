export const groupActions = async ({ request }) => {
	let formData = await request.formData();
	let data = Object.fromEntries(formData);
	let intent = formData.get("intent");
	data.id = +data.id;

	if (intent === "create-group") {
		return await fetch(`/api/groups/new`, {
			method: "POST",
			body: formData,
		});
	}

	if (intent === "edit-group") {
		return await fetch(`/api/groups/${data.id}/edit`, {
			method: "POST",
			body: formData,
		});
	}

	if (intent === "delete-group") {
		return await fetch(`/api/groups/${data.id}/delete`, {
			method: "DELETE",
		});
	}
};

export const groupImageActions = async ({ request }) => {
	let formData = await request.formData();
	let data = Object.fromEntries(formData);
	let intent = formData.get("intent");
	data.id = +data.id;
	data.imageId = +data.imageId;

	if (intent === "add-group-image") {
		return await fetch(`/api/groups/${data.id}`, {
			method: "POST",
			body: formData,
		});
	}

	if (intent === "edit-group-image") {
		return await fetch(`/api/groups/${data.id}/images/${data.imageId}/edit`, {
			method: "POST",
			body: formData,
		});
	}

	if (intent === "delete-group-image") {
		return await fetch(`/api/group-images/${data.id}`, {
			method: "DELETE",
		});
	}
};

export const eventActions = async ({ request }) => {
	let formData = await request.formData();
	let data = Object.fromEntries(formData);
	let intent = formData.get("intent");
	data.id = +data.id;
	data.eventId = +data.eventId;

	if (intent === "create-event") {
		return await fetch(`/api/groups/${data.id}/events`, {
			method: "POST",
			body: formData,
		});
	}

	if (intent === "edit-event") {
		return await fetch(`/api/groups/${data.id}/events/${data.eventId}`, {
			method: "POST",
			body: formData,
		});
	}

	if (intent === "delete-event") {
		return await fetch(`/api/events/${data.id}`, {
			method: "DELETE",
		});
	}
};

export const eventImageActions = async ({ request }) => {
	let formData = await request.formData();
	let data = Object.fromEntries(formData);
	let intent = formData.get("intent");
	data.id = +data.id;
	data.imageId = +data.imageId;

	if (intent === "add-event-image") {
		return await fetch(`/api/events/${data.id}/images`, {
			method: "POST",
			body: formData,
		});
	}

	if (intent === "edit-event-image") {
		return await fetch(`/api/events/${data.id}/images/${data.imageId}/edit`, {
			method: "POST",
			body: formData,
		});
	}

	if (intent === "delete-event-image") {
		return await fetch(`/api/event-images/${data.id}`, {
			method: "DELETE",
		});
	}
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

export const groupMemberActions = async ({ request }) => {
	let formData = await request.formData();
	let data = Object.fromEntries(formData);
	let intent = formData.get("intent");
	data.id = +data.id;
	data.userId = +data.userId;
	data.memberId = +data.memberId;

	if (intent === "join-group") {
		return await fetch(`/api/groups/${data.id}/join-group`, {
			method: "POST",
			headers: {
				"Content-Type": "application/json",
			},
			body: formData,
		});
	}

	if (intent === "leave-group") {
		return await fetch(`/api/groups/${data.id}/leave-group/${data.memberId}`, {
			method: "DELETE",
		});
	}
};

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
