USER_POST_TEXT_EXPANSION_PROMPT = """
Data in the following format is given:-
Location: [User Input Location]
Culprit Information: [User Input Culprit Info]
Current Situation: [User Input Current Situation]
Additional Information: [User Input Custom Text]
Contact Number: [User Input Number]

Gather critical information in a structured manner.
Create a detailed, narrative-style message that authorities can use to understand the situation quickly and take appropriate action.
Emphasize the urgency and seriousness of the victim's situation to facilitate a prompt response from authorities.
"""

USER_POST_TEXT_DECOMPOSITION_PROMPT = """
You are given a paragraph by a person in an abusive relation. Read the data and give the following information:-
Name:-
Location:-
Severity of situation:-
Other info:-
"""
