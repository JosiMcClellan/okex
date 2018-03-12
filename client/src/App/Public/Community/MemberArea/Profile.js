import React from 'react';
import PropTypes from 'prop-types';
import List from 'material-ui/List';
import Typography from 'material-ui/Typography';

import { idMap } from '../../../../utils';
import FieldsFetcher from '../../../../fetchers/ProfileFieldsFetcher';
import Field from './Profile/Field';

class Profile extends React.Component {
  static propTypes = {
    slug: PropTypes.string.isRequired,
    id: PropTypes.number.isRequired,
    handle: PropTypes.string.isRequired,
    fields: PropTypes.arrayOf(PropTypes.shape({
      id: PropTypes.number.isRequired,
      prompt: PropTypes.string.isRequired,
      response: PropTypes.string,
    })).isRequired,
  }

  constructor(props) {
    super(props);
    this.fieldsFetcher = new FieldsFetcher(props.slug);
    this.state = {
      fields: idMap(props.fields),
      openFieldId: null,
    };
  }

  setOpenField = id => this.setState({ openFieldId: id });
  closeField = () => this.setOpenField(null);

  handleResponse = async(fieldId, value) => {
    if (value === false) return this.closeField();

    const { id, error, ...updated }
      = await this.fieldsFetcher.update(fieldId, value)
      || { error: 'undefined resolution' };

    if (error) {
      console.log(`field update error: ${error}`);
      this.closeField();
    } else {
      this.state.fields.set(fieldId, updated);
      this.state.openFieldId = null;
      this.forceUpdate();
    }
  }

  render() {
    const {
      handleResponse, setOpenField,
      state: { fields, openFieldId },
      props: { handle },
    } = this;

    return (
      <div>
        <Typography variant="display1">Profile for {handle}</Typography>
        <List>
          {Array.from(fields, ([id, field]) => (
            <Field
              key={id}
              open={id === openFieldId}
              {...{
                id,
                setOpenField,
                handleResponse,
                ...field,
              }}
            />
          ))}
        </List>
      </div>
    );
  }
}

export default Profile;
