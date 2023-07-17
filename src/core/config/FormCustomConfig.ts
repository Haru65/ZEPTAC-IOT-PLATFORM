export function CUSTOM_FORM(profileDetails: any) {
    const form = new FormData();
    form.append("first_name", profileDetails.value.first_name);
    form.append("last_name", profileDetails.value.last_name);
    form.append("email", profileDetails.value.email);
    form.append("phone", profileDetails.value.phone);
    form.append("password", profileDetails.value.password);
    form.append("roles", profileDetails.value.roles);
    form.append("company_id", profileDetails.value.company_id);
    form.append("created_by", profileDetails.value.created_by);
    form.append("updated_by", profileDetails.value.updated_by);
    form.append("image", profileDetails.value.image);

    return form;
}
