const formatter = new Intl.NumberFormat("en-IN", {
    style: "currency",
    currency: "INR",
});

const formatPrice = (value: string | number | null | undefined): string => {
    if (value === null || value === undefined || value === "") {
        console.error(`Invalid input to formatPrice: "${value}"`);
        return "Invalid Price";
    }

    const parsedValue = typeof value === "number" ? value : parseFloat(value);

    if (isNaN(parsedValue)) {
        console.error(`Invalid input to formatPrice: "${value}"`);
        return "Invalid Price";
    }

    return formatter.format(parsedValue);
};

export { formatPrice };
