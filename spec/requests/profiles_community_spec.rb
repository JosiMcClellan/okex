# require_relative 'request_spec_helper'
#
# describe 'profiles#community' do
#   let (:community)  { create(:community) }
#   let (:account)    { create(:account) }
#   let (:path)       { "/api/v1/communities/#{community.slug}/profile/community" }
#   let (:headers)    { token_header(account.token) }
#
#   context 'when the account has no profile for the community' do
#     specify 'it sends a forbidden error' do
#       get path, headers: headers
#       expect(contents).to match(error: String)
#       # expect_error 403
#     end
#   end
#
#   context 'when the account has a profile for the community' do
#     specify 'it sends all the information' do
#       create(:profile, account: account, community: community)
#       get path, headers: headers
#       expect(contents).to match(
#         handle: String,
#         discussions: [{
#           id: Integer,
#           topic: String
#         }],
#         profileFields: [{
#           id: Integer,
#           prompt: String,
#           response: optional(String)
#         }],
#       )
#     end
#   end
# end
