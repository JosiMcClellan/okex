import React from 'react';
import PropTypes from 'prop-types';
import Paper from 'material-ui/Paper';

import Header from './Community/Header';
import MemberArea from './Community/MemberArea';
import Join from './Community/Join';
import getCommunity from '../../../fetchers/communities/show';
import profileFetcher from '../../../fetchers/profile';

class Community extends React.Component {
  static propTypes = {
    account: PropTypes.shape({
      id: PropTypes.number,
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
    const { slug, setProfile, props: { account } } = this;
    if (!account) return;
    profileFetcher.get(slug, account.token).then(setProfile);
  }

  setCommunity = community => this.setState({ community })
  getCommunity() {
    if (this.state.community) return;
    getCommunity(this.slug).then(this.setCommunity);
  }

  renderMain() {
    const {
      slug, setProfile,
      props: { account },
      state: { community, profile },
    } = this;
    if (!account) return <p>Sign in to join {community.name}</p>;
    if (!profile) return <Join slug={slug} token={account.token} onJoin={setProfile} />;
    return <MemberArea community={community} profile={profile} />;
  }

  render() {
    const { community } = this.state;
    if (!community) return 'LOADING';
    return (
      <Paper>
        <Header community={community} />
        {this.renderMain()}
      </Paper>
    );
  }
}

export default Community;
