import WooCommerceRestApi from "@woocommerce/woocommerce-rest-api";


export const api = new WooCommerceRestApi({
    url: "https://woocommerce.maktabsharif.ir",
    consumerKey: "ck_9bc9c182760bd7d726410060ea55e34a4ead3262",
    consumerSecret: "cs_a8155644476efbff35e2983421a2826fd0972ba9",
    version: "wc/v3"
});