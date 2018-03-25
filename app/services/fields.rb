module PromptResponse

  def for_profile(profile, type)
    profile
      .community["#{type}_prompts"]
      .left_joins("#{type}_responses")
      .where("#{type}_responses.profile_id": profile.id)
  end

end
