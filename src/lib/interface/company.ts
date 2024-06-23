export interface Company {
  id: string;
  email: string;
  status: string;
  app_password: string;
  name: string | null;
  line_token: string | null;
  stripe_customer_id: string | null;
  stripe_subscription_id: string | null;
  is_trial: boolean | null;
  permissions: string[];
}
