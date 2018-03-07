import React from 'react';
import PropTypes from 'prop-types';
import Typography from 'material-ui/Typography';

import communitiesFetcher from '../../fetchers/communities';
import profileFetcher from '../../fetchers/profile';
import Banner from './Community/Banner';
import Header from './Community/Header';
import Join from './Community/Join';
import MemberArea from './Community/MemberArea';


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
      community: props.location.state && props.location.state.data,
      profile: null,
    };
  }

  componentDidMount() {
    this.getProfile();
    this.getCommunity();
  }

  componentWillReceiveProps({ account }) {
    const oldAccount = this.props.account;
    if (account && !oldAccount) this.getProfile();
    if (oldAccount && !account) this.setState({ profile: null });
  }

  setProfile = profile => this.setState({ profile })
  getProfile() {
    // if (!this.props.account) return;
    profileFetcher.get(this.slug).then(this.setProfile);
  }

  setCommunity = community => this.setState({ community })
  getCommunity() {
    if (this.state.community) return;
    communitiesFetcher.get(this.slug).then(this.setCommunity);
  }

  LoginPrompt = () => (
    <Banner>
      <Typography variant="body2">
        Sign in to join {this.state.community.name}
      </Typography>
    </Banner>
  );

  render() {
    const {
      state: { community, profile },
      props: { account },
      slug, setProfile, LoginPrompt,
    } = this;

    if (!community) return null;
    return (
      <div>
        <Header {...{ community }} />
        {
          (profile && <MemberArea {...{ community, profile }} />)
          || (account && <Join slug={slug} onJoin={setProfile} />)
          || <LoginPrompt />
        }
      </div>
    );
  }
}

export default Community;
