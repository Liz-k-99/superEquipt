//adds users activities 
const form1 = document.querySelector('#activityForm')
form1.addEventListener('submit', (event) => {
    event.preventDefault()
    logActivity(event.target.activities.value)

    form1.reset()
});

const logActivity = (activity) => {
    let li = document.createElement('li')
    li.textContent = activity
    document.querySelector('#activitySubmit').appendChild(li)
    li.addEventListener('click', event => event.target.remove())
}

//adds users equipment 
const form2 = document.querySelector('#equipmentForm')
form2.addEventListener('submit', (event) => {
    event.preventDefault()
    logEquipment(event.target.equipment.value)
    form2.reset()
});

const logEquipment = (equipment1) => {
    let li = document.createElement('li')
    li.textContent = equipment1
    document.querySelector('#equipmentSubmit').appendChild(li)
    li.addEventListener('click', event => event.target.remove())
}

document.addEventListener('DOMContentLoaded', () => {
    //const foodList = document.getElementById('foodList');
    const foodSearchBtn = document.querySelector('#findFood')
    const loadingMsg = document.querySelector('#loadingMsg')
    foodSearchBtn.addEventListener('click', (event) => {
        loadingMsg.style.display='block'
        searchFood()
        })
    })
    async function getFood() {
        try {
            const searchTerm = document.getElementById('searchInput').value;
            const url = `https://world.openfoodfacts.org/cgi/search.pl?search_terms=${searchTerm}&page_size=10&json=true`;
            const response = await fetch(url);
            const result = await response.json();
            displayFoodResults(result);
        } catch (error) {
            console.error(error);
        }
    }
    function searchFood() {
        foodList.textContent = ''
        getFood();

    }

    function displayFoodResults(result) {
        const foodList = document.getElementById('foodList');

        if (!result.products || result.products.length === 0) {
            const li = document.createElement('li');
            li.textContent = 'No results found';
            foodList.appendChild(li);
            return;
        }

        result.products.slice(0, 3).forEach(product => {
            const li = document.createElement('li');
            const foodLabel = document.createElement('h4');
            const foodImage = document.createElement('img');
            const nutrients = document.createElement('span');
            foodLabel.textContent = product.product_name 
            foodImage.src = product.image_url;

            // Extract nutrient information and format it
            const nutrientInfo = product.nutriments;
            const formattedNutrients = Object.entries(nutrientInfo)
                .map(([key, value]) => `${key}: ${value}`)
                .join(', ');
            nutrients.textContent = formattedNutrients;

            const filterNutriensts = Object.entries(nutrientInfo)
                .filter(([key, value]) => value > 0)
                .map(([key, value]) => `${key}: ${value}`)
                .join(',  ')
                nutrients.textContent = filterNutriensts;

            li.append(foodLabel);
            li.append(foodImage);
            li.appendChild(nutrients);
            foodList.appendChild(li);

            foodImage.style.width = "20%"
            foodImage.style.height = '5%'

        })

        loadingMsg.style.display = 'none'
        
    }

    

