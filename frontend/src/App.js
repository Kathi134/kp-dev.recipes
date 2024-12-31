import {BrowserRouter, Route, Routes} from 'react-router-dom';
import MainLayout from './app/global/MainLayout';
import UserInfo from './app/pages/user/UserInfo';
import {GroceryEditAdd} from "./app/pages/data/GroceryEditAdd";
import ShoppingList from './app/pages/list/ShoppingList';
import Recipes from './app/pages/recipes/Recipes';
// import RecipeEditAdd from './app/pages/recipes/RecipeEditAdd';
import RecipeDetail from './app/pages/recipes/RecipeDetail';
import { Groceries } from './app/pages/data/Groceries';
import GptRecipeEditAdd from './app/pages/recipes/GptRecipeEditAdd';

function App() {
  return (
    <BrowserRouter>
      <MainLayout>
        <Routes>
          <Route path="/" element={<ShoppingList />} />
          <Route path="/user" element={<UserInfo />} />
          <Route path="/data" element={<Groceries />} />
          <Route path="/data/create-grocery" element={<GroceryEditAdd />} />
          <Route path="/recipes" element={<Recipes/>} />
          <Route path="/recipes/create-recipe" element={<GptRecipeEditAdd add/>} />
          <Route path="/recipes/:id" element={<RecipeDetail />} />
        </Routes>
      </MainLayout>
    </BrowserRouter>
  );
}

export default App;

