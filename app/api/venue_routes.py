from flask import Blueprint, request, abort, redirect, render_template, jsonify
from flask_login import login_required, current_user
from app.models import (
    db,
    Group,
    User,
    Memberships,
    Venue,
)

from app.forms import VenueForm

venue_routes = Blueprint("venues", __name__)


@venue_routes.route("/")
def all_venues():
    """
    Query for all venues and returns them in a list of venue dictionaries
    """
    venues = Venue.query.all()
    if not venues:
        return jsonify({"errors": {"message": "Not Found"}}), 404
    return jsonify({"venues": [venue.to_dict() for venue in venues]})


@venue_routes.route("/<int:venueId>")
def venue(venueId):
    """
    Query for a venue by id and returns that venue in a dictionary
    """
    venue = Venue.query.get(venueId)
    if not venue:
        return jsonify({"errors": {"message": "Not Found"}}), 404
    return jsonify(venue.to_dict())


@venue_routes.route("/<int:venueId>/edit", methods=["GET", "POST"])
@login_required
def edit_venue(venueId):
    """
    will generate an update venue form on get requests and validate/save on post requests

    Returns 401 Unauthorized if the current user's id does not match the groups' organizer id

    Returns 404 Not Found if the venue or the group is not in the database

    The commented out code was to test if the post request works
    """
    # query for the venue you want to edit
    venue_to_edit = Venue.query.get(venueId)

    # query for the group you want to edit the venue
    group = Group.query.get(venue_to_edit.group_id)

    # check if there is a group
    if not group:
        return {"errors": {"message": "Not Found"}}, 404

    # check if there is an venue to edit
    if not venue_to_edit:
        return {"errors": {"message": "Not Found"}}, 404

    # check if current user is group organizer - group organizer is only allowed to update
    if current_user.id != group.organizer_id:
        return {"errors": {"message": "Unauthorized"}}, 401

    form = VenueForm()
    form["csrf_token"].data = request.cookies["csrf_token"]

    if form.validate_on_submit():
        venue_to_edit.group_id = group.id
        venue_to_edit.address = form.data["address"] or venue_to_edit.address
        venue_to_edit.city = form.data["city"] or venue_to_edit.city
        venue_to_edit.state = form.data["state"] or venue_to_edit.state
        venue_to_edit.zip_code = form.data["zip_code"] or venue_to_edit.zip_code
        venue_to_edit.latitude = form.data["latitude"] or venue_to_edit.latitude
        venue_to_edit.longitude = form.data["longitude"] or venue_to_edit.longitude
        db.session.commit()
        return venue_to_edit.to_dict()
    #   return redirect(f"/api/venues/{venueId}")

    #     elif form.errors:
    #         print(form.errors)
    #         return render_template(
    #             "venue_form.html",
    #             form=form,
    #             type="update",
    #             id=venueId,
    #             errors=form.errors,
    #         )

    #     else:
    #         current_data = Group.query.get(venueId)
    #         print(current_data)
    #         form.process(obj=current_data)
    #         return render_template(
    #             "venue_form.html",
    #             form=form,
    #             type="update",
    #             id=venueId,
    #             errors=None,
    #         )
    return form.errors, 400
