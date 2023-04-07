 <template>
  <div>
    <head>
      <meta charset="UTF-8">
      <meta http-equiv="X-UA-Compatible" content="IE=edge">
      <meta name="viewport" content="width=device-width, initial-scale=1.0">
      <!-- CDN link -->
      <script src="https://cdn.jsdelivr.net/npm/vue@2.7.10/dist/vue.js"> </script>
      <!-- JSON lesson file link -->
      <script src="items.js"></script>
      <!-- style sheel CSS link -->
      <link rel="stylesheet" href="style.css">
      <!-- Font awesome link -->
      <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.2.0/css/all.min.css">
      <!-- Title -->
      <title>Vue.js School Lessons</title>
    </head>

    <body>
      <!-- creating the app here -->
      <div id="app">
        <div id="headerbind">
          <!-- navigation bar -->
          <nav>
            <!-- display website name using v-text -->
            <h1 v-text="sitename"></h1>

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
          </nav>
        </div>



         <div  >
              <!-- for loop to display all lessons -->
            <items-list :items="items" @addItem="addToCart"></items-list>
          </div>

          <div >

              <!-- lessons added in cart -->
              <checkout :cart="cart" @removeItem="removeItem"></checkout>
            </div>
        <!-- the rest of your app code here -->
      </div>
    </body>
  </div>
</template>

<script>
import lessons from './components/Lessons.vue'
import checkout from './components/Checkout.vue'

export default {
  name: 'App',
  components: {
   lessons, checkout
  },
  data () {
    return {
      cart: [],
      items: [],
      showItems:true,
      
      
    }
  },
  created: function(){

      fetch('http://localhost:3000/collection/items').then( response => {
        response.json().then(json => {
            this.lessons = json;
            console.log(json);
        } ); });
  },
  methods: {
   addToCart: function (item) {
                    this.cart.push(item);
                    item.availableInventory--;
                    console.log(this.cart)
                },
                 //cart lenth 
                cartCount(id) {
                    let count = 0;
                    for (let i = 0; i > this.cart.length; i++) {
                        if (this.cart[i] === id) {
                            count++
                        }
                    }
                    return count;
                },

    removeItem(item) {
                    const index = this.cart.indexOf(item);
                    if (index > -1) {
                        this.cart.splice(item, 1);
                    }
                    item.availableInventory++;
                },
                 //to show checkout page
                showCheckout() {
                    this.showItem = this.showItem ? false : true;
                    this.sortMethod = this.sortMethod ? false : true;

                },
                //to show home page
                showHome() {
                    this.showItem = this.showItem ? false : true;
                },
  },
  computed: {
          //to check cart length
                cartItemCount: function () {
                    return this.cart.length || '';
                }
    
  }


}
</script>

      