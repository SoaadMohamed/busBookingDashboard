import React, {Component, Fragment} from 'react';
import { Grid, Segment, Header, Image, Icon, List, Flag } from 'semantic-ui-react'
import './style.scss'

class RidePassenger extends Component {
  render() {
    return (
      <Grid.Column verticalAlign="middle" textAlign='left' mobile={16} tablet={16} computer={4}>
        <Segment>
          <Image centered circular size="small" src={this.props.image}/>
          <Header textAlign="center">{this.props.name}</Header>
        </Segment>
      </Grid.Column>
    )
  }
}
export default RidePassenger;