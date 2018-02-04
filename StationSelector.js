import React from 'react';
import { Picker } from 'react-native';
import PropTypes from 'prop-types';

export default class StationSelector extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      station: 'JFK / UMASS',
    };
  }

  handleValueChange = (itemValue) => {
    this.setState({ station: itemValue });
    this.props.onValueChange(itemValue);
  };

  render() {
    return (
            <Picker
                selectedValue={this.state.station}
                onValueChange={this.handleValueChange}>
                <Picker.Item label="JFK / UMASS" value="JFK / UMASS" />
                <Picker.Item label="Andrew" value="Andrew" />
                <Picker.Item label="Broadway" value="Broadway" />
                <Picker.Item label="South Station" value="South Station" />
                <Picker.Item label="Downtown Crossing" value="Downtown Crossing" />
            </Picker>
    );
  }
}

StationSelector.propTypes = {
  onValueChange: PropTypes.func,
};
