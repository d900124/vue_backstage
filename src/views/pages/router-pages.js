import CarMaintain from "./CarMaintain.vue";
import ClientMaintain from "./ClientMaintain.vue";
import Personal from "./Personal.vue";
import TeamMaintain from "./TeamMaintain.vue";

export default [
    { name: "car-maintain-link", path: "/pages/carMaintain", component: CarMaintain },
    { name: "client-maintain-link", path: "/pages/clientMaintain", component: ClientMaintain },
    { name: "personal-link", path: "/pages/personal", component: Personal },
    { name: "team-maintain-link", path: "/pages/teamMaintain", component: TeamMaintain }
]