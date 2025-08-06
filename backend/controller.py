from backend.discovery_agent import DiscoveryAgent
from backend.negotiation_agent import NegotiationAgent
from backend.communication_agent import CommunicationAgent
from backend.documentation_agent import DocumentationAgent

class MultiAgentController:
    def __init__(self):
        self.discovery = DiscoveryAgent()
        self.negotiation = NegotiationAgent()
        self.communication = CommunicationAgent()
        self.documentation = DocumentationAgent()
