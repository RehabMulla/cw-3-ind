<template>
  <div>
    <link rel="stylesheet" href="style.css">
    <h2>Lessons Being Purchased:</h2>
    <div v-for="item in cart" :key="item.id">
      <div id="lessonbox">
        <figure>
          <img v-bind:src="item.Image" style="width:130px;height:110px;float:right;">
        </figure>
        <h4>Subject: {{item.subject}}</h4>
        <p>Location: {{item.location}}</p>
        <p>Price: {{item.price}}</p>
        <p>Available Lessons: {{item.availableInventory}}</p>
        <span v-if='item.availableInventory === cartCount(item.id)'>All out!</span>
        <span v-else-if="item.availableInventory - cartCount(item.id) < 5"> Only {{item.availableInventory - cartCount(item.id)}} left!</span>
        <span v-else>Buy now!</span>
        <div>
          <!-- <span v-for='n in item.rating'><i class="fa-solid fa-star"></i></span>
          <span v-for='n in 5-item.rating'><i class="fa-regular fa-star"></i></span> -->
        </div>
        <button v-on:click="removeItem(item)" class="button">Remove lesson</button>
      </div>
    </div>

    <div>
      <h2 style="text-align: center">Checkout</h2>
      <form>
        <label for="name">Name:</label>
        <br>
        <input type="text" id="name" name="name" placeholder="Your name" v-model.trim="order.name" />
        <br>
        <label for="phoneno">Phone Number:</label>
        <br>
        <input type="number" id="bumber" name="number" placeholder="Your phone number" v-model.trim="order.phoneno" />
      </form>

      <h2>Order Information</h2>
      <p>Name: {{order.name}}</p>
      <p>Phoneno: {{order.phoneno}}</p>
      <br>

      <div id="checkoutbtn">
        <button disabled class="button" v-if="emptyFieldsThere">Checkout</button>
        <button disabled class="button" v-else-if="cartItemCount < 1">Checkout</button>
        <button class="button" v-on:click="submitForm" v-else>Checkout</button>
      </div>
    </div>
  </div>
</template>

<script>
        // Created RegEx for the name to have only letters 
        var wordCriteriaRegExp = new RegExp("^[A-Za-z]{1,}$");
        // Created RegEx for the phone number to start with '971' and have 9 other digits
        var numCriteriaRegExp = new RegExp("^971[0-9]{9,9}$");
export default {
  name: "Checkout",
  props: ['cart'],
   data() {
    return {
      order: {
        name: '',
        phoneno: ''             
      }
    }
  },
  methods: {
    showHome() {
      this.showItem = this.showItem ? false : true;
    },
    submitForm() {
      alert('Order submitted!');
      location.reload();
    },
    removeItem(item) {
      const index = this.cart.indexOf(item);
      if (index > -1) {
        this.cart.splice(item, 1);
      }
      item.availableInventory++;
    }
  },

  computed: {
  
                //checking if form is validated
                emptyFieldsThere() {
                    return (!wordCriteriaRegExp.test(this.order.name) || !numCriteriaRegExp.test(this.order.phoneno))
                },

            }
     
}
</script>

