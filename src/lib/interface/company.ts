export interface Company {
  id: string;
  email: string;
  status: string;
  company_key: string | null;
  name: string | null;
  line_token: string | null;
  stripe_customer_id: string | null;
  stripe_subscription_id: string | null;
}
