const mongoose = require("mongoose");
const db = require("../models");

// This file empties the Books collection and inserts the books below

mongoose.connect(
  process.env.MONGODB_URI || "mongodb://localhost/cookitrecipes"
);

const recipeSeed = [
    {
        thumbnail: "https://www.platingsandpairings.com/wp-content/uploads/2018/10/shishito-peppers-5.jpg",
        href: "https://www.platingsandpairings.com/grilled-shishito-peppers/",
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
    },
    {
      thumbnail: "https://assets.bonappetit.com/photos/57aca9571b334044149750ef/16:9/w_2560,c_limit/spaghetti-with-tomato-and-walnut-pesto.jpg",
      href: "https://www.bonappetit.com/recipe/spaghetti-with-tomato-and-walnut-pesto",
      ingredients:[
          "2/3 cup walnuts",
          "2 pints cherry tomatoes, halved",
          "2 tablespoons plus ⅓ cup olive oil, plus more for drizzling",
          "Kosher salt",
          "6 oil-packed anchovies, coarsely chopped",
          "2 garlic cloves, coarsely chopped",
          "1 teaspoon finely grated lemon zest",
          "¼ teaspoon crushed red pepper flakes",
          "½ ounces Parmesan, finely grated (about ½ cup), plus more for serving",
          "1 teaspoon freshly ground black pepper",
          "12 ounces spaghetti",
          "½ cup (packed) basil leaves"
      ],
      instructions:[
          "Preheat oven to 350°. Toast walnuts on a rimmed baking sheet, tossing once, until slightly darkened, 8–10 minutes",
          "Let cool.",
          "Heat broiler. Toss tomatoes with 2 Tbsp. oil on a rimmed baking sheet; season with salt. Broil, tossing once, until tomatoes are blistered and have released some of their liquid, 5–7 minutes.",
          "Let cool.",
          "Pulse anchovies, garlic, lemon zest, red pepper flakes, and ½ oz. Parmesan in a food processor until finely ground.",
          "Add walnuts and half of tomatoes, then, with motor running, stream in ⅓ cup oil; process just until combined. Season with salt.",
          "Transfer pesto to a large bowl and stir in black pepper.",
          "Cook pasta in a large pot of boiling salted water, stirring occasionally, until al dente.",
          "Drain, reserving ½ cup pasta cooking liquid.",
          "Transfer pasta to bowl with pesto and add a splash of pasta cooking liquid. Toss, adding more cooking liquid as needed, until sauce coats pasta.",
          "Add basil and remaining tomatoes.",
          "Divide among bowls; top with more Parmesan and black pepper and drizzle with oil.",
          "Do Ahead: Pesto can be made 1 day ahead. Cover and chill."
      ],
      title: "Spaghetti with Tomato and Walnut Pesto",
      summary: null,
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
