import { amplifyConfig } from "@/_lib/amplify/amplifyConfig";
import { Amplify } from "aws-amplify";

export default function ProfileLayout({
  children,
}: {
  children: React.ReactNode;
}) {

  Amplify.configure(amplifyConfig, { ssr: true });
  return (
    <main className="min-h-screen bg-gray-100">
      {children}
    </main>
  );
}