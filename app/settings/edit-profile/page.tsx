import SettingsNav from "@/components/setting/SettingsNav";
import EditProfileCard from "@/components/setting/EditProfileCard";

const SettingsPage = () => {
  return (
    <div className="flex min-h-screen w-full flex-col">
      <main className="flex min-h-[calc(100vh_-_theme(spacing.16))] flex-1 flex-col gap-4 bg-muted/40 p-4 md:gap-8 md:p-10">
        
        <div className="mx-auto grid w-full max-w-7xl p-6 items-start gap-6 md:grid-cols-[180px_1fr] lg:grid-cols-[250px_1fr]">
          <SettingsNav />
          <div className="grid gap-6">
            <EditProfileCard />
          </div>
        </div>
      </main>
    </div>
  );
};

export default SettingsPage;
