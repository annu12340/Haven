import os

import google.generativeai as genai
import speech_recognition as sr
from dotenv import load_dotenv
from elevenlabs import play
from elevenlabs.client import ElevenLabs

load_dotenv()


class colors:
    PURPLE = "\033[95m"
    CYAN = "\033[96m"
    DARKCYAN = "\033[36m"
    BLUE = "\033[94m"
    GREEN = "\033[92m"
    YELLOW = "\033[93m"
    RED = "\033[91m"
    BOLD = "\033[1m"
    UNDERLINE = "\033[4m"
    END = "\033[0m"  # End color sequence


class AI_Assistant:
    def __init__(self):
        self.elevenlabs_api_key = "s"
        self.gemma_api_key = "A"

        self.full_transcript = []

    def start_transcription(self):
        # Initialize speech recognizer
        self.recognizer = sr.Recognizer()

    def stop_transcription(self):
        pass

    def speech_to_text(self):
        with sr.Microphone() as source:
            print(colors.PURPLE + colors.BOLD + "\n User: " + colors.END)
            audio = self.recognizer.listen(source)

        try:
            text = self.recognizer.recognize_google(audio)
            print(f"{text}")
            self.generate_ai_response(text)
        except sr.UnknownValueError:
            print("Speech Recognition could not understand audio")
        except sr.RequestError as e:
            print(f"Could not request results from Speech Recognition service; {e}")

    def generate_ai_response(self, text):
        self.full_transcript.append({"role": "user", "content": text})
        genai.configure(api_key=os.getenv("GEMINI_API_KEY"))

        model = genai.GenerativeModel("gemini-1.5-flash")
        ai_response = model.generate_content(f"You are my theraist")
        print(ai_response.text)

        print(colors.GREEN + "\nAI Receptionist: " + colors.END)
        print(ai_response)
        self.generate_audio(ai_response.text)

    def generate_audio(self, text):
        self.full_transcript.append({"role": "assistant", "content": text})
        # audio_stream = generate(
        #     api_key=self.elevenlabs_api_key, text=text, voice="Rachel", stream=True
        # )
        # stream(audio_stream)
        client = ElevenLabs(api_key=self.elevenlabs_api_key)

        audio = client.generate(
            text=text, voice="Brian", model="eleven_multilingual_v2"
        )
        play(audio)


if __name__ == "__main__":
    print("\n\n\n")
    greeting = "Hey there! How are you feeling today?"
    print(colors.GREEN + "\nAI Receptionist: " + colors.END)
    print(greeting)
    ai_assistant = AI_Assistant()
    ai_assistant.generate_audio(greeting)
    ai_assistant.start_transcription()

    # Continuously listen for speech input
    while True:
        ai_assistant.speech_to_text()
