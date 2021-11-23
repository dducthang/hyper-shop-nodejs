$('.pages').on('click', '.page-link', reloadProduct);
$('.category-menu').on('click', '.category-filter', reloadProduct);
$('.products-number').on('click', '.show-products-quantity', reloadProduct);
$('#search').on('input', function () {
  sessionStorage.removeItem('page'); //nếu products đc reload vì người dùng search, set page lại bằng 1
  reloadProduct();
});

function reloadProduct() {
  const name = $('#search').val() !== '' ? $('#search').val() : null; //search by name

  event.preventDefault();
  const url = 'https://hyper-shop-admin.herokuapp.com/api/products';
  let page = sessionStorage.getItem('page') || 1;
  if (page === 'First') page = 1;
  if (page === 'Last') page = sessionStorage.getItem('lastPage');
  let lastPage;
  let productsPerPage = sessionStorage.getItem('productsPerPage') || 3;
  if (productsPerPage === 'All')
    //productsPerPage = sessionStorage.getItem('productsCount');
    productsPerPage = 'All'; //sẽ bị remove trong filter=> query all
  const filters = {
    name,
    productsPerPage,
    page,
    category: sessionStorage.getItem('category'),
    // brand: req.query.brand,
    // color: req.query.color,
    // sex: req.query.sex,
    // shoesHeight: req.query.shoesHeight,
    // closureType: req.query.closureType,
    // material: req.query.material,
  };
  Object.keys(filters).forEach(
    key => filters[key] === (undefined || null) && delete filters[key]
  ); // remove các filter null or undefined
  if (page !== '...')
    $.ajax({
      url,
      data: filters,
      dataType: 'json',
      success: function (data) {
        lastPage = data.lastPage;
        if (page === 'Last') page = lastPage;

        sessionStorage.setItem('lastPage', lastPage);
        sessionStorage.setItem('productsCount', data.productsCount);
        const productShowing = getProductShowing(
          data.productsPerPage,
          data.productsCount
        ); // Showing ? of ? product

        const productsNumber = getProductsNumber(); //selected quantity of product
        let productsList = '';
        let productBox;
        if (data.products.length > 0) {
          data.products.forEach(product => {
            productBox = getProductBox(product);
            productsList += productBox;
          });
        } else {
          productsList =
            "<div><p>Sorry, we don't have thing you need</p></div>";
        }
        const pagesNumber = getPagesNumber(lastPage, page); //paging number ở dưới
        $('.products').html(productsList);
        $('.pages').html(pagesNumber);
        $('.products-showing').html(productShowing);
        $('.products-number').html(productsNumber);
      },
      error: function (error) {
        console.log(error);
      },
    });
}

function getProductBox(product) {
  return `<div class="col-md-4">
  <div class="productbox">
    <div class="fadeshop">
      <div class="captionshop text-center" style="display: none">
        <h3>${product.name}</h3>
        <p class="row">
          <a href="/products/editProduct/${product._id}" class="learn-more detailslearn col-6"
            ><i class="fa fa-shopping-cart"></i> Edit</a
          >
          <a href="/products/${product._id}" class="learn-more detailslearn col-6"
            ><i class="fa fa-link"></i> Details</a
          >
        </p>
      </div>
      <span class="maxproduct"
        ><img src="${product.image}" alt="shoes"
      /></span>
    </div>
    <div class="product-details">
      <a href="/products/${product._id}">
      <h1>${product.name}</h1>
      </a>
      <span class="price">
        <span class="edd_price">$${product.price}</span>
      </span>
    </div>
  </div>
</div>
`;
}
function getProductShowing(productsPerPage, productsCount) {
  return `Showing
        <strong
          >${productsPerPage <= productsCount ? productsPerPage : productsCount}
          </strong
        >
        of <strong>${productsCount}</strong> products`;
}
function getProductsNumber() {
  let res = `
  <strong>Show</strong>`;
  res +=
    sessionStorage.getItem('productsPerPage') == 2
      ? `<a class="btn btn-primary btn-sm show-products-quantity">2</a>`
      : `
    <a class="btn btn-outline-secondary btn-sm show-products-quantity"
    >2</a
  >`;
  res +=
    sessionStorage.getItem('productsPerPage') == 4
      ? `<a class="btn btn-primary btn-sm show-products-quantity">4</a>`
      : `<a class="btn btn-outline-secondary btn-sm show-products-quantity"
  >4</a
>`;

  res +=
    sessionStorage.getItem('productsPerPage') === 'All'
      ? `<a class="btn btn-primary btn-sm show-products-quantity">All</a>`
      : ` <a class="btn btn-outline-secondary btn-sm show-products-quantity"
>All</a
>`;
  res += `<span>products</span>`;
  return res;
}
function getPagesNumber(lastPage, page) {
  let res = `
<nav
  aria-label="Page navigation example"
  class="d-flex justify-content-center"
>`;
  if (lastPage > 0) {
    res += `<ul class="pagination"><li class="page-item custom-hover"><a class="page-link">First</a></li>`;
    let i = Number(page) > 5 ? Number(page) - 4 : 1;
    if (i !== 1) {
      res += `<li class="page-item custom-hover"><a class="page-link">...</a></li>`;
    }
    for (; i <= Number(page) + 4 && i <= lastPage; i++) {
      if (i == page) {
        res += `<li class="page-item custom-hover active"><a class="page-link">${i}</a></li>`;
      } else {
        res += `<li class="page-item custom-hover"><a class="page-link">${i}</a></li>`;
      }
      if (i == Number(page) + 4 && i < lastPage) {
        res += `<li class="page-item custom-hover"><a class="page-link">...</a></li>`;
      }
    }
    res += `<li class="page-item custom-hover">
  <a class="page-link">Last</a>
</li>`;
    res += `</ul>`;
  }

  res += `</nav>`;
  return res;
}
