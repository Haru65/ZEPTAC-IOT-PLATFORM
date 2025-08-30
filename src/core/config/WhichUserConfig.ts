import { useAuthStore } from "@/stores/auth";
import { computed } from "vue";

const auth = useAuthStore();

// users-limit to subscription
const Limit = 10;
const limit = Array.from({ length: Limit }, (_, index) => index + 1);

const Identifier = computed(() => {
    switch (auth.get_auth()?.toString()) {
        case "1":
            return "Admin";
        case "2":
            return "Company-Admin";
        case "3":
            return "Site-Incharge";
        case "4":
            return "Service-Engineer";
        default:
            return false;
    }
});

export { Identifier, limit };
