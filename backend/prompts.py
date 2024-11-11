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
You are given a paragraph written by a person experiencing domestic abuse. Carefully analyze the paragraph and extract the following structured information. Please respond in the exact format provided below for consistency.

Output Format: It must be a key value pair separated by :

1. Name: [Extracted Name or "Not specified"]

2. Location: [Extracted Location or "Not specified"]

3. Preferred way of contact: [Preferred Contact Method or "Not specified"]

4. Contact info: [Extracted Contact Info or "Not specified"]

5. Frequency of domestic violence: [e.g., Daily, Weekly, Occasionally, or "Not specified"]

6. Relationship with perpetrator: [e.g., Spouse, Partner, Family Member, or "Not specified"]

7. Severity of domestic violence: [Choose one: Sev1 (Verbal/Emotional only), Sev2 (Occasional minor physical or intimidation), Sev3 (Frequent physical abuse or threats), Sev4 (Life-threatening or severe ongoing abuse) or "Not specified"]

8. Nature of domestic violence: [Physical, Emotional, Financial, Psychological, or Combination if applicable; otherwise "Not specified"]

9. Impact on children: [Description of impact on children if mentioned, or "Not specified"]

10. Culprit details: [Description of physical appearance, behavior, or other identifiers if available, or "Not specified"]

11. Other info: [Any additional information provided or "Not specified"]

Instructions for Extraction:

Look for keywords or phrases that indicate the person's name, location, and contact details.
Identify any specific contact method they prefer, such as phone or email.
Determine the frequency of abusive incidents and specify it in simple terms (e.g., daily, weekly).
Identify the relationship between the person and the abuser.
Rate the severity level based on clues in the text, choosing from Sev1 to Sev4.
Classify the nature of abuse (e.g., physical, emotional).
Note any impact on children as described.
Provide culprit details if the person describes the abuser's appearance, behavior, or other identifying traits.
Include any other relevant information that provides additional context.
Note: Use "Not specified" if a detail is missing from the text.
"""
