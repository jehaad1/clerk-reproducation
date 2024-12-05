"use client";

import { appDictionary, updateTheme } from "@/globals";

import "@/(auth)/Auth.css";

import * as Clerk from "@clerk/elements/common";
import * as SignIn from "@clerk/elements/sign-in";
import Link from "next/link";
import { useEffect, useState } from "react";

function NextButton({ label }: { label?: string }): React.ReactElement {
  return (
    <SignIn.Action
      submit
      className="bg-primary-950 py-2.5 text-white-50 hover:bg-primary-800"
    >
      <Clerk.Loading>
        {(isLoading) =>
          isLoading ? (
            appDictionary["loading"]
          ) : (
            <>
              {label || appDictionary["next"]}
              <svg
                viewBox="0 0 24 24"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M20.0001 11.9998L4.00012 11.9998"
                  stroke="currentColor"
                  strokeWidth="1.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
                <path
                  d="M15.0002 17L20.0002 12L15.0002 7.00004"
                  stroke="currentColor"
                  strokeWidth="1.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </>
          )
        }
      </Clerk.Loading>
    </SignIn.Action>
  );
}

function SignInWithGoogle(): React.ReactElement {
  return (
    <Clerk.Connection name="google" className="secondary flex">
      <Clerk.Loading scope="provider:google">
        {(isLoading) =>
          isLoading ? (
            appDictionary["loading"]
          ) : (
            <>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                width="24"
                height="24"
                fill="none"
              >
                <circle
                  cx="12"
                  cy="12"
                  r="10"
                  stroke="currentColor"
                  strokeWidth="1.5"
                />
                <path
                  d="M12 12H17C17 14.7614 14.7614 17 12 17C9.23858 17 7 14.7614 7 12C7 9.23858 9.23858 7 12 7C13.3807 7 14.6307 7.55964 15.5355 8.46447"
                  stroke="currentColor"
                  strokeWidth="1.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
              {appDictionary["google"]}
            </>
          )
        }
      </Clerk.Loading>
    </Clerk.Connection>
  );
}

function Links(): React.ReactElement {
  return (
    <div className="flex items-center justify-between">
      <SignIn.Action navigate="forgot-password">
        {appDictionary["forgot_your_password"]}
      </SignIn.Action>
      <Link href="/terms">{appDictionary["terms_and_conditions"]}</Link>
    </div>
  );
}

function Divider(): React.ReactElement {
  return (
    <span className="text-through-line">
      <p>{appDictionary["or_continue_with"]}</p>
      <hr />
    </span>
  );
}

function InputField({
  name,
  placeholder,
}: {
  name: string;
  placeholder?: string;
}) {
  return (
    <Clerk.Field name={name}>
      <Clerk.Input className="form-input w-full" placeholder={placeholder} />
      <Clerk.FieldError className="!text-red-400 border-none" />
    </Clerk.Field>
  );
}

function Hero(): React.ReactElement {
  return (
    <div className="text-center">
      <h1 className="font-semibold text-[28px] mt-5 leading-[34px]">
        {appDictionary["welcome_back"]}
      </h1>
      <p className="text-dimmed-theme mt-3 max-sm:text-sm">
        {appDictionary["enter_your_credentials"]}{" "}
        <Link href="/signup">{appDictionary["sign_up"]}</Link>
      </p>
    </div>
  );
}

export default function Page(): React.ReactElement {
  if (typeof window === "undefined") return <></>;
  const [isMounted, setIsMounted] = useState(false);
  useEffect(() => {
    updateTheme();
    setIsMounted(true);
  }, []);
  if (!isMounted) return <></>;

  return (
    <main className="flex max-sm:-mt-5 h-screen overflow-hidden">
      <SignIn.Root>
        <SignIn.Step
          name="start"
          className="lg:p-16 px-6 grid place-content-center self-center w-full gap-11"
        >
          <Hero />
          <div className="grid gap-4 lg:gap-6">
            <InputField
              name="emailAddress"
              placeholder={appDictionary["email"]}
            />
            <InputField
              name="password"
              placeholder={appDictionary["password"]}
            />
            <Links />
            <NextButton />
          </div>

          <div className="grid gap-7">
            <Divider />
            <SignInWithGoogle />
          </div>
        </SignIn.Step>

        <SignIn.Step
          name="verifications"
          className="lg:p-16 px-6 grid place-content-center self-center w-full gap-11"
        >
          <SignIn.Strategy name="email_code">
            <Hero />
            <div className="grid gap-4 lg:gap-6">
              <h1>
                We sent you a verification code to your email address. Enter the
                code below.
              </h1>
              <InputField
                name="code"
                placeholder={appDictionary["verification_code"]}
              />
              <Links />
              <NextButton />
            </div>
            <div className="grid gap-7">
              <Divider />
              <SignInWithGoogle />
            </div>
          </SignIn.Strategy>

          <SignIn.Strategy name="password">
            <Hero />
            <div className="grid gap-4 lg:gap-6">
              <InputField
                name="password"
                placeholder={appDictionary["password"]}
              />
              <Links />
              <NextButton />
            </div>
            <div className="grid gap-7">
              <Divider />
              <SignInWithGoogle />
            </div>
          </SignIn.Strategy>

          <SignIn.Strategy name="reset_password_email_code">
            <Hero />
            <div className="grid gap-4 lg:gap-6">
              <h1>
                We sent you a verification code to your email address. Enter the
                code below.
              </h1>
              <InputField
                name="code"
                placeholder={appDictionary["verification_code"]}
              />
              <Links />
              <NextButton />
            </div>
            <div className="grid gap-7">
              <Divider />
              <SignInWithGoogle />
            </div>
          </SignIn.Strategy>
        </SignIn.Step>

        <SignIn.Step
          name="forgot-password"
          className="lg:p-16 px-6 grid place-content-center self-center w-full gap-11"
        >
          <SignIn.SupportedStrategy name="reset_password_email_code">
            Reset password
          </SignIn.SupportedStrategy>

          <SignIn.Action navigate="previous">Go back</SignIn.Action>
        </SignIn.Step>

        <SignIn.Step
          name="reset-password"
          className="lg:p-16 px-6 grid place-content-center self-center w-full gap-11"
        >
          <h1>Reset your password</h1>

          <div className="grid gap-4 lg:gap-6">
            <InputField
              name="password"
              placeholder={appDictionary["new_password"]}
            />
            <InputField
              name="confirmPassword"
              placeholder={appDictionary["confirm_password"]}
            />
            <Links />
            <NextButton label={appDictionary["reset_password"]} />
          </div>
        </SignIn.Step>
      </SignIn.Root>
    </main>
  );
}
