import React from 'react';
import PropTypes from 'prop-types';

import CommunitiesFetcher from '../../fetchers/CommunitiesFetcher';
import ProfileFetcher from '../../fetchers/ProfileFetcher';
import MemberArea from './Community/MemberArea';

class Subscription extends React.Component {
  static propTypes = {
    to: PropTypes.func.isRequired,
    name: PropTypes.string.isRequired,
    subscriber: PropTypes.func.isRequired,
  }

  constructor(props) {
    super(props);
    this.state = { data: null };
  }

  componentDidMount() {
    this.props.to().then(data => this.setState({ data }));
  }

  render() {
    const {
      to, name, subscriber, ...childProps
    } = this.props;
    childProps[name] = this.state.data;
    return <subscriber {...childProps} />;
  }
}

// class Community extends React.Component {
//   static propTypes = {
//     account: shape(accountShape).isRequired,
//   }
//   static defaultProps = { account: null }
//
//   constructor(props) {
//     super(props);
//     const { slug } = props.match.params;
//     this.profileFetcher = new ProfileFetcher(slug);
//     this.communitiesFetcher = new CommunitiesFetcher();
//     this.state = {
//       community: props.location.state && props.location.state.data,
//       profile: null,
//     };
//   }
//
//   componentDidMount() {
//     if (this.props.account) this.getProfile();
//     if (!this.state.community) this.getCommunity();
//   }
//
//   componentWillReceiveProps({ account }) {
//     const oldAccount = this.props.account;
//     if (account && !oldAccount) this.getProfile();
//     if (oldAccount && !account) this.setState({ profile: null });
//   }
//
//   setCommunity = community => this.setState({ community })
//   getCommunity = () => this.communitiesFetcher.get(this.props.match.params.slug)
//     .then(this.setCommunity);
//
//   setProfile = profile => this.setState({ profile });
//   getProfile = () => this.profileFetcher.get()
//     .then(this.setProfile);
//   createProfile = handle => this.profileFetcher.create(handle)
//     .then(this.setProfile);
//
//   render() {
//     const {
//       state: { community, profile },
//       props: { account },
//       createProfile,
//     } = this;
//
//     if (!community) return null;
//     return (
//       <div>
//         <H1>{community.name}</H1>
//         <Caption style={{ width: '80%', margin: 'auto' }}>
//           {community.description}
//         </Caption>
//         {
//           (profile && <MemberArea {...{ community, profile }} />)
//           || (account && JoinButton(createProfile))
//           || LoginPrompt(community)
//         }
//       </div>
//     );
//   }
// }

export default Subscription;
