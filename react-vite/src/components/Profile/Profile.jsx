import { Link, useNavigate } from "react-router-dom";
import { useState, useEffect, useMemo, useCallback } from "react";
import { useSelector } from "react-redux";
import OpenModalButton from "../OpenModalButton";
import DeleteProfile from "./CRUD/Delete";
import { BiSolidPencil } from "react-icons/bi";
import "./Profile.css";

const Profile = () => {
	const sessionUser = useSelector((state) => state.session.user);
	const navigate = useNavigate();
	const [activeMainSection, setActiveMainSection] = useState("posts"); // State to track the main active section
	const [activeAsideSection, setActiveAsideSection] = useState("tags"); // State to track the aside active section
	// UseEffect to navigate on logout immediately
	useEffect(() => {
		if (!sessionUser) {
			window.location.href = "/"; // Immediate navigation when sessionUser becomes null
		}
	}, [sessionUser]);
	// Memoized user-related values
	const userTags = useMemo(() => sessionUser?.usersTags, [sessionUser]);
	const userPosts = useMemo(() => sessionUser?.posts, [sessionUser]);
	const userGroups = useMemo(() => sessionUser?.group, [sessionUser]);
	const userEvents = useMemo(() => sessionUser?.events, [sessionUser]);
	const renderContent = useCallback(() => {
		switch (activeMainSection) {
			case "posts":
				return userPosts?.length > 0 ? (
					userPosts?.map((post) => (
						<Link
							key={post.id}
							to={`/posts/${post?.id}`}
							style={{ textDecoration: `none`, color: `inherit` }}
						>
							<div id="second-half-posts" className="second-half-cards">
								<img src={post?.image} alt={post?.title} />
								<div id="display-style-direction">
									<div>
										<h2>{post?.title}</h2>
										<h3>{post?.caption}</h3>
									</div>
									<ul className="stats">
										<li>
											<var>{post?.likes}</var>
											<label>Likes</label>
										</li>
										<li>
											<var>0</var>
											<label>Comments</label>
										</li>
										<li>
											<var>0</var>
											<label>Shares</label>
										</li>
									</ul>
								</div>
							</div>
						</Link>
					))
				) : (
					<p>
						Currently no posts available. You will see something after you make
						a post
					</p>
				);
			case "groups":
				return userGroups?.length > 0 ? (
					userGroups?.map((group) => (
						<Link
							to={`/groups/${group?.id}`}
							key={group?.id}
							style={{ textDecoration: `none`, color: `inherit` }}
						>
							<div id="second-half-groups" className="second-half-cards">
								<img src={group?.image} alt={group?.name} />
								<div id="display-style-direction">
									<div>
										<h2>{group?.name}</h2>
										<h3>{group?.about}</h3>
									</div>
									<ul className="stats">
										<li>
											<var>{group?.numMembers}</var>
											<label>Members</label>
										</li>
										<li>
											<var>{group?.events?.length}</var>
											<label>Events</label>
										</li>
										<li>
											<var>{group?.type}</var>
											<label>Type</label>
										</li>
									</ul>
								</div>
							</div>
						</Link>
					))
				) : (
					<p>
						Currently no groups available. You will see something after you join
						a group
					</p>
				);
			case "events":
				return userEvents?.length > 0 ? (
					userEvents?.map((event) => (
						<Link
							key={event?.id}
							to={`/events/${event?.id}`}
							style={{ textDecoration: `none`, color: `inherit` }}
						>
							<div id="second-half-events" className="second-half-cards">
								<img src={event?.image} alt={event?.name} />
								<div id="display-style-direction">
									<div>
										<h2>{event?.name}</h2>
										<h3>{event?.description}</h3>
									</div>
									<ul className="stats">
										<li>
											<var>{event?.numAttendees}</var>
											<label>Attendees</label>
										</li>
										<li>
											<var>{event?.capacity}</var>
											<label>Capacity</label>
										</li>
										<li>
											<var>{event?.type}</var>
											<label>Type</label>
										</li>
										<li>
											<var>{new Date(event?.startDate).toLocaleString()}</var>
											<label>Start Date</label>
										</li>
										<li>
											<var>{new Date(event?.endDate).toLocaleString()}</var>
											<label>End Date</label>
										</li>
									</ul>
								</div>
							</div>
						</Link>
					))
				) : (
					<p>
						Currently no events available. You will see something after you add
						an event
					</p>
				);
			default:
				return null;
		}
	}, [activeMainSection, userPosts, userGroups, userEvents]);
	const renderTagContent = useCallback(() => {
		switch (activeAsideSection) {
			case "tags":
				return userTags?.length > 0 ? (
					<div id="tag-content">
						{userTags?.map((tag) => (
							<div id="each-tag" key={tag?.id}>
								<button
									className="button"
									id="each-profile-tag"
									style={{ cursor: `default` }}
								>
									{tag?.name}
								</button>
							</div>
						))}
					</div>
				) : (
					<p>Currently no tags available.</p>
				);
			case "similar to you":
				return (
					<Link to="/profile-feed">
						<button className="button" style={{cursor: `pointer`}}>SIMILAR TO YOU</button>
					</Link>
				);
			default:
				return null;
		}
	}, [activeAsideSection, userTags]);

	return (
		<div id="user-profile-page">
			<main id="user-profile-basic">
				<div id="user-profile-img-wdetails">
					<div id="user-profile-image">
						<img src={sessionUser?.profileImage} alt={sessionUser?.username} />
						<Link to={`/users/${sessionUser?.id}/profile/update`}>
							<BiSolidPencil id="photo-plus" />
						</Link>
					</div>
					<div id="user-profile-details">
						<div>
							<h3>{sessionUser?.username}</h3>
						</div>
						<ul id="profile-stats">
							<li>
								<var>{sessionUser?.firstName}</var>
								<label>First Name</label>
							</li>
							<li>
								<var>{sessionUser?.lastName}</var>
								<label>Last Name</label>
							</li>
							<li>
								<var>{sessionUser?.email}</var>
								<label>Email</label>
							</li>
						</ul>
						<div id="profile-home-edit-profile">
							<Link to={`/users/${sessionUser?.id}/profile/update`}>
								<button
									className="button"
                                                      id="profile-home-edit-profile-button"
                                                      style={{cursor: `pointer`}}
								>
									Edit Profile
								</button>
							</Link>
							<div id="crud-buttons-delete">
								<OpenModalButton
									sessionUser={sessionUser}
									navigate={navigate}
									className="group-delete-button button"
									id="delete-group"
									buttonText="Delete Profile"
									style={{
										backgroundColor: "red",
										color: `#dddddc`,
										textDecoration: `none`,
										borderRadius: `4px`,
										border: `none`,
										padding: `12px 30px`,
										lineHeight: 1,
										cursor: `pointer`,
										textTransform: `uppercase`,
										boxSizing: `border-box`,
										transition: `background-color 0.3s`,
										fontSize: `16px`,
										fontWeight: 600,
										letterSpacing: `2px`,
										height: `45px`,
									}}
									modalComponent={
										<DeleteProfile
											sessionUser={sessionUser}
											navigate={navigate}
										/>
									}
								/>
							</div>
						</div>
					</div>
				</div>
				<div id="second-half-profile">
					<div className="second-half-headers">
						{activeMainSection !== "posts" ? (
							<h1 onClick={() => setActiveMainSection("posts")}>POSTS</h1>
						) : (
							<h1
								onClick={() => setActiveMainSection("posts")}
								style={{ color: `var(--peach)` }}
							>
								POSTS
							</h1>
						)}
						{activeMainSection !== "groups" ? (
							<h1 onClick={() => setActiveMainSection("groups")}>GROUPS</h1>
						) : (
							<h1
								onClick={() => setActiveMainSection("groups")}
								style={{ color: `var(--peach)` }}
							>
								GROUPS
							</h1>
						)}
						{activeMainSection !== "events" ? (
							<h1 onClick={() => setActiveMainSection("events")}>EVENTS</h1>
						) : (
							<h1
								onClick={() => setActiveMainSection("events")}
								style={{ color: `var(--peach)` }}
							>
								EVENTS
							</h1>
						)}
					</div>
					<div id="left-second-half-content">{renderContent()}</div>
				</div>
			</main>
			<aside id="aside-content">
				<div className="second-half-headers">
					{activeAsideSection !== "tags" ? (
						<h1 onClick={() => setActiveAsideSection("tags")}>YOUR TAGS</h1>
					) : (
						<h1
							onClick={() => setActiveAsideSection("tags")}
							style={{ color: `var(--deep-blue)` }}
						>
							YOUR TAGS
						</h1>
					)}
					{activeAsideSection !== "similar to you" ? (
						<h1 onClick={() => setActiveAsideSection("similar to you")}>
							SIMILAR TO YOU
						</h1>
					) : (
						<h1
							onClick={() => setActiveAsideSection("similar to you")}
							style={{ color: `var(--deep-blue)` }}
						>
							SIMILAR TO YOU
						</h1>
					)}
				</div>
				<div id="users-tags">{renderTagContent()}</div>
			</aside>
		</div>
	);
};

export default Profile;
