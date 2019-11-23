import React, { Ftagment, Component, useState } from 'react';
import { Container, Segment, Header, Divider, Grid, GridColumn, Button, Modal, Icon, Dropdown } from 'semantic-ui-react'
import Gmap from "./map"
import RidePassenger from "../../components/RidePassenger"
import users from "../../lib/users"
import _ from 'lodash'
import { Store } from "../../store";
import moment from 'moment';

function TripInfo(props) {
  const { state, dispatch } = React.useContext(Store);
  const [modalVisible, setModalVisible] = useState(false);
  const [bookingStation, setbookingStation] = useState("");
  const [bookingPayMethod, setbookingPayMethod] = useState("");
  const [tripArrival, settripArrival] = useState("ontime")
  const paymentMethods = [
    { value: 'cash', text: 'Cash' },
    { value: 'cr', text: 'Credit Card' }
  ]
  const timings = [
    { value: 'ontime', text: 'Arrive On Time' },
    { value: 'early', text: 'Arrive Early' },
    { value: 'late', text: 'Arrive Late' },
  ]
  const stations = state.route.map(station => ({ value: station.stationId, text: station.stationName }))
  const submitBooking = () => {
    if (state.bookingAllowed) {
      dispatch({
        type: "NEW_BOOKING",
        payload: {
          pickupStation: bookingStation,
          PaymentType: bookingPayMethod
        }
      });
    }
    setModalVisible(false)
  }

  const handleSubmit = () => {
    dispatch({
      type: "START_TRIP",
      payload: {
        arrivalStatus: tripArrival
      }
    });
  };

  return (
    <Container>
      <Segment>
        <Grid>
          <Grid.Row>
            <Grid.Column textAlign='left' mobile={16} tablet={16} computer={16}>
              {<Gmap />}
            </Grid.Column>
          </Grid.Row>
          <Grid.Row>
            <GridColumn textAlign='left' mobile={16} tablet={16} computer={16}>
              <Dropdown fluid selection
                value="ontime"
                placeholder='Change arrival Time'
                options={timings}
                onChange={(e) => settripArrival(e.target.value)}
                disabled={state.tripStatus == "IN_PROGRESS"}
              />
              <Divider fitted hidden />
              {state.tripStatus && state.tripStatus == "FINISHED" ?
                <Button fluid color="blue" onClick={() => dispatch({ type: "RESET_TRIP" })}>Reset Trip</Button>
                :
                <Button fluid color={state.tripStatus == "IN_PROGRESS" ? "green" : "blue"} onClick={() => handleSubmit()} disabled={state.tripStatus == "IN_PROGRESS"}>{state.tripStatus == "IN_PROGRESS" ? <span>Trip is in progress</span> : <span>Start Trip</span>}</Button>
              }
            </GridColumn>
          </Grid.Row>
          <Divider />
          <Grid.Row>
            <GridColumn textAlign='left' mobile={16} tablet={16} computer={16}>
              <Header textAlign='left' as='h1'>
                Trip Information
            <Header.Subheader> {moment().format('MMMM Do YYYY, h:mm a')}</Header.Subheader>
              </Header>
            </GridColumn>
          </Grid.Row>
          <Grid.Row>
            <GridColumn textAlign='left' mobile={16} tablet={16} computer={4}>
              <Segment>
                <Grid.Row>
                  <span>  Driver name: {state.captinName}</span>
                  <span>  rate: {state.rating}</span>
                </Grid.Row>

                <Grid.Row>
                  <span>  car model: {state.model}</span>
                  <span>  plate: {state.plate}</span>
                </Grid.Row>

              </Segment>
            </GridColumn>
            <GridColumn textAlign='left' mobile={16} tablet={16} computer={4}>
              <Segment>
                <Header.Subheader>  Start point: {state.startPoint}</Header.Subheader>
                <Header.Subheader>  End point: {state.endPoint}</Header.Subheader>
              </Segment>
            </GridColumn>
            <GridColumn textAlign='left' mobile={16} tablet={16} computer={4}>
              <Segment>
                <Header.Subheader>  dist: {state.fullDistance / 1000} Km</Header.Subheader>
                <Header.Subheader>  fare: {state.baseFare} EGP</Header.Subheader>
              </Segment>
            </GridColumn>
          </Grid.Row>
          <Grid.Row>
            <GridColumn textAlign='left' mobile={16} tablet={16} computer={16}>
              <Header textAlign='left' as='h1'>Bookings</Header>
              <Grid>
                {
                  state.bookings && state.bookings.map((booking, i) => {
                    let user = _.find(users, { id: parseInt(booking.userId) })
                    return (
                      <RidePassenger
                        key={i}
                        image={user.image}
                        name={user.name}
                        pickupStation={booking.pickupStation}
                        status={booking.status}
                        PaymentType={booking.PaymentType}
                      />
                    )
                  })
                }
              </Grid>
              <Divider hidden />
              <Button fluid
                color="blue"
                onClick={() => setModalVisible(true)}
                disabled={state.tripStatus == "IN_PROGRESS"}
              >Add new booking</Button>
            </GridColumn>
          </Grid.Row>
        </Grid>
        <Divider hidden />
      </Segment >

      <Modal size="tiny" open={modalVisible} closeIcon onClose={() => setModalVisible(false)}>
        <Header icon='plus' content='Add new booking' />
        <Modal.Content>
          <Header size="small">Payment Type</Header>
          <Dropdown fluid
            placeholder='Payment Type' selection
            options={paymentMethods}
            onChange={(e) => setbookingPayMethod(e.target.value)}
          />
          <Header size="small">Station to ride from</Header>
          <Dropdown fluid selection
            placeholder='Station'
            options={stations}
            onChange={(e) => setbookingStation(e.target.value)}
          />
        </Modal.Content>
        <Modal.Actions>
          <Button color='red' onClick={() => setModalVisible(false)}>
            <Icon name='remove' />
            <span>Cancel</span>
          </Button>
          <Button
            color='green'
            onClick={() => submitBooking()}
          >
            <Icon name='checkmark' />
            <span>Add Booking</span>
          </Button>
        </Modal.Actions>
      </Modal>
    </Container >
  );
}

export default TripInfo
