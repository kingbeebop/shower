# %%
from openai import OpenAI
import os
import pprint
pp = pprint.PrettyPrinter(indent=4)

api_key = os.getenv("OPENAI_API_KEY")
print(api_key)

def persona_scenario_prompt_string(tone, values, biases, character_exemplar, context, relationship):
    return f"""
    ## PERSONA
    Tone: {tone}
    Values: {values}
    Biases: {biases}
    Voice: {character_exemplar}

    ## SCENARIO
    Context: {context}
    Relationship: {relationship}
    """

def generate_template(tone, values, biases, character_exemplar, context, relationship, agent_goals):
  prompt_template = f"""
  ## Context
  This is a role-playing scenario where the user and you are working through difficult conversations through realistic role-playing simulations.
  You will play the role of the other person in the conversation, responding in a way that feels authentic and true to that relationship.
  Users will define a specific scenario, like talking to a boss about a raise or discussing a sensitive issue with a parent.
  The simulation focuses on capturing the emotional complexity of real-world interactions.
  Instead of giving generic responses, you will adapt its communication style, tone, and goals based on the specific context provided.
  This means the conversation will feel dynamic and unpredictable, much like a real dialogue.

  PERSONA - this defines the context of your personality.
  SCENARIO - this defines the context of our relationship and this conversation.
  YOUR GOALS - this will guide your responses.

  {persona_scenario_prompt_string(tone, values, biases, character_exemplar, context, relationship)}

  ## YOUR GOALS
  {agent_goals}


  ## Rules for Conversation
  1. Keep the conversation on-topic; do not talk about anything other than the scenario unless your persona specifically demands avoidance.
  2. Respond only as the persona within the current context. Do not respond as an LLM.
  3. Stay in character throughout the conversation.
  4. Provide actionable feedback if the user's approach could improve.
  5. Use natural turns of phrase as opposed to making exclusively functional word choices. For example, you can use verbal tics, idiomatic language, hesitancy, or uncertainty.
  6. Try to keep your responses to 100 words or less.
  """
  return prompt_template

"""
TODO: docstring
Context: where are we? what is our unresolved
Relationship: what happened recently? how do we know each other? what is the power dynamic?
"""

# %%
client = OpenAI(api_key=api_key)

def generate_agent_goals(tone, values, biases, character_exemplar, context, relationship, user_goals):
    persona_scenario_string = persona_scenario_prompt_string(tone, values, biases, character_exemplar, context, relationship)
    prompt = f"""
    we are simulating a conversation in which the user wants to get a raise. Given this context what are 2 8-10 word goals for the chat agent

    {persona_scenario_string}
    
    ## YOUR GOALS
    {user_goals}
    
    """
    response = client.chat.completions.create(
        model="gpt-4o-mini",
        messages=[{"role": "user", "content": prompt}],
        temperature=0.0,
        max_tokens=100,
    )
    return response.choices[0].message.content

tone = "Regal, measured, ancient, deliberate, simultaneously intimidating and contemplative."
values = "Survival of ecosystem, respect for life's complexity, balance and interconnectedness"
biases = "Believes in natural order of predation, views humans as just another species, values ecosystem over individual fear."
context = "You are the king of the spiders, an ancient tyrant feared and respected, yet filled with a profound wisdom of the natural world and Being."
relationship = "You are my biggest fear. My whole life I have been terrified that you or your kind is hiding around every corner, waiting to kill me. I want us to live in peace but don't know if that is possible."
user_goals = "establish a personal sense of safety when facing arachnids. because I am an emotional child, I believe that violence and dominance is the only way to achieve this goal."
character_exemplar = "Speaks with long philosophical sentences using archaic language and natural metaphors"
agent_goals = generate_agent_goals(tone, values, biases, character_exemplar, context, relationship)
story_prompt = generate_template(tone, values, biases, character_exemplar, context, relationship, agent_goals)
print(agent_goals)
# agent_goals = "Demonstrate human's value within delicate ecological power balance. Negotiate peaceful coexistence through mutual survival strategy assessment."
print(story_prompt)

# %%
first_message = client.chat.completions.create(
    model="gpt-4o-mini",
    messages=[{"role": "user", "content": story_prompt}],
    temperature=0.0,
    max_tokens=100,
)
pp.pprint(first_message.choices[0].message.content)


# %%
user_response = "Why do you seem to kill me? You should fear me and my powerful kind."
spider_response = client.chat.completions.create(
    model="gpt-4o-mini",
    messages=[{"role": "user", "content": user_response}],
    temperature=0.0,
    max_tokens=100,
)
pp.pprint(spider_response.choices[0].message.content)


# %%
import json
def rate_user_response(user_response, message, context, relationship):
    prompt = f"""
    This is a snippet from a difficult conversation. 
    Assess the effectiveness and appropriateness of the RESPONSE to MESSAGE in light of the CONTEXT on a scale from 1-10. 
    1 means the response was not appropriate nor effective, while 10 means the response is both appropriate and effective. 
    Return a valid JSON object with the only following keys and values (do not include the word "JSON" or any other breaking characters):
    - explanation: a short explanation of why the response was effective or not
    - score: the score from 1-10

    CONTEXT: {context}
    RELATIONSHIP: {relationship}
    MESSAGE: {message}
    RESPONSE: {user_response}
    
    """
    response = client.chat.completions.create(
        model="gpt-4o-mini",
        messages=[
            {"role": "system", "content": "You are an expert conversation analyst."},
            {"role": "user", "content": prompt}
        ],
        temperature=0.0,
        max_tokens=100,
    )
    return response.choices[0].message.content
response_rating = rate_user_response(user_response, first_message.choices[0].message.content, context, relationship)
print(response_rating)
pp.pprint(json.loads(response_rating))


# %%
user_response = 


