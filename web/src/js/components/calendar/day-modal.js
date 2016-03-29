import React from 'react';
import { Modal, Button } from 'react-bootstrap';
import moment from 'moment';
import guestActions from '../../actions/guest-actions';

export default class DayModal extends React.Component {
  componentWillMount() {
    this.state = Object.assign({}, this.props.day);
  }

  checkPublicHoliday(e) {
    if (e.target.checked) {
      this.setState({publicHoliday: ''});
    } else {
      this.setState({publicHoliday: null});
    }
  }

  isPublicHoliday() {
    return !(this.state.publicHoliday === null) && !(this.state.publicHoliday === undefined);
  }

  publicHolidayType() {
    return this.isPublicHoliday() ? 'text' : 'hidden';
  }

  checkSchoolHoliday(e) {
    this.setState({schoolHoliday: e.target.checked});
  }

  changePublicHoliday(e) {
    this.setState({publicHoliday: e.target.value});
  }

  changeNotes(e) {
    this.setState({notes: e.target.value});
  }

  save() {
    this.props.onSave(this.state);
  }

  unbookedGuests() {
    let guests = [];
    if (this.state.bookings && this.state.bookings.length > 0) {
      Object.keys(this.props.guests).forEach(id => {
        let booked = this.state.bookings.includes(id);
        if (!this.state.bookings.includes(id)) {
          guests.push(this.props.guests[id]);
        }
      });
    } else {
      guests = Object.values(this.props.guests);
    }

    return guests;
  }

  selectGuest(e) {
    let bookings = this.state.bookings;
    if (!bookings) {
      bookings = [];
    }
    bookings.push(e.target.value);
    this.setState({bookings: bookings});
  }

  removeBooking(id) {
    let bookings = this.state.bookings.filter(bookingId => bookingId !== id);
    this.setState({bookings: bookings});
  }

  renderGuests() {
    let bookings;
    if (this.state.bookings && this.state.bookings.length > 0) {
      bookings = this.state.bookings.map((id, index) => {
        return (
          <div className="booking" key={id}>
            <span>{this.props.guests[id].name}</span>
            <span onClick={this.removeBooking.bind(this, id)}>x</span>
          </div>
        );
      });
    } else {
      bookings = 'No Bookings';
    }
    return bookings;
  }

  renderGuestOptions() {
    return this.unbookedGuests().map(guest => <option key={guest.id} value={guest.id}>{guest.name}</option>)
  }

  renderGuestSelect() {
    return (
      <select id="guests" className="form-control" value="" onChange={this.selectGuest.bind(this)}>
        <option value="">Please Select...</option>
        {this.renderGuestOptions()}
      </select>
    );
  }

  render() {
    let date = moment([this.props.day.year, this.props.day.month - 1, 1]);

    return (
      <Modal show onHide={this.props.onHide}>
        <Modal.Header closeButton>
          <Modal.Title>
            <div className='day-number pull-left'>{this.state.day}</div>
            <div className='week-day'>{date.format('dddd')}</div>
            <div className='month-year'>{date.format('MMMM, YYYY')}</div>
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <div className="row">
            <form className="form-horizontal col-xs-3">
              <div className="form-group">
                <div className="col-sm-7 checkbox">
                  <label>
                    <input type="checkbox" checked={this.state.schoolHoliday}
                           onChange={this.checkSchoolHoliday.bind(this)} />
                    School Holiday
                  </label>
                </div>
              </div>
              <div className="form-group ">
                <div className="checkbox col-sm-4">
                  <label>
                    <input type="checkbox" checked={this.isPublicHoliday()}
                           onChange={this.checkPublicHoliday.bind(this)}/>
                    Public Holiday
                  </label>
                </div>
                <div className="col-sm-3">
                  <input type={this.publicHolidayType()} className="form-control" id="description"
                         value={this.state.publicHoliday} onChange={this.changePublicHoliday.bind(this)} />
                </div>
              </div>
              <div className="form-group">
                <label htmlFor="description">Notes</label>
                <textarea id='notes' className="form-control" rows="3"
                          value={this.state.notes} onChange={this.changeNotes.bind(this)} />
              </div>
            </form>
            <div className="col-xs-1" />
            <form className="form-horizontal col-xs-3">
              <div className="form-group">
                <label htmlFor="guests">Add Guests</label>
                {this.renderGuestSelect()}
              </div>
              <div className="form-group">
                {this.renderGuests()}
              </div>
            </form>
          </div>
        </Modal.Body>
        <Modal.Footer>
          <Button onClick={this.props.onHide}>Cancel</Button>
          <Button onClick={this.save.bind(this)}>Save</Button>
        </Modal.Footer>
      </Modal>
    );
  }
}

DayModal.propTypes = {
  day: React.PropTypes.object.isRequired,
  onHide: React.PropTypes.func.isRequired,
  onSave: React.PropTypes.func.isRequired
};