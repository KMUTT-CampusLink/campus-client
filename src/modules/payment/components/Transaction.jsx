export const transactions = [
  {
    id: "25cc8d34-7502-4ea0-8a83-bd840149dcf0", // varchar(50)
    user_id: 1001, // integer
    issued_by: "President Building", // varchar(50)
    issue_date: "2023-08-01T00:00:00Z", // timestamp
    due_date: "2023-08-15T00:00:00Z", // timestamp
    paid_date: null, // timestamp (can be null if unpaid)
    amount: 400.0, // decimal(10,2)
    title: "Laptop", // varchar(100)
    status: "Unpaid", // payment_status_enum (can be 'Paid', 'Unpaid', 'Canceled')
    created_at: "2023-07-25T00:00:00Z", // timestamp
    updated_at: "2023-07-30T00:00:00Z", // timestamp
  },
  {
    id: "2",
    user_id: 1002,
    issued_by: "Finance Office",
    issue_date: "2023-05-01T00:00:00Z",
    due_date: "2023-05-15T00:00:00Z",
    paid_date: "2023-05-10T00:00:00Z",
    amount: 230.0,
    title: "Tuition fees",
    status: "Paid",
    created_at: "2023-04-15T00:00:00Z",
    updated_at: "2023-05-10T00:00:00Z",
  },
  {
    id: "3",
    user_id: 1003,
    issued_by: "Bookstore",
    issue_date: "2023-04-01T00:00:00Z",
    due_date: "2023-04-15T00:00:00Z",
    paid_date: null,
    amount: 230.0,
    title: "Backpack",
    status: "Canceled",
    created_at: "2023-03-15T00:00:00Z",
    updated_at: "2023-04-10T00:00:00Z",
  },
  {
    id: "4",
    user_id: 1004,
    issued_by: "Telecom Provider",
    issue_date: "2023-06-01T00:00:00Z",
    due_date: "2023-06-15T00:00:00Z",
    paid_date: null,
    amount: 120.0,
    title: "Phone bill",
    status: "Unpaid",
    created_at: "2023-05-15T00:00:00Z",
    updated_at: "2023-06-01T00:00:00Z",
  },
  {
    id: "5",
    user_id: 1005,
    issued_by: "Insurance Co.",
    issue_date: "2024-02-01T00:00:00Z",
    due_date: "2024-02-05T00:00:00Z",
    paid_date: null,
    amount: 900.0,
    title: "Travel Insurance",
    status: "Unpaid",
    created_at: "2024-01-15T00:00:00Z",
    updated_at: "2024-01-25T00:00:00Z",
  },
];
