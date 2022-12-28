<template>
<div>
    <section>
        <table>
            <tr>
                <th>Product</th>
                <th>Price</th>
                <th>Quantity</th>
                <th>Total</th>
                <th></th>
            </tr>
            <tr>

                <td>
                    <img :src="itemsFirstImage(cart)" :alt="cart.name" class="product-img" />
                    <h3 class="product-name">{{ cart.name }}</h3>
                </td>
                <td>
                    <h4 class="price">{{ cart.price }}</h4>
                </td>
                <td>
                    <strong> {{ cartCount }}</strong>
                </td>
                <td>{{ cartTotal }}</td>
            </tr>
        </table>

        <section class="payment mt-2">

            <div class="total">
                <div class="caption">
                    <p class="golden">Total:</p>
                </div>
                <div class="num">
                    <p>
                        <strong>{{ cartTotal }}</strong>
                    </p>
                </div>
            </div>
        </section>
        <card />
    </section>
</div>
</template>

<script>
import Card from "./Card.vue";
import { mapState } from "vuex";

export default {
    components: {
        Card,
    },
    computed: {
        ...mapState("payment", ["cart", "userDetails"]),
        cartTotal() {
            const itemsPrice = Number(this.cart.price) || 0;
            const quantity = this.cartCount;
            return quantity * itemsPrice;
        },
        cartCount() {
            const { quantity } = this.$route.query;
            return quantity;
        },
    },
    methods: {
        itemsFirstImage(cart) {
            return cart.images ?.length ? cart.images[0].src : "";
        },
    },
};
</script>

<style scoped>
.product-img {
    float: left;
    margin-right: 15px;
    width: 80px;
}

.total {
    display: grid;
    grid-template-columns: repeat(2, 1fr);
    grid-column-gap: 100px;
}

table {
    width: 100%;
    margin-top: 20px;
}

tr {
    text-align: center;
}

th {
    padding: 10px 0;
}

td,
th {
    border-bottom: 1px solid #ccc;
}

.golden {
    background: #f2eee2;
    font-weight: bold;
    padding: 10px;
}

.product-name,
.product-size {
    text-align: left;
}

.product-name {
    padding-top: 36px;
}

.product-size {
    font-weight: 100;
}

.num {
    text-align: right;
}

button a {
    color: white;
    transition: 0.3s all ease;
}

.delete-product,
.quantity-adjust:first-of-type,
.quantity-adjust:last-of-type {
    padding: 5px 7px;
    border: none;
}

.quantity-adjust:first-of-type {
    margin-right: 5px;
}

.quantity-adjust:last-of-type {
    margin-left: 5px;
}

.delete-product:hover {
    background-color: rgb(255, 85, 85);
    border-radius: 100%;
    border: none;
}

.delete-product:focus,
.delete-product:active {
    outline: none;
}

@media screen and (min-width: 700px) {
    .payment {
        display: grid;
        grid-template-columns: repeat(2, 1fr);
        grid-column-gap: 100px;
    }

    .total {
        width: 90%;
    }
}

@media screen and (max-width: 699px) {
    .payment {
        width: 94%;
        margin-left: 2%;
    }
}
</style>
