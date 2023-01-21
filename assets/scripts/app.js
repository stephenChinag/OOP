const renderHook = document.getElementById("app");

class Product {
	constructor(sub, title, image, price, decs) {
		this.sub = sub;
		this.title = title;
		this.imageUrl = image;
		this.price = price;
		this.description = decs;
	}
}
class ShoppingCart {
	items = [];
	get totalAmount() {
		const sum = this.items.reduce((prevValue, currItem) => {
			return prevValue + currItem;
		}, 0);
		return sum;
	}
	addProduct(product) {
		this.items.push(product);
		this.totalOutput.innerHTML = `<h2> Total: /$ ${1} </h2>`;
	}
	render() {
		const cartEl = document.createElement("section");
		cartEl.innerHTML = `
    <h2> Total: /$ ${0}</h2>
    <button> Add to Cart </button>
    `;
		this.totalOutput = cartEl.querySelector("h2");
		cartEl.className = "cart";
		return cartEl;
	}
}

class ProductItem {
	constructor(product) {
		this.product = product;
	}
	addCartHandler() {
		App.addProductToCart(this.product);
	}
	render() {
		const prodEl = document.createElement("li");
		prodEl.className = "product-item";
		prodEl.innerHTML = `
<div> 
  <img src = ${this.product.imageUrl} alt=${this.product.sub}>
   <div class="product-item__content">
   <h2> ${this.product.title} </h2>
   <h3>/$ ${this.product.price} </h3>
   <p>${this.product.description} </p>
   <button> Add to Cart </button/>
   </div> 
</div>
`;
		const addCartButton = prodEl.querySelector("button");
		addCartButton.addEventListener("click", this.addCartHandler.bind(this));
		return prodEl;
	}
}
class ProductList {
	products = [
		new Product(
			"pillow",
			"A pillow ",
			"no image found ",
			12.9,
			"this is not just a pillow",
		),

		new Product(
			"bed",
			"A bed ",
			"no image found ",
			40.9,
			"this is not just a bed",
		),
	];
	constructor() {}
	render() {
		const prodList = document.createElement("ul");
		prodList.className = "product-list";
		for (const prod of this.products) {
			const productItem = new ProductItem(prod);
			const prodEl = productItem.render();

			prodList.append(prodEl);
		}
		return prodList;
	}
}
class Shop {
	render() {
		this.cart = new ShoppingCart();
		const cartEl = this.cart.render();
		const productist = new ProductList();
		const prodListEl = productist.render();
		renderHook.append(cartEl);
		renderHook.append(prodListEl);
	}
}
class App {
	static cart;
	static init() {
		const shop = new Shop();

		shop.render();
		this.cart = shop.cart;
	}
	static addProductToCart(product) {
		this.cart.addProduct(product);
	}
}
App.init();
