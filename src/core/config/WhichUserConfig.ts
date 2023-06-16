import { useAuthStore } from "@/stores/auth";
import { computed } from "vue";

const auth = useAuthStore();

const Identifier = computed(() => {
    switch (auth.get_auth()?.toString()) {
        case "1":
            return "admin";
        case "2":
            return "companyadmin";
        case "3":
            return "salesperson";
        case "4":
            return "siteincharge";
        case "5":
            return "siteincharge";
        case "6":
            return "commercialex";
        case "7":
            return "customer";
        default:
            return false;
    }
});

export { Identifier };
