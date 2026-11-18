Put the Pegasus 43 page and my prompt notes in a new GitHub repo and push it.

1. Check that the GitHub CLI is installed and signed in with `gh auth status`. If it isn't, stop and tell me what to do.
2. Use the pegasus-page folder as the repo root. Create a notes folder inside it and copy these files from the Zero folder into it: PAGE_PLAN.md, prompt.md, order.md, build.md and nike_pegasus_size_stock_b2ebb9fac7f74d6a8bb3432d7642176f.json.
3. Make sure .gitignore leaves out node_modules, .next and any .env files. Nothing secret should be pushed.
4. Update README.md so it says what the project is, how to run it (npm install, then npm run dev, then open http://localhost:3000 at 375 x 667), and what's in the notes folder.
5. Run `npm run build` once more and fix any errors.
6. Show me the list of files that will be committed. Then make the first commit with the message "Pegasus 43 phone product page and planning notes".
7. Create a new public GitHub repo called pegasus-43-page with `gh repo create`, and push the code to it.
8. Finish by giving me the repo link, and confirm that the notes folder and README show on the repo's GitHub page.
