export default async function NewsByIdPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  return <div>NewsById: {slug}</div>;
}
