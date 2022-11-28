interface Loan {
  id_loan: number;
  id_user: number;
  id_copy: number;
  dt_expected_collect: string;
  dt_loan: string;
  dt_expected_devolution_loan: string;
  dt_real_devolution_loan?: string;
  approved_loan: boolean;
  isbn: string;
  title: string;
  email: string;
}
