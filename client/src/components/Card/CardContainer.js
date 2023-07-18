import React, {useEffect, useState} from 'react';
import Card from './Card';
import CardImage from './CardImage';
import CardHeader from './CardHeader';
import API from '../../utils/API';
import ToggleContainer from './ToggleContainer';
import Input from '../Input/index.js';

export default function CardContainer({ user, recipes, setRecipes, loadRecipes }) {
  const [search, setSearch] = useState('');

  useEffect(() => {
    if (user) {
      API.getRecipes(user.sub)
          .then((res) => {
            if (search) {
              const filter = recipes.filter((recipe) => {
                return recipe.title.toLowerCase().includes(search.toLowerCase());
              });
              setRecipes(filter);
            } else {
              setRecipes(res.data);
            }
          })
          .catch((err) => console.log(err));
    }
  }, [user,search]);

  const [edit, setEdit] = useState(false);
  const [title, setTitle] = useState();


  function deleteRecipe(id) {
    let r = window.confirm('Are you sure you want to delete?');

    if (r === true) {
      API.deleteRecipe(id)
          .then(loadRecipes)
          .catch((err) => console.log(err));
    }
  }

  const editMode = () => {
    setEdit(true);
  };

  const submitUpdate = (e) => {
    // e.preventDefault();
    console.log(title)
    // console.log(props.recipe._id)
    // API.updateRecipeTitle({
    //   id: id,
    //   title: title,
    // }).then(setEdit(false)).then(
    //   loadRecipes
    // );
  };

  if (recipes) {
    // return <span>No recipes found</span>;

    // else {
    return (
      <>
        <Input
          header="Filter through Recipes"
          placeholder="Filter Recipes"
          name="filteredArray"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
        <div
          style={{
            display: 'flex',
            flexFlow: 'row wrap',
            alignItems: 'stretch',
            justifyContent: 'center',
            margin: 'auto',
            height: 'fit-content',
          }}
        >
          {recipes.map((recipe) => {
            return (
              <Card className="card" key={recipe._id}>
                {!recipe.thumbnail ? (
                  <div
                    style={{
                      width: 200,
                      height: 200,
                    }}
                  >
                    No picture found
                  </div>
                ) : (
                  <CardImage alt={recipe.title} cardImage={recipe.thumbnail} />
                )}

                <CardHeader id={recipe._id} key={recipe._id}>
                  {recipe.title}
                  {/* {!edit ? (
                    <span
                      onClick={() =>
                        editMode()
                      }
                      style={{
                        paddingLeft: 10,
                        fontSize: 10,
                        color: 'red',
                        cursor: 'pointer',
                      }}
                    >
                      Edit
                    </span>
                  ) : (
                    ''
                  )} */}
                </CardHeader>
                {/* {edit ? (
                  <form 
                  id={recipe._id}
                  onSubmit={submitUpdate()}>
                    <input
                      style={{ width: '85%', margin: 10, padding: 5 }}
                      name="title"
                      value={title}
                      onChange={(e) => setTitle(e.target.value)}
                    />
                    <button
                      style={{
                        margin: 3,
                        padding: 5,
                        display: 'inline',
                        border: 'black solid 0.4px',
                      }}
                      type="submit"
                    >
                      Submit
                    </button>
                    <button
                      style={{
                        margin: 3,
                        padding: 5,
                        display: 'inline',
                        border: 'black solid 0.4px',
                      }}
                      onClick={() => setEdit(false)}
                    >
                      Cancel
                    </button>
                  </form>
                ) : (
                  ''
                )} */}

                <a
                  target="_blank"
                  rel="noopener noreferrer"
                  style={{
                    fontWeight: 600,
                  }}
                  href={recipe.href}
                >
                  <div style={{ textAlign: 'center', marginTop: 15 }}>
                    Link to Recipe
                  </div>
                </a>
                <ToggleContainer
                  ingredients={recipe.ingredients}
                  instructions={recipe.instructions}
                  deleteRecipe={deleteRecipe}
                  id={recipe._id}
                />
              </Card>
            );
          })}
        </div>
      </>
    );
  }
}
