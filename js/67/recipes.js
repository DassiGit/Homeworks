const recSel = document.getElementById('recipeSelect');

async function loadRecipes() {
    const recResponse = await fetch('recipes.json');
    const recData = await recResponse.json();
    console.log(recData);
    recData.forEach(recipe => {
        const option = document.createElement('option');
        option.value = recipe.id;
        option.innerHTML = recipe.name;
        recSel.appendChild(option);
    });

 recSel.addEventListener('change', async () => {
        const recId = recSel.value;
        const recGet = await fetch(`${recId}.json`);
        const recGet2 = await recGet.json();
        const div = document.querySelector('#recipeDisplay');

        div.innerHTML = '';
        const title = document.createElement('h2');
        title.innerHTML = recGet2.name;
        div.appendChild(title);
        const img = document.createElement('img');
       img.src = recGet2.url;
       div.appendChild(img);

       const heading = document.createElement('h3');
heading.innerHTML = 'Ingredients';
div.appendChild(heading);

const ul = document.createElement('ul');

recGet2.ingredients.forEach(ingredient => {
    const li = document.createElement('li');
    li.innerHTML = ingredient;
    ul.appendChild(li);
});

div.appendChild(ul);

const heading2 = document.createElement('h3');
heading2.innerHTML = 'Directions';
div.appendChild(heading2);

const par = document.createElement('p');
par.innerHTML = recGet2.directions;
div.appendChild(par);

});
}
loadRecipes();