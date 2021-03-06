export const state = () => ({
    // lang: localStorage.getItem('lang') !== null ? localStorage.getItem('lang') : 'ru',
    lang: 'ru',
    imgUrl: 'https://cdn.collibri.kz/',
    catalogData: [],
    productItem: null,
    catalogFilter: [],
    favoritesArray: [],
    cartLength: [],
    loader: false,
    loadingProducts: false,
    moreLoader: null,
    catalogDropdown: false,
    cartData: [],
    totalPrice: null,
    footerData: null
})

export const mutations = {
    SET_FOOTER_DATA(state, response) {
        state.footerData = response
    },
    SET_PRODUCTS(state, products) {
        state.catalogData = products;
    },

    SET_BRAND_PRODUCTS(state, products) {
        state.catalogData = products;
    },

    SET_PRODUCT_ITEM(state, product) {
        state.productItem = product;
    },

    FILTER_PRODUCTS(state, products) {
        state.catalogFilter = products;
    },

    FILTER_BRAND_PRODUCTS(state, products) {
        state.catalogFilter = products;
    },

    FILTER_SEARCH_PRODUCTS(state, products) {
        state.catalogFilter = products;
    },

    MORE_PRODUCTS(state, products) {
        state.catalogData = products
    },

    SORTED_PRODUCTS(state, products) {
        state.catalogData = products;
    },

    SET_LOADER(state, isLoad) {
        state.loader = isLoad
    },
    SET_LOADING_PRODUCTS(state, isLoading) {
        state.loadingProducts = isLoading
    },

    CHANGE_LANGUAGE(state) {
        state.lang = localStorage.getItem('lang')
        if (state.lang === 'en') {
            state.lang = 'ru'
            localStorage.setItem('lang', 'ru');
        } else {
            state.lang = 'en'
            localStorage.setItem('lang', state.lang)
        }
        document.body.classList.add('langLoader')
        setTimeout(() => {
            window.location.reload();
        }, 500);
    },

    CATALOG_DROPDOWN(state, isLoading) {
        state.catalogDropdown = isLoading;
    },

    ADD_FAVORITES(state, product) {
        let favoriteStorage = JSON.parse(localStorage.getItem('favorite'));
        localStorage.setItem('favorite', JSON.stringify([product]))
        if (favoriteStorage == null) {
            localStorage.setItem('favorite', JSON.stringify([product]))
            state.favoritesArray = JSON.parse(localStorage.getItem('favorite'))
        } else if (favoriteStorage == []) {
            favoriteStorage.push(product)
            localStorage.setItem('favorite', JSON.stringify(favoriteStorage))
            state.favoritesArray = favoriteStorage
        } else if (favoriteStorage.find(item => item.id == product.id)) {
            favoriteStorage.forEach((item, index) => {
                if (item.id == product.id) {
                    favoriteStorage.splice(index, 1)
                }
            })
            localStorage.setItem('favorite', JSON.stringify(favoriteStorage))
            state.favoritesArray = favoriteStorage
        } else {
            favoriteStorage.push(product)
            state.favoritesArray = favoriteStorage
            localStorage.setItem('favorite', JSON.stringify(favoriteStorage))
        }
    },

    ADD_TO_CART(state, { product, countValue }) {
        product['count'] = countValue ? countValue : 1;
        let cartList = JSON.parse(localStorage.getItem('cart_products'));
        localStorage.setItem('cart_products', JSON.stringify([product]))
        if (cartList == null) {
            localStorage.setItem('cart_products', JSON.stringify([product]));
            state.cartLength = localStorage.getItem('cart_products');
        } else if (cartList == []) {
            cartList.push(product)
            localStorage.setItem('cart_products', JSON.stringify(cartList))
            state.cartLength = cartList;
        } else if (cartList.find(item => item.id == product.id)) {
            cartList.forEach((item, index) => {
                if (item.id == product.id) {
                    cartList.splice(index, 1)
                }
            })
            localStorage.setItem('cart_products', JSON.stringify(cartList))
            state.cartLength = cartList
        } else {
            cartList.push(product)
            state.cartLength = cartList
            localStorage.setItem('cart_products', JSON.stringify(cartList))
        }
    },

    ADD_TO_CART_PRODUCT(state, { product, countValue }) {
        product['count'] = countValue ? countValue : 1;
        let cartList = JSON.parse(localStorage.getItem('cart_products'));
        if (cartList && cartList.find(item => item.id == product.id)) {
            cartList.filter((i) => {
                if (i.id === product.id) {
                    i.count = countValue;
                    localStorage.setItem('cart_products', JSON.stringify(cartList))
                }
            })
            return false
        } else if (cartList !== null) {
            cartList.push(product);
            localStorage.setItem('cart_products', JSON.stringify(cartList));
            state.cartLength = localStorage.getItem('cart_products');
        } else {
            localStorage.setItem('cart_products', JSON.stringify([product]))
            state.cartLength = localStorage.getItem('cart_products');
        }
    },

    DELETE_PRODUCT(state, id) {
        let cartList = JSON.parse(localStorage.getItem("cart_products"));

        cartList = cartList.filter((t) => t.id !== id);

        state.cartLength = cartList.length

        localStorage.setItem("cart_products", JSON.stringify(cartList));
    },

    SET_CART_LENGTH(state, length) {
      state.cartLength = length
    },

    CART_TOTAL_PRICE(state, count) {
        for (let item of state.cartData) {
            Vue.set(item, 'count', 1)
            state.totalPrice.push(item.price * item.count);
        }

        state.totalPrice = state.totalPrice.reduce(function(sum, el) {
            return sum + el;
        });
    }

}

export const actions = {
    GET_FOOTER_DATA({ commit }, lang) {
        this.$axios
            .get('get-footer', {
                params: {
                    lang: lang
                }
            })
            .then((response) => {
                commit('SET_FOOTER_DATA', response.data)
            });
    },
    GET_PRODUCTS({ commit, state }, id) {
        commit("SET_LOADER", true)
        this.$axios
            .get(`get-products`, {
                params: {
                    lang: state.lang,
                    category_id: id
                }
            })
            .then(function(response) {
                const products = response.data;
                commit('SET_PRODUCTS', products);
                setTimeout(() => {
                    commit("SET_LOADER", false)
                }, 100);
            });
    },

    CART_LENGTH_ACTION({commit}, length) {
      commit('SET_CART_LENGTH', length)
    },

    GET_BRAND_PRODUCTS({ commit, state }, { id, page }) {
        commit("SET_LOADER", true)
        this.$axios
            .get(`get-brand-products`, {
                params: {
                    lang: state.lang,
                    brand_id: id,
                    page: page
                }
            })
            .then(function(response) {
                const products = response.data;
                commit('SET_BRAND_PRODUCTS', products);
                setTimeout(() => {
                    commit("SET_LOADER", false)
                }, 100);
            });
    },

    GET_SEARCH_PRODUCTS({ commit, state }, { text, page }) {
        commit("SET_LOADER", true)
        this.$axios
            .get(`search-page`, {
                params: {
                    lang: state.lang,
                    text: text,
                    page: page
                }
            })
            .then(function(response) {
                const products = response.data;
                commit('SET_BRAND_PRODUCTS', products);
                setTimeout(() => {
                    commit("SET_LOADER", false)
                }, 100);
            });
    },

    FILTER_BRAND_PRODUCTS({ commit, state }, { productId, brandId, page }) {
        let brand_id = brandId;
        this.$axios.get(`get-brand-products`, {
                params: {
                    lang: state.lang,
                    brand_id: productId,
                    filter_id: brand_id,
                    page: page
                }
            })
            .then((response) => {
                const products = response.data;
                commit('FILTER_BRAND_PRODUCTS', products);
            })
            .catch((error) => {
                console.log(error);
            });
    },

    FILTER_SEARCH_PRODUCTS({ commit, state }, { text, filterId, page, sort }) {
        this.$axios.get(`search-page`, {
                params: {
                    lang: state.lang,
                    text: text,
                    filter_id: filterId,
                    page: page,
                    order_by: sort
                }
            })
            .then((response) => {
                const products = response.data;
                commit('FILTER_SEARCH_PRODUCTS', products);
            })
            .catch((error) => {
                console.log(error);
            });
    },

    SORTED_SEARCH_PRODUCTS({ commit, state }, { text, page, sortedProduct }) {
        this.$axios.get(`search-page`, {
                params: {
                    lang: state.lang,
                    text: text,
                    page: page,
                    order_by: sortedProduct,
                }
            })
            .then((response) => {
                const products = response.data;
                commit('FILTER_SEARCH_PRODUCTS', products);
            })
            .catch((error) => {
                console.log(error);
            });
    },


    FILTER_PRODUCTS({ commit, state }, { productId, filterId, sort, page, sub_category }) {
        let filter_id = filterId;
        commit("SET_LOADING_PRODUCTS", true)
        this.$axios.get(`get-products`, {
                params: {
                    lang: state.lang,
                    category_id: productId,
                    filter_id: filter_id,
                    order_by: sort,
                    page: page,
                    sub_category: sub_category
                }
            })
            .then((response) => {
                const products = response.data;
                commit('FILTER_PRODUCTS', products);
                commit("SET_LOADING_PRODUCTS", false)
            })
            .catch((error) => {
                console.log(error);
            });
    },

    GET_PRODUCT_PAGE({ commit, state }, url) {
        commit("SET_LOADER", true)
        this.$axios
            .get(`product?lang=${state.lang}&slug=${url}`)
            .then(function(response) {
                const product = response.data;
                setTimeout(() => {
                    commit("SET_LOADER", false)
                }, 100);
                commit('SET_PRODUCT_ITEM', product)
            });
    },

    MORE_PRODUCTS({ commit, state }, { productId, page, sort }) {
        commit("SET_LOADER", true)
        this.$axios
            .get(`get-products`, {
                params: {
                    lang: state.lang,
                    category_id: productId,
                    page: page,
                    order_by: sort,
                }
            })
            .then(function(response) {
                commit("SET_LOADER", false)
                const products = response.data;
                state.nextPage = products.products.next_page_url;
                commit('MORE_PRODUCTS', products)
            });
    },

    MORE_BRAND_PRODUCTS({ commit, state }, { productId, page }) {
        commit("SET_LOADER", true)
        this.$axios
            .get(`get-brand-products`, {
                params: {
                    lang: state.lang,
                    brand_id: productId,
                    page: page
                }
            })
            .then(function(response) {
                commit("SET_LOADER", false)
                const products = response.data;
                state.nextPage = products.products.next_page_url;
                commit('MORE_PRODUCTS', products)
            });
    },

    SORTED_PRODUCTS({ commit, state }, { productId, sortedProduct }) {
        this.$axios.get(`get-products`, {
                params: {
                    lang: state.lang,
                    category_id: productId,
                    order_by: sortedProduct,
                }
            })
            .then((response) => {
                const products = response.data;
                commit('SORTED_PRODUCTS', products)
            })
            .catch((error) => {
                console.log(error);
            });
    },

    GET_CART_PRODUCTS({ commit, state }) {
        let cartProductsId = JSON.parse(localStorage.getItem("cart_products"));
        if (cartProductsId !== null && cartProductsId.length) {
            this.$axios.get(`card-product`, {
                    params: {
                        product_id: cartProductsId,
                        lang: state.lang,
                    },
                })
                .then((response) => {
                    state.cartData = response.data;
                    commit('CART_TOTAL_PRICE')
                });
        }
    },
}
export const getters = {
    CATEGORY_PRODUCTS(state) {
        return state.catalogData;
    },
    BRAND_PRODUCTS(state) {
        return state.catalogData;
    },
    CATALOG_FILTER(state) {
        return state.catalogFilter;
    },
    PRODUCT_ITEM(state) {
        return state.productItem;
    },
    IMG_URL(state) {
        return state.imgUrl;
    },

    GET_FAVOURITE_COUNT(state) {
        return state.favoritesArray
    },

    GET_CART_LENGTH(state) {
        return state.cartLength
    },

    CART_PRODUCTS(state) {
        return state.cartData
    },

    totalPrice(state) {
        return state.totalPrice
    },
  FOOTER_DATA(state) {
      return state.footerData
  }
}
