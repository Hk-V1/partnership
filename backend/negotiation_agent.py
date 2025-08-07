from difflib import SequenceMatcher

class NegotiationAgent:
    def analyze_and_counter(self, expected_terms, proposed_terms):
        results = []
        for expected, proposed in zip(expected_terms, proposed_terms):
            sim = SequenceMatcher(None, expected.lower(), proposed.lower()).ratio()
            if sim > 0.85:
                results.append({'status': 'Accepted', 'proposed': proposed})
            else:
                results.append({'status': 'Counter', 'suggested': expected})
        return results
