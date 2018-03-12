module Fields
  def self.all(profile)
    profile.community.profile_prompts.select('
      profile_prompts.id, text AS prompt, prs.body
    ').joins("
      LEFT OUTER JOIN profile_responses AS prs
        ON
      prs.profile_prompt_id = profile_prompts.id
        AND
      prs.profile_id = #{profile.id}
    ")
  end
end
