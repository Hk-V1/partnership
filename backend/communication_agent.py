class CommunicationAgent:
    def compose_message(self, context, formality="formal"):
        if formality == "formal":
            msg = f"Dear partner,\n\n{context}\n\nBest regards,\nYour Team"
        else:
            msg = f"Hi,\n{context}\nThanks!"
        return msg

    def analyze_tone(self, message):
        lowmsg = message.lower()
        if "urgent" in lowmsg or "asap" in lowmsg or "immediately" in lowmsg:
            return [{"label": "urgent", "score": 0.9}]
        elif "thank" in lowmsg or "appreciat" in lowmsg:
            return [{"label": "positive", "score": 0.9}]
        elif "problem" in lowmsg or "unfortunately" in lowmsg:
            return [{"label": "negative", "score": 0.8}]
        else:
            return [{"label": "neutral", "score": 0.75}]
