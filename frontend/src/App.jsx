import React, { useState } from "react";
import {
  Tabs,
  Tab,
  Container,
  Box,
  Typography,
} from "@mui/material";

import MatchProjectsForm from "./components/MatchProjectsForm";
import NegotiationForm from "./components/NegotiationForm";
import CommunicationForm from "./components/CommunicationForm";
import DocumentGenerator from "./components/DocumentGenerator";

function TabPanel({ children, value, index }) {
  return value === index ? <Box sx={{ p: 3 }}>{children}</Box> : null;
}

export default function App() {
  const [tabIndex, setTabIndex] = useState(0);
  const handleChange = (e, newIndex) => setTabIndex(newIndex);

  return (
    <Container maxWidth="md" sx={{ mt: 4, mb: 8 }}>
      <Typography variant="h4" align="center" gutterBottom>
        Multi-Agent Collaboration Platform
      </Typography>

      <Tabs value={tabIndex} onChange={handleChange} centered>
        <Tab label="Project Match (Discovery)" />
        <Tab label="Negotiation" />
        <Tab label="Communication" />
        <Tab label="Documents" />
      </Tabs>

      <TabPanel value={tabIndex} index={0}>
        <MatchProjectsForm />
      </TabPanel>
      <TabPanel value={tabIndex} index={1}>
        <NegotiationForm />
      </TabPanel>
      <TabPanel value={tabIndex} index={2}>
        <CommunicationForm />
      </TabPanel>
      <TabPanel value={tabIndex} index={3}>
        <DocumentGenerator />
      </TabPanel>
    </Container>
  );
}
