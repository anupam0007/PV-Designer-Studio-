import { HeroSettingsForm } from "@/components/admin/hero-settings-form";
import { ContactSettingsForm } from "@/components/admin/contact-settings-form";
import { isSupabaseConfigured } from "@/lib/supabase/config";
import { getHeroSlides, getContactSettings } from "@/lib/site-settings-data";
import { updateHeroSettings, updateContactSettings } from "../actions";

export default async function AdminSettingsPage() {
  if (!isSupabaseConfigured) return null;

  const [slides, contact] = await Promise.all([getHeroSlides(), getContactSettings()]);

  return (
    <div className="flex flex-col gap-12">
      <div>
        <h1 className="mb-1 text-2xl font-semibold">Home Page Hero Banner</h1>
        <p className="mb-6 text-sm text-muted-foreground">
          Edit the rotating banner shown at the top of the home page.
        </p>
        <HeroSettingsForm slides={slides} action={updateHeroSettings} />
      </div>

      <div>
        <h1 className="mb-1 text-2xl font-semibold">Contact Info</h1>
        <p className="mb-6 text-sm text-muted-foreground">
          Edit the phone numbers, email, WhatsApp number and social links shown in the
          footer and on the Contact page.
        </p>
        <ContactSettingsForm contact={contact} action={updateContactSettings} />
      </div>
    </div>
  );
}
