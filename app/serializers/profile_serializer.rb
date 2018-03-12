class ProfileSerializer < ApplicationSerializer
  attributes :id, :handle, :fields

  def fields
    object.community.profile_prompts.select('
      profile_prompts.id, text AS prompt, prs.body AS response
    ').joins("
      LEFT OUTER JOIN profile_responses AS prs
        ON
      prs.profile_prompt_id = profile_prompts.id
        AND
      prs.profile_id = #{object.id}
    ")
  end
end
