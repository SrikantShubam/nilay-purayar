# Tina Cloud admin authentication

The production admin is https://nilay-purayar.vercel.app/admin.

Tina Cloud's October authentication change requires TinaCMS 3.12 or later.
This repository previously locked TinaCMS 2.9.5 and @tinacms/cli 1.12.4.
Signing into the Tina Cloud dashboard can work while the old site's editor
authentication fails.

Reference: https://tina.io/blog/october-tinacloud-auth-changes

## Deployment checks

1. Use Node.js 22 for the updated Tina CLI.
2. In Vercel, verify NEXT_PUBLIC_TINA_CLIENT_ID matches this project's client ID
   in Tina Cloud. Keep TINA_TOKEN in Vercel's environment variables.
3. In the Tina Cloud project, verify the allowed origin includes
   https://nilay-purayar.vercel.app and that the project targets the correct
   GitHub repository and branch.
4. Deploy the updated package.json and package-lock.json. The existing build
   command regenerates the static admin using `tinacms build`.
5. Open /admin in a fresh browser session, authenticate with GitHub, and verify
   that both Work Section and Projects Section load. Do not change content
   merely to test sign-in.

The observed production sign-in redirect used client ID
8974a0d6-b521-4052-b8aa-5401f3ecd8c1 and origin
https://nilay-purayar.vercel.app. A client ID is a public identifier, not a token.
Compare it with the intended Tina Cloud project before changing any settings.

A local build does not verify the hosted GitHub OAuth callback. If login still
fails after deployment, capture the failing callback's error text and check
the project's origin and account access in Tina Cloud.

## Local verification

The first upgrade deployment (commit 7e199d3) failed with
`ERR_CLOUD_CHECK_FAILED`: the committed schema lock was still at GraphQL
1.6.1 while the new CLI generated 4.1.0, which adds the built-in `RichText`
type. Regenerating and committing `tina/tina-lock.json` lets Tina Cloud
reindex the new schema. Both content collection definitions are unchanged.

The updated CLI starts under Node 22.23.5. On this Windows checkout,
`tinacms build --local --noTelemetry` fails during GraphQL document loading:
the loader treats the Windows query glob beginning with `D:` as GraphQL text
and reports `Syntax Error: Unexpected Name "D"`. The admin build and hosted
sign-in therefore remain unverified. No deployment or cloud settings were
changed as part of this local upgrade.
