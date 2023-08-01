describe("Check Login", () => {
  const loginData = [
    { email: "test@gmail.com", password: "test" },
    { email: "admin@cleanroom.com", password: "Admin@123" },
    // Add more login data objects as needed
    { email: "john.doe@example.com", password: "password123" },
    { email: "jane.smith@example.com", password: "qwerty456" },
    { email: "testuser123@example.com", password: "abc123xyz" },
    { email: "dummyaccount@example.com", password: "dummyPass789" },
    { email: "user555@example.com", password: "p@ssw0rd!" },
  ];

  loginData.forEach((data) => {
    it("passes", () => {
      cy.visit("http://localhost:5173");

      // Assuming there are input fields for username and password
      cy.get('input[name="email"]').clear().type(data.email);
      cy.get('input[name="password"]').clear().type(data.password);

      // Assuming there is a login button
      cy.contains("Continue").click();

      // Add assertions to verify successful login
      if (data.email === "admin@cleanroom.com") {
        cy.url().should("include", "/dashboard");
        cy.contains("Welcome Admin").should("exist");
      } else {
        cy.url().should("not.include", "/dashboard");
      }
    });
  });
});
