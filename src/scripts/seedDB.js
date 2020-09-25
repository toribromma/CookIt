const mongoose = require("mongoose");
const db = require("../models");

// This file empties the Books collection and inserts the books below

mongoose.connect(
  process.env.MONGODB_URI || "mongodb://localhost/cookitrecipes"
);

const recipeSeed = [
    {
        thumbnail: "",
        href: "",
        ingredients:[
            "1/2 pound shishito peppers",
            "1 Tablespoon olive oil",
            "1/4 teaspoon togarashi",
            "Coarse sea salt (such as fleur de sel or Maldon)",
            "1 lemon (cut into wedges)"
        ],
        instructions:[
            "Heat a large heavy skillet over medium-high heat.",
            "Place the peppers in a medium bowl and toss with olive oil; set aside.",
            "When the skillet is hot, arrange the peppers in a single layer; reserve the bowl they were in",
            "Saute the peppers uncovered, turning occasionally, until they charred and blistered, about 6 to 8 minutes total.",
            "Return the peppers to the bowl, and toss with togarashi and salt. Squeeze lemon over peppers, to taste. Serve immediately.",
        ],
        title: "Blistered Shishito Peppers",
        summary: "You can never have too many side dish recipes, so give Blistered Shishito Peppers a try. For <b>35 cents per serving</b>, this recipe <b>covers 5%</b> of your daily requirements of vitamins and minerals. This recipe serves 4. One portion of this dish contains about <b>1g of protein</b>, <b>4g of fat</b>, and a total of <b>50 calories</b>. From preparation to the plate, this recipe takes roughly <b>13 minutes</b>. 1 person found this recipe to be delicious and satisfying. Head to the store and pick up coarse sea salt, olive oil, togarashi, and a few other things to make it today. It is a good option if you're following a <b>gluten free, dairy free, paleolithic, and lacto ovo vegetarian</b> diet. It is brought to you by Platings & Pairings. Taking all factors into account, this recipe <b>earns a spoonacular score of 66%</b>, which is solid. If you like this recipe, take a look at these similar recipes: <a href=\"https://spoonacular.com/recipes/blistered-shishito-peppers-1000784\">Blistered Shishito Peppers</a>, <a href=\"https://spoonacular.com/recipes/blistered-shishito-peppers-1035747\">Blistered Shishito Peppers</a>, and <a href=\"https://spoonacular.com/recipes/blistered-shishito-peppers-with-sriracha-cream-sauce-567244\">Blistered Shishito Peppers with Sriracha Cream Sauce</a>.",
        date: new Date(Date.now())
    }
]

db.Recipe.remove({})
  .then(() => db.Recipe.collection.insertMany(recipeSeed))
  .then(data => {
    console.log(data.result.n + " records inserted!");
    process.exit(0);
  })
  .catch(err => {
    console.error(err);
    process.exit(1);
  });
