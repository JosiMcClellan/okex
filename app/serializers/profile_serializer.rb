class ProfileSerializer < ApplicationSerializer

  attributes :id, :handle, :fields, :questions

  def fields
    PromptResponseZipper.zip_profile_fields(object)
  end

  def questions
    PromptResponseZipper.zip_match_questions(object)
  end

end
