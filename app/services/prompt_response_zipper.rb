module PromptResponseZipper
  class << self

    def zip_profile_fields(profile)
      zip(profile, 'profile', ['body AS response'])
    end

    def zip_match_questions(profile)
      zip(profile, 'match', ['answer', 'weight', 'ideal', 'explanation'])
    end

    private

      def zip(profile, type, attributes)
        "#{type}_prompts".classify.constantize.find_by_sql("
            SELECT
              prompts.id AS id,
              prompts.text AS prompt,
              #{attributes.map{ |a| "responses.#{a}" }.join(', ')}
            FROM
              #{type}_prompts AS prompts
            LEFT OUTER JOIN
              #{type}_responses AS responses
                ON
              responses.#{type}_prompt_id = prompts.id
                AND
              responses.profile_id = #{profile.id}
            WHERE
              prompts.community_id = #{profile.community_id}
          ")
      end

  end
end
