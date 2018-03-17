import React from 'react';
import Typography from 'material-ui/Typography';

import CommunitiesFetcher from '../../fetchers/CommunitiesFetcher';
import ProfileFetcher from '../../fetchers/ProfileFetcher';
import SimpleDialog from './Widgets/SimpleDialog';
import Banner from './Community/Banner';
import MemberArea from './Community/MemberArea';
import { shape, accountShape } from './propShapes';
import { H1, Caption } from './Widgets/Text';

const LoginPrompt = community => (
  <Banner>
    <Typography variant="body2">
      Sign in to join {community.name}
    </Typography>
  </Banner>
);
const JoinButton = createProfile => (
  <SimpleDialog
    label="Pick a handle to join!"
    handleSubmit={createProfile}
  />
);

class Community extends React.Component {
  static propTypes = {
    account: shape(accountShape).isRequired,
  }
  static defaultProps = { account: null }

  constructor(props) {
    super(props);
    const { slug } = props.match.params;
    this.profileFetcher = new ProfileFetcher(slug);
    this.communitiesFetcher = new CommunitiesFetcher();
    this.state = {
      community: props.location.state && props.location.state.data,
      profile: null,
    };
  }

  componentDidMount() {
    if (this.props.account) this.getProfile();
    if (!this.state.community) this.getCommunity();
  }

  componentWillReceiveProps({ account }) {
    const oldAccount = this.props.account;
    if (account && !oldAccount) this.getProfile();
    if (oldAccount && !account) this.setState({ profile: null });
  }

  setCommunity = community => this.setState({ community })
  getCommunity = () => this.communitiesFetcher.get(this.props.match.params.slug)
    .then(this.setCommunity);

  setProfile = profile => this.setState({ profile });
  getProfile = () => this.profileFetcher.get()
    .then(this.setProfile);
  createProfile = handle => this.profileFetcher.create(handle)
    .then(this.setProfile);

  render() {
    const {
      state: { community, profile },
      props: { account },
      createProfile,
    } = this;

    if (!community) return null;
    return (
      <div>
        <H1>{community.name}</H1>
        <Caption style={{ width: '80%', margin: 'auto' }}>
          {community.description}
        </Caption>
        {
          (profile && <MemberArea {...{ community, profile }} />)
          || (account && JoinButton(createProfile))
          || LoginPrompt(community)
        }
      </div>
    );
  }
}

export default Community;
