import { useAuthStore } from "@/stores/auth";
import { computed } from "vue";

const auth = useAuthStore();

// users-limit to subscription
const Limit = 10;
const limit = Array.from({ length: Limit }, (_, index) => index + 1);

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
        case "8":
            return "Lead";
        case "7":
            return "Client";
        default:
            return false;
    }
});

export { Identifier, limit };
