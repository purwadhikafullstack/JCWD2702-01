import ResetPasswordForm from '@/components/form/resetPasswordForm';

export default function ResetPassword({
  params,
}: {
  params: { token: string };
}) {
  const token = params.token;

  return (
    <div>
      <ResetPasswordForm token={token} />
    </div>
  );
}
