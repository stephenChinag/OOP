class Product {
	constructor(sub, title, image, price, decs) {
		this.sub = sub;
		this.title = title;
		this.imageUrl = image;
		this.price = price;
		this.description = decs;
	}
}

class ElementAtrribute {
	constructor(attrName, attrValue) {
		this.name = attrName;
		this.value = attrValue;
	}
}
class Component {
	constructor(renderHookId) {
		// console.log("called");
		this.hookId = renderHookId;
		this.render();
	}
	createRootElement(tag, cssClasses, attributes) {
		const rootElement = document.createElement(tag);
		if (cssClasses) {
			rootElement.className = cssClasses;
		}
		if (attributes && attributes.length > 0) {
			for (const attr of attributes) {
				rootElement.setAttribute(attr.name, attr.value);
			}
		}
		document.getElementById(this.hookId).append(rootElement);
		return rootElement;
	}
}
class ShoppingCart extends Component {
	items = [];
	set cartItems(value) {
		this.items = value;
		this.totalOutput.innerHTML = `<h2> Total: /$ ${this.totalAmount.toFixed(
			2,
		)} </h2>`;
	}
	get totalAmount() {
		const sum = this.items.reduce((prevValue, currItem) => {
			return prevValue + currItem.price;
		}, 0);
		return sum;
	}
	constructor(renderHookId) {
		super(renderHookId);
	}
	addProduct(product) {
		const updatedItems = [...this.items];
		updatedItems.push(product);
		this.cartItems = updatedItems;
	}
	render() {
		const cartEl = this.createRootElement("section", "cart");
		cartEl.innerHTML = `
    <h2> Total: /$ ${0}</h2>
    <button> Order Now </button>
    `;
		this.totalOutput = cartEl.querySelector("h2");
	}
}

class ProductItem extends Component {
	constructor(product, renderHookId) {
		super(renderHookId);
		this.product = product;
	}
	addCartHandler() {
		App.addProductToCart(this.product);
	}
	render() {
		const prodEl = this.createRootElement("li", "product-item");
		//prodEl.className = "product-item";
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
	}
}
class ProductList extends Component {
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
	constructor(renderHookId) {
		super(renderHookId);
	}
	render() {
		this.createRootElement("ul", "product-list", [
			new ElementAtrribute("id", "prod-list"),
		]);

		for (const prod of this.products) {
			new ProductItem(prod, "prod-list");
		}
	}
}
class Shop extends Component {
	constructor() {
		super();
	}
	render() {
		this.cart = new ShoppingCart("app");
		this.cart.render();

		new ProductList("app");
	}
}
class App {
	static cart;
	static init() {
		const shop = new Shop();

		this.cart = shop.cart;
	}
	static addProductToCart(product) {
		this.cart.addProduct(product);
	}
}
App.init();
