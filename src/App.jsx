import { MantineProvider, AppShell } from "@mantine/core";
import "@mantine/core/styles.css";
import "@mantine/dropzone/styles.css";
import "./App.css";

import Header from "./components/Layout/Header";
import Footer from "./components/Layout/Footer";
import MainContent from "./components/MainContent";

export default function App() {
  return (
    <MantineProvider>
      <AppShell header={{ height: 60 }} footer={{ height: 60 }}>
        <Header />

        <AppShell.Main className="main-container">
          <MainContent />
        </AppShell.Main>

        <Footer />
      </AppShell>
    </MantineProvider>
  );
}
