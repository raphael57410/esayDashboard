import { Suspense, useEffect, useState } from "react";
import { invoke } from "@tauri-apps/api/tauri";
import { Button } from "@tremor/react";
import "./App.css";
import { useMainUrlStore } from "./Store/store";
import Home from "./components/Home/Home";
import Loader from "./components/Loader/Loader";

function App() {
  const [greetMsg, setGreetMsg] = useState("");
  const [name, setName] = useState<string>("");
  const [mainUrl, setMainUrl] = useMainUrlStore(state => [state.mainUrl, state.setMainUrl])


  async function greet() {
    // Learn more about Tauri commands at https://tauri.app/v1/guides/features/command
    setGreetMsg(await invoke("greet", { name }));
  }

  useEffect(() => {
    console.log('je rebuild');

  }, [mainUrl])

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
            <Button type="button" size="xs" onClick={() => {
              setMainUrl(name)
            }}>Envoyer</Button>
          </form>
          <p>{greetMsg}</p>
        </div>
      </div>}

      {mainUrl &&
        <Home />
      }

    </div>
  );
}

export default App;
