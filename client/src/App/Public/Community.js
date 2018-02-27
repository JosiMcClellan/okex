import React from 'react';
import PropTypes from 'prop-types';
import { Switch, Route } from 'react-router-dom';
import Paper from 'material-ui/Paper';

import Header from './Community/Header';
import Join from './Community/Join';
import MemberArea from './Community/MemberArea';
import Discussion from './Community/MemberArea/Discussion';
import communitiesFetcher from '../../fetchers/communities';
import PropsRoute from '../PropsRoute';
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
    return (
      <Switch>
        <Route path="c/:slug/thread/:id" component={Discussion} />
        <PropsRoute Component={MemberArea} props={{ community, profile }} />
      </Switch>
    );
  }

  render() {
    const { community } = this.state;
    if (!community) return 'LOADING';
    return (
      <Paper>
        <Header community={community} />
        <this.Main />
      </Paper>
    );
  }
}

export default Community;
