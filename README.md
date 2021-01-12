# Gw2lfg Client

Client for gw2lfg service. Allows organisation of raid events with automated player requirements checking.

## PREREQUISITES

- `node 12.x` (tested on `12.16.3`)
- `npm 6.x` (tested on `6.4.1`)

## SETUP

1. **Env Variables**
   - `example.env` contains example env config.
   - Next.js by default loads env variables from `.env.local` file, put your desired vars there
   - Variables that are to be access in a browser have to be prefixed with `NEXT_PUBLIC` in both `.env` and in code
   - Environment-dependent variables can be put in `.env.production`, `.env.development` or `.env.test`. Keep in mind `.env.local` will override variables of the same name.

## HOW TO RUN LOCALLY

1. Follow `SETUP` section first and install `PREREQUISITIES`
2. `npm install` - installing dependencies
3. `yarn dev` - run the app

Client will be available at `localhost:3000`

## TECHNOLOGIES USED

- Typescript
- Next.js
- React
- React Query
- Material UI
- Formik
