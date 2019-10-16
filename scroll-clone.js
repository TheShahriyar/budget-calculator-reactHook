var productNameSource = document.querySelector(".product-details__name")
  .innerText;
var productPriceSource = document.querySelector(".js-product-price").innerText;

var test = document.querySelector(".site-header");
var outerWrapper = document.createElement("div");
outerWrapper.className = "outer-wrapper";
outerWrapper.style.display = "none";
test.appendChild(outerWrapper);

var stickyWrapper = document.createElement("div");
stickyWrapper.className = "sticky-wrapper";
stickyWrapper.setAttribute(
  "style",
  "background-color: #e4e4e4; padding:10px; display:flex; justify-content: space-between;"
);

var leftSide = document.createElement("div");
leftSide.setAttribute("style", "display:flex; align-items: center;");
var productName = document.createElement("span");
productName.innerText = productNameSource;
productName.style.fontWeight = "bold";
leftSide.appendChild(productName);

var rightSide = document.createElement("div");
rightSide.setAttribute("style", "display:flex; align-items: center;");
var productPrice = document.createElement("p");
productPrice.textContent = productPriceSource;
productPrice.setAttribute("style", "font-weight: bold; margin-right: 30px;");

rightSide.appendChild(productPrice);

// var cartButton = document.createElement("button");
// cartButton.innerText = "Add to cart";
// cartButton.type = "submit";
// cartButton.setAttribute(
//   "style",
//   "background-color: #000; padding: 5px 30px; height: 40px; color: #e4e4e4; border: 0; margin-left:30px; cursor:pointer;"
// );

var cartButtonDiv = document.createElement("div");
cartButtonDiv.className = "sticky-cart-btn";

var addToCartSource = document.querySelector(
  ".btn--filled.product-details__submit.js-add-to-cart-form-submit"
);
var cartBtnDestination = rightSide;
var cloneCartBtn = addToCartSource.cloneNode(true);
cartBtnDestination.appendChild(cloneCartBtn);

stickyWrapper.appendChild(leftSide);
stickyWrapper.appendChild(rightSide);

outerWrapper.appendChild(stickyWrapper);

window.addEventListener(
  "scroll",
  function() {
    if (window.pageYOffset > 400) {
      outerWrapper.setAttribute(
        "style",
        "display:block; position: fixed; width: 100%; z-index: 9999999;"
      );
    } else if (window.pageYOffset < 400) {
      outerWrapper.style.display = "none";
    }
  },
  false
);
