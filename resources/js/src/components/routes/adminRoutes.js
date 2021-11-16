import DashboardCategory from "../dashboard/admin/DashboardCategory";
import DashboardFood from "../dashboard/admin/DashboardFood";
import DashboardDrink from "../dashboard/admin/DashboardDrink";
import DashboardEmployee from "../dashboard/admin/DashboardEmployee";
import AddCategory from "../dashboard/admin/CRUD/AddCategory";
import AddFood from "../dashboard/admin/CRUD/AddFood";
import AddDrink from "../dashboard/admin/CRUD/AddDrink";
import UpdateCategory from "../dashboard/admin/CRUD/UpdateCategory";
import UpdateFood from "../dashboard/admin/CRUD/UpdateFood";
import UpdateDrink from "../dashboard/admin/CRUD/UpdateDrink";

const adminRoutes = [
    {
        path: "/category",
        exact: true,
        component: DashboardCategory,
    },
    {
        path: "/category/add",
        exact: true,
        component: AddCategory,
    },
    {
        path: "/category/update/:id",
        exact: true,
        component: UpdateCategory,
    },
    {
        path: "/foods",
        exact: true,
        component: DashboardFood,
    },
    {
        path: "/foods/add",
        exact: true,
        component: AddFood,
    },
    {
        path: "/foods/update/:id",
        exact: true,
        component: UpdateFood,
    },
    {
        path: "/drinks",
        exact: true,
        component: DashboardDrink,
    },
    {
        path: "/drinks/add",
        exact: true,
        component: AddDrink,
    },
    {
        path: "/drinks/update/:id",
        exact: true,
        component: UpdateDrink,
    },
    {
        path: "/employee",
        exact: true,
        component: DashboardEmployee,
    },
];

export default adminRoutes;
