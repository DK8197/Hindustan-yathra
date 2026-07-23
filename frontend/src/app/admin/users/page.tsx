export default function AdminUsersPage() {
  return (
    <div>
      <h1 className="text-2xl font-semibold">Users</h1>
      <p className="mt-1 text-sm text-gray-500">
        Registered OTP-verified customers. Search by mobile number, view booking history, deactivate accounts.
      </p>
      {/* TODO(prod): table backed by /api/admin/users. */}
    </div>
  );
}
