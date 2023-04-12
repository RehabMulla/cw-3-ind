<template>
    <div>
        <br>
        <div id="searchBar" v-if="showItem">
                    <p>
                        Search:
                        <input type="text" class="findLesson" v-model="checkLesson" />
                    </p>
                </div>
                <br>
         <!-- style sheet CSS link -->
      <link rel="stylesheet" href="style.css">
         <!-- creating radio buttons to sort lessons -->
            <div class="sortLessons" v-if="showItem">
                <h3>Sort Lessons:</h3>
                <!-- sorting lessons based on low to high price -->
                <p><input type="radio" id="lowToHighPrice" value="lowToHighPrice" v-model="sortMethod">
                    <label for="lowToHighPrice">Price: Low to High</label>
                </p>
                <!-- sorting lessons based on high to low price -->
                <p>
                    <input type="radio" id="highToLowPrice" value="highToLowPrice" v-model="sortMethod">
                    <label for="highToLowPrice">Price : High to Low</label>
                </p>
                <!-- sorting lessons based on A to Z alphabetical order for subject -->
                <p>
                    <input type="radio" id="letterAToZ" value="letterAToZ" v-model="sortMethod">
                    <label for="letterAToZ">Subject: A to Z</label>
                </p>
                <!-- sorting lessons based on Z to A alphabetical order for subject -->
                <p>
                    <input type="radio" id="letterZToA" value="letterZToA" v-model="sortMethod">
                    <label for="letterZToA">Subject: Z to A</label>
                </p>
                <p>
                    <input type="radio" id="letterAToZLocation" value="letterAToZLocation" v-model="sortMethod">
                    <label for="letterAToZ">Location: A to Z</label>
                </p>
                <!-- sorting lessons based on Z to A alphabetical order for subject -->
                <p>
                    <input type="radio" id="letterZToALocation" value="letterZToALocation" v-model="sortMethod">
                    <label for="letterZToA">Location: Z to A</label>
                </p>
                <p><input type="radio" id="lowToHighInventory" value="lowToHighAvailableInventory" v-model="sortMethod">
                    <label for="lowToHighPrice">AvailableInventory: Low to High</label>
                </p>
                <!-- sorting lessons based on high to low price -->
                <p>
                    <input type="radio" id="highToLowInventory" value="highToLowAvailableInventory" v-model="sortMethod">
                    <label for="highToLowPrice">AvailableInventory: High to Low</label>
                </p>
            </div>
 <!-- display search bar and sort radio btns only if lessons are displayed on screen  -->
                
            <!-- searching lesson in search bar -->
            <div v-if="checkLesson !== ''">
                <div v-for="item in searchFiltering" :key="item.id">
                    <div id="lessonbox">
                        <figure>
                            <img v-bind:src="item.Image" style="width:130px;height:110px;float:right;">
                        </figure>
                        <h4>Subject: {{item.subject}}</h4>
                        <!-- the double curly brackets is shorter version of 'v-text' moustache syntax (same thing)-->
                        <p>Location: {{item.location}}</p>
                        <p>Price: {{item.price}}</p>
                        <p>Available Lessons: {{item.availableInventory}}</p>
                        <button v-on:click="addToCart(item)" class="button" id="cartbtn" v-if="canAddToCart(item)">
                            Add to Cart
                        </button>
                        <br>
                        <!-- <span v-if='item.availableInventory === cartCount(item.id)'>All out!</span> -->
                        <!-- <span v-else-if="item.availableInventory - cartCount(item.id) < 5"> Only -->
                            <!-- {{item.availableInventory - cartCount(item.id)}} left!</span> -->
                        <!-- <span v-else>Buy now!</span> -->
                        <div>
                            <!-- <span v-for='n in item.rating'><i class="fa-solid fa-star"></i></span>
                            <span v-for='n in 5-item.rating'><i class="fa-regular fa-star"></i></span> -->
                        </div>
                    </div>
                </div>
            </div>

            <!-- sorting products from low to high price display results -->
            <div v-else-if="sortMethod === 'lowToHighPrice'">
                <div v-for="item in sortedProducts" :key="item.id">
                    <div id="lessonbox">
                        <figure>
                            <img v-bind:src="item.Image" style="width:130px;height:110px;float:right;">
                        </figure>
                        <h4>Subject: {{item.subject}}</h4>
                        <!-- the double curly brackets is shorter version of 'v-text' moustache syntax (same thing)-->
                        <p>Location: {{item.location}}</p>
                        <p>Price: {{item.price}}</p>
                        <p>Available Lessons: {{item.availableInventory}}</p>
                        <button v-on:click="addToCart(item)" class="button" id="cartbtn" v-if="canAddToCart(item)">
                            Add to Cart
                        </button>
                        <br>
                        <!-- <span v-if='item.availableInventory === cartCount(item.id)'>All out!</span>
                        <span v-else-if="item.availableInventory - cartCount(item.id) < 5"> Only
                            {{item.availableInventory - cartCount(item.id)}} left!</span>
                        <span v-else>Buy now!</span> -->
                        <div>
                            <!-- <span v-for='n in item.rating'><i class="fa-solid fa-star"></i></span>
                            <span v-for='n in 5-item.rating'><i class="fa-regular fa-star"></i></span> -->
                        </div>
                    </div>
                </div>
            </div>

            <!-- sorting products from high to low price display results -->
            <div v-else-if="sortMethod === 'highToLowPrice'">
                <div v-for="item in sortedHighProducts" :key="item.id">
                    <div id="lessonbox">
                        <figure>
                            <img v-bind:src="item.Image" style="width:130px;height:110px;float:right;">
                        </figure>
                        <h4>Subject: {{item.subject}}</h4>
                        <!-- the double curly brackets is shorter version of 'v-text' moustache syntax (same thing)-->
                        <p>Location: {{item.location}}</p>
                        <p>Price: {{item.price}}</p>
                        <p>Available Lessons: {{item.availableInventory}}</p>
                        <button v-on:click="addToCart(item)" class="button" id="cartbtn" v-if="canAddToCart(item)">
                            Add to Cart
                        </button>
                        <br>
                        <!-- <span v-if='item.availableInventory === cartCount(item.id)'>All out!</span>
                        <span v-else-if="item.availableInventory - cartCount(item.id) < 5"> Only
                            {{item.availableInventory - cartCount(item.id)}} left!</span>
                        <span v-else>Buy now!</span> -->
                        <div>
                            <!-- <span v-for='n in item.rating'><i class="fa-solid fa-star"></i></span>
                            <span v-for='n in 5-item.rating'><i class="fa-regular fa-star"></i></span> -->
                        </div>
                    </div>
                </div>
            </div>

            <!-- sorting products from A to Z alphabetical order of subjects to display results -->
            <div v-else-if="sortMethod === 'letterAToZ'">
                <div v-for="item in sortedProductsAtoZ" :key="item.id">
                    <div id="lessonbox">
                        <figure>
                            <img v-bind:src="item.Image" style="width:130px;height:110px;float:right;">
                        </figure>
                        <h4>Subject: {{item.subject}}</h4>
                        <!-- the double curly brackets is shorter version of 'v-text' moustache syntax (same thing)-->
                        <p>Location: {{item.location}}</p>
                        <p>Price: {{item.price}}</p>
                        <p>Available Lessons: {{item.availableInventory}}</p>
                        <button v-on:click="addToCart(item)" class="button" id="cartbtn" v-if="canAddToCart(item)">
                            Add to Cart
                        </button>
                        <br>
                        <!-- <span v-if='item.availableInventory === cartCount(item.id)'>All out!</span>
                        <span v-else-if="item.availableInventory - cartCount(item.id) < 5"> Only
                            {{item.availableInventory - cartCount(item.id)}} left!</span>
                        <span v-else>Buy now!</span> -->
                        <div>
                            <!-- <span v-for='n in item.rating'><i class="fa-solid fa-star"></i></span>
                            <span v-for='n in 5-item.rating'><i class="fa-regular fa-star"></i></span> -->
                        </div>
                    </div>
                </div>
            </div>

            <!-- sorting products from A to Z alphabetical order of subjects to display results -->
            <div v-else-if="sortMethod === 'letterZToA'">
                <div v-for="item in sortedProductsZtoA" :key="item.id">
                    <div id="lessonbox">
                        <figure>
                            <img v-bind:src="item.Image" style="width:130px;height:110px;float:right;">
                        </figure>
                        <h4>Subject: {{item.subject}}</h4>
                        <!-- the double curly brackets is shorter version of 'v-text' moustache syntax (same thing)-->
                        <p>Location: {{item.location}}</p>
                        <p>Price: {{item.price}}</p>
                        <p>Available Lessons: {{item.availableInventory}}</p>
                        <button v-on:click="addToCart(item)" class="button" id="cartbtn" v-if="canAddToCart(item)">
                            Add to Cart
                        </button>
                        <br>
                        <!-- <span v-if='item.availableInventory === cartCount(item.id)'>All out!</span>
                        <span v-else-if="item.availableInventory - cartCount(item.id) < 5"> Only
                            {{item.availableInventory - cartCount(item.id)}} left!</span>
                        <span v-else>Buy now!</span> -->
                        <div>
                            <!-- <span v-for='n in item.rating'><i class="fa-solid fa-star"></i></span>
                            <span v-for='n in 5-item.rating'><i class="fa-regular fa-star"></i></span> -->
                        </div>
                    </div>
                </div>
            </div>

            <div v-else-if="sortMethod === 'letterZToALocation'">
                <div v-for="item in sortedProductsZtoALocation" :key="item.id">
                    <div id="lessonbox">
                        <figure>
                            <img v-bind:src="item.Image" style="width:130px;height:110px;float:right;">
                        </figure>
                        <h4>Subject: {{item.subject}}</h4>
                        <!-- the double curly brackets is shorter version of 'v-text' moustache syntax (same thing)-->
                        <p>Location: {{item.location}}</p>
                        <p>Price: {{item.price}}</p>
                        <p>Available Lessons: {{item.availableInventory}}</p>
                        <button v-on:click="addToCart(item)" class="button" id="cartbtn" v-if="canAddToCart(item)">
                            Add to Cart
                        </button>
                        <br>
                        <!-- <span v-if='item.availableInventory === cartCount(item.id)'>All out!</span>
                        <span v-else-if="item.availableInventory - cartCount(item.id) < 5"> Only
                            {{item.availableInventory - cartCount(item.id)}} left!</span>
                        <span v-else>Buy now!</span> -->
                        <div>
                            <!-- <span v-for='n in item.rating'><i class="fa-solid fa-star"></i></span>
                            <span v-for='n in 5-item.rating'><i class="fa-regular fa-star"></i></span> -->
                        </div>
                    </div>
                </div>
            </div>

            <div v-else-if="sortMethod === 'letterAToZLocation'">
                <div v-for="item in sortedProductsAtoZLocation" :key="item.id">
                    <div id="lessonbox">
                        <figure>
                            <img v-bind:src="item.Image" style="width:130px;height:110px;float:right;">
                        </figure>
                        <h4>Subject: {{item.subject}}</h4>
                        <!-- the double curly brackets is shorter version of 'v-text' moustache syntax (same thing)-->
                        <p>Location: {{item.location}}</p>
                        <p>Price: {{item.price}}</p>
                        <p>Available Lessons: {{item.availableInventory}}</p>
                        <button v-on:click="addToCart(item)" class="button" id="cartbtn" v-if="canAddToCart(item)">
                            Add to Cart
                        </button>
                        <br>
                        <!-- <span v-if='item.availableInventory === cartCount(item.id)'>All out!</span>
                        <span v-else-if="item.availableInventory - cartCount(item.id) < 5"> Only
                            {{item.availableInventory - cartCount(item.id)}} left!</span>
                        <span v-else>Buy now!</span> -->
                        <div>
                            <!-- <span v-for='n in item.rating'><i class="fa-solid fa-star"></i></span>
                            <span v-for='n in 5-item.rating'><i class="fa-regular fa-star"></i></span> -->
                        </div>
                    </div>
                </div>
            </div>

            <div v-else-if="sortMethod === 'lowToHighAvailableInventory'">
                <div v-for="item in ascendingInventory" :key="item.id">
                    <div id="lessonbox">
                        <figure>
                            <img v-bind:src="item.Image" style="width:130px;height:110px;float:right;">
                        </figure>
                        <h4>Subject: {{item.subject}}</h4>
                        <!-- the double curly brackets is shorter version of 'v-text' moustache syntax (same thing)-->
                        <p>Location: {{item.location}}</p>
                        <p>Price: {{item.price}}</p>
                        <p>Available Lessons: {{item.availableInventory}}</p>
                        <button v-on:click="addToCart(item)" class="button" id="cartbtn" v-if="canAddToCart(item)">
                            Add to Cart
                        </button>
                        <br>
                        <!-- <span v-if='item.availableInventory === cartCount(item.id)'>All out!</span>
                        <span v-else-if="item.availableInventory - cartCount(item.id) < 5"> Only
                            {{item.availableInventory - cartCount(item.id)}} left!</span>
                        <span v-else>Buy now!</span> -->
                        <div>
                            <!-- <span v-for='n in item.rating'><i class="fa-solid fa-star"></i></span>
                            <span v-for='n in 5-item.rating'><i class="fa-regular fa-star"></i></span> -->
                        </div>
                    </div>
                </div>
            </div>

            <div v-else-if="sortMethod === 'highToLowAvailableInventory'">
                <div v-for="item in descendingInventory" :key="item.id">
                    <div id="lessonbox">
                        <figure>
                            <img v-bind:src="item.Image" style="width:130px;height:110px;float:right;">
                        </figure>
                        <h4>Subject: {{item.subject}}</h4>
                        <!-- the double curly brackets is shorter version of 'v-text' moustache syntax (same thing)-->
                        <p>Location: {{item.location}}</p>
                        <p>Price: {{item.price}}</p>
                        <p>Available Lessons: {{item.availableInventory}}</p>
                        <button v-on:click="addToCart(item)" class="button" id="cartbtn" v-if="canAddToCart(item)">
                            Add to Cart
                        </button>
                        <br>
                        <!-- <span v-if='item.availableInventory === cartCount(item.id)'>All out!</span>
                        <span v-else-if="item.availableInventory - cartCount(item.id) < 5"> Only
                            {{item.availableInventory - cartCount(item.id)}} left!</span>
                        <span v-else>Buy now!</span> -->
                        <div>
                            <!-- <span v-for='n in item.rating'><i class="fa-solid fa-star"></i></span>
                            <span v-for='n in 5-item.rating'><i class="fa-regular fa-star"></i></span> -->
                        </div>
                    </div>
                </div>
            </div>

            <!-- display of lessons by default -->
            <div v-else-if="showItem">
                <div v-for="item in items" :key="item.id">
                    <div id="lessonbox">

                        <figure>
                            <img v-bind:src="item.Image" style="width:130px;height:110px;float:right;">
                        </figure>
                        <h4>Subject: {{item.subject}}</h4>
                        <!-- the double curly brackets is shorter version of 'v-text' moustache syntax (same thing)-->
                        <p>Location: {{item.location}}</p>
                        <p>Price: {{item.price}}</p>
                        <p>Available Lessons: {{item.availableInventory}}</p>
                        <button v-on:click="addToCart(item)" class="button" id="cartbtn" v-if="canAddToCart(item)">
                            Add to Cart
                        </button>
                        <br>
                        <!-- <span v-if='item.availableInventory === cartCount(item.id)'>All out!</span>
                        <span v-else-if="item.availableInventory - cartCount(item.id) < 5"> Only
                            {{item.availableInventory - cartCount(item.id)}} left!</span>
                        <span v-else>Buy now!</span> -->
                        <div>
                            <!-- <span v-for='n in item.rating'><i class="fa-solid fa-star"></i></span>
                            <span v-for='n in 5-item.rating'><i class="fa-regular fa-star"></i></span> -->
                        </div>
                    </div>
                </div>
            </div>

    </div>

</template>

<script>
export default {
    name: "LessonsList",
    //prop for parent comp to send data
    props:['items'],
    data () {
      return {
        checkLesson: '',
        sortMethod: '',
        showItem: true
      }
    },
    methods: {
        //using emit to add item in cart array
        addToCart(item) {
            console.log("added item", item.id)
            this.$emit('addItem', item)
        },
        canAddToCart: function (item) {
                    return item.availableInventory >0;
                },
        // check number of items in cart
        cartCount(id) {
      let count = 0;
      for (let i = 0; i < this.cart.length; i++) {
        if (this.cart[i] === id) {
          count++
        }
      }
      return count;
    },   
        
    },
    computed:  {
       //sort products from ascending price order
       sortedProducts() {
                    let productsArray = this.items.slice(0);
                    function compare(a, b) {
                        if (a.price > b.price)
                            return 1;
                        if (a.price < b.price) {
                            return -1;
                            // return 0;
                        }
                    }
                    return productsArray.sort(compare);
                },
                //sort products from descending price order
                sortedHighProducts() {
                    let productsArray = this.items.slice(0);
                    function compare(a, b) {
                        if (a.price < b.price)
                            return 1;
                        if (a.price > b.price) {
                            return -1;
                            // return 0;
                        }
                    }
                    return productsArray.sort(compare);
                },
                //sort products from ascending alphabetical order of subjects
                sortedProductsAtoZ() {
                    let productsArray = this.items.slice(0);
                    function compare(a, b) {
                        if (a.subject > b.subject)
                            return 1;
                        if (a.subject < b.subject) {
                            return -1;
                            // return 0;
                        }
                    }
                    return productsArray.sort(compare);
                },
                //sort products from descending alphabetical order of subjects
                sortedProductsZtoA() {
                    let productsArray = this.items.slice(0);
                    function compare(a, b) {
                        if (a.subject < b.subject)
                            return 1;
                        if (a.subject > b.subject) {
                            return -1;
                            // return 0;
                        }
                    }
                    return productsArray.sort(compare);
                },
                sortedProductsZtoALocation() {
                    let productsArray = this.items.slice(0);
                    function compare(a, b) {
                        if (a.location < b.location)
                            return 1;
                        if (a.location > b.location) {
                            return -1;
                            // return 0;
                        }
                    }
                    return productsArray.sort(compare);
                },
                sortedProductsAtoZLocation() {
                    let productsArray = this.items.slice(0);
                    function compare(a, b) {
                        if (a.location > b.location)
                            return 1;
                        if (a.location < b.location) {
                            return -1;
                            // return 0;
                        }
                    }
                    return productsArray.sort(compare);
                },
                ascendingInventory() {
                    let productsArray = this.items.slice(0);
                    function compare(a, b) {
                        if (a.availableInventory > b.availableInventory)
                            return 1;
                        if (a.availableInventory < b.availableInventory) {
                            return -1;
                            // return 0;
                        }
                    }
                    return productsArray.sort(compare);
                },
                //sort products from descending price order
                descendingInventory() {
                    let productsArray = this.items.slice(0);
                    function compare(a, b) {
                        if (a.availableInventory < b.availableInventory)
                            return 1;
                        if (a.availableInventory > b.availableInventory) {
                            return -1;
                            // return 0;
                        }
                    }
                    return productsArray.sort(compare);
                },

  searchFiltering() {
  const searchValue = this.checkLesson.toLowerCase();
  const filteredItems = this.items.filter(item =>
    Object.values(item).some(value =>
      typeof value === 'string' && value.toLowerCase().includes(searchValue) ||
      typeof value === 'number' && value.toString().includes(searchValue)
    )
  );
  console.log(filteredItems);
  return filteredItems;
}

    }

}
</script>