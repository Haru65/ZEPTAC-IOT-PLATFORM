// currency foratter
const formatter = new Intl.NumberFormat("en-IN", {
    style: "currency",
    currency: "INR",
});

const formatPrice = (value: string) => {
    const parsedValue = parseFloat(value);
    if (isNaN(parsedValue)) {
        throw new Error("Invalid input: expected a string representing a number");
    }
    return formatter.format(parsedValue);
};

export { formatPrice };
