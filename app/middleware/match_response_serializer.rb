class QuestionSerializer < ApplicationSerializer

  def initialize(*args, &block)
    super(*args, &block)
    pp([*args, { '&block': block } ])
  end

  attributes(
    :id,
    :prompt,
    :answer,
    :weight,
    :ideal,
    :explanation
  )

  # delegates :answer, :response, :weight, :ideal, to: { object[:prompt] }

  def id
    object['prompt'].id
  end

  def prompt
    object['prompt'].text
  end

  def answer
    object['response'].answer
  end

  def weight
    object['response'].weight
  end

  def ideal
    object['response'].ideal
  end

  def explanation
    object['response'].explanation
  end

end
