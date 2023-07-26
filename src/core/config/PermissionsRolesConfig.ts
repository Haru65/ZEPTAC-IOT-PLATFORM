// get API Data From /permissions and map for usage
// store in local storage for reference
const permissions = {
    1: "Create Company",
    2: "Update Company",
    3: "View Company",
    4: "Delete Company",
    5: "Create User",
    6: "Update User",
    7: "View User",
    8: "Delete User",
    9: "Create Role",
    10: "Update Role",
    11: "View Role",
    12: "Delete Role",
};

const roles = {
    1: "Super Admin",
    2: "Company Admin",
    3: "Sales Person",
    4: "Site In-Charge",
    5: "Service Enginner",
    6: "Commercial Executive",
    7: "Customer",
    8: "Lead",
    9: "Client",
};

const rolesArray = Object.keys(roles).map((id) => ({
    id: parseInt(id),
    name: roles[parseInt(id)],
}));

const get_role = (id: number) => {
    if (id in roles) {
        // Return the value of the key
        return roles[id];
    } else {
        // Return null if the key doesn't exist
        return "Invalid";
    }
};

export { rolesArray, permissions, get_role };
