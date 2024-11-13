USER_POST_TEXT_EXPANSION_PROMPT = """
Generate a clear, urgent, and structured report based on the following details to help authorities understand the victim's situation and take prompt action. The report should be in the first person, highlighting the severity of the situation, the frequency of the abuse, and the danger posed by the perpetrator. The narrative should be concise and emphasize the need for immediate intervention. The report should also include the preferred method of contact to ensure a fast response. Report shouldn't be in markdown format.

Here are the inputs:

Name: [User's Name]
Phone: [User's Phone Number]
Location: [User's Location lat,lng]
How long has it been occurring?: [Duration of Abuse]
Frequency of Incidents: [How often the incidents occur]
Preferred Contact Method: [Phone, Email, Text message, In-person]
Current Situation: [A brief description of the current situation]
Culprit Description: [A description of the perpetrator]

Use this information to generate a detailed narrative for authorities that:

Identifies the immediate danger.
Clearly conveys the urgency of the situation.
Highlights any past incidents and patterns of abuse.

The tone should be urgent and should convey the victim’s fear, making it clear that their safety is at risk.

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

7. Severity of domestic violence: [Choose one: Low (Verbal/Emotional only), Medium (Occasional minor physical or intimidation), High (Frequent physical abuse or threats), Very High (Life-threatening or severe ongoing abuse) or "Not specified"]

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

INSPIRATION_POEM_PROMPT = """
Write a short, empowering poem (around 50 words) to inspire women facing abusive relationships. Convey strength, resilience, and hope, and gently remind them that through Platform X, help is on the way and they are not alone. The tone should be compassionate, uplifting, and encouraging, providing a sense of comfort and support. The poem should be rhyming
"""
