# Bulls & Cows

A number-guessing game built with vanilla JavaScript. The computer picks a secret 4-digit number with all different digits (it can start with 0, like 0123). You have 10 attempts to find it.

## How to play

1. Type 4 different digits and press **Check** (or Enter).
2. After each guess you get a hint:
   - **Bull**: a correct digit in the correct place.
   - **Cow**: a correct digit in the wrong place.
3. Find all 4 bulls within 10 attempts to win. Press **New game!** to play again.

Example: if the secret is `1234` and you guess `1243`, you get 2 bulls (`1` and `2`) and 2 cows (`4` and `3`).

## Built with

- HTML, CSS and vanilla JavaScript (no framework)
- [Parcel](https://parceljs.org/) as the bundler

## Run it locally

```bash
npm install
npm start
```

Parcel will serve the game at [http://localhost:1234](http://localhost:1234).

## What I practised

- Working with DOM events (click, keyboard) and keeping game state in variables
- Validating user input and showing clear error messages
- Writing small functions: `generateSecret`, `countBullsAndCows`, `validateGuess`
- Responsive layout with media queries

## Live demo:

https://bulls-and-cows-mihaela.netlify.app/

## Author

Mihaela Samardzhieva
