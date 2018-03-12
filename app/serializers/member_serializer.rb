class MemberSerializer < ProfileSerializer

  attributes :handle, :profileFields, :discussions

  def discussions
    community.discussions
  end

  def profileFields
    community.profile_prompts.select('
      profile_prompts.id, text AS prompt, prs.body AS response
    ').joins("
      LEFT OUTER JOIN profile_responses AS prs
        ON
      prs.profile_prompt_id = profile_prompts.id
        AND
      prs.profile_id = #{profile.id}
    ")
  end

  def profile
    object
  end

  def community
    @community ||= profile.community
  end
end
