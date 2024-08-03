import CarMaintain from "./CarMaintain.vue";
import ClientMaintain from "./ClientMaintain.vue";
import Personal from "./Personal.vue";
import TeamMaintain from "./TeamMaintain.vue";
import CarInsert from "./CarInsert.vue";
import CarModify from "./CarModify.vue";
import ViewCar from "./ViewCar.vue";
import CarList from "./CarList.vue";
import CarModifySign from "@/components/CarModifySign.vue";

export default [
    { name: "car-maintain-link", path: "/pages/carMaintain", component: CarMaintain },
    { name: "client-maintain-link", path: "/pages/clientMaintain", component: ClientMaintain },
    { name: "personal-link", path: "/pages/personal", component: Personal },
    { name: "team-maintain-link", path: "/pages/teamMaintain", component: TeamMaintain },
    { name: "carinsert-link", path: "/pages/carinsert", component: CarInsert },
    { name: "carmodify-link", path: "/pages/carmodify", component: CarModify },
    { name: "view-car-link", path: "/pages/viewCar", component: ViewCar },
    { name: "car-list-link", path: "/pages/carList", component: CarList },
    { name: "car-Modify-Sign-link", path: "/pages/carModifySign", component: CarModify },
    
]