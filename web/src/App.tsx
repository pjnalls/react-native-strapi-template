import "./App.css";
import { PersistGate } from "redux-persist/integration/react";
import { Provider } from "react-redux";
import { persistor, store } from "./redux/Store";

import useCachedResources from "./hooks/useCachedResources";
import { Navigation } from "./navigation";

function App() {
  const isLoadingComplete = useCachedResources();
  
  if (!isLoadingComplete) {
    return null;
  } else {
    return (
      <Provider store={store}>
        <PersistGate loading={null} persistor={persistor} />
        <Navigation />
      </Provider>
    );
  }
}

export default App;
