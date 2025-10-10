import { RecipeProvider } from "./contexts/RecipeContext";
import MainPage from "./pages/MainPage";

function App() {
  return (
    <RecipeProvider>
      <MainPage />
    </RecipeProvider>
  );
}

export default App;
