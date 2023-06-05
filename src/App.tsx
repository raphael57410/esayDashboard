import { Suspense, useState } from "react";
import { invoke } from "@tauri-apps/api/tauri";
import { Button } from "@tremor/react";
import "./App.css";
import { useMainUrlStore } from "./Store/store";
import Home from "./components/Home/Home";

function App() {
  const [greetMsg, setGreetMsg] = useState("");
  const [name, setName] = useState<string>("");
  const [mainUrl, setMainUrl] = useMainUrlStore(state => [state.mainUrl, state.setMainUrl])


  async function greet() {
    // Learn more about Tauri commands at https://tauri.app/v1/guides/features/command
    setGreetMsg(await invoke("greet", { name }));
  }

  return (
    <div className="container">
      {!mainUrl && <div className="w-screen flex items-center justify-center">
        <div>
          <h1>Entrer L'url de votre api</h1>
          <form
            className="row"
            onSubmit={(e) => {
              e.preventDefault();
              greet();
            }}
          >
            <input
              id="greet-input"
              onChange={(e) => setName(e.currentTarget.value)}
              placeholder="api url..."
            />
            <Button type="button" size="xs" onClick={() => setMainUrl(name)}>Envoyer</Button>
          </form>
          <p>{greetMsg}</p>
        </div>
      </div>}

      {mainUrl &&
        <Suspense fallback={'LOADING....'}>
          <Home />
        </Suspense>
      }

    </div>
  );
}

export default App;
