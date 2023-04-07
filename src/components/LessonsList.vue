<template>
     <!-- display search bar and sort radio btns only if lessons are displayed on screen  -->
     <div>
         <link rel="stylesheet" href="style.css">
                <div id="searchBar" v-if="showItem">
                    <p>
                        Search:
                        <input type="text" class="findLesson" v-model="checkLesson" />
                    </p>
                </div>

                <!-- cart button  -->
                <!-- button will work if atleast 1 item is added to cart and all lessons are displayed while shopping -->
                <button v-on:click="showCheckout" class="button" id="shopbtn" v-if="cartItemCount > 0 && showItem">
                    <!-- 'cartItemCount' is used the same way as a data property. -->
                    {{ cartItemCount }}
                    <!-- add the cart icon -->
                    <span class="fas fa-cart-plus"></span> Cart
                </button>
                <button v-on:click="showCheckout" class="button" id="shopbtn" v-else disabled>
                    {{ cartItemCount }}
                    <!-- add the cart icon -->
                    <span class="fas fa-cart-plus"></span> Cart
                </button>

                <!-- home page button -->
                <!-- button will work only when user is in checkout page to go back to cart page  -->
                <button v-on:click="showHome" class="button" id="homebtn" v-if="showItem" disabled>
                    Return to Home
                </button>
                <button v-on:click="showHome" class="button" id="homebtn" v-else>
                    Return to Home
                </button>
           


            <br>
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
                        <span v-if='item.availableInventory === cartCount(item.id)'>All out!</span>
                        <span v-else-if="item.availableInventory - cartCount(item.id) < 5"> Only
                            {{item.availableInventory - cartCount(item.id)}} left!</span>
                        <span v-else>Buy now!</span>
                        <div>
                           <span v-for='(n, index) in item.rating' :key="index"><i class="fa-solid fa-star"></i></span>
                            <span v-for='(n, index) in 5-item.rating' :key="index"><i class="fa-regular fa-star"></i></span>
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
                        <span v-if='item.availableInventory === cartCount(item.id)'>All out!</span>
                        <span v-else-if="item.availableInventory - cartCount(item.id) < 5"> Only
                            {{item.availableInventory - cartCount(item.id)}} left!</span>
                        <span v-else>Buy now!</span>
                        <div>
                           <span v-for='(n, index) in item.rating' :key="index"><i class="fa-solid fa-star"></i></span>
                            <span v-for='(n, index) in 5-item.rating' :key="index"><i class="fa-regular fa-star"></i></span>
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
                        <span v-if='item.availableInventory === cartCount(item.id)'>All out!</span>
                        <span v-else-if="item.availableInventory - cartCount(item.id) < 5"> Only
                            {{item.availableInventory - cartCount(item.id)}} left!</span>
                        <span v-else>Buy now!</span>
                        <div>
                            <span v-for='(n, index) in item.rating' :key="index"><i class="fa-solid fa-star"></i></span>
                            <span v-for='(n, index) in 5-item.rating' :key="index"><i class="fa-regular fa-star"></i></span>
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
                        <span v-if='item.availableInventory === cartCount(item.id)'>All out!</span>
                        <span v-else-if="item.availableInventory - cartCount(item.id) < 5"> Only
                            {{item.availableInventory - cartCount(item.id)}} left!</span>
                        <span v-else>Buy now!</span>
                        <div>
                           <span v-for='(n, index) in item.rating' :key="index"><i class="fa-solid fa-star"></i></span>
                            <span v-for='(n, index) in 5-item.rating' :key="index"><i class="fa-regular fa-star"></i></span>
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
                        <span v-if='item.availableInventory === cartCount(item.id)'>All out!</span>
                        <span v-else-if="item.availableInventory - cartCount(item.id) < 5"> Only
                            {{item.availableInventory - cartCount(item.id)}} left!</span>
                        <span v-else>Buy now!</span>
                        <div>
                           <span v-for='(n, index) in item.rating' :key="index"><i class="fa-solid fa-star"></i></span>
                            <span v-for='(n, index) in 5-item.rating' :key="index"><i class="fa-regular fa-star"></i></span>
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
                        <span v-if='item.availableInventory === cartCount(item.id)'>All out!</span>
                        <span v-else-if="item.availableInventory - cartCount(item.id) < 5"> Only
                            {{item.availableInventory - cartCount(item.id)}} left!</span>
                        <span v-else>Buy now!</span>
                        <div>
                           <span v-for='(n, index) in item.rating' :key="index"><i class="fa-solid fa-star"></i></span>
                            <span v-for='(n, index) in 5-item.rating' :key="index"><i class="fa-regular fa-star"></i></span>
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
                        <span v-if='item.availableInventory === cartCount(item.id)'>All out!</span>
                        <span v-else-if="item.availableInventory - cartCount(item.id) < 5"> Only
                            {{item.availableInventory - cartCount(item.id)}} left!</span>
                        <span v-else>Buy now!</span>
                        <div>
                            <span v-for='(n, index) in item.rating' :key="index"><i class="fa-solid fa-star"></i></span>
                            <span v-for='(n, index) in 5-item.rating' :key="index"><i class="fa-regular fa-star"></i></span>

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
                        <span v-if='item.availableInventory === cartCount(item.id)'>All out!</span>
                        <span v-else-if="item.availableInventory - cartCount(item.id) < 5"> Only
                            {{item.availableInventory - cartCount(item.id)}} left!</span>
                        <span v-else>Buy now!</span>
                        <div>
                           <span v-for='(n, index) in item.rating' :key="index"><i class="fa-solid fa-star"></i></span>
                           <span v-for='(n, index) in 5-item.rating' :key="index"><i class="fa-regular fa-star"></i></span>

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
                        <span v-if='item.availableInventory === cartCount(item.id)'>All out!</span>
                        <span v-else-if="item.availableInventory - cartCount(item.id) < 5"> Only
                            {{item.availableInventory - cartCount(item.id)}} left!</span>
                        <span v-else>Buy now!</span>
                        <div>
                            <span v-for='(n, index) in item.rating' :key="index"><i class="fa-solid fa-star"></i></span>
                            <span v-for='(n, index) in 5-item.rating' :key="index"><i class="fa-regular fa-star"></i></span>

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
                        <span v-if='item.availableInventory === cartCount(item.id)'>All out!</span>
                        <span v-else-if="item.availableInventory - cartCount(item.id) < 5"> Only
                            {{item.availableInventory - cartCount(item.id)}} left!</span>
                        <span v-else>Buy now!</span>
                        <div>
                            <span v-for='(n, index) in item.rating' :key="index"><i class="fa-solid fa-star"></i></span>
                            <span v-for='(n, index) in 5-item.rating' :key="index"><i class="fa-regular fa-star"></i></span>

                        </div>
                    </div>
                </div>
            </div>
</div>

</template>

<script>
export default {
  name: "Lessons",
  props: ['items'],
  data() {
    return {
      
checkLesson: '',
sortMethod: '',         
      
    }
  },
  methods: {
    //adding item to cart
                 addToCart(item) {
            console.log("added item", item.id)
            this.$emit('addItem', item)
        },
                // //to show checkout page
                // showCheckout() {
                //     this.showItem = this.showItem ? false : true;
                //     this.sortMethod = this.sortMethod ? false : true;

                // },
                 //add to cart for lesson if space is available only (that is 5 in this case)
                canAddToCart: function (item) {
                    return item.availableInventory > this.cartCount(item.id);
                },
  },

  //computed property
            computed: {
                //sort products from ascending price order
                sortedProducts() {
                    let productsArray = this.items.slice(0);
                    function compare(a, b) {
                        if (a.price > b.price)
                            return 1;
                        if (a.price < b.price) {
                            return -1;
                            return 0;
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
                            return 0;
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
                            return 0;
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
                            return 0;
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
                            return 0;
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
                            return 0;
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
                            return 0;
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
                            return 0;
                        }
                    }
                    return productsArray.sort(compare);
                },
                //searching for a lesson and making all searches valid by converting to lowercase
                searchFiltering() {
                    return this.items.filter(item => {
                        return (item.subject.toLowerCase().includes(this.checkLesson.toLowerCase()) ||
                            item.location.toLowerCase().includes(this.checkLesson.toLowerCase()) ||
                            // For the data saved as integers, they get cast to String which lets it match any typed numbers 
                            item.price.toString().includes(this.checkLesson.toLowerCase()) ||
                            item.id.toString().includes(this.checkLesson.toLowerCase()) ||
                            item.availableInventory.toString().includes(this.checkLesson.toLowerCase()))
                    })
                },
               

            }
       
}
</script>
