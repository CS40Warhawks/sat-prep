"use client";

import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import { useEffect, useState, type FormEvent } from "react";
import { clearLocal, supabase } from "@/lib/cloud";
import { loadProgress, type Progress } from "@/lib/progress";
import { safeNext } from "@/lib/access";
import { Avatar } from "./Avatar";
import { Eyebrow, Icon } from "./ui";
import { useAvatar } from "./useAvatar";
import { displayName, useAccount, useSyncStatus } from "./useAccount";

type Mode = "signin" | "signup" | "forgot";

const MIN_PASSWORD = 8;

function friendly(message: string): string {
  const m = message.toLowerCase();
  if (m.includes("invalid login")) return "That email and password don't match. Try again or reset your password.";
  if (m.includes("email not confirmed")) return "Confirm your email first. Check your inbox for the link we sent.";
  if (m.includes("already registered")) return "There's already an account with that email. Sign in instead.";
  if (m.includes("rate limit") || m.includes("too many")) return "Too many tries. Wait a minute and try again.";
  if (m.includes("password")) return message;
  return "Something went wrong. Check your connection and try again.";
}

function Field(props: { label: string; type: string; value: string; onChange: (v: string) => void; autoComplete: string; hint?: string }) {
  return (
    <label className="block">
      <span className="text-sm font-medium">{props.label}</span>
      <input
        type={props.type}
        value={props.value}
        onChange={(e) => props.onChange(e.target.value)}
        autoComplete={props.autoComplete}
        required
        minLength={props.type === "password" ? MIN_PASSWORD : undefined}
        className="mt-1 w-full rounded-xl border border-line bg-white px-3 py-2.5 outline-none focus:border-sky focus:ring-2 focus:ring-sky/30"
      />
      {props.hint && <span className="mt-1 block text-xs text-muted">{props.hint}</span>}
    </label>
  );
}

function Notice({ tone, children }: { tone: "error" | "ok"; children: React.ReactNode }) {
  return (
    <p role={tone === "error" ? "alert" : "status"} className={`rounded-xl px-4 py-3 text-sm ${tone === "error" ? "bg-wrong-soft text-wrong-dark" : "bg-brand-soft text-brand-dark"}`}>
      {children}
    </p>
  );
}

function SignedOut() {
  const router = useRouter();
  const next = safeNext(useSearchParams().get("next") ?? "/learn");
  const [mode, setMode] = useState<Mode>("signin");
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [sent, setSent] = useState<string | null>(null);

  const submit = async (e: FormEvent) => {
    e.preventDefault();
    setBusy(true);
    setError(null);
    const sb = supabase();
    const back = `${window.location.origin}/account`;
    try {
      if (mode === "signin") {
        const { error } = await sb.auth.signInWithPassword({ email, password });
        if (error) throw error;
        router.push(next);
      } else if (mode === "signup") {
        const { data, error } = await sb.auth.signUp({ email, password, options: { data: { name: name.trim() }, emailRedirectTo: back } });
        if (error) throw error;
        // An existing, confirmed email comes back with no identities.
        if (data.user && data.user.identities?.length === 0) throw new Error("already registered");
        if (data.session) router.push(next);
        else setSent(`We sent a confirmation link to ${email}. Open it to finish creating your account.`);
      } else {
        const { error } = await sb.auth.resetPasswordForEmail(email, { redirectTo: `${back}?reset=1` });
        if (error) throw error;
        setSent(`If ${email} has an account, a reset link is on its way.`);
      }
    } catch (err) {
      setError(friendly(err instanceof Error ? err.message : String(err)));
    } finally {
      setBusy(false);
    }
  };

  const switchTo = (m: Mode) => {
    setMode(m);
    setError(null);
    setSent(null);
  };

  return (
    <div className="mx-auto max-w-md">
      <Eyebrow>Free account</Eyebrow>
      <h1 className="mt-2 text-3xl font-semibold tracking-tight">
        {mode === "signup" ? "Create your account" : mode === "forgot" ? "Reset your password" : "Welcome back"}
      </h1>
      <p className="mt-2 text-muted">
        {mode === "forgot"
          ? "Enter your email and we'll send you a link to choose a new password."
          : "Keep your XP, streak, plan and avatar safe, and pick up on any device."}
      </p>

      {mode !== "forgot" && (
        <div className="mt-6 flex rounded-xl bg-stone-100 p-1" role="tablist">
          {(["signin", "signup"] as const).map((m) => (
            <button
              key={m}
              role="tab"
              aria-selected={mode === m}
              onClick={() => switchTo(m)}
              className={`flex-1 rounded-lg px-3 py-2 text-sm font-medium transition ${mode === m ? "bg-white text-ink shadow-sm" : "text-muted"}`}
            >
              {m === "signin" ? "Sign in" : "Create account"}
            </button>
          ))}
        </div>
      )}

      {sent ? (
        <div className="mt-6 space-y-4">
          <Notice tone="ok">{sent}</Notice>
          <button onClick={() => switchTo("signin")} className="text-sm font-medium text-sky hover:underline">
            Back to sign in
          </button>
        </div>
      ) : (
        <form onSubmit={submit} className="mt-6 space-y-4">
          {mode === "signup" && <Field label="First name" type="text" value={name} onChange={setName} autoComplete="given-name" />}
          <Field label="Email" type="email" value={email} onChange={setEmail} autoComplete="email" />
          {mode !== "forgot" && (
            <Field
              label="Password"
              type="password"
              value={password}
              onChange={setPassword}
              autoComplete={mode === "signup" ? "new-password" : "current-password"}
              hint={mode === "signup" ? `At least ${MIN_PASSWORD} characters.` : undefined}
            />
          )}
          {error && <Notice tone="error">{error}</Notice>}
          <button type="submit" disabled={busy} className={`w-full ${busy ? "btn-off" : "btn-green"}`}>
            {busy ? "One moment…" : mode === "signin" ? "Sign in" : mode === "signup" ? "Create account" : "Send reset link"}
          </button>
          <div className="flex justify-between text-sm">
            {mode === "signin" ? (
              <button type="button" onClick={() => switchTo("forgot")} className="text-muted hover:text-ink">
                Forgot password?
              </button>
            ) : mode === "forgot" ? (
              <button type="button" onClick={() => switchTo("signin")} className="text-muted hover:text-ink">
                Back to sign in
              </button>
            ) : (
              <span />
            )}
          </div>
        </form>
      )}
      <p className="mt-8 text-xs text-muted">
        Progress you&apos;ve made in this browser is added to your account when you sign in. You can keep studying without an account, too.
      </p>
    </div>
  );
}

function NewPassword({ onDone }: { onDone: () => void }) {
  const [password, setPassword] = useState("");
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const submit = async (e: FormEvent) => {
    e.preventDefault();
    setBusy(true);
    const { error } = await supabase().auth.updateUser({ password });
    setBusy(false);
    if (error) setError(friendly(error.message));
    else onDone();
  };
  return (
    <form onSubmit={submit} className="mx-auto max-w-md space-y-4">
      <h1 className="text-3xl font-semibold tracking-tight">Choose a new password</h1>
      <Field label="New password" type="password" value={password} onChange={setPassword} autoComplete="new-password" hint={`At least ${MIN_PASSWORD} characters.`} />
      {error && <Notice tone="error">{error}</Notice>}
      <button type="submit" disabled={busy} className={`w-full ${busy ? "btn-off" : "btn-green"}`}>
        Save password
      </button>
    </form>
  );
}

function SignedIn({ name, email }: { name: string; email: string }) {
  const { state } = useAvatar();
  const sync = useSyncStatus();
  const [progress, setProgress] = useState<Progress | null>(null);
  const [leaving, setLeaving] = useState(false);
  useEffect(() => setProgress(loadProgress()), [sync.state]);

  const signOut = async () => {
    setLeaving(true);
    await supabase().auth.signOut();
    // The account keeps everything; clear this browser so the next person starts fresh.
    clearLocal();
    window.location.href = "/";
  };

  const lessons = progress ? Object.keys(progress.lessons).length : 0;
  const status =
    sync.state === "syncing" ? "Saving…" : sync.state === "offline" ? "Can't reach your account right now. We'll try again on your next save." : "All progress saved to your account";

  return (
    <div className="mx-auto max-w-md space-y-6">
      <div className="flex items-center gap-4">
        {state ? <Avatar look={state.look} size={72} /> : <span className="h-[72px] w-[72px] rounded-full bg-stone-200" />}
        <div className="min-w-0">
          <Eyebrow>Your account</Eyebrow>
          <h1 className="truncate text-2xl font-semibold tracking-tight">Hi, {name}</h1>
          <p className="truncate text-sm text-muted">{email}</p>
        </div>
      </div>
      <div className="rounded-2xl border border-line bg-white p-5">
        <p className={`flex items-center gap-2 text-sm font-medium ${sync.state === "offline" ? "text-wrong-dark" : "text-brand-dark"}`}>
          {sync.state !== "offline" && <Icon name="check" className="h-4 w-4" />}
          {status}
        </p>
        <dl className="mt-4 grid grid-cols-3 gap-3 text-center">
          {[
            ["XP", progress?.xp ?? 0],
            ["Best streak", progress?.bestStreak ?? 0],
            ["Lessons", lessons],
          ].map(([label, n]) => (
            <div key={label} className="rounded-xl bg-stone-50 py-3">
              <dd className="text-xl font-semibold tabular-nums">{n}</dd>
              <dt className="text-xs text-muted">{label}</dt>
            </div>
          ))}
        </dl>
      </div>
      <div className="flex flex-col gap-3 sm:flex-row">
        <Link href="/learn" className="btn-green flex-1">
          Keep learning
        </Link>
        <button onClick={signOut} disabled={leaving} className="btn-ghost flex-1">
          {leaving ? "Signing out…" : "Sign out"}
        </button>
      </div>
    </div>
  );
}

export function AccountPanel() {
  const { ready, user } = useAccount();
  const resetting = useSearchParams().get("reset") === "1";
  const [passwordSaved, setPasswordSaved] = useState(false);
  if (!ready) return null;
  if (user && resetting && !passwordSaved) return <NewPassword onDone={() => setPasswordSaved(true)} />;
  if (user) return <SignedIn name={displayName(user)} email={user.email ?? ""} />;
  return <SignedOut />;
}
