import DashboardContent from "../dashboard/user/DashboardContent";
import CategoryMenu from "../dashboard/user/CategoryMenu";
import MenuDetails from "../dashboard/user/MenuDetails";
import ProductMenu from "../dashboard/user/ProductMenu";
import Cart from "../dashboard/user/Cart";
import Payment from "../dashboard/user/Payment";
import Order from "../dashboard/user/Order";
import OrderDetails from "../dashboard/user/OrderDetails";

const userRoutes = [
    {
        path: "/",
        component: DashboardContent,
        exact: true,
        routes: [],
    },
    {
        path: "/order",
        exact: true,
        component: Order,
    },
    {
        path: "/order/details/:id",
        exact: true,
        component: OrderDetails,
    },
    {
        path: "/cart",
        exact: true,
        component: Cart,
    },
    {
        path: "/cart/payment",
        exact: true,
        component: Payment,
    },
    {
        path: "/menu/:type/:category",
        exact: true,
        component: CategoryMenu,
    },
    {
        path: "/menu/:type/:category/:id",
        exact: true,
        component: MenuDetails,
    },

    {
        path: "/:type",
        exact: true,
        component: ProductMenu,
    },
    {
        path: "/:type/:id",
        exact: true,
        component: MenuDetails,
    },
];

export default userRoutes;
