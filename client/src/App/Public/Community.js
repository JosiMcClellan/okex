import React from 'react';
import PropTypes from 'prop-types';
import Paper from 'material-ui/Paper';
import Divider from 'material-ui/Divider';

import Header from './Community/Header';
import Join from './Community/Join';
import MemberArea from './Community/MemberArea';
import communitiesFetcher from '../../fetchers/communities';
import profileFetcher from '../../fetchers/profile';


class Community extends React.Component {
  static propTypes = {
    account: PropTypes.shape({
      id: PropTypes.number.isRequired,
      email: PropTypes.string.isRequired,
      token: PropTypes.string.isRequired,
    }),
  }

  constructor(props) {
    super(props);
    this.slug = props.match.params.slug;
    this.state = {
      community: props.location.state,
      profile: null,
    };
  }

  componentDidMount() {
    this.getProfile();
    this.getCommunity();
  }

  componentWillReceiveProps() {
    this.getProfile();
  }

  setProfile = profile => this.setState({ profile })
  getProfile() {
    if (!this.props.account) return;
    profileFetcher.get(this.slug).then(this.setProfile);
  }

  setCommunity = community => this.setState({ community })
  getCommunity() {
    if (this.state.community) return;
    communitiesFetcher.get(this.slug).then(this.setCommunity);
  }

  Main = () => {
    const {
      slug, setProfile,
      props: { account },
      state: { community, profile },
    } = this;

    if (!account) return <p>Sign in to join {community.name}</p>;
    if (!profile) return <Join slug={slug} onJoin={setProfile} />;
    return <MemberArea {...{ community, profile }} />;
  }

  render() {
    const { community } = this.state;
    if (!community) return null;
    return (
      <Paper>
        <Header community={community} />
        <Divider />
        <this.Main />
      </Paper>
    );
  }
}

export default Community;
