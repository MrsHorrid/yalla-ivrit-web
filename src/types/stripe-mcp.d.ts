// Type declarations for Stripe MCP functions

interface StripeCreateCustomerParams {
  name: string;
  email: string;
}

interface StripeCustomer {
  id: string;
  name: string;
  email: string;
  object: string;
}

interface StripeCreatePaymentLinkParams {
  price: string;
  quantity: number;
}

interface StripePaymentLink {
  id: string;
  url: string;
  object: string;
}

// Declare global Stripe MCP functions
declare global {
  function mcp2_create_customer(params: StripeCreateCustomerParams): Promise<StripeCustomer>;
  function mcp2_create_payment_link(params: StripeCreatePaymentLinkParams): Promise<StripePaymentLink>;
}

export {};
